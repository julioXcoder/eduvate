import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();

    const image = body.get("image");
    const firstName = body.get("firstName");
    const lastName = body.get("lastName");

    console.log("Server image", image);
    console.log("First name", firstName);
    console.log("Last name", lastName);

    return NextResponse.json({}, { status: 200 });
  } catch (ex) {
    // TODO: Log the console.error();

    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 },
    );
  }
}
