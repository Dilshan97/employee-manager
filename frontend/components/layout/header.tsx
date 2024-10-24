/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
"use client"
import React from "react";
import avatar from "@/assets/images/avatar.png";
import Image from "next/image";
import { ArrowDown2 } from "iconsax-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import useLogin from "@/hooks/useLogin";

const Header = () => {
  const { handleLogout } = useLogin();
  return (
    <div className="min-h-20 flex justify-end bg-white border border-b-[#EAEAEA]">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center gap-2 mx-6 cursor-pointer select-none">
            <Image src={avatar} alt="avatar" className="object-cover w-10" />
            <ArrowDown2 size={18} />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel className="cursor-pointer" onClick={handleLogout}>
            Logout
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;
