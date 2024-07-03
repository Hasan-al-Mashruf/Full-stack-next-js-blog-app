"use client";
import { postNewComment } from "@/apis/apis";
import { isAxiosError } from "axios";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { FC, useEffect, useState } from "react";

interface Inputs {
  content: string;
}

const CommentForm: FC<{ blogId: string }> = ({ blogId }) => {
  const [loader, setLoader] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      content: "",
    },
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoader(true);
      const response = await postNewComment(data, blogId);
      console.log({ response });
      if (response.status) {
        toast.success("new Comments");
        router.refresh();
        reset();
      }
    } catch (error) {
      console.log(error);
      if (isAxiosError(error)) {
        const response: any = error.response;
        toast.error(response?.data?.message ?? "Something went wrong");
      }
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (watch("content")) {
      setIsDisabled(false);
      return;
    }
    setIsDisabled(true);
  }, [watch("content")]);

  console.log({ isDisabled });

  return (
    <form
      className="max-w-2xl bg-white rounded-lg border p-2 mx-auto mt-20"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="px-3 mb-2 mt-2">
        <textarea
          {...register("content", { required: true })}
          placeholder="comment"
          className="w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
        />
      </div>
      <div className="flex justify-end px-4">
        <Button type="submit" variant={loader ? "outline" : "default"}>
          {loader ? (
            <img src="/loader.svg" alt="" className="h-10 mx-auto" />
          ) : (
            "Comment"
          )}
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
