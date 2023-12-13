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

const FormStep1Schema = z.object({});
const FormStep2Schema = z.object({
  indexNumber: z.string().refine((val) => val.trim().length > 0, {
    message: "Form IV Index Number is required",
  }),
});
const FormStep3Schema = z.object({});
const FormStep4Schema = z.object({});
const FormStep5Schema = z.object({});

type FormStep1 = z.infer<typeof FormStep1Schema>;
type FormStep2 = z.infer<typeof FormStep2Schema>;
type FormStep3 = z.infer<typeof FormStep3Schema>;
type FormStep4 = z.infer<typeof FormStep4Schema>;
type FormStep5 = z.infer<typeof FormStep5Schema>;

const Page = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formSteps, setFormSteps] = useState<
    (FormStep1 | FormStep2 | FormStep3 | FormStep4 | FormStep5)[]
  >([{}, { indexNumber: "" }, {}, {}, {}]);
  const [errorMessage, setErrorMessage] = useState("");

  const validationSchemas = [
    FormStep1Schema,
    FormStep2Schema,
    FormStep3Schema,
    FormStep4Schema,
    FormStep5Schema,
  ];

  const handleInputChange = (
    field: keyof FormStep2,
    value: string | number,
  ) => {
    const updatedFormSteps = [...formSteps];

    if (currentStep === 1) {
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
    <div className="mx-auto mt-14 px-5 py-8 md:px-20 xl:px-36">
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
                Welcome Note
              </h2>
              <div className="p-6">
                <p>
                  Welcome to our University Application Portal! We’re thrilled
                  that you’re considering us for your academic journey. Our aim
                  is to make your application process as smooth as possible.
                  Ready to get started? Click ‘Next’ to proceed.
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
                Form IV Index Number
              </h2>
              <div className="p-6">
                <p>
                  Great! Let’s start with your Form IV Index Number. This is
                  your unique identifier. Once you’ve registered with your Form
                  IV Index Number, it’s set in stone and can’t be changed. So,
                  please double-check to make sure it’s correct! When you’re
                  ready, click ‘Next’.
                </p>
              </div>
              <div className="p-6">
                <Input
                  onChange={(event) =>
                    handleInputChange("indexNumber", event.currentTarget.value)
                  }
                  value={(formSteps[1] as FormStep2).indexNumber || ""}
                  label=" Form IV Index Number"
                  labelPlacement="outside"
                />
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
                Application Fee
              </h2>
              <div className="p-6">
                <p>
                  Next, let’s talk about the application fee. To process your
                  application, we require a small fee. Please make sure to pay
                  this within four days of starting your application. If the fee
                  isn’t paid within this time, we’ll have to delete your account
                  permanently. We don’t want that to happen, so please don’t
                  forget! Click ‘Next’ when you’re ready to proceed.
                </p>
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
                Choosing Your Programme
              </h2>
              <div className="p-6">
                <p>
                  Almost there!. This is a big decision, and we want you to make
                  the right choice. So, before you select your programme, please
                  take some time to read through the{" "}
                  <Link href="#" className="text-blue-500 hover:underline">
                    admission requirements
                  </Link>
                  . They’ll give you a good idea of what we’re looking for and
                  help you choose the programme that’s right for you. When
                  you’re ready, click ‘Next’.
                </p>
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
                Final Note
              </h2>
              <div className="p-6">
                <p>
                  You’re doing great! Remember, we’re here to help you every
                  step of the way. If you have any questions or run into any
                  issues, don’t hesitate to reach out. When you’re ready, click
                  ‘Submit’ to finalize your application. Good luck!
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
};

export default Page;
