/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import { useEffect } from "react";
import { fetchSystemUsers } from "@/store/slices/systemUserSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

const useFetchSystemUsers = () => {
  const dispatch: AppDispatch = useDispatch();

  const {
    data: systemUsers,
    pagination,
    loading,
    gridMode,
    error,
  } = useSelector((state: RootState) => state.systemUser);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      dispatch(fetchSystemUsers());
    }
    return () => {
      unmounted = true;
    };
  }, [dispatch]);

  return {
    systemUsers,
    pagination,
    loading,
    gridMode,
    error,
  };
};

export default useFetchSystemUsers;
