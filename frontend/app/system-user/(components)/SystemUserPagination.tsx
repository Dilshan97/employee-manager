/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import React, { FC } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  fetchSystemUsers,
  IPagination,
  systemUserActions,
} from "@/store/slices/systemUserSlice";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";

interface SystemUserPaginationProps {
  pagination: IPagination;
}

const SystemUserPagination: FC<SystemUserPaginationProps> = ({
  pagination,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const handlePageChange = (newPage: number) => {
    dispatch(systemUserActions.setPage(newPage));
    dispatch(fetchSystemUsers({ page: newPage, limit: pagination.limit }));
  };

  const handlePrevious = () => {
    if (pagination.page > 1) {
      handlePageChange(pagination.page - 1);
    }
  };

  const handleNext = () => {
    if (pagination.page < pagination.totalPages) {
      handlePageChange(pagination.page + 1);
    }
  };

  return (
    <Pagination className="flex py-5">
      <PaginationContent className="flex justify-between w-full">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className="border"
            onClick={handlePrevious}
            isActive={false}
          />
        </PaginationItem>
        <div className="flex">
          {[...Array(pagination?.totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  // href={`?page=${page}`}
                  onClick={() => handlePageChange(index + 1)}
                  isActive={Number(page) === Number(pagination.page || 1)}
                  className={
                    Number(page) === Number(pagination.page || 1)
                      ? "border"
                      : "cursor-pointer"
                  }
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}
        </div>

        <PaginationItem>
          <PaginationNext href="#" className="border" onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default SystemUserPagination;
