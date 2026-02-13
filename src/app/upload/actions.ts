'use server';

import { generateContentMetadata } from '@/ai/flows/generate-content-metadata.ts';
import { z } from 'zod';

const generateMetadataSchema = z.object({
  title: z.string(),
  description: z.string(),
});

type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function generateMetadataAction(input: {
  title: string;
  description: string;
}): Promise<
  ActionResult<{
    tags: string[];
    summary: string;
  }>
> {
  const validatedInput = generateMetadataSchema.safeParse(input);
  if (!validatedInput.success) {
    return { success: false, error: 'Invalid input.' };
  }

  try {
    const result = await generateContentMetadata(validatedInput.data);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error generating content metadata:', error);
    return {
      success: false,
      error: 'Failed to generate metadata. Please try again.',
    };
  }
}

export async function uploadAction(
  formData: FormData
): Promise<ActionResult<{ videoId: string; url: string }>> {
  const title = formData.get('title') as string;
  const file = formData.get('file') as File;

  if (!title || !file) {
    return { success: false, error: 'Missing title or file.' };
  }
  
  // 1. Simulate Upload to Bunny.net using TUS
  // In a real application, you would use a TUS client here to upload `file`.
  // The client would provide an upload URL.
  // For this demo, we'll just wait and create a fake ID.
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const videoId = `vid_${Date.now()}`;
  const playableUrl = `https://your-bunny-stream-url.b-cdn.net/${videoId}/playlist.m3u8`;

  // 2. Simulate Storing metadata in MongoDB
  // In a real application, you would connect to your MongoDB instance and
  // create a new document in your 'videos' collection.
  console.log('--- SIMULATING DB SAVE ---');
  console.log('Title:', title);
  console.log('Description:', formData.get('description'));
  console.log('Summary:', formData.get('summary'));
  console.log('Tags:', formData.get('tags'));
  console.log('Video ID:', videoId);
  console.log('Playable URL:', playableUrl);
  console.log('--------------------------');

  return { success: true, data: { videoId, url: playableUrl } };
}
