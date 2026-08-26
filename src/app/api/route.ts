import { NextResponse } from "next/server";

// Required for `output: "export"` (GitHub Pages). Keeps the same JSON
// response in dev/server mode; the route is simply prerendered to a
// static file in the exported site.
export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({ message: "Hello, world!" });
}
