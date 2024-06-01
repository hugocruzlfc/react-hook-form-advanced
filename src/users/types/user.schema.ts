import { z } from "zod";
import { patterns } from "../../constants";

export const userSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .refine((text) => patterns.email.test(text), {
      message: "Invalid email",
    }),
  states: z.array(z.string()).min(1).max(2),
});

export type UserSchema = z.infer<typeof userSchema>;

export const defaultValues: UserSchema = {
  name: "",
  email: "",
  states: [],
};
