import prisma from "@/prisma/db";
import Link from "next/link";
import { mapRomanToYear } from "@/utils/mapRomanToYear";

const getProgramme = async (programmeId: string) => {
  const programme = await prisma.programme.findUnique({
    where: {
      id: programmeId,
    },
  });

  if (!programme) throw new Error("Programme not found.");

  const programmeClasses = await prisma.programmeClass.findMany({
    where: {
      programmeId: programme.id,
    },
  });

  // Map programme classes to years
  const classes = programmeClasses.map((programmeClass) => ({
    id: programmeClass.id,
    name: mapRomanToYear(programmeClass.name),
  }));

  return { id: programme.id, name: programme.name, classes };
};

interface Props {
  params: { departmentId: string; collegeId: string; programmeId: string };
}

const Page = async ({
  params: { departmentId, collegeId, programmeId },
}: Props) => {
  const response = await getProgramme(programmeId);

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-center text-4xl font-semibold">
          {response.name}
        </h1>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-white shadow-md dark:bg-gray-900">
            <h2 className="border-b border-gray-200 px-6 py-4 text-2xl font-semibold dark:border-gray-800">
              Class List
            </h2>
            <div className="p-6">
              <ul className="space-y-4">
                {response.classes.map((programmeClass) => (
                  <li
                    key={programmeClass.id}
                    className="flex items-center justify-between border-b border-gray-200 px-4 py-3 text-lg font-medium dark:border-gray-800"
                  >
                    <Link
                      href={`/management/colleges/${collegeId}/${departmentId}/${programmeId}/${programmeClass.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {programmeClass.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
