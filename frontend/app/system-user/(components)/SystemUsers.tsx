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

//hooks
import useFetchSystemUsers from "@/hooks/useFetchSystemUsers";
import useDeleteSystemUser from "@/hooks/useDeleteSystemUser";
import SystemUserPagination from "./SystemUserPagination";

const SystemUsers = () => {

  const { gridMode, pagination } = useSelector(
    (state: RootState) => state.systemUser
  );
  const { handleDelete } = useDeleteSystemUser();
  const { loading, systemUsers, error } = useFetchSystemUsers();

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

      <SystemUserPagination pagination={pagination} />
    </Suspense>
  );
};

export default SystemUsers;
