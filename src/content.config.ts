import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'zod';

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

const honors = defineCollection({
  loader: file('src/content/honors/honors.yaml'),
  schema: z.object({
    id: z.string(),
    award: z.string(),
    date: z.string(),
    org: z.string(),
  }),
});

const education = defineCollection({
  loader: file('src/content/education/education.yaml'),
  schema: z.object({
    id: z.string(),
    flag: z.string(),
    degree: z.string(),
    institution: z.string(),
    abbrev: z.string(),
    location: z.string(),
    period: z.string(),
    gpa: z.string().optional(),
    thesis: z.string().optional(),
    note: z.string().optional(),
    award: z.string().optional(),
    current: z.boolean().optional().default(false),
    sortOrder: z.number(),
  }),
});

const skills = defineCollection({
  loader: file('src/content/skills/skills.yaml'),
  schema: z.object({
    id: z.string(),
    area: z.string(),
    items: z.array(z.string()),
    sortOrder: z.number(),
  }),
});

const peerReview = defineCollection({
  loader: file('src/content/peer-review/peer-review.yaml'),
  schema: z.object({
    id: z.string(),
    journal: z.string(),
    count: z.number(),
    sortOrder: z.number(),
  }),
});

const certificates = defineCollection({
  loader: file('src/content/certificates/certificates.yaml'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    issuer: z.string(),
    date: z.string(),
    url: z.string().optional(),
  }),
});

const researchInterests = defineCollection({
  loader: file('src/content/research/research.yaml'),
  schema: z.object({
    id: z.string(),
    label: z.string(),
    sortOrder: z.number(),
  }),
});

const social = defineCollection({
  loader: file('src/content/social/social.yaml'),
  schema: z.object({
    id: z.string(),
    label: z.string(),
    href: z.string(),
    icon: z.string(),
  }),
});

const pubGroups = defineCollection({
  loader: file('src/content/pub-groups/pub-groups.yaml'),
  schema: z.object({
    id: z.string(),
    key: z.enum(['first-author', 'contributing', 'workshop', 'under-review']),
    label: z.string(),
    sortOrder: z.number(),
  }),
});

const news = defineCollection({
  loader: file('src/content/news/news.yaml'),
  schema: z.object({
    id: z.string(),
    date: z.string(),
    tag: z.enum(['paper', 'position', 'award', 'talk', 'misc']),
    text: z.string(),
    link: z.string().optional(),
  }),
});

const hero = defineCollection({
  loader: file('src/content/hero/hero.yaml'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    flag: z.string(),
    role: z.string(),
    institution: z.string(),
    tagline: z.string(),
    bio: z.string(),
    status: z.string().optional().default(''),
  }),
});

const researchIntro = defineCollection({
  loader: file('src/content/research-intro/research-intro.yaml'),
  schema: z.object({
    id: z.string(),
    paragraphs: z.array(z.object({
      text: z.string(),
      muted: z.boolean().default(false),
    })),
  }),
});

const quotes = defineCollection({
  loader: file('src/content/quotes/quotes.yaml'),
  schema: z.object({
    id: z.string(),
    text: z.string(),
    attr: z.string(),
  }),
});

export const collections = {
  quotes,
  publications,
  experience,
  honors,
  education,
  skills,
  'peer-review': peerReview,
  certificates,
  news,
  social,
  'pub-groups': pubGroups,
  'research-interests': researchInterests,
  hero,
  'research-intro': researchIntro,
};
