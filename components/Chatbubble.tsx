"use client";

export default function Chatbubble({
  message,
  role,
}: {
  message: string;
  role: "user" | "assistant";
}) {
  return (
    <div className="rounded-lg p-2">
      <div className="text-md font-medium">{message}</div>
    </div>
  );
}
