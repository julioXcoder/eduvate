"use client";

import {
  FieldValues,
  useForm,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define your form schemas
const firstNameSchema = z.object({
  firstName: z.string().nonempty({ message: "First name is required" }),
});

type FirstNameFormValues = z.infer<typeof firstNameSchema>;

const secondNameSchema = z.object({
  secondName: z.string().nonempty({ message: "Second name is required" }),
});

type SecondNameFormValues = z.infer<typeof secondNameSchema>;

// Create a form step component
function FormStep<T extends FieldValues>({
  schema,
  children,
}: {
  schema: z.ZodSchema<T>;
  children: React.ReactNode;
}) {
  const methods = useForm<T>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => console.log(data))}>
        {children}
        <button type="submit">Next</button>
      </form>
    </FormProvider>
  );
}

// Create your form fields
function TextField({ name, label }: { name: string; label: string }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label>{label}</label>
      <input {...register(name)} />
      {/* {errors[name] && errors[name].message && <p>{errors[name].message}</p>} */}
    </div>
  );
}

// Use the form step and text field components to create your multi-step form
function MyForm() {
  return (
    <div>
      <FormStep schema={firstNameSchema}>
        <TextField name="firstName" label="First Name" />
      </FormStep>

      <FormStep schema={secondNameSchema}>
        <TextField name="secondName" label="Second Name" />
      </FormStep>
    </div>
  );
}

export default MyForm;
