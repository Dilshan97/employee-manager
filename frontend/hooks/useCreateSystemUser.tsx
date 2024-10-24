/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import { createSystemUser } from "@/store/slices/systemUserSlice";
import { AppDispatch } from "@/store/store";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { z } from "zod";

const useCreateSystemUser = () => {
  const formSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    gender: z.string(),
    role: z.string(),
    NIC: z.string(),
  });

  const dispatch: AppDispatch = useDispatch();

  const handleUserCreate = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      try {
        await dispatch(createSystemUser(values))
          .unwrap()
          .then(() => {
            console.log("Login successful!");
          });
      } catch (error) {
        console.error("Form submission failed", error);
      }
    },
    [dispatch]
  );

  return {
    formSchema,
    handleUserCreate,
  };
};

export default useCreateSystemUser;
