import z from "zod";

export const schema = z.object({
  name: z.string().min(1).max(255),
});

export type Body = z.infer<typeof schema>;
