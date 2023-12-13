import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div>
      <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
        <h1 className="my-7 block text-center text-3xl font-bold text-gray-800 dark:text-white sm:text-4xl md:text-5xl lg:text-6xl">
          Welcome to Your Future - Start Here!
        </h1>
        <div className="mt-10 grid lg:grid-cols-7 lg:items-center lg:gap-x-8 xl:gap-x-12">
          <div className="lg:col-span-3">
            <div className="flex flex-col gap-2">
              <p>
                We&apos;re thrilled to welcome you to our University Application
                Portal! Whether you&apos;re taking the first step on your
                academic journey or continuing your adventure with us,
                we&apos;re here to support you every step of the way.
              </p>
              <p>
                If this is your first visit, click &quot;Begin Application&quot;
                to start shaping your future. Our step-by-step guide will walk
                you through the application process, making it as
                straightforward as possible.
              </p>
              <button>
                <Link
                  className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-[#007BFF] px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  href="/online_application/apply"
                >
                  Begin Application
                </Link>
              </button>
              <p>
                If you&apos;re returning to complete your application, click
                &quot;Resume Application&quot;. You&apos;ll need the username
                and password you set up previously. Let&apos;s pick up where you
                left off and continue your journey to success.
              </p>
              <button className="my-3">
                <Link
                  className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-[#FFC107] px-4 py-3 text-sm font-semibold text-white hover:bg-yellow-500 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  href="/login"
                >
                  Resume Application
                </Link>
              </button>
            </div>
          </div>

          <div className="mt-10 lg:col-span-4 lg:mt-0">
            <Image
              width={640}
              height={427}
              className="w-full rounded-xl"
              src="/apllicationPageImage.jpg"
              alt="Image Description"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
