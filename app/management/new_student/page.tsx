"use client";

import { Input, Button } from "@nextui-org/react";
import { uploadStudentImage } from "@/server/actions/upload";
import Image from "next/image";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlineErrorOutline } from "react-icons/md";
import { IoMdTrash, IoMdEye, IoMdEyeOff } from "react-icons/io";
import { BsUpload } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import z from "zod";
import { useState, useRef, ChangeEvent } from "react";
import { UploadData, UploadFileResponse } from "@/types/uploadthings";

const phoneRegex = /^\+\d{3}\d{6,9}$/;

const schema = z
  .object({
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

const imageSchema = z.object({
  image: z
    .any()
    .optional()
    .nullable()
    .refine((file) => file && file.size <= 200 * 1024, {
      message: "Image should be less than 200KB",
    }),
});

type FormData = z.infer<typeof schema>;

const NewStudentPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<String>("");
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const toggleShowPass = () => setShowPass(!showPass);
  const toggleConfirmPass = () => setShowConfirm(!showConfirm);

  const onSubmit = async (formData: FormData) => {
    setIsLoading(true);

    try {
      let uploadImageData: UploadData = {};

      // Append the image to formData only if it exists
      // if (image) {
      //   const imageValidation = imageSchema.safeParse({ image });

      //   if (!imageValidation.success) {
      //     setError(imageValidation.error.errors[0].message);
      //     throw new Error("Error validating image");
      //   } else {
      //     setError("");

      //     formData.append("image", image);

      //     const response = await fetch("/api/students/upload_profile_image", {
      //       method: "POST",
      //       body: formData,
      //     });

      //     if (!response.ok) {
      //       setError("Upload failed");
      //       throw new Error("Upload failed");
      //     }

      //     const uploadedImage: UploadFileResponse = await response.json();

      //     const { data: imageData, error } = uploadedImage;

      //     if (imageData) {
      //       uploadImageData = imageData;
      //     } else if (error) {
      //       // FIXME: Remove error
      //       console.log("Error", error);
      //       setError("Upload failed");
      //       throw new Error("Upload failed");
      //     }
      //   }
      // }

      // FIXME: Call another api to save the image data and image url
      // console.log("Image url", uploadImageData.url);
      // console.log("Image key", uploadImageData.key);
      const newData = { ...formData, image: "samdckewmlwlscmlaw" };
      console.log("form data:", newData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Get the first file from the input
    const file = event.target.files ? event.target.files[0] : null;
    // Update the image state variable
    setImage(file);
    // Create a temporary URL for the file
    const url = file ? URL.createObjectURL(file) : null;
    // Update the preview state variable
    setPreview(url);

    event.target.value = "";
  };

  const handleFileRemove = () => {
    setImage(null);
    setPreview(null);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mx-auto px-5 py-8 md:px-20 xl:px-36">
      <h1 className="mb-6">Add new student</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="mb-4 flex w-full items-center justify-center gap-x-4">
            <input
              ref={fileInputRef}
              type="file"
              id="image"
              name="image"
              accept="image/jpeg, image/jpg, image/gif"
              onChange={handleImageChange}
              className="hidden"
            />
            {preview ? (
              <Image
                alt="preview"
                width={100}
                height={100}
                className="inline-block h-20 w-20 rounded-full object-cover"
                src={preview}
              />
            ) : (
              <Image
                alt="preview"
                width={100}
                height={100}
                className="inline-block h-20 w-20 rounded-full border border-gray-500 object-cover"
                src="/profile/avatar.svg"
              />
            )}

            <div className="flex flex-col gap-2">
              <Button
                color="success"
                variant="ghost"
                onClick={handleButtonClick}
                startContent={<BsUpload size={16} />}
              >
                {image ? "Change" : "Upload"} image
              </Button>
              {image && (
                <span className="flex items-center gap-x-2 text-small">
                  {image.name}{" "}
                  <IoMdTrash
                    onClick={handleFileRemove}
                    className="cursor-pointer text-red-600"
                    size={22}
                  />
                </span>
              )}
            </div>
          </div>
          {error && (
            <span className="flex items-center gap-x-1 text-red-600">
              <MdOutlineErrorOutline />
              {error}
            </span>
          )}
        </div>
        <div className="mb-6 grid gap-6 md:grid-cols-2">
          <div>
            <Input
              {...register("firstName")}
              type="text"
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
              isClearable
              onClear={() => {}}
              {...register("lastName")}
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

        <Button isDisabled={!isValid || loading} type="submit" color="primary">
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default NewStudentPage;
