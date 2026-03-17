export const prerender = false;

import type { APIRoute } from 'astro';
import { GoogleGenAI } from '@google/genai';
import { BIO_CONTEXT } from '../../lib/bio-context';

const MAX_MESSAGES = 20;
const MAX_INPUT_LENGTH = 500;

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

  // Validate and sanitize messages
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
    const ai = new GoogleGenAI({ apiKey });

    // Gemini uses 'model' instead of 'assistant' for the AI role
    const contents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-preview',
      contents,
      config: {
        systemInstruction: BIO_CONTEXT,
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
