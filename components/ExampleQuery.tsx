"use client";

import { useQuery } from "@tanstack/react-query";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  return response.json();
}

export default function ExampleQuery() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold mb-4">React Query 예시</h2>
      <ul className="space-y-2">
        {data?.map((todo) => (
          <li
            key={todo.id}
            className={`p-2 rounded ${
              todo.completed
                ? "bg-green-100 dark:bg-green-900"
                : "bg-white dark:bg-gray-700"
            }`}
          >
            <span className={todo.completed ? "line-through" : ""}>
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

