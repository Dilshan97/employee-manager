/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import { useToast } from "@/hooks/use-toast";
import { AppDispatch } from "@/store/store";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { deleteSystemUser } from "@/store/slices/systemUserSlice";

const useDeleteSystemUser = () => {
  const { toast } = useToast();
  const dispatch: AppDispatch = useDispatch();

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await dispatch(deleteSystemUser(id))
          .unwrap()
          .then((res) => {
            toast({
              variant: "default",
              title: "Success",
              description: res.message,
            });
          });
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Success",
          description: error || "Form submission failed",
        });
      }
    },
    [dispatch, toast]
  );
  return {
    handleDelete
  }
};

export default useDeleteSystemUser;
