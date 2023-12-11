"use client";

import { useParams } from "next/navigation";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlineErrorOutline } from "react-icons/md";
import { addProgramme } from "@/server/actions/programme";
import z from "zod";
import { useState } from "react";
import { schema } from "@/types/programme";

const programmeYears = [
  { label: "1 year", value: "1" },
  { label: "2 years", value: "2" },
  { label: "3 years", value: "3" },
  { label: "4 years", value: "4" },
];

const programmeStatus = [
  { label: "Full Time", value: "FULL_TIME" },
  { label: "Part Time", value: "PART_TIME" },
];

type FormData = z.infer<typeof schema>;

const NewProgramme = () => {
  const params = useParams();
  const [loading, setIsLoading] = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { collegeId, departmentId } = params;

  const onSubmit = async (formData: FormData) => {
    setIsLoading(true);
    await addProgramme(formData, departmentId as string, collegeId as string);
    setIsLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 grid gap-5">
          <div>
            <Input
              {...register("name")}
              type="text"
              label="Programme Name"
              placeholder="Enter Programme Name"
              labelPlacement="outside"
            />
            {errors.name?.message && (
              <span className="flex items-center gap-x-1 text-red-600">
                <MdOutlineErrorOutline />
                {errors.name.message}
              </span>
            )}
          </div>
          <div>
            <Input
              {...register("levelName")}
              type="text"
              label="Programme Level Name"
              placeholder="Enter Programme Level Name"
              labelPlacement="outside"
            />
            {errors.levelName?.message && (
              <span className="flex items-center gap-x-1 text-red-600">
                <MdOutlineErrorOutline />
                {errors.levelName.message}
              </span>
            )}
          </div>
          <div>
            <Input
              {...register("code")}
              type="text"
              label="Programme Code"
              placeholder="Enter Programme Code"
              labelPlacement="outside"
            />
            {errors.code?.message && (
              <span className="flex items-center gap-x-1 text-red-600">
                <MdOutlineErrorOutline />
                {errors.code.message}
              </span>
            )}
          </div>
          <div>
            <Input
              {...register("tuitionFee", {
                setValueAs: (value) => parseFloat(value),
              })}
              type="number"
              label="Programme Tuition Fee"
              placeholder="Enter Programme Tuition Fee"
              labelPlacement="outside"
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-small text-default-400">TSH</span>
                </div>
              }
            />
            {errors.tuitionFee?.message && (
              <span className="flex items-center gap-x-1 text-red-600">
                <MdOutlineErrorOutline />
                {errors.tuitionFee.message}
              </span>
            )}
          </div>
          <div>
            <Controller
              name="duration"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Select duration"
                  onChange={(event) =>
                    field.onChange(Number(event.target.value))
                  }
                >
                  {programmeYears.map((programme) => (
                    <SelectItem key={programme.value} value={programme.value}>
                      {programme.label}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
            {errors.duration?.message && (
              <span className="flex items-center gap-x-1 text-red-600">
                <MdOutlineErrorOutline />
                {errors.duration.message}
              </span>
            )}
          </div>
          <div>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Select status">
                  {programmeStatus.map((programme) => (
                    <SelectItem key={programme.value} value={programme.value}>
                      {programme.label}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
            {errors.status?.message && (
              <span className="flex items-center gap-x-1 text-red-600">
                <MdOutlineErrorOutline />
                {errors.status.message}
              </span>
            )}
          </div>
        </div>
        {/* <Button
          className="w-full"
          isDisabled={!isValid || loading}
          type="submit"
          color="default"
        >
          {loading ? "Submitting..." : "Submit"}
        </Button> */}
        <button
          disabled={!isValid || loading}
          type="submit"
          className="w-full rounded-lg bg-blue-500 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-600"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default NewProgramme;
