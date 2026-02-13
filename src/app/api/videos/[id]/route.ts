import { NextResponse } from 'next/server';
import { getVideoById } from '@/services/videoService';

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

  const video = await getVideoById(id);

  if (!video) {
    return NextResponse.json({ error: 'Video not found' }, { status: 404 });
  }

  return NextResponse.json({
    id: video.id,
    title: video.title,
    description: video.description,
    playableUrl: video.playableUrl,
  });
}
