import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/prisma/db";
import z from "zod";

const schema = z.object({
  code: z.string(),
  name: z.string(),
  shortHand: z.string(),
});

type Body = z.infer<typeof schema>;

export async function POST(req: NextRequest) {
  try {
    const body: Body = await req.json();

    const validate = schema.safeParse(body);

    if (!validate.success)
      return NextResponse.json(validate.error, { status: 400 });

    const { shortHand, name, code } = body;

    const newCsee = await prisma.csee.create({
      data: {
        shortHand,
        name,
        code,
      },
    });

    return NextResponse.json(newCsee);
  } catch (error) {
    return NextResponse.json(
      "Unexpected error has occurred while processing you request.",
      { status: 500 },
    );
  }
}
