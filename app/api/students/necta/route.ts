import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import z from "zod";

const schema = z.object({
  firstName: z.string().min(1).max(30),
  lastName: z.string().min(1).max(30),
  formIVIndex: z.string().min(1).max(30),
});

type StudentData = z.infer<typeof schema>;

export async function POST(req: NextRequest) {
  try {
    const body: StudentData = await req.json();

    const validation = schema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.message, { status: 400 });

    const { firstName, lastName, formIVIndex } = body;

    const newStudentData = await prisma.oLevelResult.create({
      data: {
        firstName,
        lastName,
        formIVIndex,
      },
    });

    await prisma.oLevelResult.count();

    return NextResponse.json(newStudentData, { status: 201 });
  } catch (ex) {
    // TODO: Log the console.error();

    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 },
    );
  }
}
