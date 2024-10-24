/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import { authActions, login } from "@/store/slices/authSlice";
import { AppDispatch } from "@/store/store";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { z } from "zod";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const useLogin = () => {
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const handleLogin = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      try {
        await dispatch(login(values))
          .unwrap()
          .then((res) => {
            Cookies.set("accessToken", res.payload.accessToken);
            router.replace("/system-user");
            console.log("Login successful!");
          });
      } catch (error) {
        console.error("Form submission failed", error);
      }
    },
    [dispatch, router]
  );

  const handleLogout = () => {
    Cookies.remove("accessToken");
    dispatch(authActions.logout());
    router.replace("/");
  };

  return {
    handleLogin,
    formSchema,
    handleLogout
  };
};

export default useLogin;
