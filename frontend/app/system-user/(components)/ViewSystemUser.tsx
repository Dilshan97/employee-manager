/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import { Eye } from "iconsax-react";
import React, { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import userView from "@/assets/images/user-view.png";
import { ISystemUser } from "@/store/slices/systemUserSlice";

interface ViewSystemUserProps {
  systemUser: ISystemUser;
}
const ViewSystemUser: FC<ViewSystemUserProps> = ({ systemUser }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Eye size={20} className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="p-0 text-white border-none">
        <DialogHeader className="bg-black text-white p-3 rounded-tl-lg rounded-tr">
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>
        <DialogDescription className="px-4 py-6 mb-6">
          <div className="flex items-center justify-around">
            <div className="flex flex-col gap-5">
              <p>First Name : {systemUser.firstName}</p>
              <p>Last Name : {systemUser.lastName}</p>
              <p>Email : {systemUser.email}</p>
              <p>Contact Number : {systemUser.phoneNumber}</p>
              <p>Role : {systemUser.role}</p>
              <p>NIC Number : {systemUser.NIC}</p>
            </div>
            <Image src={userView} alt="" className="w-28 h-28" />
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default ViewSystemUser;
