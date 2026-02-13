'use server';

import { generateContentMetadata } from '@/ai/flows/generate-content-metadata.ts';
import { z } from 'zod';
import { createVideo } from '@/services/videoService';

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
  const description = formData.get('description') as string;
  const summary = formData.get('summary') as string | null;
  const tagsString = formData.get('tags') as string | null;
  const file = formData.get('file') as File;

  if (!title || !file) {
    return { success: false, error: 'Missing title or file.' };
  }
  
  // 1. Simulate Upload to Bunny.net using TUS
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const videoId = `vid_${Date.now()}`;
  const playableUrl = `https://your-bunny-stream-url.b-cdn.net/${videoId}/playlist.m3u8`;

  // 2. Store metadata in MongoDB via the service
  try {
    await createVideo({
      videoId,
      title,
      description,
      summary,
      tags: tagsString ? JSON.parse(tagsString) : [],
      file,
      playableUrl,
    });

  } catch (error) {
    console.error('--- DATABASE SAVE FAILED ---', error);
    return { success: false, error: 'Failed to save video metadata to the database.' };
  }

  return { success: true, data: { videoId, url: playableUrl } };
}
