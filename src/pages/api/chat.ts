export const prerender = false;

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { GoogleGenAI } from '@google/genai';
import { BIO_CONTEXT } from '../../lib/bio-context';

const MAX_MESSAGES = 20;
const MAX_INPUT_LENGTH = 500;

/** Build the structured data sections from content collections.
 *  Called at request time so it always reflects the latest YAML. */
async function buildDynamicContext(): Promise<string> {
  const [pubs, exps, edus, skills, honors, research] = await Promise.all([
    getCollection('publications'),
    getCollection('experience'),
    getCollection('education'),
    getCollection('skills'),
    getCollection('honors'),
    getCollection('research-interests'),
  ]);

  // ── Publications ──────────────────────────────────────
  const sortedPubs = pubs.sort((a, b) => a.data.sortOrder - b.data.sortOrder);
  const pubLines = sortedPubs.map(p => {
    const d = p.data;
    const cat = d.category === 'under-review' ? '[UNDER REVIEW]'
              : d.category === 'first-author'  ? '[FIRST AUTHOR]'
              : d.category === 'workshop'       ? '[WORKSHOP]'
              : '[CONTRIBUTING]';
    const doi  = d.doi ? ` DOI: ${d.doi}` : '';
    const cite = d.citations ? ` — ${d.citations} citations` : '';
    return `${cat} [${p.id}] "${d.title}" — ${d.authors.replace(/\*\*/g, '')} — ${d.journal} (${d.year})${cite}${doi}`;
  });

  // ── Experience ────────────────────────────────────────
  const sortedExp = exps.sort((a, b) => a.data.sortOrder - b.data.sortOrder);
  const expLines = sortedExp.map(e => {
    const d = e.data;
    const bullets = d.description?.map((l: string) => `   · ${l}`).join('\n') ?? '';
    const projects = d.projects?.map((p: { title: string; period?: string; description: string[] }) =>
      `   Project: ${p.title}${p.period ? ` (${p.period})` : ''}\n${p.description.map((l: string) => `     - ${l}`).join('\n')}`
    ).join('\n') ?? '';
    return `${d.title} @ ${d.organization} (${d.location}) | ${d.period}\n${bullets}${projects}`;
  });

  // ── Education ─────────────────────────────────────────
  const sortedEdu = edus.sort((a, b) => a.data.sortOrder - b.data.sortOrder);
  const eduLines = sortedEdu.map(e => {
    const d = e.data;
    const parts = [`${d.flag ?? ''} ${d.degree} — ${d.institution} (${d.period})`];
    if (d.gpa)    parts.push(`   GPA: ${d.gpa}`);
    if (d.thesis) parts.push(`   Thesis: ${d.thesis}`);
    if (d.award)  parts.push(`   Award: ${d.award}`);
    return parts.join('\n');
  });

  // ── Skills ────────────────────────────────────────────
  const sortedSkills = skills.sort((a, b) => a.data.sortOrder - b.data.sortOrder);
  const skillLines = sortedSkills.map(s => `${s.data.area}: ${s.data.items.join(', ')}`);

  // ── Honors ────────────────────────────────────────────
  const sortedHonors = honors.sort((a, b) => a.data.sortOrder - b.data.sortOrder);
  const honorLines = sortedHonors.map(h => {
    const d = h.data;
    return `- ${d.title} — ${d.issuer ?? ''} (${d.year ?? ''})${d.description ? `: ${d.description}` : ''}`;
  });

  // ── Research interests ────────────────────────────────
  const sortedResearch = research.sort((a, b) => a.data.sortOrder - b.data.sortOrder);
  const researchLines = sortedResearch.map(r => `- ${r.data.label}`);

  return `
== RESEARCH INTERESTS ==
${researchLines.join('\n')}

== EDUCATION ==
${eduLines.join('\n\n')}

== EXPERIENCE ==
${expLines.join('\n\n')}

== PUBLICATIONS ==
${pubLines.join('\n')}

== TECHNICAL SKILLS ==
${skillLines.join('\n')}

== HONORS & AWARDS ==
${honorLines.join('\n')}
`;
}

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Chat is temporarily unavailable.' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: { messages?: unknown[] };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const rawMessages = body.messages;
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return new Response(JSON.stringify({ error: 'Messages array is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const messages: { role: 'user' | 'assistant'; content: string }[] = [];
  for (const msg of rawMessages.slice(-MAX_MESSAGES)) {
    if (
      typeof msg === 'object' &&
      msg !== null &&
      'role' in msg &&
      'content' in msg &&
      (msg.role === 'user' || msg.role === 'assistant') &&
      typeof msg.content === 'string'
    ) {
      messages.push({
        role: msg.role,
        content: (msg.content as string).slice(0, MAX_INPUT_LENGTH),
      });
    }
  }

  if (messages.length === 0 || messages[messages.length - 1]?.role !== 'user') {
    return new Response(JSON.stringify({ error: 'Last message must be from user.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const [ai, dynamicContext] = await Promise.all([
      Promise.resolve(new GoogleGenAI({ apiKey })),
      buildDynamicContext(),
    ]);

    const systemInstruction = BIO_CONTEXT + dynamicContext;

    const contents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-preview',
      contents,
      config: {
        systemInstruction,
        maxOutputTokens: 512,
      },
    });

    const text = response.text ?? '';
    return new Response(JSON.stringify({ reply: text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Gemini API error:', err);
    return new Response(JSON.stringify({ error: 'Failed to get a response. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
