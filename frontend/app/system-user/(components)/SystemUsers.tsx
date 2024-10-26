/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
"use client";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { ChartCircle } from "iconsax-react";
import React, { Suspense } from "react";

//components
import GridView from "./GridView";
import TableView from "./TableView";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

//hooks
import useFetchSystemUsers from "@/hooks/useFetchSystemUsers";
import { useSearchParams } from "next/navigation";
import useDeleteSystemUser from "@/hooks/useDeleteSystemUser";

const SystemUsers = () => {
  const searchParams = useSearchParams();
  const { gridMode } = useSelector((state: RootState) => state.systemUser);
  const { handleDelete } = useDeleteSystemUser();
  const { loading, systemUsers, error, pagination } = useFetchSystemUsers();

  if (error) return <p>Error: {error}</p>;

  if (loading) return <p>Loading...</p>;

  return (
    <Suspense
      fallback={<ChartCircle className="animate-spin text-red-500" size="35" />}
    >
      {gridMode ? (
        <GridView data={systemUsers} handleDelete={handleDelete} />
      ) : (
        <TableView data={systemUsers} handleDelete={handleDelete} />
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
    </Suspense>
  );
};

export default SystemUsers;
