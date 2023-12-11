import prisma from "@/prisma/db";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { IoIosArrowRoundBack } from "react-icons/io";
import NewProgramme from "./newProgramme";

const getDepartment = async (departmentId: string) => {
  const department = await prisma.department.findUnique({
    where: {
      id: departmentId,
    },
  });

  if (!department) throw new Error("Department not found.");

  const programmes = await prisma.programme.findMany({
    where: {
      departmentId: department.id,
    },
  });

  return { department, programmes };
};

interface Props {
  params: { departmentId: string; collegeId: string };
}

const Page = async ({ params: { departmentId, collegeId } }: Props) => {
  const data = await getDepartment(departmentId);

  return (
    <div>
      <div className="mx-5">
        <Link
          href={`/management/colleges/${collegeId}`}
          type="button"
          className="inline-flex items-center gap-x-2 rounded-lg border border-transparent px-4 py-3 text-sm font-semibold text-blue-600 hover:text-blue-800 disabled:pointer-events-none disabled:opacity-50 dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        >
          <IoIosArrowRoundBack size={20} />
          Back
        </Link>
        <h1 className="mb-4 text-center text-3xl underline underline-offset-2">
          {data.department.name}
        </h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h1 className="p-4 text-3xl underline underline-offset-2">
            Programme List
          </h1>
          <div className="mt-5 p-10">
            <ul className="flex max-w-xs flex-col divide-y divide-gray-200 dark:divide-gray-700">
              {data.programmes.map((programme) => (
                <li
                  key={programme.id}
                  className="inline-flex items-center gap-x-2 px-4 py-3 text-sm font-medium text-gray-800  dark:text-white"
                >
                  <Link
                    className="hover:text-blue-600 hover:underline hover:decoration-blue-600"
                    href={`/management/colleges/${collegeId}/${departmentId}`}
                  >
                    {programme.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h1 className="p-4 text-3xl underline underline-offset-2">
            Add New Programme
          </h1>
          <NewProgramme />
          {/* <form className="mt-5 p-10" action={addDepartment}>
            <div>
              <label className="mb-2 block text-sm font-medium dark:text-white">
                Department Name
              </label>
              <input
                type="text"
                name="departmentName"
                required
                min={3}
                className="block w-full rounded-lg border-gray-200 bg-slate-100 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder=""
              />
            </div>
            <button
              type="submit"
              className="mt-4 inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-teal-500 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-600 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              Submit
            </button>
          </form> */}
        </div>
      </div>
    </div>
  );
};

export default Page;
