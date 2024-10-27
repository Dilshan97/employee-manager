/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import { z } from "zod";
import Cookies from "js-cookie";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/store/store";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "@/store/slices/authSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const useLogin = () => {
  const { toast } = useToast();
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const formSchema = z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({
        message: "Invalid Email Address",
      }),
    password: z.string({
      required_error: "Password is required",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "john.doe@example.com",
      password: "123",
    },
  });

  const handleLogin = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      try {
        await dispatch(login(values))
          .unwrap()
          .then((res) => {
            Cookies.set("accessToken", res.payload.accessToken);
            router.replace("/system-user");
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
    [dispatch, router, toast]
  );

  const handleLogout = useCallback(async () => {
    await dispatch(logout())
      .unwrap()
      .then(() => {
        Cookies.remove("accessToken");
        router.replace("/");
      });
  }, [dispatch, router]);

  return {
    form,
    handleLogin,
    handleLogout,
  };
};

export default useLogin;
