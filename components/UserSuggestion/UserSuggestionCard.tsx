import { IUser } from "@/types/types.global";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FC } from "react";
import FollowBTN from "./FollowBTN";

const UserSuggestionCard: FC<{ suggestedUser: Partial<IUser> }> = ({
  suggestedUser,
}) => {
  return (
    <div className="flex items-center gap-2 ">
      <Avatar className="w-10 h-10">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <div className="flex gap-2">
          <div>{suggestedUser?.name}</div>
          <span>.</span>
          <FollowBTN authorId={suggestedUser?.id!} />
        </div>
      </div>
    </div>
  );
};

export default UserSuggestionCard;
