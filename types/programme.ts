import { z } from "zod";

export const schema = z.object({
  name: z.string().min(1, { message: "Programme name is required" }),
  levelName: z.string().min(1, { message: "Level name is required" }),
  code: z.string().min(1, { message: "Programme code is required" }),
  tuitionFee: z.number(),
  duration: z
    .number()
    .min(1, { message: "Duration must be more than 1 year" })
    .max(4, { message: "Duration must be less than 4 years" }),
  status: z.enum(["FULL_TIME", "PART_TIME"]),
});

export type Programme = z.infer<typeof schema>;
