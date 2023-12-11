"use server";

import prisma from "@/prisma/db";

export const getDepartmentName = async (departmentId: string) => {
  const department = await prisma.department.findUnique({
    where: {
      id: departmentId,
    },
  });

  if (!department) return "Not Found";

  return department.name;
};
