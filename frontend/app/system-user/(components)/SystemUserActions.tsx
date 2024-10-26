/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { systemUserActions } from "@/store/slices/systemUserSlice";
import { RootState } from "@/store/store";
import { Add, Category, Filter, Firstline } from "iconsax-react";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const SystemUserActions = () => {
  const dispatch = useDispatch();
  const { gridMode } = useSelector((state: RootState) => state.systemUser);

  return (
    <div className="flex flex-col gap-3 mb-6">
      <h1 className="text-xl text-gray-500">System User</h1>
      <div className="flex justify-between items-center">
        <Input type="text" placeholder="Search" className="w-1/3 rounded-lg" />
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="py-4.5 text-gray-500"
            onClick={() => dispatch(systemUserActions.toggleMode())}
          >
            {gridMode ? <Firstline /> : <Category />}
          </Button>
          <Button variant="outline" className="text-gray-500">
            <Filter />
            Filter
          </Button>
          <Link
            href="/system-user/add"
            className={buttonVariants({
              variant: "outline",
              className: "text-gray-500",
            })}
          >
            <Add />
            Add New
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SystemUserActions;
