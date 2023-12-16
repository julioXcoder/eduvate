import React from "react";

const Page = () => {
  return (
    <div>
      <h1 className="text-4xl font-extrabold dark:text-white">
        Welcome,
        <small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">
          Naruto Uzumaki!
        </small>
      </h1>
      <div className="my-4 p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Left Column: Application Status */}
          <div className="mb-4 md:mb-0">
            <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Application Status
                </h5>
              </a>

              <div className="m-3 text-sm text-gray-700 dark:text-gray-400">
                <p className="mb-1">
                  <span className="font-bold">Application ID:</span> XXXX
                </p>
                <p className="mb-1">
                  <span className="font-bold">Status:</span> Under Review
                </p>
                {/* Add more application details here */}
              </div>
            </div>

            <div className="hidden max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Application Fee
                </h5>
              </a>
              <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-400">
                To proceed with your application, a fee of 10,000 Tanzanian
                Shillings is required. Please ensure payment within four days to
                avoid account deletion
              </p>
              <div className="mt-4">
                <p className="mb-2 text-sm text-gray-700 dark:text-gray-400">
                  Click the button below to create the control number:
                </p>
                <a
                  href="#"
                  className="block w-full rounded-lg bg-blue-700 px-4 py-2 text-center font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Create Control Number
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Notification Section */}
          <div>
            <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Notifications
              </h5>
              {/* Replace with dynamic notifications */}
              <div className="m-3 text-sm text-gray-700 dark:text-gray-400">
                {/* Dynamic content for notifications */}
                <p className="mb-1">Notification 1</p>
                <p className="mb-1">Notification 2</p>
                {/* Add more dynamic notifications here */}
              </div>
            </div>
          </div>
          <a
            href="#"
            className="mt-4 block rounded-lg bg-red-700 px-4 py-2 text-center font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page;
