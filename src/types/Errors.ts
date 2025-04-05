import { z } from "zod";

export interface Errors {
    email?: string;
    password?: string;
    [key: string]: string | undefined;
  }

  export const loginAndRegisterSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });