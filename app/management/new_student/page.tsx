"use client";

import { Input, Button } from "@nextui-org/react";
import { uploadStudentImage } from "@/server/actions/upload";
import Image from "next/image";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlineErrorOutline } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { BsUpload } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import logo from "@/public/logo.png";
import z from "zod";
import { useRouter } from "next/navigation";
import { useState, useRef, ChangeEvent } from "react";
import { Span } from "next/dist/trace";

const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }).max(100, {
    message: "First name must be no more than 100 characters long",
  }),
  lastName: z.string().min(1, { message: "Last name is required" }).max(100, {
    message: "Last name must be no more than 100 characters long",
  }),
});

const imageSchema = z.object({
  image: z
    .any()
    .optional()
    .nullable()
    .refine((file) => file && file.size <= 500 * 1024, {
      message: "Image should be less than 500KB",
    }),
});

type FormData = z.infer<typeof schema>;

const NewStudentPage = () => {
  const router = useRouter();
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

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      const formData = new FormData();

      // Append the image to formData only if it exists
      if (image) {
        const imageValidation = imageSchema.safeParse({ image });

        if (!imageValidation.success) {
          setError(imageValidation.error.errors[0].message);
          throw new Error("Error validating image");
        } else {
          formData.append("image", image);
          setError("");
        }
      }

      // Append other data to formData
      Object.keys(data).forEach((key) => {
        formData.append(key, (data as any)[key]);
      });

      // FIXME: Use two api one for image and the other for data
      console.log("Data: ", data);
      const response = await fetch("/api/students/add_new_student", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }
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
    <div className="mx-auto px-36 py-8">
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
                <span className="text-small flex items-center gap-x-2">
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
              {...register("lastName")}
              type="text"
              label="Last Name"
              labelPlacement="outside"
            />

            {errors.lastName?.message && (
              <span className="flex items-center gap-x-1 text-red-600">
                <MdOutlineErrorOutline />
                {errors.lastName.message}
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
