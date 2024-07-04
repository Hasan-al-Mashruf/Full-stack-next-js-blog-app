import { IComment } from "@/types/types.global";
import { FC } from "react";

const CommentCard: FC<{ comment: IComment }> = ({ comment }) => {
  return (
    <section id="commentSection">
      <div className="border rounded-md p-3 ml-3 my-3">
        <div className="flex gap-3 items-center">
          <img
            src={
              comment?.user?.image ??
              "https://avatars.githubusercontent.com/u/22263436?v=4"
            }
            className="object-cover w-8 h-8 rounded-full border-2 border-emerald-400 shadow-emerald-400"
            alt="User avatar"
          />
          <h3 className="font-bold">{comment?.user?.name}</h3>
        </div>
        <p className="text-gray-600 mt-2">{comment?.content}</p>
      </div>
    </section>
  );
};

export default CommentCard;
