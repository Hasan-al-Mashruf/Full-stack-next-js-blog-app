import { blogSchema } from "../schemas/zodSchemas";

export function blogInputValidate(requestData: any) {
  try {
    const parsedData = blogSchema.parse(requestData);
    return parsedData;
  } catch (error) {
    throw new Error("Validation Error");
  }
}
