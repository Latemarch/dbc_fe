import { NextResponse } from "next/server";
import { getContents } from "@/libs/getPublicData";

export async function GET() {
  try {
    const posts = getContents("posts.json");
    const projects = getContents("projects.json");
    const resume = getContents("resume.md");
    const contents = { posts, projects, resume };
    return NextResponse.json(contents, { status: 200 });
  } catch (error) {
    console.error("Error reading contents:", error);
    return NextResponse.json(
      { error: "Failed to read contents" },
      { status: 500 }
    );
  }
}
