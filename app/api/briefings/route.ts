import { NextResponse } from "next/server";

export async function GET() {
  // TODO: Fetch briefings from database
  return NextResponse.json({ briefings: [] });
}

export async function POST(request: Request) {
  // TODO: Generate a new briefing via Claude API
  const body = await request.json();
  return NextResponse.json({ status: "created", data: body });
}
