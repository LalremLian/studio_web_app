import { MovieCard } from '@/components/dashboard/movie-card';
import { getAllVideos } from '@/services/videoService';
import type { Video } from '@/models/video';

export default async function DashboardPage() {
  const allContent: Video[] = await getAllVideos();

  return (
    <main className="flex-1 p-4 md:p-6">
      <h1 className="font-headline text-3xl font-bold tracking-tight mb-6">
        Discover Content
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {allContent.length > 0 ? (
          allContent.map((video) => (
            <MovieCard key={video.id} movie={video} />
          ))
        ) : (
          <p className="text-muted-foreground col-span-full text-center">
            No videos found. Try uploading some content!
          </p>
        )}
      </div>
    </main>
  );
}
