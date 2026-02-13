import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type VideoPageProps = {
  params: {
    id: string;
  };
};

type VideoData = {
  id: string;
  title: string;
  description: string;
  playableUrl: string;
};

async function getVideoData(id: string): Promise<VideoData | null> {
  // In a real app, this base URL should come from an environment variable.
  // For local development, we'll hardcode the URL.
  const baseUrl = 'http://localhost:9002';
  
  try {
    const res = await fetch(`${baseUrl}/api/videos/${id}`, { cache: 'no-store' });
    if (!res.ok) {
        return null;
    }
    return res.json();
  } catch (error) {
    console.error("Failed to fetch video data", error);
    return null;
  }
}

export default async function VideoPage({ params }: VideoPageProps) {
  const videoData = await getVideoData(params.id);

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
        <video controls preload="metadata" src={videoData.playableUrl} className="w-full h-full">
            <p>Your browser does not support the video tag.</p>
        </video>
      </div>
      <div className="max-w-4xl mx-auto mt-6">
        <h1 className="font-headline text-3xl font-bold tracking-tight mb-2">{videoData.title}</h1>
        <p className="text-muted-foreground">{videoData.description}</p>
      </div>
    </main>
  );
}
