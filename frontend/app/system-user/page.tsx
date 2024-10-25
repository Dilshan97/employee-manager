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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
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

import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Add,
  Category,
  Edit2,
  Eye,
  Filter,
  Firstline,
  Trash,
} from "iconsax-react";
import Link from "next/link";
import user from "@/assets/images/user.png";
import userView from "@/assets/images/user-view.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { systemUserActions } from "@/store/slices/systemUserSlice";
import useFetchSystemUsers from "@/hooks/useFetchSystemUsers";
import { useSearchParams } from "next/navigation";
import useDeleteSystemUser from "@/hooks/useDeleteSystemUser";

export default function Page() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const { gridMode } = useSelector((state: RootState) => state.systemUser);

  const { loading, systemUsers, error, pagination } = useFetchSystemUsers();
  const { handleDelete } = useDeleteSystemUser();

  if (error) return <p>Error: {error}</p>;

  if (loading) return <p>Loading...</p>;

  console.log(systemUsers);
  
  return (
    <>
      <div className="flex flex-col gap-3 mb-6">
        <h1 className="text-xl text-gray-500">System User</h1>
        <div className="flex justify-between items-center">
          <Input
            type="text"
            placeholder="Search"
            className="w-1/3 rounded-lg"
          />
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

      {gridMode ? (
        <div className="grid lg:grid-cols-5 grid-cols-2 gap-4">
          {systemUsers?.map((systemUser: any) => (
            <Card key={systemUser.id} className="flex flex-col col-span-1">
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
                          User Details
                        </DialogHeader>
                        <DialogDescription className="px-4 py-6 mb-6">
                          <div className="flex items-center justify-around">
                            <div className="flex flex-col gap-5">
                              <p>First Name : Jany</p>
                              <p>Last Name : Jone</p>
                              <p>Email : janyjone@gmail.com</p>
                              <p>Contact Number : 0987654321</p>
                              <p>Role : Student</p>
                              <p>NIC Number : 0192837291</p>
                            </div>
                            <Image
                              src={userView}
                              alt=""
                              className="w-28 h-28"
                            />
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
                          <AlertDialogAction onClick={() => handleDelete(systemUser._id)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
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
            {systemUsers?.map((systemUser: any) => (
              <TableRow key={systemUser.id}>
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
                    <Eye size={22} className="cursor-pointer" />
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
                          <AlertDialogAction type="button" onClick={() => handleDelete(systemUser._id)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Pagination className="flex py-5">
        <PaginationContent className="flex justify-between w-full">
          <PaginationItem>
            <PaginationPrevious href="#" className="border" />
          </PaginationItem>
          <div className="flex">
            {[...Array(pagination?.totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={`?page=${page}`}
                    isActive={
                      Number(page) === Number(searchParams.get("page") || 1)
                    }
                    className={
                      Number(page) === Number(searchParams.get("page") || 1)
                        ? "border"
                        : ""
                    }
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
          </div>

          <PaginationItem>
            <PaginationNext href="#" className="border" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
