import prisma from "@/prisma/db";
import Link from "next/link";
import { mapRomanToYear } from "@/utils/mapRomanToYear";

const getProgrammeData = async (
  programmeCode: string,
  programmeClassId: string,
) => {
  const programme = await prisma.programme.findUnique({
    where: {
      code: programmeCode,
    },
  });

  const programmeClass = await prisma.programmeClass.findUnique({
    where: {
      id: programmeClassId,
    },
  });

  if (!programme || !programmeClass) throw new Error("Programme not found.");

  return {
    programmeName: programme.name,
    programmeClassName: mapRomanToYear(programmeClass.name),
  };
};

interface Props {
  params: {
    departmentId: string;
    collegeId: string;
    programmeCode: string;
    programmeClassId: string;
  };
}

const Page = async ({
  params: { departmentId, collegeId, programmeCode, programmeClassId },
}: Props) => {
  const response = await getProgrammeData(programmeCode, programmeClassId);

  return (
    <div>
      <div>
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-8 text-center text-4xl font-semibold">
            {response.programmeName} - {response.programmeClassName}
          </h1>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-white shadow-md dark:bg-gray-900">
              <h2 className="border-b border-gray-200 px-6 py-4 text-2xl font-semibold dark:border-gray-800">
                Course List
              </h2>
              {/* <div className="p-6">
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
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
