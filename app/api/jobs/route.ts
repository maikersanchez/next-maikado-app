import { NextResponse } from "next/server";

const BACKEND_INTERNAL_URL = process.env.BACKEND_INTERNAL_URL || "http://localhost:8000"; // Use an environment variable for flexibility

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path') || '/jobs'; // Default to /jobs if no path is specified

    const backendResponse = await fetch(`${BACKEND_INTERNAL_URL}${path}`);

    if (!backendResponse.ok) {
      const errorBody = await backendResponse.text();
      console.error(`Backend error: ${backendResponse.status} - ${errorBody}`);
      return NextResponse.json(
        { error: `Backend error: ${backendResponse.statusText}` },
        { status: backendResponse.status }
      );
    }

    const data = await backendResponse.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Proxy GET request failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch from backend" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path') || '/jobs'; // Default to /jobs if no path is specified

    const requestBody = await request.json();

    const backendResponse = await fetch(`${BACKEND_INTERNAL_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!backendResponse.ok) {
      const errorBody = await backendResponse.text();
      console.error(`Backend error: ${backendResponse.status} - ${errorBody}`);
      return NextResponse.json(
        { error: `Backend error: ${backendResponse.statusText}` },
        { status: backendResponse.status }
      );
    }

    const data = await backendResponse.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Proxy POST request failed:", error);
    return NextResponse.json(
      { error: "Failed to post to backend" },
      { status: 500 }
    );
  }
}
