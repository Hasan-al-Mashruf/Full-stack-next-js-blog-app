import { ZodSchema, z } from "zod";

export const blogSchema: ZodSchema = z.object({
  title: z.string().min(5),
  content: z.string().min(30),
  categories: z.array(z.any()),
  featuredImg: z.string().url(),
});
