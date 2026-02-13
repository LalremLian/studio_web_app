import { MovieCard } from '@/components/dashboard/movie-card';
import { mockMovies } from '@/lib/data';
import type { Movie } from '@/lib/data';

export default function DashboardPage() {
  return (
    <main className="flex-1 p-4 md:p-6">
      <h1 className="font-headline text-3xl font-bold tracking-tight mb-6">
        Discover Content
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {mockMovies.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}
