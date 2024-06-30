"use client";
import { FC } from "react";
import { Cloud, CreditCard, Keyboard, LifeBuoy, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ISession, IUser } from "@/types/types.global";

interface PageProps {
  session: ISession | null;
}

const Profile: FC<PageProps> = ({ session }) => {
  const profileMenuItems = [
    {
      label: "My Profile",
      icon: Cloud, // Replace with appropriate icon
      action: () => console.log("Navigate to My Profile"),
    },
    {
      label: "Edit Profile",
      icon: CreditCard, // Replace with appropriate icon
      action: () => console.log("Navigate to Edit Profile"),
    },
    {
      label: "Settings",
      icon: Keyboard, // Replace with appropriate icon
      action: () => console.log("Navigate to Settings"),
    },
    {
      label: "Support",
      icon: LifeBuoy, // Replace with appropriate icon
      action: () => console.log("Navigate to Support"),
    },
    {
      label: "Log Out",
      icon: LogOut, // Replace with appropriate icon
      action: () => signOut(),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            src={session?.image ?? "https://github.com/shadcn.png"}
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{session?.name ?? "My Account"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {profileMenuItems.map((item, index) => (
            <DropdownMenuItem key={index} onClick={item.action}>
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.label}</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
