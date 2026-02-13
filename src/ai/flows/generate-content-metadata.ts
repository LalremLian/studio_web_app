'use server';
/**
 * @fileOverview A Genkit flow for automatically generating relevant tags and a concise summary for video content.
 *
 * - generateContentMetadata - A function that handles the content metadata generation process.
 * - GenerateContentMetadataInput - The input type for the generateContentMetadata function.
 * - GenerateContentMetadataOutput - The return type for the generateContentMetadata function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateContentMetadataInputSchema = z.object({
  title: z.string().describe('The title of the video content.'),
  description: z.string().describe('The description of the video content.'),
});
export type GenerateContentMetadataInput = z.infer<typeof GenerateContentMetadataInputSchema>;

const GenerateContentMetadataOutputSchema = z.object({
  tags: z
    .array(z.string())
    .describe('A list of relevant tags for the video content, comma-separated.'),
  summary: z.string().describe('A concise summary of the video content.'),
});
export type GenerateContentMetadataOutput = z.infer<typeof GenerateContentMetadataOutputSchema>;

export async function generateContentMetadata(
  input: GenerateContentMetadataInput
): Promise<GenerateContentMetadataOutput> {
  return generateContentMetadataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateContentMetadataPrompt',
  input: {schema: GenerateContentMetadataInputSchema},
  output: {schema: GenerateContentMetadataOutputSchema},
  prompt: `You are an AI assistant tasked with generating relevant tags and a concise summary for video content.

Based on the provided title and description, generate a list of tags (comma-separated strings) and a short summary.

Title: {{{title}}}
Description: {{{description}}}

Output in JSON format with 'tags' as an array of strings and 'summary' as a string.`,
});

const generateContentMetadataFlow = ai.defineFlow(
  {
    name: 'generateContentMetadataFlow',
    inputSchema: GenerateContentMetadataInputSchema,
    outputSchema: GenerateContentMetadataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
