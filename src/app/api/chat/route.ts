import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import { assistantSystemPrompt, type ChatSite } from "@/lib/assistantKnowledge";

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

    const { messages, site }: { messages: UIMessage[]; site?: unknown } = await req.json();
    // Which page the chat is on; anything unexpected falls back to the portfolio.
    const chatSite: ChatSite = site === "atelier" ? "atelier" : "portfolio";

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
      // Built from the same data the pages render (src/lib/assistantKnowledge.ts).
      system: assistantSystemPrompt(chatSite),
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
