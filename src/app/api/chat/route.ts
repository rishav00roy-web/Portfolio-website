import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// The client sends AI SDK UIMessages (content lives in `parts`); the model
// expects CoreMessages (a flat `content` string).
type UIRole = "system" | "user" | "assistant";
type UIPart = { type: string; text?: string };
type UIMessage = { role: UIRole; content?: string; parts?: UIPart[] };

const isUIRole = (r: unknown): r is UIRole =>
  r === "system" || r === "user" || r === "assistant";

export async function POST(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is not defined in environment variables!");
      return new Response(
        JSON.stringify({ 
          error: "GROQ_API_KEY is missing. Please add it to your Vercel Project Settings > Environment Variables, then redeploy." 
        }), 
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const { messages }: { messages: UIMessage[] } = await req.json();

    // Map UIMessages (which use 'parts') to CoreMessages (which use 'content' or array content)
    // Roles arrive over the wire, so drop anything outside the union the
    // model accepts rather than trusting the request body.
    const coreMessages = messages.filter((m) => isUIRole(m.role)).map((m: UIMessage) => {
      let content = m.content;
      if (m.parts && Array.isArray(m.parts)) {
        content = m.parts.map((p: UIPart) => (p.type === 'text' ? p.text : '')).join('');
      }
      return {
        role: m.role,
        content: content || '',
      };
    });

    const result = streamText({
      // Groq retired the Llama 3.3 endpoint; this key has no Llama access at all.
      model: groq('openai/gpt-oss-120b'),
      maxRetries: 5, // Automatically retry requests on rate limits (429) or transient API failures
      system: `You are Psunk, a casual, friendly, and extremely concise assistant for Rishav's portfolio website.
      CRITICAL RULES:
      1. DO NOT sound like an AI. Use a natural, conversational, and confident tone.
      2. Keep responses EXTREMELY short, usually just 1 to 3 short sentences.
      2b. Never use em dashes. Use commas, colons or full stops instead. 
      3. Never write long paragraphs. Never list his skills unless explicitly asked.
      4. If someone asks if he can build a site or do a job, give a punchy "Yes, absolutely!" style answer and briefly mention a relevant project.
      
      Rishav's Info:
      - Skills: Next.js, React, Tailwind CSS, Supabase, PostgreSQL, AI-Orchestrated Development, SEO.
      - Background: Former Founder/COO and HR/Admin professional with 6+ years of operational experience. He builds software that solves real business problems, not just for practice.
      - Projects: 
        * Tea Country Holidays (Travel platform with custom CMS & PDF generation)
        * IQ Iron Fitness (Gym CRM with billing)
        * Clash Bazar (Marketplace with escrow)
      
      If you don't know something, just say "I'm not sure about that, but you should reach out to him directly!"`,
      messages: coreMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: "An error occurred while processing your request." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
