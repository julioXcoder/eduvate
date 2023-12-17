"use server";

import prisma from "@/prisma/db";
import { GetFormIVDataResponse, FormIVData, Applicant } from "./schema";
import bcrypt from "bcrypt";
import { createToken } from "@/lib/auth";
import { cookies, headers } from "next/headers";

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
  const { firstName, lastName, formIVIndex, password, phone, email } =
    newApplicantData;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

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

  // FIXME: Login user then return link

  const data = { id: newApplicant.formIVIndex, role: newApplicant.role };

  const token = await createToken(data);

  cookies().set("token", token);

  return "/applicant_portal/dashboard";
};

export const getApplicantData = async () => {
  const headersList = headers();

  const formIVIndex = headersList.get("userId");

  if (!formIVIndex)
    throw new Error("Error occurred while fetching applicant data.");

  const applicant = await prisma.applicant.findUnique({
    where: {
      formIVIndex,
    },
  });

  if (!applicant)
    throw new Error("Error occurred while fetching applicant data.");

  let applicantControlNumber;

  if (applicant.controlNumberId) {
    applicantControlNumber = await prisma.controlNumber.findUnique({
      where: {
        id: applicant.controlNumberId,
      },
    });
  }

  const response = {
    fullName: `${applicant.firstName} ${applicant.lastName}`,
    formIVIndex: applicant.formIVIndex,
    status: applicant.status,
    controlNumber: applicantControlNumber ? applicantControlNumber : null,
  };

  return response;
};
