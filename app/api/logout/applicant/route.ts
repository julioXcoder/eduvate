import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  cookies().set("token", "");

  return redirect("/applicant_portal/auth");
}
