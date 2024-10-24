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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];
export default function Page() {
  const dispatch = useDispatch();
  const { gridMode } = useSelector((state: RootState) => state.systemUser);

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
          {invoices.map((invoice) => (
            <Card key={invoice.invoice} className="flex flex-col col-span-1">
              <Image src={user} alt="" className="w-full" />
              <div className="flex flex-col gap-1 p-3 w-full overflow-clip">
                <p>Jany Jone</p>
                <p>janyjone@gmail.com</p>
                <p>0987654321</p>
                <p>Admin</p>
                <div className="flex justify-between">
                  <p>0192837291</p>
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

                    <Link href="/system-user/edit/123">
                      <Edit2 size={18} className="cursor-pointer" />
                    </Link>
                    <Trash size={18} className="cursor-pointer" />
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
              <TableHead className="py-4 text-right">Role</TableHead>
              <TableHead className="py-4 text-right">NIC</TableHead>
              <TableHead className="py-4 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium py-4">
                  {invoice.invoice}
                </TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="text-right">
                  {invoice.totalAmount}
                </TableCell>
                <TableCell className="text-right">
                  {invoice.totalAmount}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-center gap-2">
                    <Eye size={22} className="cursor-pointer" />
                    <Edit2 size={22} className="cursor-pointer" />
                    <Trash size={22} className="cursor-pointer" />
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
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">5</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">6</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">7</PaginationLink>
            </PaginationItem>
          </div>

          <PaginationItem>
            <PaginationNext href="#" className="border" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
