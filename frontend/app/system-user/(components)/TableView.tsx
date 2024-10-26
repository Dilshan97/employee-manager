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

import Link from "next/link";
import React, { FC } from "react";
import { ISystemUser } from "@/store/slices/systemUserSlice";
import { Edit2 } from "iconsax-react";
import ViewSystemUser from "./ViewSystemUser";
import DeleteSystemUser from "./DeleteSystemUser";
interface TableViewProps {
  data: ISystemUser[];
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
                <ViewSystemUser systemUser={systemUser} />

                <Link href={`/system-user/edit/${systemUser._id}`}>
                  <Edit2 size={20} className="cursor-pointer" />
                </Link>

                <DeleteSystemUser
                  handleDelete={() => handleDelete(systemUser._id)}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableView;
