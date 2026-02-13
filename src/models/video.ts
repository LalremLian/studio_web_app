import type { ImagePlaceholder } from '@/lib/placeholder-images';

export type Video = {
  id: string; // Corresponds to _id in MongoDB, but as a string
  title: string;
  description: string;
  summary?: string;
  tags?: string[];
  fileName?: string;
  size?: number;
  status?: 'uploaded' | 'processing' | 'ready';
  playableUrl: string;
  imageId?: string; // To link to a placeholder image
  image?: ImagePlaceholder;
  createdAt: Date;
};
