/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

import Link from "next/link";
import Image from "next/image";
import userView from "@/assets/images/user-view.png";
import React, { FC } from "react";
import { ISystemUser } from "@/store/slices/systemUserSlice";
import { Edit2, Eye, Trash } from "iconsax-react";

interface TableViewProps {
  data: any[];
  handleDelete: (_id: string) => void;
}
const TableView: FC<TableViewProps> = ({ data, handleDelete }) => {
  return (
    <Table className="rounded-lg">
      <TableHeader className="bg-gray-100">
        <TableRow>
          <TableHead className="py-4">Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Contact Number</TableHead>
          <TableHead className="py-4 text-center">Gender</TableHead>
          <TableHead className="py-4 text-center">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data?.map((systemUser: ISystemUser) => (
          <TableRow key={systemUser._id}>
            <TableCell className="font-medium py-4">
              {systemUser.firstName} {systemUser.lastName}
            </TableCell>
            <TableCell>{systemUser.email}</TableCell>
            <TableCell>{systemUser.phoneNumber}</TableCell>
            <TableCell className="text-center">
              {systemUser.gender === "M" ? "Male" : "Female"}
            </TableCell>
            <TableCell className="text-center">
              <div className="flex justify-center gap-2">
                <Dialog>
                  <DialogTrigger>
                    <Eye size={22} className="cursor-pointer" />
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
                  <Edit2 size={22} className="cursor-pointer" />
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Trash size={22} className="cursor-pointer" />
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
                        type="button"
                        onClick={() => handleDelete(systemUser._id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableView;
