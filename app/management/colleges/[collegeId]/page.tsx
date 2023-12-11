import prisma from "@/prisma/db";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { IoIosArrowRoundBack } from "react-icons/io";

export const getCollege = async (collegeId: string) => {
  const college = await prisma.college.findUnique({
    where: {
      id: collegeId,
    },
  });

  if (!college) throw new Error("College not found.");

  const departments = await prisma.department.findMany({
    where: {
      collegeId: college.id,
    },
  });

  return { college, departments };
};

interface Props {
  params: { collegeId: string };
}

const Page = async ({ params: { collegeId } }: Props) => {
  const data = await getCollege(collegeId);

  async function addDepartment(formData: FormData) {
    "use server";

    const departmentName = formData.get("departmentName") as string;

    if (!departmentName) throw new Error("Department name required");

    await prisma.department.create({
      data: {
        collegeId,
        name: departmentName,
      },
    });

    revalidatePath(`/management/colleges/${collegeId}`);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-semibold">
        {data.college?.name}
      </h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-lg bg-white shadow-md dark:bg-gray-900">
          <h2 className="border-b border-gray-200 px-6 py-4 text-2xl font-semibold dark:border-gray-800">
            Department List
          </h2>
          <div className="p-6">
            <ul className="space-y-4">
              {data.departments.map((department) => (
                <li
                  key={department.id}
                  className="flex items-center justify-between border-b border-gray-200 px-4 py-3 text-lg font-medium dark:border-gray-800"
                >
                  <Link
                    href={`/management/colleges/${collegeId}/${department.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {department.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="rounded-lg bg-white shadow-md dark:bg-gray-900">
          <h2 className="border-b border-gray-200 px-6 py-4 text-2xl font-semibold dark:border-gray-800">
            Add New Department
          </h2>
          <form className="p-6" action={addDepartment}>
            <div className="mb-4">
              <label className="block text-sm font-medium dark:text-gray-200">
                Department Name
              </label>
              <input
                type="text"
                name="departmentName"
                required
                minLength={3}
                className="w-full rounded-lg border-gray-300 bg-gray-100 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:focus:ring-gray-600"
                placeholder="Enter Department Name"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
