import Link from "next/link";
import prisma from "@/prisma/db";
import { revalidatePath } from "next/cache";

const getColleges = async () => {
  const colleges = await prisma.college.findMany();

  return colleges;
};

const Page = async () => {
  const colleges = await getColleges();

  async function addCollege(formData: FormData) {
    "use server";

    const collegeName = formData.get("collegeName") as string;

    const university = await prisma.university.findFirst();

    if (!collegeName) throw new Error("College name required");

    if (!university) throw new Error("No university found");

    await prisma.college.create({
      data: {
        universityId: university.id,
        name: collegeName,
      },
    });

    revalidatePath("/management/colleges");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-lg bg-white shadow-md dark:bg-gray-900">
          <h2 className="border-b border-gray-200 px-6 py-4 text-2xl font-semibold dark:border-gray-800">
            College List
          </h2>
          <div className="p-6">
            <ul className="space-y-4">
              {colleges.map((college) => (
                <li
                  key={college.id}
                  className="flex items-center justify-between border-b border-gray-200 px-4 py-3 text-lg font-medium dark:border-gray-800"
                >
                  <Link
                    href={`/management/colleges/${college.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {college.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="rounded-lg bg-white shadow-md dark:bg-gray-900">
          <h2 className="border-b border-gray-200 px-6 py-4 text-2xl font-semibold dark:border-gray-800">
            Add New College
          </h2>
          <form className="p-6" action={addCollege}>
            <div className="mb-4">
              <label className="block text-sm font-medium dark:text-gray-200">
                College Name
              </label>
              <input
                type="text"
                name="collegeName"
                required
                minLength={3}
                className="w-full rounded-lg border-gray-300 bg-gray-100 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:focus:ring-gray-600"
                placeholder="Enter College Name"
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
