import { NextResponse } from "next/server";

export async function GET() {
  // TODO: Fetch partners from database
  return NextResponse.json({ partners: [] });
}
