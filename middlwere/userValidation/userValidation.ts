import { getCurrentUser } from "@/lib/getCurrentUser";
import { IUser } from "@/types/types.global";

export async function userMiddleware(): Promise<Partial<IUser>> {
  const user = await getCurrentUser();

  if (!user || !user.id || !user.followingCat) {
    throw new Error(
      "User does not exist or following categories are not defined"
    );
  }
  return user as IUser;
}
