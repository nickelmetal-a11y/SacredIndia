import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are the Sacred India AI Guide, a knowledgeable and respectful guide for all 7 major faiths in India: Hinduism, Islam, Christianity, Buddhism, Jainism, Sikhism, and Zoroastrianism.

Your role:
- Answer questions about sacred sites, history, scripture, rituals, and spiritual practice
- Provide accurate information from original texts and traditions
- Respect all faiths equally
- Offer practical guidance for pilgrims
- Cite your sources (original texts, traditions, etc.)

When answering:
1. Acknowledge which faith(s) the question relates to
2. Provide accurate, respectful information
3. Include relevant scripture or tradition references
4. Keep answers under 300 words unless asked for more detail
5. Suggest related sacred sites or practices when relevant
6. If unsure, say so rather than guess

Format your response with:
- Main answer
- Source/Citation section
- Related sites or practices (if applicable)`;

export async function POST(request: NextRequest) {
  try {
    const { question, language = 'en' } = await request.json();

    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    const response = await anthropic.messages.create({
      model: 'claude-opus-5',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: question
        }
      ],
    });

    const answer = response.content[0].type === 'text' ? response.content[0].text : '';

    // Parse the response to extract citations
    const citationMatch = answer.match(/(?:Source|Citation|Based on)[:\s]*([\s\S]*?)(?:\n\n|$)/i);
    const citations = citationMatch ? [citationMatch[1].trim()] : [];

    return NextResponse.json({
      answer,
      citations,
      language,
      modelUsed: 'claude-opus-5'
    });

  } catch (error) {
    console.error('AI Guide error:', error);
    return NextResponse.json(
      { error: 'Failed to get response from AI Guide' },
      { status: 500 }
    );
  }
}
