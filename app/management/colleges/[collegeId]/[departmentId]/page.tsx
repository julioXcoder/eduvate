import prisma from "@/prisma/db";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";
import NewProgramme from "./newProgramme";
import { mapRomanToYear } from "@/utils/mapRomanToYear";

type Programme = {
  id: string;
  name: string;
  classes: {
    id: string;
    name: string;
  }[];
};

const getDepartment = async (departmentId: string) => {
  const department = await prisma.department.findUnique({
    where: {
      id: departmentId,
    },
  });

  if (!department) throw new Error("Department not found.");

  const data: Programme[] = [];

  const programmes = await prisma.programme.findMany({
    where: {
      departmentId: department.id,
    },
  });

  for (const programme of programmes) {
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

    data.push({
      id: programme.id,
      name: programme.name,
      classes,
    });
  }

  return { department, data };
};

interface Props {
  params: { departmentId: string; collegeId: string };
}

const Page = async ({ params: { departmentId, collegeId } }: Props) => {
  const response = await getDepartment(departmentId);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-semibold">
        {response.department.name}
      </h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-lg bg-white shadow-md dark:bg-gray-900">
          <h2 className="border-b border-gray-200 px-6 py-4 text-2xl font-semibold dark:border-gray-800">
            Programme List
          </h2>
          <div className="p-6">
            <ul className="space-y-4">
              {response.data.map((programme) => (
                <li
                  key={programme.id}
                  className="flex items-center justify-between border-b border-gray-200 px-4 py-3 text-lg font-medium dark:border-gray-800"
                >
                  <Link
                    href={`/management/colleges/${collegeId}/${departmentId}/${programme.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {programme.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* <div className="p-6">
            <ul className="space-y-4">
              {response.data.map((programme) => (
                <li key={programme.id} className="py-2 font-medium">
                  <Link
                    href={`/management/colleges/${collegeId}/${departmentId}/${programme.id}`}
                    className="block text-lg font-semibold text-blue-500 hover:text-blue-600 hover:underline"
                  >
                    {programme.name}
                  </Link>
                  <ul className="flex flex-col">
                    {programme.classes.map((programmeClass) => (
                      <li
                        className="flex items-center justify-between gap-x-2 px-4 py-1 text-sm font-light"
                        key={programmeClass.id}
                      >
                        <Link
                          href={`/management/colleges/${collegeId}/${departmentId}/${programmeClass.id}`}
                          className="text-blue-500 hover:underline"
                        >
                          {programmeClass.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div> */}
        </div>
        <div className="rounded-lg bg-white shadow-md dark:bg-gray-900">
          <h2 className="border-b border-gray-200 px-6 py-4 text-2xl font-semibold dark:border-gray-800">
            Add New Programme
          </h2>
          <div className="p-4">
            <NewProgramme />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
