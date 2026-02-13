import Image from 'next/image';
import { PlayCircle } from 'lucide-react';
import type { Movie } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

type MovieCardProps = {
  movie: Movie;
  className?: string;
};

export function MovieCard({ movie, className }: MovieCardProps) {
  if (!movie.image) {
    return null;
  }

  return (
    <Link href={`/videos/${movie.id}`}>
      <Card
        className={cn(
          'group relative overflow-hidden rounded-lg border-0 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:z-10',
          className
        )}
      >
        <CardContent className="p-0">
          <div className="aspect-[2/3] w-full">
            <Image
              src={movie.image.imageUrl}
              alt={movie.title}
              width={400}
              height={600}
              data-ai-hint={movie.image.imageHint}
              className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-75"
            />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayCircle className="h-16 w-16 text-white/80 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <h3 className="font-headline text-lg font-bold text-white drop-shadow-lg">
              {movie.title}
            </h3>
            <p className="mt-1 text-sm text-white/80 line-clamp-2">
              {movie.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
