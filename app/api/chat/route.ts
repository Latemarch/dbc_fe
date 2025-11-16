import { NextRequest } from "next/server";

interface CreateMessageInput {
  question: string;
  thread_id: string;
}

export async function POST(request: NextRequest) {
  try {
    const BE_SERVER_URL = process.env.BE_SERVER_URL;

    if (!BE_SERVER_URL) {
      return new Response(
        JSON.stringify({ error: "BE_SERVER_URL is not configured" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const body: CreateMessageInput = await request.json();

    // 요청 본문 검증
    if (!body.question || !body.thread_id) {
      return new Response(
        JSON.stringify({
          detail: [
            {
              loc: ["body", !body.question ? "question" : "thread_id"],
              msg: "Field required",
              type: "value_error.missing",
            },
          ],
        }),
        {
          status: 422,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const backendResponse = await fetch(
      `${BE_SERVER_URL}/conversations/message-stream`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: body.question,
          thread_id: body.thread_id,
        }),
      }
    );
    // console.log("backendResponse", backendResponse);
    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: errorText || "Backend request failed" };
      }
      return new Response(JSON.stringify(errorData), {
        status: backendResponse.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 스트림 응답을 클라이언트로 전달
    // 백엔드의 ReadableStream을 그대로 클라이언트로 전달
    // 브라우저는 fetch API의 response.body를 ReadableStream으로 받아 처리 가능
    return new Response(backendResponse.body, {
      headers: {
        "Content-Type":
          backendResponse.headers.get("Content-Type") || "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    // console.error("Error in chat API route:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
