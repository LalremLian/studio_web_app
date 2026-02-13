import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getVideoById } from '@/services/videoService';
import { Badge } from '@/components/ui/badge';

type VideoPageProps = {
  params: {
    id: string;
  };
};

export default async function VideoPage({ params }: VideoPageProps) {
  const videoData = await getVideoById(params.id);

  if (!videoData) {
    notFound();
  }

  return (
    <main className="flex-1 p-4 md:p-6">
      <div className="mb-4">
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Discover
          </Link>
        </Button>
      </div>
      <div className="aspect-video w-full max-w-4xl mx-auto bg-black rounded-lg overflow-hidden shadow-lg">
        {/* A simple HTML5 video player is used. For production, consider a more robust player library. */}
        <video
          controls
          preload="metadata"
          src={videoData.playableUrl}
          className="w-full h-full"
        >
          <p>Your browser does not support the video tag.</p>
        </video>
      </div>
      <div className="max-w-4xl mx-auto mt-6">
        <h1 className="font-headline text-3xl font-bold tracking-tight mb-2">
          {videoData.title}
        </h1>
        {videoData.summary && (
           <p className="text-lg text-muted-foreground mb-4 italic">
            {videoData.summary}
           </p>
        )}
        <p className="text-foreground/80 mb-4">{videoData.description}</p>
        {videoData.tags && videoData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {videoData.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
