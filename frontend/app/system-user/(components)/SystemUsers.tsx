/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
"use client";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
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
import { fetchSystemUsers, systemUserActions } from "@/store/slices/systemUserSlice";

const SystemUsers = () => {
  const searchParams = useSearchParams();
  const dispatch: AppDispatch = useDispatch();

  const { gridMode, pagination } = useSelector((state: RootState) => state.systemUser);
  const { handleDelete } = useDeleteSystemUser();
  const { loading, systemUsers, error } = useFetchSystemUsers();

  if (error) return <p>Error: {error}</p>;

  if (loading) return <p>Loading...</p>;

  const handlePageChange = (newPage: number) => {
    dispatch(systemUserActions.setPage(newPage));
    dispatch(fetchSystemUsers({ page: newPage, limit: pagination.limit }));
  };

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
                    onClick={() => handlePageChange(index + 1)}
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
