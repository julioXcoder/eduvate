import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();

    const image = body.get("image");

    console.log("Server image", image);

    return NextResponse.json({}, { status: 200 });
  } catch (ex) {
    // TODO: Log the console.error();

    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 },
    );
  }
}
