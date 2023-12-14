"use client";

import { useState } from "react";
import Image from "next/image";
import z from "zod";
import {
  Input,
  Button,
  Select,
  SelectItem,
  Radio,
  RadioGroup,
  Textarea,
  Spinner,
} from "@nextui-org/react";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { MdOutlineErrorOutline } from "react-icons/md";
import { IoMdTrash, IoMdEye, IoMdEyeOff } from "react-icons/io";

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

const phoneRegex = /^\+\d{3}\d{6,9}$/;

const schema = z
  .object({
    userName: z.string().min(1, { message: "User name is required" }),
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().min(8, {
      message: "Confirm password must be at least 8 characters long",
    }),
    phone: z
      .string()
      .optional()
      .refine((value) => {
        if (!value) return true;
        return phoneRegex.test(value);
      }, "Please enter your phone number in the following format: '+255123456789"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

const Page = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedApplicationType, setSelectedApplicationType] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [selectedApplicantOrigin, setSelectedApplicantOrigin] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [selectedEducationLevel, setSelectedEducationLevel] = useState("");
  const [completedOLevel, setCompletedOLevel] = useState<"yes" | "no" | "">("");
  const [formIVIndex, setFormIVIndex] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [studentInformation, setStudentInformation] = useState({
    firstName: "Naruto",
    lastName: "Uzumaki",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const toggleShowPass = () => setShowPass(!showPass);
  const toggleConfirmPass = () => setShowConfirm(!showConfirm);

  let pages: any[] = new Array(7);

  const handleApplicationTypeChange = (selectedOption: string) => {
    const selectedApplicationTypeObject = applicationTypes.find(
      (applicationType) => applicationType.value === selectedOption,
    );

    setSelectedApplicationType(selectedApplicationTypeObject || null);
  };

  const handleApplicantOriginChange = (selectedOption: string) => {
    const selectedApplicationOriginObject = applicantOrigins.find(
      (applicationOrigin) => applicationOrigin.value === selectedOption,
    );

    setSelectedApplicantOrigin(selectedApplicationOriginObject || null);
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

  const handleNext = async () => {
    setErrorMessage("");

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

    if (currentStep === 5) {
      if (!formIVIndex) {
        setErrorMessage("Please Enter form IV index.");
        return;
      } else {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 6000));
        setIsLoading(false);
      }
    }

    if (currentStep < pages.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log(formIVIndex);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (formData: FormData) => {
    setIsLoading(true);

    try {
      const newData = { ...formData, formIVIndex };
      console.log("form data:", newData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isLastStep = currentStep === pages.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="mx-auto mt-14 px-5 py-8 md:px-20 xl:px-36">
      <h2 className="py-6 text-4xl font-semibold">
        Online Application Step {`(${currentStep + 1}/${pages.length})`}
      </h2>
      <div>
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
                    placeholder={selectedApplicationType?.label}
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
                    onChange={(e) =>
                      setCompletedOLevel(e.target.value as "yes" | "no" | "")
                    }
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
                    placeholder={selectedApplicantOrigin?.label}
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
                  {`Based on the application type you selected (${selectedApplicationType?.label}), please choose your highest level of education from the dropdown menu. This will help us understand your academic background better. Remember, every step you’ve taken in your academic journey counts.`}
                </p>
                <div className="my-3">
                  <Select
                    items={getEducationLevels(
                      selectedApplicationType?.value || "",
                    )}
                    label="Education Level"
                    placeholder={selectedEducationLevel}
                    className="max-w-xs"
                    onChange={(e) => setSelectedEducationLevel(e.target.value)}
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
                      setFormIVIndex(event.currentTarget.value)
                    }
                    value={formIVIndex}
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <Input
                    readOnly
                    {...register("userName")}
                    type="text"
                    value={formIVIndex}
                    label="User Name"
                    labelPlacement="outside"
                  />
                  {errors.userName?.message && (
                    <span className="flex items-center gap-x-1 text-red-600">
                      <MdOutlineErrorOutline />
                      {errors.userName.message}
                    </span>
                  )}
                </div>
                <div className="my-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <Input
                      readOnly
                      {...register("firstName")}
                      type="text"
                      value={studentInformation.firstName}
                      label="First Name"
                      placeholder="Enter First Name"
                      labelPlacement="outside"
                    />
                    {errors.firstName?.message && (
                      <span className="flex items-center gap-x-1 text-red-600">
                        <MdOutlineErrorOutline />
                        {errors.firstName.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Input
                      readOnly
                      {...register("lastName")}
                      value={studentInformation.lastName}
                      type="text"
                      label="Last Name"
                      placeholder="Enter Last Name"
                      labelPlacement="outside"
                    />

                    {errors.lastName?.message && (
                      <span className="flex items-center gap-x-1 text-red-600">
                        <MdOutlineErrorOutline />
                        {errors.lastName.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Input
                      {...register("password")}
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleShowPass}
                        >
                          {showPass ? (
                            <IoMdEyeOff className="pointer-events-none text-2xl text-default-400" />
                          ) : (
                            <IoMdEye className="pointer-events-none text-2xl text-default-400" />
                          )}
                        </button>
                      }
                      type={showPass ? "text" : "password"}
                      label="Password"
                      placeholder="Enter password"
                      labelPlacement="outside"
                    />

                    {errors.password?.message && (
                      <span className="flex items-center gap-x-1 text-red-600">
                        <MdOutlineErrorOutline />
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Input
                      {...register("confirmPassword")}
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleConfirmPass}
                        >
                          {showConfirm ? (
                            <IoMdEyeOff className="pointer-events-none text-2xl text-default-400" />
                          ) : (
                            <IoMdEye className="pointer-events-none text-2xl text-default-400" />
                          )}
                        </button>
                      }
                      type={showConfirm ? "text" : "password"}
                      label="Confirm Password"
                      placeholder="Confirm Password"
                      labelPlacement="outside"
                    />

                    {errors.confirmPassword?.message && (
                      <span className="flex items-center gap-x-1 text-red-600">
                        <MdOutlineErrorOutline />
                        {errors.confirmPassword.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Input
                      {...register("phone")}
                      type="text"
                      label="Phone Number"
                      placeholder="Enter your phone Number"
                      labelPlacement="outside"
                    />

                    {errors.phone?.message && (
                      <span className="flex items-center gap-x-1 text-red-600">
                        <MdOutlineErrorOutline />
                        {errors.phone.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button isDisabled={loading} color="danger">
                    Cancel Application
                  </Button>
                  <Button isDisabled={loading} type="submit" color="success">
                    {loading ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </form>
            </div>
            <div className="rounded-lg bg-white shadow-md dark:bg-gray-900">
              <h2 className="border-b border-gray-200 px-6 py-4 text-2xl font-semibold dark:border-gray-800">
                Account Creation
              </h2>
              <div className="p-6">
                <p>
                  Almost there! Now, let’s create your account. This will be
                  your gateway to complete the application process and beyond.
                  Please provide your contact information, including your phone
                  number and email address. Make sure they are both correct as
                  we will use them for all future communications. Next, create a
                  password for your account and confirm it. Remember, your
                  password should be strong and secure to protect your account.
                  Your username will be your Form IV Index Number. This is to
                  ensure uniqueness and easy recall. Once you’ve filled in all
                  the information, click ‘Submit’
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="my-2 flex w-full justify-end">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {loading && !errorMessage && (
          <div className="flex gap-3 text-blue-500">
            <span>
              Please hold on while we verify your Form IV index. We appreciate
              your patience.
            </span>{" "}
            <Spinner size="sm" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div></div>
        <div className={`flex gap-x-2 ${isLastStep ? "hidden" : ""}`}>
          <Button
            className={`${isFirstStep ? "hidden bg-gray-400" : "bg-blue-500"}`}
            onClick={handleBack}
            disabled={isFirstStep || loading}
          >
            Back
          </Button>
          <Button onClick={handleNext} disabled={loading}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
