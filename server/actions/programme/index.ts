"use server";

import prisma from "@/prisma/db";
import { Programme } from "@/types/programme";
import { revalidatePath } from "next/cache";
import { mapRomanToYear } from "@/utils/mapRomanToYear";

export const addProgramme = async (
  programme: Programme,
  departmentId: string,
  collegeId: string,
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
        programmeCode: newProgramme.code,
      },
    });
  }

  revalidatePath(`/management/colleges/${collegeId}/${departmentId}`);
};

export const getProgrammeName = async (programmeCode: string) => {
  const programme = await prisma.programme.findUnique({
    where: {
      code: programmeCode,
    },
  });

  if (!programme) return "Not Found";

  return programme.name;
};

export const getProgrammeClassName = async (programmeClassId: string) => {
  const programmeClass = await prisma.programmeClass.findUnique({
    where: {
      id: programmeClassId,
    },
  });

  if (!programmeClass) return "Not Found";

  return mapRomanToYear(programmeClass.name);
};
