"use client";
import React, { FC } from "react";
import { Button } from "../ui/button";
import { followUser } from "@/apis/apis";
import { useRouter } from "next/navigation";

const FollowBTN: FC<{ authorId: string }> = ({ authorId }) => {
  const router = useRouter();
  const followNewUser = async () => {
    try {
      const response = await followUser(authorId);
      if (response.status) {
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return <Button onClick={followNewUser}>Follow</Button>;
};

export default FollowBTN;
