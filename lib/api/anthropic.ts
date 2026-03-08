import type { BriefingRequest } from "@/types";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

export async function generateBriefing(request: BriefingRequest) {
  if (!ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY is not configured");
  }

  // TODO: Implement Claude API call for briefing generation
  return {
    content: "",
    model: "claude-sonnet-4-6",
    usage: { input_tokens: 0, output_tokens: 0 },
  };
}
