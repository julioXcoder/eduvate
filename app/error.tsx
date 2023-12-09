"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const router = useRouter();

  return (
    <div>
      <div className="flex h-screen items-center justify-center">
        <div className="relative">
          <span className="text-8xl font-extrabold text-gray-100 md:text-[12rem]">
            <span className="text-red-300">!</span>
            ERROR
          </span>
          <span className="absolute inset-0 flex flex-col items-center justify-center p-1 text-center text-sm">
            <p className="mt-3 text-xl font-bold text-gray-600 dark:text-gray-400">
              Oops, something went wrong.
            </p>
            <p className="text-gray-600 dark:text-gray-600">{error.message}</p>
            <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
              <button
                className="inline-flex w-full  cursor-pointer items-center justify-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 sm:w-auto"
                onClick={router.back}
              >
                <IoMdArrowRoundBack />
                Go Back
              </button>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}
