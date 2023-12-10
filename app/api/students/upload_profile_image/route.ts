import { NextRequest, NextResponse } from "next/server";
import { utapi } from "@/server/uploadthing";

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();

    const image = body.get("image");

    const response = await utapi.uploadFiles(image);

    return NextResponse.json(response, { status: 201 });
  } catch (ex) {
    // TODO: Log the console.error();

    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 },
    );
  }
}
