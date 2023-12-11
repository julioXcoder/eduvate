"use server";

import prisma from "@/prisma/db";

export const getCollegeName = async (collegeId: string) => {
  const college = await prisma.college.findUnique({
    where: {
      id: collegeId,
    },
  });

  if (!college) return "Not Found";

  return college.name;
};
