"use client";

import { useContentsData } from "@/hooks/useContents";

export default function SideBar() {
  const { data: contents } = useContentsData();

  if (!contents) {
    return <div>Loading...</div>;
  }
  const { posts, projects } = contents;
  console.log(projects);

  return (
    <div className="flex flex-col h-full p-4 bg-sidebar">
      <div>hh</div>
      <h2 className="font-bold text-lg my-2">Posts</h2>
      <p className="flex flex-col gap-2">
        {Object.entries(posts.posts_list).map(([key, value]) => (
          <div
            key={key}
            className="text-sm text-gray-300 hover:text-white cursor-pointer"
          >
            {value.title}
          </div>
        ))}
      </p>
      <div className="border-t border-gray-500 my-2" />
      <h2 className="font-bold text-lg my-2">Projects</h2>
      <p className="flex flex-col gap-2">
        {Object.entries(projects).map(([key, value]) => (
          <div
            key={key}
            className="text-sm text-gray-300 hover:text-white cursor-pointer"
          >
            {value.title}
          </div>
        ))}
      </p>
    </div>
  );
}
