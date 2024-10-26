/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
"use client";
import { Card } from "@/components/ui/card";
import React, { FC } from "react";
import { Edit2 } from "iconsax-react";
import Link from "next/link";
import user from "@/assets/images/user.png";
import Image from "next/image";
import { ISystemUser } from "@/store/slices/systemUserSlice";
import DeleteSystemUser from "./DeleteSystemUser";
import ViewSystemUser from "./ViewSystemUser";
interface GridViewProps {
  data: ISystemUser[];
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
                <ViewSystemUser systemUser={systemUser} />

                <Link href={`/system-user/edit/${systemUser._id}`}>
                  <Edit2 size={22} className="cursor-pointer" />
                </Link>

                <DeleteSystemUser
                  handleDelete={() => handleDelete(systemUser._id)}
                />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default GridView;
