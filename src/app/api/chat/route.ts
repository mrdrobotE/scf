import { getMostRecentUserMessage } from '@/lib/utils';
import { SCF_KNOWLEDGE } from '@/lib/scf-knowledge';

export const maxDuration = 50;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const userMessage = getMostRecentUserMessage(messages);

    if (!userMessage) {
      return new Response(
        JSON.stringify({ error: 'No user message found' }),
        { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const groqApiKey = process.env.GROQ_API_KEY;
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    const cerebrasKey = process.env.CEREBRAS_API_KEY;
    const googleApiKey = process.env.GOOGLE_AI_API_KEY;
    
    const systemPrompt = `
      You are a concise, helpful SCF AI assistant. Follow these rules strictly:

      RULES:
      1. ONLY answer questions about SCF AI. For anything else, say: "I only answer questions about SCF AI."
      2. Be direct and concise - no lengthy introductions or repetitions
      3. Provide information from the context below, be specific and factual
      4. For unknown information, say: "I don't have that information. Contact info@scf-ai.com or call 0988886692."

      CONTEXT:
      ${SCF_KNOWLEDGE}

      User Question: ${userMessage.content}
      
      Provide a clear, direct answer without repeating the question or adding unnecessary fluff.
    `;

    let data = null;
    let usedProvider = '';

    // 1. Try Groq first (fastest)
    if (groqApiKey) {
      try {
        console.log('Trying Groq API...');
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${groqApiKey}`,
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userMessage.content }
            ],
            temperature: 0.5,
            max_tokens: 512,
          }),
        });

        if (response.ok) {
          data = await response.json();
          usedProvider = 'Groq';
          console.log('Groq API success');
        } else {
          console.log('Groq API failed');
        }
      } catch (error) {
        console.log('Groq API error:', error);
      }
    }

    // 2. Try OpenRouter as first fallback
    if (!data && openRouterKey) {
      try {
        console.log('Trying OpenRouter API...');
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openRouterKey}`,
            'HTTP-Referer': 'https://scf-ai.com',
            'X-Title': 'SCF AI Assistant',
          },
          body: JSON.stringify({
            model: 'meta-llama/llama-3.1-70b-instruct',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userMessage.content }
            ],
            temperature: 0.5,
            max_tokens: 512,
          }),
        });

        if (response.ok) {
          data = await response.json();
          usedProvider = 'OpenRouter';
          console.log('OpenRouter API success');
        } else {
          console.log('OpenRouter API failed');
        }
      } catch (error) {
        console.log('OpenRouter API error:', error);
      }
    }

    // 3. Try Cerebras as second fallback
    if (!data && cerebrasKey) {
      try {
        console.log('Trying Cerebras API...');
        const response = await fetch('https://api.cerebras.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cerebrasKey}`,
          },
          body: JSON.stringify({
            model: 'gemma-4-31b',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userMessage.content }
            ],
            temperature: 0.5,
            max_tokens: 512,
          }),
        });

        if (response.ok) {
          data = await response.json();
          usedProvider = 'Cerebras';
          console.log('Cerebras API success');
        } else {
          console.log('Cerebras API failed');
        }
      } catch (error) {
        console.log('Cerebras API error:', error);
      }
    }

    // 4. Try Google Gemini as last resort
    if (!data && googleApiKey) {
      try {
        console.log('Trying Google Gemini API...');
        const response = await fetch(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-goog-api-key': googleApiKey,
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: systemPrompt
                    }
                  ]
                }
              ]
            }),
          }
        );

        if (response.ok) {
          data = await response.json();
          usedProvider = 'Google Gemini';
          console.log('Google Gemini API success');
        } else {
          console.log('Google Gemini API failed');
        }
      } catch (error) {
        console.log('Google Gemini API error:', error);
      }
    }

    // If all providers failed, return a helpful fallback
    if (!data) {
      console.error('All API providers failed');
      
      const fallbackResponse = `SCF AI is a Smart Credit Financing platform that uses federated learning and explainable AI. 

Key features:
- Federated Learning: Privacy-preserving credit scoring
- Explainable AI: Transparent credit decisions
- AI Credit Scoring API: REST API for instant decisions
- SCF Dashboard: Real-time risk monitoring
- Predictive Analytics: Cash flow and default prediction

For more information, visit https://scf-ai.com or contact info@scf-ai.com.`;
      
      return new Response(
        JSON.stringify({
          id: `msgs_${Date.now()}`,
          role: 'assistant',
          content: fallbackResponse,
          parts: [{ type: 'text', text: fallbackResponse }]
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Extract the response text
    let text = '';
    if (usedProvider === 'Groq' || usedProvider === 'OpenRouter' || usedProvider === 'Cerebras') {
      text = data.choices?.[0]?.message?.content || '';
    } else if (usedProvider === 'Google Gemini') {
      text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    }

    if (!text) {
      return new Response(
        JSON.stringify({
          id: `msgs_${Date.now()}`,
          role: 'assistant',
          content: 'I could not generate a response. Please try again.',
          parts: [{ type: 'text', text: 'I could not generate a response. Please try again.' }]
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        id: `msgs_${Date.now()}`,
        role: 'assistant',
        content: text,
        parts: [{ type: 'text', text: text }]
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error: any) {
    console.error('Chat error:', error);
    return new Response(
      JSON.stringify({
        id: `msgs_${Date.now()}`,
        role: 'assistant',
        content: 'I am an SCF AI assistant. Please try again later.',
        parts: [{ type: 'text', text: 'I am an SCF AI assistant. Please try again later.' }]
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}