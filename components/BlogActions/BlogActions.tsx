"use client";
import { followUser, reportUser, showLess, showMore } from "@/apis/apis";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { BookmarkMinus, Grip } from "lucide-react";
import { Cloud, CreditCard, Keyboard, LifeBuoy, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";

const BlogActions: FC<{ blogId: string; authorId: string }> = ({
  blogId,
  authorId,
}) => {
  const router = useRouter();

  const addNewfavCat = async () => {
    try {
      const response = await showMore(blogId);
      if (response.status) {
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removefavCat = async () => {
    try {
      const response = await showLess(blogId);
      if (response.status) {
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  const reportNewUser = async () => {
    try {
      const response = await reportUser(authorId);
      if (response.status) {
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const profileMenuItems = [
    {
      label: "Show More",
      icon: Cloud, // Replace with appropriate icon
      action: addNewfavCat,
    },
    {
      label: "Show Less",
      icon: CreditCard, // Replace with appropriate icon
      action: removefavCat,
    },
    {
      label: "follow Author",
      icon: Keyboard, // Replace with appropriate icon
      action: followNewUser,
    },
    {
      label: "Report Author",
      icon: LifeBuoy, // Replace with appropriate icon
      action: reportNewUser,
    },
  ];

  return (
    <div className="flex gap-3">
      <BookmarkMinus className="w-5" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Grip className="w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            {profileMenuItems.map((item, index) => (
              <DropdownMenuItem key={index} onClick={item.action}>
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default BlogActions;
