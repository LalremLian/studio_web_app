'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  FileText,
  Loader2,
  Sparkles,
  Tags,
  UploadCloud,
  Video,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  generateMetadataAction,
  uploadAction,
} from '@/app/upload/actions';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

const formSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
});

type AiResult = {
  tags: string[];
  summary: string;
} | null;

export function UploadForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isGenerating, startGenerateTransition] = useTransition();
  const [isUploading, startUploadTransition] = useTransition();
  const [aiResult, setAiResult] = useState<AiResult>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const handleGenerate = async () => {
    const { title, description } = form.getValues();
    if (!title || !description) {
      toast({
        variant: 'destructive',
        title: 'Missing information',
        description: 'Please provide a title and description before generating.',
      });
      return;
    }

    startGenerateTransition(async () => {
      const result = await generateMetadataAction({ title, description });
      if (result.success && result.data) {
        setAiResult(result.data);
        toast({
          title: 'Success!',
          description: 'AI-powered summary and tags have been generated.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Generation Failed',
          description: result.error,
        });
      }
    });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No File Selected',
        description: 'Please select a video file to upload.',
      });
      return;
    }
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('file', file);
    if (aiResult) {
      formData.append('summary', aiResult.summary);
      formData.append('tags', JSON.stringify(aiResult.tags));
    }

    // Simulate TUS upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 5;
      });
    }, 200);

    startUploadTransition(async () => {
      const result = await uploadAction(formData);
      clearInterval(progressInterval);
      setUploadProgress(100);

      if (result.success) {
        toast({
          title: 'Upload Complete!',
          description: `Your video "${values.title}" is now available.`,
        });
        
        // Redirect to the home page to see the new video
        setTimeout(() => {
          router.push('/');
        }, 1000);
        
      } else {
        toast({
          variant: 'destructive',
          title: 'Upload Failed',
          description: result.error,
        });
        setUploadProgress(0);
      }
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., The Adventures of Captain Voxel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A short, catchy description of your content..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Sparkles />
                )}
                Generate Summary & Tags with AI
              </Button>
              {aiResult && (
                <div className="space-y-4 rounded-md border bg-muted/50 p-4">
                  <div>
                    <h4 className="mb-2 flex items-center gap-2 text-sm font-medium">
                      <FileText className="text-muted-foreground" />
                      AI Generated Summary
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {aiResult.summary}
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 flex items-center gap-2 text-sm font-medium">
                      <Tags className="text-muted-foreground" />
                      Suggested Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {aiResult.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <FormItem>
              <FormLabel>Video File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="file:bg-primary file:text-primary-foreground file:hover:bg-primary/90 file:font-bold file:py-2 file:px-4 file:rounded-md file:border-0 file:mr-4"
                />
              </FormControl>
              <FormDescription>
                Select the video file you want to upload.
              </FormDescription>
              {file && (
                <div className="flex items-center gap-2 rounded-md border bg-muted/50 p-2 text-sm text-muted-foreground">
                  <Video />
                  <span>{file.name}</span>
                </div>
              )}
            </FormItem>

            {isUploading && (
              <div className="space-y-2">
                <Progress value={uploadProgress} />
                <p className="text-sm text-center text-muted-foreground">
                  Uploading... please keep this window open.
                </p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isUploading || !file}
              className="w-full"
              size="lg"
            >
              {isUploading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <UploadCloud />
              )}
              Upload Content
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
