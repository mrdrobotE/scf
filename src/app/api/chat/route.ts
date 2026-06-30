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

    const apiKey = process.env.GOOGLE_AI_API_KEY;
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          id: `msgs_${Date.now()}`,
          role: 'assistant',
          content: 'API key not configured. Please add GOOGLE_AI_API_KEY to your environment variables.',
          parts: [{ type: 'text', text: 'API key not configured. Please add GOOGLE_AI_API_KEY to your environment variables.' }]
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Build the system prompt with strict SCF-only rules
    const systemPrompt = `
      You are an expert documentation assistant for SCF AI (Smart Credit Financing AI).
      
      YOUR ONLY PURPOSE IS TO ANSWER QUESTIONS ABOUT SCF AI.
      
      CONTEXT (ONLY use this information):
      ${SCF_KNOWLEDGE}
      
      CRITICAL RULES - YOU MUST FOLLOW THESE EXACTLY:
      
      1. ONLY answer questions about SCF AI
      2. If someone asks about ANYTHING other than SCF AI, respond with this exact message:
         "I am an SCF AI assistant and only answer questions about SCF AI. Please ask me about our products, features, pricing, or how we can help your business."
      
      3. NEVER answer questions about:
         - General AI
         - Other companies or products
         - Personal advice
         - Current events or news
         - Programming (unless it's about SCF AI API)
         - Anything not directly related to SCF AI
      
      4. For SCF AI questions:
         - ONLY use information from the context provided
         - If information is not in the context, say: "I don't have that information in my knowledge base. Please contact our team at info@scf-ai.com or call 0988886692 for more details."
         - Be helpful, friendly, and professional
         - For Ethiopian-specific questions, highlight the Ethiopian market features
         - Format responses clearly with bullet points where appropriate
      
      5. ALWAYS mention that you're an SCF AI assistant in your responses
      
      6. If someone asks about the founder Daniel Destaw or contact info, provide accurate details from the context
      
      User Question: ${userMessage.content}
      
      Remember: ONLY answer if the question is about SCF AI. Otherwise, redirect politely.
    `;

    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': apiKey,
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

    const data = await response.json();
    
    if (!response.ok) {
      console.error('API Error:', data);
      
      return new Response(
        JSON.stringify({
          id: `msgs_${Date.now()}`,
          role: 'assistant',
          content: `I am an SCF AI assistant. I'm having trouble connecting to my knowledge base right now. Please try again in a moment. For immediate assistance, you can contact our founder Daniel Destaw at 0988886692 or email info@scf-ai.com.`,
          parts: [{ type: 'text', text: `I am an SCF AI assistant. I'm having trouble connecting to my knowledge base right now. Please try again in a moment. For immediate assistance, you can contact our founder Daniel Destaw at 0988886692 or email info@scf-ai.com.` }]
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, but I could not generate a response based on my knowledge base. Please contact our team at info@scf-ai.com or call 0988886692 for assistance.';

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
        content: 'I am an SCF AI assistant. I encountered an error while processing your request. Please try again. For immediate assistance, contact Daniel Destaw at 0988886692 or email info@scf.et.',
        parts: [{ type: 'text', text: 'I am an SCF AI assistant. I encountered an error while processing your request. Please try again. For immediate assistance, contact Daniel Destaw at 0988886692 or email info@scf-ai.com.' }]
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}