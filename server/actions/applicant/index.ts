"use server";

import prisma from "@/prisma/db";
import { GetFormIVDataResponse, FormIVData, Applicant } from "./schema";

export const getFormIVData = async (
  formIVIndex: string,
): Promise<GetFormIVDataResponse> => {
  try {
    const applicant = await prisma.applicant.findUnique({
      where: {
        formIVIndex,
      },
    });

    if (applicant)
      return {
        data: {} as FormIVData,
        error:
          "Sorry, we can only accept new applicants. Your Form IV index already exists in our records.",
      };

    const oLevelData = await prisma.oLevelResult.findUnique({
      where: {
        formIVIndex,
      },
    });

    if (!oLevelData)
      return {
        data: {} as FormIVData,
        error:
          "We're sorry, but the Form IV verification was unsuccessful. Please try again or reach out to our support team for further assistance.",
      };

    return {
      data: oLevelData,
      error: null,
    };
  } catch (ex) {
    return {
      data: {} as FormIVData,
      error: "An error occurred while processing your request.",
    };
  }
};

export const newApplicantAccount = async (newApplicantData: Applicant) => {
  const { firstName, lastName, formIVIndex, hashedPassword, phone, email } =
    newApplicantData;

  const newApplicant = await prisma.applicant.create({
    data: {
      firstName,
      lastName,
      formIVIndex,
      hashedPassword,
      phone,
      email,
      status: "WAITLISTED",
      controlNumberId: "",
    },
  });

  return newApplicant;
};
