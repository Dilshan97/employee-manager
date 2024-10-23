/*
*   Copyright (c) 2024 Dilshan Ramesh
*   All rights reserved.
*/
import { FC } from "react";
import cover from "@/assets/images/cover.png";
import Image from "next/image";

interface AuthLayoutProps {
    children: React.ReactNode;
}
const AuthLayout:FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen max-h-screen overflow-hidden">
      <div className="lg:flex hidden lg:w-6/12">
        <Image src={cover} alt="" className="object-cover w-full h-full"/>
      </div>
      <div className="flex items-center justify-center bg-white lg:w-6/12 w-full">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
