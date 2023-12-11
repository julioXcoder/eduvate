import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import { schema, Body } from "./schema";

export async function GET(req: NextRequest) {
  try {
    const universities = await prisma.university.findMany();
    return NextResponse.json(universities, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: Body = await req.json();

    const validation = schema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error, { status: 400 });

    const { name } = body;

    const newUniversity = await prisma.university.create({
      data: {
        name,
      },
    });

    return NextResponse.json(newUniversity, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
