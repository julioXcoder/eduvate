import Link from "next/link";
import prisma from "@/prisma/db";
import { revalidatePath } from "next/cache";

const getColleges = async () => {
  const colleges = await prisma.college.findMany({
    where: {
      universityId: "6576023a9fe77e8c717afb5f",
    },
  });

  return colleges;
};

const Page = async () => {
  const colleges = await getColleges();

  async function addCollege(formData: FormData) {
    "use server";

    const collegeName = formData.get("collegeName") as string;

    if (!collegeName) throw new Error("College name required");

    await prisma.college.create({
      data: {
        universityId: "6576023a9fe77e8c717afb5f",
        name: collegeName,
      },
    });

    revalidatePath("/management/colleges");
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <h1 className="p-4 text-3xl underline underline-offset-2">
          College List
        </h1>
        <div className="mt-5 p-10">
          <ul className="flex max-w-xs flex-col divide-y divide-gray-200 dark:divide-gray-700">
            {colleges.map((college) => (
              <li
                key={college.id}
                className="inline-flex items-center gap-x-2 px-4 py-3 text-sm font-medium text-gray-800  dark:text-white"
              >
                <Link
                  className="hover:text-blue-600 hover:underline hover:decoration-blue-600"
                  href={`/management/colleges/${college.id}`}
                >
                  {college.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h1 className="p-4 text-3xl underline underline-offset-2">
          Add New College
        </h1>
        <form className="mt-5 p-10" action={addCollege}>
          <div>
            <label className="mb-2 block text-sm font-medium dark:text-white">
              College Name
            </label>
            <input
              type="text"
              name="collegeName"
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
        </form>
      </div>
    </div>
  );
};

export default Page;
