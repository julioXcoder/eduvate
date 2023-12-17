import { getApplicantData } from "@/server/actions/applicant";
import prisma from "@/prisma/db";
import { revalidatePath } from "next/cache";

const Page = async () => {
  const applicant = await getApplicantData();

  const ApplicantStatusName = {
    SUBMITTED: "SUBMITTED",
    UNDER_REVIEW: "UNDER_REVIEW",
    WAITLISTED: "WAITLISTED",
    ACCEPTED: "ACCEPTED",
    REJECTED: "REJECTED",
    DEFERRED: "DEFERRED",
  };

  function statusToSpan(status: string) {
    let colorClasses;
    switch (status) {
      case ApplicantStatusName.SUBMITTED:
      case ApplicantStatusName.UNDER_REVIEW:
        colorClasses =
          "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
        break;
      case ApplicantStatusName.WAITLISTED:
        colorClasses =
          "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
        break;
      case ApplicantStatusName.ACCEPTED:
        colorClasses =
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
        break;
      case ApplicantStatusName.REJECTED:
        colorClasses =
          "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
        break;
      case ApplicantStatusName.DEFERRED:
        colorClasses =
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
        break;
      default:
        colorClasses =
          "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }

    return (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClasses}`}
      >
        {status}
      </span>
    );
  }

  const ControlNumberStatusName = {
    GENERATED: "GENERATED",
    PENDING: "PENDING",
    COMPLETED: "COMPLETED",
    FAILED: "FAILED",
    EXPIRED: "EXPIRED",
  };

  function statusToSpanCN(status: string) {
    let colorClasses;
    switch (status) {
      case ControlNumberStatusName.GENERATED:
        colorClasses =
          "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
        break;
      case ControlNumberStatusName.PENDING:
        colorClasses =
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
        break;
      case ControlNumberStatusName.COMPLETED:
        colorClasses =
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
        break;
      case ControlNumberStatusName.FAILED:
        colorClasses =
          "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
        break;
      case ControlNumberStatusName.EXPIRED:
        colorClasses =
          "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
        break;
      default:
        colorClasses =
          "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }

    return (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClasses}`}
      >
        {status}
      </span>
    );
  }

  async function createControlNumber(formData: FormData) {
    "use server";

    const controlNumber = await prisma.controlNumber.create({
      data: {
        status: "PENDING",
      },
    });

    await prisma.applicant.update({
      where: {
        formIVIndex: applicant.formIVIndex,
      },
      data: {
        controlNumberId: controlNumber.id,
      },
    });

    revalidatePath("/applicant_portal/dashboard");
  }

  async function payControlNumber(formData: FormData) {
    "use server";

    await prisma.controlNumber.update({
      where: {
        id: applicant.controlNumber?.id,
      },
      data: {
        status: "COMPLETED",
      },
    });

    await prisma.applicant.update({
      where: {
        formIVIndex: applicant.formIVIndex,
      },
      data: {
        status: "SUBMITTED",
      },
    });

    revalidatePath("/applicant_portal/dashboard");
  }

  return (
    <div>
      <h1 className="text-4xl font-extrabold dark:text-white">
        Welcome,
        <small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">
          {applicant.fullName}
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

              <div className="m-3 text-gray-700 dark:text-gray-400">
                <p className="mb-4">
                  <span className="font-bold">Form IV Index:</span>{" "}
                  {applicant.formIVIndex}
                </p>
                <p className="mb-4">
                  <span className="font-bold">Application Status:</span>{" "}
                  {statusToSpan(applicant.status)}
                </p>
                <p className="mb-4">
                  <span className="font-bold">Control Number:</span>{" "}
                  {applicant.controlNumber
                    ? applicant.controlNumber.id
                    : "- - - - - - - - - - - - - -"}
                </p>
                <p className="mb-4">
                  <span className="font-bold">Control Number Status:</span>{" "}
                  {applicant.controlNumber ? (
                    statusToSpanCN(applicant.controlNumber.status)
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                      NOT CREATED
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Notification Section */}
          <div>
            {applicant.controlNumber && (
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
            )}

            {!applicant.controlNumber && (
              <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Application Fee
                  </h5>
                </a>
                <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-400">
                  To proceed with your application, a fee of 10,000 Tanzanian
                  Shillings is required. Please ensure payment within four days
                  to avoid account deletion
                </p>
                <div className="mt-4">
                  <p className="mb-2 text-sm text-gray-700 dark:text-gray-400">
                    Click the button below to create the control number:
                  </p>
                  <form action={createControlNumber}>
                    <button
                      className="block w-full rounded-lg bg-blue-700 px-4 py-2 text-center font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="submit"
                    >
                      Create Control Number
                    </button>
                  </form>
                </div>
              </div>
            )}

            {applicant.controlNumber &&
              applicant.controlNumber.status == "PENDING" && (
                <div className="my-4">
                  <form action={payControlNumber}>
                    <button
                      className="block w-32 rounded-lg bg-green-700 px-4 py-2 text-center font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      type="submit"
                    >
                      Pay
                    </button>
                  </form>
                </div>
              )}
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
