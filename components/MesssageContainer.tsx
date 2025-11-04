"use client";

export default function MesssageContainer({
  messages,
}: {
  messages: { role: "user" | "assistant"; message: string }[];
}) {
  return (
    <div className="flex flex-col gap-2">
      {messages.map((message) => (
        <div
          key={message.message}
          className={`${message.role === "user" ? "self-end" : "self-start"}`}
        >
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {message.message}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
