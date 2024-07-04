import { getCurrentUser } from "@/lib/getCurrentUser";
import { IUser } from "@/types/types.global";

export async function userMiddleware(): Promise<Partial<IUser>> {
  const user = await getCurrentUser();

  if (!user || !user.id) throw new Error("User down not exist");
  return user as IUser;
}
