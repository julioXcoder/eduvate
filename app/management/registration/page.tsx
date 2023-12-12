"use client";

import { useState } from "react";
import { z } from "zod";
import {
  Input,
  Button,
  Select,
  SelectItem,
  Radio,
  RadioGroup,
  Textarea,
} from "@nextui-org/react";

import { BiMaleSign, BiFemaleSign } from "react-icons/bi";

const phoneRegex = /^\+?\d{11,}$/;

const FormStep1Schema = z.object({
  firstName: z
    .string()
    .max(50, "First name is too long")
    .refine((val) => val.trim().length > 0, {
      message: "First name is required",
    }),
  middleName: z
    .string()
    .max(50, "Middle name is too long")
    .refine((val) => val.trim().length > 0, {
      message: "Middle name is required",
    }),
  lastName: z
    .string()
    .max(50, "Last name is too long")
    .refine((val) => val.trim().length > 0, {
      message: "Last name is required",
    }),
  nationality: z
    .string()
    .max(50, "nationality is too long")
    .refine((val) => val.trim().length > 0, {
      message: "Nationality is required",
    }),
  gender: z.string().refine((val) => val.trim().length > 0, {
    message: "Gender is required",
  }),
  dayOfBirth: z
    .union([z.string(), z.number()])
    .refine((val) => val !== "", {
      message: "Day of birth is required",
    })
    .refine((val) => Number(val) >= 1 && Number(val) <= 31, {
      message: "Day of birth must be between 1 and 31",
    }),
  monthOfBirth: z
    .union([z.string(), z.number()])
    .refine((val) => val !== "", {
      message: "Month of birth is required",
    })
    .refine((val) => Number(val) >= 1 && Number(val) <= 12, {
      message: "Month of birth must be between 1 and 12",
    }),
  yearOfBirth: z
    .union([z.string(), z.number()])
    .refine((val) => val !== "", {
      message: "Year of birth is required",
    })
    .refine(
      (val) =>
        Number(val) >= new Date().getFullYear() - 150 &&
        Number(val) <= new Date().getFullYear(),
      {
        message: `Year of birth must be between ${
          new Date().getFullYear() - 150
        } and ${new Date().getFullYear()}`,
      },
    ),
  disability: z.string().max(1000).optional(),
});

const FormStep2Schema = z.object({
  nokEmail: z.string().email("NEXT OF KIN (Primary) Email address is Invalid"),
  nokFirstName: z
    .string()
    .max(50, "NEXT OF KIN (Primary) First name is too long")
    .refine((val) => val.trim().length > 0, {
      message: "NEXT OF KIN (Primary) First name is required",
    }),
  nokLastName: z
    .string()
    .max(50, "NEXT OF KIN (Primary) Last name is too long")
    .refine((val) => val.trim().length > 0, {
      message: "NEXT OF KIN (Primary) Last name is required",
    }),
  nokRelationship: z
    .string()
    .max(50, "NEXT OF KIN (Primary) relationship field is too long")
    .refine((val) => val.trim().length > 0, {
      message: "NEXT OF KIN (Primary) relationship field is empty",
    }),
  nokMobileNumber: z
    .string()
    .optional()
    .refine((value) => {
      if (!value) return true;
      return phoneRegex.test(value);
    }, "Invalid NEXT OF KIN (Primary) phone number format"),
  nokAddress: z
    .string()
    .max(50, "NEXT OF KIN (Primary) Address is too long")
    .refine((val) => val.trim().length > 0, {
      message: "NEXT OF KIN (Primary) Address is required",
    }),
});

// TODO: Medical Form Schema
const FormStep3Schema = z.object({});

// TODO: Accommodation Form Schema
const FormStep4Schema = z.object({});

// TODO: Meals Form Schema
const FormStep5Schema = z.object({});

// TODO: Attachments Schema
const FormStep6Schema = z.object({});

type FormStep1 = z.infer<typeof FormStep1Schema>;

type FormStep2 = z.infer<typeof FormStep2Schema>;

type FormStep3 = z.infer<typeof FormStep3Schema>;

function Page() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formSteps, setFormSteps] = useState<
    (FormStep1 | FormStep2 | FormStep3)[]
  >([
    {
      firstName: "",
      middleName: "",
      lastName: "",
      nationality: "",
      gender: "",
      dayOfBirth: "",
      monthOfBirth: "",
      yearOfBirth: "",
      disability: "",
    },
    {
      nokFirstName: "",
      nokLastName: "",
      nokRelationship: "",
      nokEmail: "",
      nokMobileNumber: "",
      nokAddress: "",
    },
    { age: "" },
  ]);
  const [errorMessage, setErrorMessage] = useState("");

  const validationSchemas = [FormStep1Schema, FormStep2Schema, FormStep3Schema];

  const handleInputChange = (
    field: keyof FormStep1 | keyof FormStep2 | keyof FormStep3,
    value: string | number,
  ) => {
    const updatedFormSteps = [...formSteps];

    if (currentStep === 0) {
      const updatedStep = {
        ...updatedFormSteps[currentStep],
        [field]: value,
      } as FormStep1;
      updatedFormSteps[currentStep] = updatedStep;
    } else if (currentStep === 1) {
      const updatedStep = {
        ...updatedFormSteps[currentStep],
        [field]: value,
      } as FormStep2;
      updatedFormSteps[currentStep] = updatedStep;
    } else if (currentStep === 2) {
      const updatedStep = {
        ...updatedFormSteps[currentStep],
        [field]: value,
      } as FormStep3;
      updatedFormSteps[currentStep] = updatedStep;
    }

    setFormSteps(updatedFormSteps);
  };

  const handleNext = () => {
    const currentSchema = validationSchemas[currentStep];

    if (currentSchema) {
      try {
        currentSchema.parse(formSteps[currentStep]);
        setErrorMessage("");

        if (currentStep < validationSchemas.length - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          console.log(formSteps);
        }
      } catch (error) {
        if (error instanceof z.ZodError) {
          setErrorMessage(error.errors[0]?.message || "");
        }
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isLastStep = currentStep === validationSchemas.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="mx-auto px-5 py-8 md:px-20 xl:px-36">
      <form>
        {currentStep === 0 && (
          <div className="">
            <h2 className="text-2xl font-bold uppercase text-gray-700 dark:text-gray-400">
              Student Basic Information
            </h2>
            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div>
                <Input
                  onChange={(event) =>
                    handleInputChange("firstName", event.currentTarget.value)
                  }
                  value={(formSteps[0] as FormStep1).firstName || ""}
                  label="Student First Name"
                  labelPlacement="outside"
                />
              </div>
              <div>
                <Input
                  onChange={(event) =>
                    handleInputChange("middleName", event.currentTarget.value)
                  }
                  value={(formSteps[0] as FormStep1).middleName || ""}
                  label="Student Middle Name"
                  labelPlacement="outside"
                />
              </div>
              <div>
                <Input
                  onChange={(event) =>
                    handleInputChange("lastName", event.currentTarget.value)
                  }
                  value={(formSteps[0] as FormStep1).lastName || ""}
                  label="Student Last Name"
                  labelPlacement="outside"
                />
              </div>
              <div>
                <Input
                  onChange={(event) =>
                    handleInputChange("nationality", event.currentTarget.value)
                  }
                  value={(formSteps[0] as FormStep1).nationality || ""}
                  label="Student Nationality"
                  labelPlacement="outside"
                />
              </div>
              <div>
                <h2 className="block text-sm font-medium text-gray-700 dark:text-white">
                  Date Of Birth
                </h2>
                <div className="mt-2 flex w-full items-center justify-center">
                  <Input
                    type="number"
                    size="sm"
                    onChange={(event) =>
                      handleInputChange(
                        "dayOfBirth",
                        Number(event.target.value),
                      )
                    }
                    value={
                      (formSteps[0] as FormStep1).dayOfBirth.toString() || ""
                    }
                    placeholder="DD"
                  />
                  <span className="mx-3 text-gray-500">/</span>
                  <Input
                    size="sm"
                    type="number"
                    onChange={(event) =>
                      handleInputChange(
                        "monthOfBirth",
                        Number(event.target.value),
                      )
                    }
                    value={
                      (formSteps[0] as FormStep1).monthOfBirth.toString() || ""
                    }
                    placeholder="MM"
                  />
                  <span className="mx-3 text-gray-500">/</span>
                  <Input
                    type="number"
                    size="sm"
                    onChange={(event) =>
                      handleInputChange(
                        "yearOfBirth",
                        Number(event.target.value),
                      )
                    }
                    value={
                      (formSteps[0] as FormStep1).yearOfBirth.toString() || ""
                    }
                    placeholder="YYYY"
                  />
                </div>
              </div>
              <div>
                <RadioGroup
                  label="Student Gender"
                  orientation="horizontal"
                  onChange={(event) =>
                    handleInputChange("gender", event.currentTarget.value)
                  }
                  value={(formSteps[0] as FormStep1).gender || ""}
                >
                  <Radio value="Male">Male</Radio>
                  <Radio value="Female">Female</Radio>
                </RadioGroup>
              </div>
              <div className="col-span-1 sm:col-span-2">
                <Textarea
                  label="Disabilities"
                  placeholder="Let us know about any disabilities, or leave blank if not applicable."
                  onChange={(event) =>
                    handleInputChange("disability", event.currentTarget.value)
                  }
                  value={(formSteps[0] as FormStep1).disability || ""}
                />
              </div>
            </div>
          </div>
        )}
        {currentStep === 1 && (
          <div>
            <h2 className="text-2xl font-bold uppercase text-gray-700 dark:text-gray-400">
              Next of Kin Information
            </h2>
            <div className="mt-8">
              <div className="">
                <div className="mb-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <Input
                      onChange={(event) =>
                        handleInputChange(
                          "nokFirstName",
                          event.currentTarget.value,
                        )
                      }
                      value={(formSteps[1] as FormStep2).nokFirstName || ""}
                      label="Next Of Kin First Name"
                      labelPlacement="outside"
                    />
                  </div>
                  <div>
                    <Input
                      onChange={(event) =>
                        handleInputChange(
                          "nokLastName",
                          event.currentTarget.value,
                        )
                      }
                      value={(formSteps[1] as FormStep2).nokLastName || ""}
                      label="Next Of Kin Last Name"
                      labelPlacement="outside"
                    />
                  </div>
                  <div>
                    <Input
                      onChange={(event) =>
                        handleInputChange(
                          "nokRelationship",
                          event.currentTarget.value,
                        )
                      }
                      value={(formSteps[1] as FormStep2).nokRelationship || ""}
                      label="Next Of Kin Relationship"
                      labelPlacement="outside"
                    />
                  </div>
                  <div>
                    <Input
                      onChange={(event) =>
                        handleInputChange(
                          "nokMobileNumber",
                          event.currentTarget.value,
                        )
                      }
                      value={(formSteps[1] as FormStep2).nokMobileNumber || ""}
                      label="Next Of Kin Mobile Number"
                      labelPlacement="outside"
                    />
                  </div>
                  <div>
                    <Input
                      onChange={(event) =>
                        handleInputChange("nokEmail", event.currentTarget.value)
                      }
                      value={(formSteps[1] as FormStep2).nokEmail || ""}
                      label="Next Of Kin Email"
                      labelPlacement="outside"
                    />
                  </div>
                  <div>
                    <Input
                      onChange={(event) =>
                        handleInputChange(
                          "nokAddress",
                          event.currentTarget.value,
                        )
                      }
                      value={(formSteps[1] as FormStep2).nokAddress || ""}
                      label="Next Of Kin Physical Address"
                      labelPlacement="outside"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-bold uppercase text-gray-700 dark:text-gray-400">
              Medical Form
            </h2>
            {/* TODO: Medical Form */}
            <div className="my-6 grid gap-6 md:grid-cols-2"></div>
          </div>
        )}
        {/* Add JSX for other steps if needed */}
      </form>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <div className="mt-4 flex items-center justify-between">
        <p>
          {currentStep + 1}/{validationSchemas.length}
        </p>
        <div className="flex gap-x-2">
          <button
            className={`px-4 py-2 ${
              isFirstStep ? "hidden bg-gray-400" : "bg-blue-500"
            } rounded text-white`}
            onClick={handleBack}
            disabled={isFirstStep}
          >
            Back
          </button>
          <button
            className={`px-4 py-2 ${
              isLastStep ? "bg-green-500" : "bg-blue-500"
            } rounded text-white`}
            onClick={handleNext}
          >
            {isLastStep ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
