/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import { z } from "zod";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/store/store";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "@/store/slices/authSlice";

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
            router.push("/system-user");
          });
      } catch (error) {
        console.error("Form submission failed", error);
      }
    },
    [dispatch, router]
  );

  const handleLogout = useCallback(async () => {
    await dispatch(logout('')).unwrap().then(() => {
      Cookies.remove("accessToken");
      router.replace("/");
    });
  }, [dispatch, router]);

  return {
    handleLogin,
    formSchema,
    handleLogout
  };
};

export default useLogin;
