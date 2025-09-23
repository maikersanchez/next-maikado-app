import { NextResponse } from "next/server";

const BACKEND_INTERNAL_URL = process.env.BACKEND_INTERNAL_URL; // Must be set in environment

// Self-check to ensure environment variable is set
if (!BACKEND_INTERNAL_URL) {
  console.error("FATAL: BACKEND_INTERNAL_URL is not defined. This is required for the API proxy to function.");
  // We can't process any requests without this.
}

async function handler(request: Request, method: 'GET' | 'POST') {
  if (!BACKEND_INTERNAL_URL) {
    return NextResponse.json(
      { error: "Server configuration error: Backend URL not set." },
      { status: 500 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path') || '/jobs';

    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (method === 'POST') {
      options.body = JSON.stringify(await request.json());
    }

    const backendResponse = await fetch(`${BACKEND_INTERNAL_URL}${path}`, options);

    if (!backendResponse.ok) {
      const errorBody = await backendResponse.text();
      console.error(`Backend error: ${backendResponse.status} - ${errorBody}`);
      return NextResponse.json(
        { error: `Backend error: ${backendResponse.statusText}` },
        { status: backendResponse.status }
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
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  return handler(request, 'GET');
}

export async function POST(request: Request) {
  return handler(request, 'POST');
}
