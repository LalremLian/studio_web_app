import { NextResponse } from 'next/server';
import { mockMovies } from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: 'Video ID is required' },
      { status: 400 }
    );
  }

  const movie = mockMovies.find((m) => m.id === id);

  if (!movie) {
    return NextResponse.json({ error: 'Video not found' }, { status: 404 });
  }

  return NextResponse.json({
    id: movie.id,
    title: movie.title,
    description: movie.description,
    playableUrl: movie.url,
  });
}
