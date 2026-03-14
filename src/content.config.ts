import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const publications = defineCollection({
  loader: file('src/content/publications/publications.yaml'),
  schema: z.object({
    id: z.string(),
    category: z.enum(['under-review', 'first-author', 'contributing', 'corrigendum', 'workshop']),
    title: z.string(),
    authors: z.string(),
    journal: z.string(),
    year: z.number(),
    doi: z.string().optional(),
    citations: z.number().optional().default(0),
    topic: z.string().optional(),
    sortOrder: z.number(),
  }),
});

const experience = defineCollection({
  loader: file('src/content/experience/experience.yaml'),
  schema: z.object({
    id: z.string(),
    type: z.enum(['research', 'industry']),
    title: z.string(),
    organization: z.string(),
    location: z.string(),
    period: z.string(),
    description: z.array(z.string()).optional().default([]),
    output: z.string().optional(),
    projects: z.array(z.object({
      title: z.string(),
      period: z.string().optional(),
      description: z.array(z.string()),
      output: z.string().optional(),
    })).optional(),
    sortOrder: z.number(),
  }),
});

export const collections = { publications, experience };
