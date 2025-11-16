"use client";

export default function Chatbubble({
  message,
  role,
}: {
  message: string;
  role: "user" | "assistant";
}) {
  return (
    <div className={`rounded-lg p-2 ${role === "user" ? "bg-chat" : ""}`}>
      {message ? (
        <div className="text-md font-medium">{message}</div>
      ) : (
        <span className="relative flex size-3 mt-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex size-3 rounded-full bg-white"></span>
        </span>
      )}
    </div>
  );
}
