import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, VideoOff } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-4 md:p-6 text-center">
      <VideoOff className="size-24 text-muted-foreground" />
      <h1 className="text-3xl font-bold">Video Not Found</h1>
      <p className="text-muted-foreground">
        Sorry, we couldn't find the video you were looking for.
      </p>
      <Button asChild>
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Discover
        </Link>
      </Button>
    </div>
  );
}
