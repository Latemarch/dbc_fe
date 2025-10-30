"use client";

import { useQuery } from "@tanstack/react-query";

interface ContentsResponse {
  posts: {
    [key: string]: {
      [key: string]: { title: string; body: string; id: string };
    };
  };
  projects: { [key: string]: { [key: string]: string } };
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
