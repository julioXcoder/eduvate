import prisma from "@/prisma/db";
import Link from "next/link";
import { mapRomanToYear } from "@/utils/mapRomanToYear";

const getProgramme = async (programmeCode: string) => {
  const programme = await prisma.programme.findUnique({
    where: {
      code: programmeCode,
    },
  });

  if (!programme) throw new Error("Programme not found.");

  const programmeClasses = await prisma.programmeClass.findMany({
    where: {
      programmeCode: programme.code,
    },
  });

  // Map programme classes to years
  const classes = programmeClasses.map((programmeClass) => ({
    id: programmeClass.id,
    name: mapRomanToYear(programmeClass.name),
  }));

  return { code: programme.code, name: programme.name, classes };
};

interface Props {
  params: { departmentId: string; collegeId: string; programmeCode: string };
}

const Page = async ({
  params: { departmentId, collegeId, programmeCode },
}: Props) => {
  const response = await getProgramme(programmeCode);

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
                      href={`/management/colleges/${collegeId}/${departmentId}/${programmeCode}/${programmeClass.id}`}
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
