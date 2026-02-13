import type { Video } from '@/models/video';
import { PlaceHolderImages } from './placeholder-images';

const videoData: Omit<Video, 'image' | 'playableUrl' | 'createdAt'>[] = [
  {
    id: '1',
    title: 'Cybernetic Horizon',
    description:
      'In a neon-lit future, a renegade android discovers a plot that could unravel society.',
    imageId: 'cybernetic-horizon',
  },
  {
    id: '2',
    title: 'Desert Fury',
    description:
      'A lone warrior traverses a post-apocalyptic wasteland in a souped-up vehicle, seeking vengeance.',
    imageId: 'desert-fury',
  },
  {
    id: '3',
    title: 'Ancients Awakening',
    description:
      "An archaeologist accidentally awakens an ancient power in a forgotten jungle temple. It's not happy.",
    imageId: 'ancients-awakening',
  },
  {
    id: '4',
    title: 'Star Voyager',
    description:
      'The last human crew aboard a generation ship searches for a new home among the stars.',
    imageId: 'star-voyager',
  },
  {
    id: '5',
    title: 'The Last Stand',
    description:
      'A retired knight must defend their village from an invading horde with a small band of farmers.',
    imageId: 'the-last-stand',
  },
  {
    id: '6',
    title: 'Neon Noir',
    description:
      'A grizzled detective hunts a phantom killer in the rain-soaked, neon-drenched streets of a corrupt city.',
    imageId: 'neon-noir',
  },
  {
    id: '7',
    title: 'Echoes of Time',
    description:
      'A scientist who invents a time machine must fix the chaotic timeline they accidentally created.',
    imageId: 'echoes-of-time',
  },
  {
    id: '8',
    title: 'Deep Dive',
    description:
      'A research team in a deep-sea submersible discovers a new, intelligent species... and they are territorial.',
    imageId: 'deep-dive',
  },
  {
    id: '9',
    title: 'Titan Protocol',
    description:
      'A disgraced pilot is the only one who can operate a giant experimental mech to stop a kaiju invasion.',
    imageId: 'titan-protocol',
  },
  {
    id: '10',
    title: 'Spectral Manor',
    description:
      'A group of friends spend a night in a haunted mansion for a reality show, only to find the ghosts are real.',
    imageId: 'spectral-manor',
  },
];

export const mockVideos: Video[] = videoData.map((video) => ({
  ...video,
  image: PlaceHolderImages.find((img) => img.id === video.imageId),
  playableUrl: `https://bunny.net/stream/your-library-id/${video.id}.m3u8`,
  createdAt: new Date(),
}));
