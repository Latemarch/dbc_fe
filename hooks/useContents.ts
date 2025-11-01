"use client";

import { useQuery } from "@tanstack/react-query";

export interface PostSummary {
  title: string;
  id: string;
}

export interface PostDetail {
  title: string;
  body: string;
  id: string;
  author?: string;
  category?: string;
  createdAt?: number;
  description?: string;
  tags?: string[];
}

export interface ContentsResponse {
  posts: {
    posts_list: { [key: string]: PostSummary };
  } & { [key: string]: PostDetail | { [key: string]: PostSummary } };
  projects: { [key: string]: { [key: string]: string } };
  resume: string;
}

async function fetchContents(): Promise<ContentsResponse> {
  const response = await fetch("/api/contents");
  if (!response.ok) {
    throw new Error("Failed to fetch contents");
  }
  return response.json();
}

export function useContentsData() {
  return useQuery<ContentsResponse>({
    queryKey: ["contents"],
    queryFn: fetchContents,
  });
}
