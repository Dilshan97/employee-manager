/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import React from "react";
import avatar from "@/assets/images/avatar.png";
import Image from "next/image";
import { ArrowDown2 } from "iconsax-react";

const Header = () => {
  return (
    <div className="min-h-20 flex justify-end bg-white border border-b-[#EAEAEA]">
      <div className="flex items-center gap-2 mx-6">
        <Image src={avatar} alt="avatar" className="object-cover w-10" />
        <ArrowDown2 size={18} />
      </div>
    </div>
  );
};

export default Header;
