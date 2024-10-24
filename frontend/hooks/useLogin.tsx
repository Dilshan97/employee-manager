/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import { login } from "@/store/slices/authSlice";
import { AppDispatch } from "@/store/store";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { z } from "zod";

const useLogin = () => {
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const dispatch: AppDispatch = useDispatch();

  const handleLogin = useCallback(async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    
    try {
        await dispatch(login(values))
            .unwrap()
            .then(() => {
                
            }).catch(() => {
                
            });
    } catch (error) {
        console.error('Form submission failed', error);
    }
  }, [dispatch]);

  return {
    handleLogin,
    formSchema
  };
};

export default useLogin;
