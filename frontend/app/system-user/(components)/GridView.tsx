/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card } from "@/components/ui/card";
import React, { FC } from "react";
import { Edit2, Eye, Trash } from "iconsax-react";
import Link from "next/link";
import user from "@/assets/images/user.png";
import userView from "@/assets/images/user-view.png";
import Image from "next/image";
import { ISystemUser } from "@/store/slices/systemUserSlice";

interface GridViewProps {
  data: any[];
  handleDelete: (_id: string) => void;
}
const GridView: FC<GridViewProps> = ({ data, handleDelete }) => {
  return (
    <div className="grid lg:grid-cols-5 grid-cols-2 gap-4">
      {data?.map((systemUser: ISystemUser) => (
        <Card key={systemUser._id} className="flex flex-col col-span-1">
          <Image src={user} alt="" className="w-full" />
          <div className="flex flex-col gap-1 p-3 w-full overflow-clip">
            <p>
              {systemUser.firstName} {systemUser.lastName}
            </p>
            <p>{systemUser.email}</p>
            <p>{systemUser.phoneNumber}</p>
            <p>{systemUser.gender === "M" ? "Male" : "Female"}</p>
            <div className="flex justify-between">
              <p>{systemUser.NIC}</p>
              <div className="flex items-center gap-2">
                <Dialog>
                  <DialogTrigger>
                    <Eye size={18} className="cursor-pointer" />
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

                <Link href={`/system-user/edit/${systemUser._id}`}>
                  <Edit2 size={18} className="cursor-pointer" />
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Trash size={18} className="cursor-pointer" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete from database.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                      onClick={() => handleDelete(systemUser._id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default GridView;
