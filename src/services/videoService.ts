'use server';

import type { Video } from '@/models/video';
import { mockVideos } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

// In-memory store for videos to allow prototyping without a database.
const videos: Video[] = [...mockVideos];
let videoIdCounter = videos.length + 1;

export async function getVideoById(id: string): Promise<Video | null> {
  const video = videos.find((v) => v.id === id);
  // Return a copy to prevent direct modification of the in-memory store
  return video ? { ...video } : null;
}

export async function getAllVideos(): Promise<Video[]> {
  // Return a sorted copy to simulate database sorting
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
  playableUrl: string;
};

export async function createVideo(params: CreateVideoParams): Promise<Video> {
  const newVideo: Video = {
    id: (videoIdCounter++).toString(),
    title: params.title,
    description: params.description,
    summary: params.summary ?? undefined,
    tags: params.tags ?? [],
    fileName: params.file.name,
    size: params.file.size,
    status: 'uploaded',
    playableUrl: params.playableUrl,
    createdAt: new Date(),
    imageId: 'cybernetic-horizon', // Default image for new uploads
    image: PlaceHolderImages.find((img) => img.id === 'cybernetic-horizon'),
  };

  videos.push(newVideo);

  return newVideo;
}
