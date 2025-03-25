import { z } from "zod";

export const taskSchema = z
  .object({
    title: z.string().min(2).max(255, "max 255 chacacters"),
    description: z.string().min(2).max(255, "max 255 chacacters"),
    date: z.string().date("date prooperly formatted"),
    status: z.enum(["pending", "completed"]).optional(),

  })
  .strict();

export type TaskDataTypes = z.infer<typeof taskSchema>;
