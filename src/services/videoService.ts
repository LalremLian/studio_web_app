'use server';

import { mockVideos } from '@/lib/mock-data';
import type { Video } from '@/models/video';
import { PlaceHolderImages } from '@/lib/placeholder-images';

let videos: Video[] = [...mockVideos];

export async function getVideoById(id: string): Promise<Video | null> {
  const video = videos.find((v) => v.id === id);
  return video ? { ...video } : null;
}

export async function getAllVideos(): Promise<Video[]> {
  return [...videos].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
}

type CreateVideoParams = {
  title: string;
  description: string;
  summary: string | null;
  tags: string[] | null;
  file: File;
  videoId: string;
  playableUrl: string;
};

export async function createVideo(params: CreateVideoParams): Promise<void> {
  const newVideo: Video = {
    id: params.videoId,
    title: params.title,
    description: params.description,
    summary: params.summary ?? undefined,
    tags: params.tags ?? [],
    fileName: params.file.name,
    size: params.file.size,
    status: 'uploaded',
    playableUrl: params.playableUrl,
    createdAt: new Date(),
    imageId: 'cybernetic-horizon',
    image: PlaceHolderImages.find((img) => img.id === 'cybernetic-horizon'),
  };

  videos.unshift(newVideo);
}
