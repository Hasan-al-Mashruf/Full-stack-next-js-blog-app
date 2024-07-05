import { getSuggetedUsers } from "@/apis/serverApis";
import UserSuggestionCard from "./UserSuggestionCard";
import { IUser } from "@/types/types.global";

const UserSuggestion = async () => {
  const { data } = await getSuggetedUsers();
  return (
    <div className="flex flex-col gap-3">
      {data?.map((suggetedUser: Partial<IUser>) => (
        <UserSuggestionCard suggestedUser={suggetedUser} />
      ))}
    </div>
  );
};

export default UserSuggestion;
