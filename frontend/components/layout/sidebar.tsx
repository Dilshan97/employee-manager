/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import Link from "next/link";
import Image from "next/image";
import React from "react";
import avatar from "@/assets/images/avatar.png";
import { ArrowDown2, User } from "iconsax-react";

const Sidebar = () => {
  return (
    <div className="h-screen max-h-screen min-w-60 max-w-60 bg-[#151718] flex flex-col justify-between">
      <div>
        <div className="min-h-20 flex justify-center items-center">
          <h1 className="text-white text-2xl">ASSIGNMENT</h1>
        </div>

        <div className="flex flex-col gap-2">
          <Link
            href="/system-user"
            className="flex min-h-14 gap-2 w-full items-center px-8"
          >
            <User className="text-white" />
            <h1 className="text-white">System User</h1>
          </Link>
        </div>
      </div>

      <div className="flex border-t-2 border-t-[#303031] min-h-32 items-center justify-center">
        <div className="flex items-center gap-2">
          <Image src={avatar} alt="" className="w-12" />
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-1">
              <h1 className="text-white text-sm font-bold">Jany Jone</h1>
              <ArrowDown2 size={16} className="text-gray-400" />
            </div>
            <h1 className="text-gray-400 text-xs">janyjone@gmail.com</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
