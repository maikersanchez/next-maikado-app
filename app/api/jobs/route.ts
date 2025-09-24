import { NextResponse } from "next/server";

const BACKEND_INTERNAL_URL = process.env.BACKEND_INTERNAL_URL; // Must be set in environment

// Self-check to ensure environment variable is set
if (!BACKEND_INTERNAL_URL) {
  console.error(
    "FATAL: BACKEND_INTERNAL_URL is not defined. This is required for the API proxy to function.",
  );
  // We can't process any requests without this.
}

async function handler(request: Request, method: "GET" | "POST") {
  if (!BACKEND_INTERNAL_URL) {
    return NextResponse.json(
      { error: "Server configuration error: Backend URL not set." },
      { status: 500 },
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path") || "/jobs";

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const options: RequestInit = {
      method,
      headers,
    };

    if (method === "POST") {
      const rawBody = await request.text();
      const contentType = request.headers.get("content-type");

      if (rawBody && contentType?.includes("application/json")) {
        try {
          options.body = rawBody; // Forward the raw body
        } catch (error) {
          // If there's an issue (which is less likely now), we remove content type
          delete headers["Content-Type"];
        }
      } else {
        // If no body or not application/json, ensure no body is sent and Content-Type is removed
        delete headers["Content-Type"];
      }
    }

    const backendResponse = await fetch(
      `${BACKEND_INTERNAL_URL}${path}`,
      options,
    );

    if (!backendResponse.ok) {
      const errorBody = await backendResponse.text();

      console.error(`Backend error: ${backendResponse.status} - ${errorBody}`);

      return NextResponse.json(
        { error: `Backend error: ${backendResponse.statusText}` },
        { status: backendResponse.status },
      );
    }

    // Handle potentially empty responses
    const responseText = await backendResponse.text();

    if (!responseText) {
      return NextResponse.json({}, { status: backendResponse.status });
    }
    const data = JSON.parse(responseText);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error(`Proxy ${method} request failed:`, error);

    return NextResponse.json(
      { error: `Failed to process ${method} request to backend` },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  return handler(request, "GET");
}

export async function POST(request: Request) {
  return handler(request, "POST");
}
