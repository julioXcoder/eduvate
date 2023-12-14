"use client";

import { useState } from "react";
import { z } from "zod";
import Image from "next/image";
import {
  Input,
  Button,
  Select,
  SelectItem,
  Radio,
  RadioGroup,
  Textarea,
} from "@nextui-org/react";
import Link from "next/link";

const applicationTypes = [
  { label: "Certificate", value: "certificate" },
  { label: "Diploma", value: "diploma" },
  { label: "Postgraduate Diploma", value: "postgraduateDiploma" },
  { label: "Masters", value: "masters" },
  { label: "phD", value: "phd" },
];

const applicantOrigins = [
  { label: "Tanzania - NECTA", value: "necta" },
  { label: "NON NECTA - Foreign", value: "foreign" },
  { label: "Tanzania NECTA before 1988", value: "necta1988" },
];

const certificateEducationLevels = [
  { label: "Form IV", value: "formIV" },
  { label: "Veta NVA III", value: "vetaNVAIII" },
];

const diplomaEducationLevels = [
  { label: "Form IV", value: "formIV" },
  { label: "Veta NVA III", value: "vetaNVAIII" },
  { label: "NTA Level 4", value: "ntaLevel4" },
  { label: "Form VI", value: "formVI" },
  { label: "NTA Level 5", value: "ntaLevel5" },
];

const postgraduateDiplomaEducationLevels = [
  { label: "Degree", value: "degree" },
];

const mastersEducationLevels = [
  { label: "Degree", value: "degree" },
  { label: "Postgraduate Diploma", value: "postgraduateDiploma" },
];

const phdEducationLevels = [{ label: "Masters", value: "masters" }];

const FormStep1Schema = z.object({});
const FormStep2Schema = z.object({
  indexNumber: z.string().refine((val) => val.trim().length > 0, {
    message: "Form IV Index Number is required",
  }),
});

type FormStep1 = z.infer<typeof FormStep1Schema>;
type FormStep2 = z.infer<typeof FormStep2Schema>;

const Page = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formSteps, setFormSteps] = useState<(FormStep1 | FormStep2)[]>([
    {},
    {},
    {},
    {},
    {},
    { indexNumber: "" },
    {},
  ]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedApplicationType, setSelectedApplicationType] = useState("");
  const [selectedApplicantOrigin, setSelectedApplicantOrigin] = useState("");
  const [selectedEducationLevel, setSelectedEducationLevel] = useState("");
  const [completedOLevel, setCompletedOLevel] = useState<"yes" | "no" | "">("");

  const validationSchemas = [
    FormStep1Schema,
    FormStep1Schema,
    FormStep1Schema,
    FormStep1Schema,
    FormStep1Schema,
    FormStep2Schema,
    FormStep1Schema,
  ];

  const handleInputChange = (
    field: keyof FormStep2,
    value: string | number,
  ) => {
    const updatedFormSteps = [...formSteps];

    if (currentStep === 5) {
      const updatedStep = {
        ...updatedFormSteps[currentStep],
        [field]: value,
      } as FormStep2;
      updatedFormSteps[currentStep] = updatedStep;
    }

    setFormSteps(updatedFormSteps);
  };

  const handleApplicationTypeChange = (selectedOption: string) => {
    setSelectedApplicationType(selectedOption);
  };

  const handleEducationLevelChange = (selectedOption: string) => {
    setSelectedEducationLevel(selectedOption);
  };

  const handleApplicantOriginChange = (selectedOption: string) => {
    setSelectedApplicantOrigin(selectedOption);
  };

  const handleOLevelChange = (selectedOption: string) => {
    setCompletedOLevel(selectedOption as "yes" | "no" | "");
  };

  const getEducationLevels = (applicationType: string) => {
    switch (applicationType) {
      case "certificate":
        return certificateEducationLevels;
      case "diploma":
        return diplomaEducationLevels;
      case "postgraduateDiploma":
        return postgraduateDiplomaEducationLevels;
      case "masters":
        return mastersEducationLevels;
      case "phd":
        return phdEducationLevels;
      default:
        return [];
    }
  };

  const handleNext = () => {
    const currentSchema = validationSchemas[currentStep];

    if (currentStep === 1 && !selectedApplicationType) {
      setErrorMessage("Please select an application type.");
      return;
    }

    if (currentStep === 2) {
      if (!completedOLevel) {
        setErrorMessage("Please confirm if you have completed O Level.");
        return;
      } else if (completedOLevel === "no") {
        setErrorMessage(
          "Unfortunately, completion of O Level is a requirement for our university. Please check back when you have completed your O Level.",
        );
        return;
      }
    }

    if (currentStep === 3 && !selectedApplicantOrigin) {
      setErrorMessage("Please select Origin of Education.");
      return;
    }

    if (currentSchema) {
      try {
        currentSchema.parse(formSteps[currentStep]);
        setErrorMessage("");

        if (currentStep < validationSchemas.length - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          let objectWithIndexNumber = formSteps.find(
            (obj): obj is { indexNumber: string } => "indexNumber" in obj,
          );
          let indexNumber = objectWithIndexNumber
            ? objectWithIndexNumber.indexNumber
            : null;
          console.log(indexNumber);
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
    <div className="mx-auto mt-14 px-5 py-8 md:px-20 xl:px-36">
      <h2 className="py-6 text-4xl font-semibold">
        Online Application Step{" "}
        {`(${currentStep + 1}/${validationSchemas.length})`}
      </h2>
      <form action="">
        {currentStep === 0 && (
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <Image
                width={640}
                height={427}
                className="w-full rounded-xl"
                src="/ApplicationImages/stepOne.jpg"
                alt="Image Description"
              />
            </div>
            <div className="rounded-lg bg-white shadow-md dark:bg-gray-900">
              <h2 className="border-b border-gray-200 px-6 py-4 text-2xl font-semibold dark:border-gray-800">
                Warm Welcome
              </h2>
              <div className="p-6">
                <p>
                  Welcome to our University Application Portal! We’re delighted
                  that you’re considering us for your academic journey. We
                  promise to make your application process as smooth and
                  enjoyable as possible. Ready to embark on this exciting
                  journey? Click ‘Next’ to get started!
                </p>
              </div>
            </div>
          </div>
        )}
        {currentStep === 1 && (
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <Image
                width={640}
                height={427}
                className="w-full rounded-xl"
                src="/ApplicationImages/stepTwo.jpg"
                alt="Image Description"
              />
            </div>
            <div className="rounded-lg bg-white shadow-md dark:bg-gray-900">
              <h2 className="border-b border-gray-200 px-6 py-4 text-2xl font-semibold dark:border-gray-800">
                Choose Your Path
              </h2>
              <div className="p-6">
                <p>
                  Fantastic! Your first step is to select the type of
                  application. We offer a variety of programs such as
                  Certificate, Diploma, Postgraduate Diploma, Masters, and PhD.
                  Please choose the one that aligns with your academic
                  aspirations from the dropdown menu. Remember, this is the
                  start of your journey to success. Once you’ve made your
                  selection, click ‘Next’.
                </p>
                <div className="my-3">
                  <Select
                    items={applicationTypes}
                    label="Application Type"
                    placeholder={selectedApplicationType}
                    className="max-w-xs"
                    onChange={(e) =>
                      handleApplicationTypeChange(e.target.value)
                    }
                  >
                    {(applicationType) => (
                      <SelectItem key={applicationType.value}>
                        {applicationType.label}
                      </SelectItem>
                    )}
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              {" "}
              <Image
                width={640}
                height={427}
                className="w-full rounded-xl"
                src="/ApplicationImages/stepThree.jpg"
                alt="Image Description"
              />
            </div>
            <div className="rounded-lg bg-white shadow-md dark:bg-gray-900">
              <h2 className="border-b border-gray-200 px-6 py-4 text-2xl font-semibold dark:border-gray-800">
                O Level Completion Confirmation
              </h2>
              <div className="p-6">
                <p>
                  Great! Now, we need to confirm that you have completed your O
                  level, as this is a requirement for our university. If you
                  have completed it, please select ‘Yes’. This is your ticket to
                  further academic exploration. If not, unfortunately, you may
                  not be eligible to apply at this time. But don’t worry, there
                  are always opportunities waiting for you. Click ‘Next’ when
                  you’re ready.
                </p>
                <div className="my-3">
                  <Select
                    label="O Level Completion"
                    placeholder={completedOLevel}
                    className="max-w-xs"
                    onChange={(e) => handleOLevelChange(e.target.value)}
                  >
                    <SelectItem key="yes" value="yes">
                      Yes
                    </SelectItem>
                    <SelectItem key="no" value="no">
                      No
                    </SelectItem>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <Image
                width={640}
                height={427}
                className="w-full rounded-xl"
                src="/ApplicationImages/stepFour.jpg"
                alt="Image Description"
              />
            </div>
            <div className="rounded-lg bg-white shadow-md dark:bg-gray-900">
              <h2 className="border-b border-gray-200 px-6 py-4 text-2xl font-semibold dark:border-gray-800">
                Origin of Education
              </h2>
              <div className="p-6">
                {/* <p>
                  Almost there!. This is a big decision, and we want you to make
                  the right choice. So, before you select your programme, please
                  take some time to read through the{" "}
                  <Link href="#" className="text-blue-500 hover:underline">
                    admission requirements
                  </Link>
                  . They’ll give you a good idea of what we’re looking for and
                  help you choose the programme that’s right for you. When
                  you’re ready, click ‘Next’.
                </p> */}
                <p>
                  Let’s move forward! We need to know if you have studied in
                  Tanzania - NECTA or Tanzania NECTA before 1988, or if you are
                  a foreign student. This helps us tailor your application
                  process. Please select the appropriate option and click
                  ‘Next’.
                </p>
                <div className="my-3">
                  <Select
                    items={applicantOrigins}
                    label="Origin of Education"
                    placeholder={selectedApplicantOrigin}
                    className="max-w-xs"
                    onChange={(e) =>
                      handleApplicantOriginChange(e.target.value)
                    }
                  >
                    {(applicantOrigin) => (
                      <SelectItem key={applicantOrigin.value}>
                        {applicantOrigin.label}
                      </SelectItem>
                    )}
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentStep === 4 && (
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <Image
                width={640}
                height={427}
                className="w-full rounded-xl"
                src="/ApplicationImages/stepFive.jpg"
                alt="Image Description"
              />
            </div>
            <div className="rounded-lg bg-white shadow-md dark:bg-gray-900">
              <h2 className="border-b border-gray-200 px-6 py-4 text-2xl font-semibold dark:border-gray-800">
                Highest Education Level
              </h2>
              <div className="p-6">
                <h2 className="font-semibold">
                  Now, let’s talk about your academic achievements!
                </h2>
                <p>
                  {`Based on the application type you selected (${selectedApplicationType}), please choose your highest level of education from the dropdown menu. This will help us understand your academic background better. Remember, every step you’ve taken in your academic journey counts.`}
                </p>
                <div className="my-3">
                  <Select
                    items={getEducationLevels(selectedApplicationType)}
                    label="Application Type"
                    placeholder={selectedEducationLevel}
                    className="max-w-xs"
                    onChange={(e) => handleEducationLevelChange(e.target.value)}
                  >
                    {(item) => (
                      <SelectItem key={item.value}>{item.label}</SelectItem>
                    )}
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentStep === 5 && (
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <Image
                width={640}
                height={427}
                className="w-full rounded-xl"
                src="/ApplicationImages/stepFive.jpg"
                alt="Image Description"
              />
            </div>
            <div className="rounded-lg bg-white shadow-md dark:bg-gray-900">
              <h2 className="border-b border-gray-200 px-6 py-4 text-2xl font-semibold dark:border-gray-800">
                Form IV Index Number
              </h2>
              <div className="p-6">
                <p>
                  Excellent! Now, let’s register your Form IV Index Number. This
                  is your unique identifier and cannot be changed once
                  registered, so please double-check to make sure it’s correct!
                  This is your unique academic fingerprint. When you’re ready,
                  click ‘Next’.
                </p>
                <div className="p-6">
                  <Input
                    onChange={(event) =>
                      handleInputChange(
                        "indexNumber",
                        event.currentTarget.value,
                      )
                    }
                    value={(formSteps[5] as FormStep2).indexNumber || ""}
                    label=" Form IV Index Number"
                    labelPlacement="outside"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {currentStep === 6 && (
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <Image
                width={640}
                height={427}
                className="w-full rounded-xl"
                src="/ApplicationImages/stepOne.jpg"
                alt="Image Description"
              />
            </div>
            <div className="rounded-lg bg-white shadow-md dark:bg-gray-900">
              <h2 className="border-b border-gray-200 px-6 py-4 text-2xl font-semibold dark:border-gray-800">
                Warm Welcome
              </h2>
              <div className="p-6">
                <p>
                  Welcome to our University Application Portal! We’re delighted
                  that you’re considering us for your academic journey. We
                  promise to make your application process as smooth and
                  enjoyable as possible. Ready to embark on this exciting
                  journey? Click ‘Next’ to get started!
                </p>
              </div>
            </div>
          </div>
        )}
      </form>

      <div className="my-2 flex w-full justify-end">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div></div>
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
};

export default Page;
