"use server";

import prisma from "@/prisma/db";
import { Programme } from "@/types/programme";

export const addProgramme = async (
  programme: Programme,
  departmentId: string,
) => {
  const { name, code, duration, levelName, status, tuitionFee } = programme;
  const allProgrammeClasses = ["I", "II", "III", "IV"] as const;
  const programmeClasses = allProgrammeClasses.slice(0, duration);

  const department = await prisma.department.findUnique({
    where: {
      id: departmentId,
    },
  });

  if (!department) throw new Error("Department not found");

  const newProgramme = await prisma.programme.create({
    data: {
      departmentId: department.id,
      name,
      code,
      duration,
      levelName,
      tuitionFee,
      status,
    },
  });

  for (const name of programmeClasses) {
    await prisma.programmeClass.create({
      data: {
        name: name,
        programmeId: newProgramme.id,
      },
    });
  }
};
