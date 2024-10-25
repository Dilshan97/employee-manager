/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/store/store";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSystemUser } from "@/store/slices/systemUserSlice";

const useCreateSystemUser = () => {
  const { toast } = useToast();
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const formSchema = z.object({
    firstName: z
      .string({
        required_error: "First Name is required",
      })
      .min(6, {
        message: "First Name should be at least 6 characters long",
      })
      .max(10, {
        message: "First Name should not exceed 10 characters",
      }),
    lastName: z
      .string({
        message: "Last Name is required",
      })
      .min(6, {
        message: "Last Name should be at least 6 characters long",
      })
      .max(10, {
        message: "Last Name should not exceed 10 characters",
      }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({
        message: "Invalid Email Address",
      })
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
        message: "Invalid Email Address format",
      }),
    phoneNumber: z
      .string({
        required_error: "Phone Number is required",
      })
      .regex(/^\+94\d{9}$/, {
        message: "Invalid Phone Number format",
      }),
    gender: z.enum(["M", "F"], {
      required_error: "Gender is required",
      invalid_type_error: "Gender must be either 'M' or 'F'",
    }),
    role: z.string({
      required_error: "Role is required",
    }),
    NIC: z
      .string({
        required_error: "NIC is required",
      })
      .regex(/^[0-9]{9}[vVxX]$/, {
        message: "Invalid NIC number format",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      phoneNumber: undefined,
      gender: undefined,
      role: undefined,
      NIC: undefined,
    },
  });

  const handleUserCreate = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      try {
        await dispatch(createSystemUser(values))
          .unwrap()
          .then((res) => {
            toast({
              variant: "default",
              title: "Success",
              description: res.message,
            });
            form.reset();
            router.back();
          });
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Success",
          description: error || "Form submission failed",
        });
      }
    },
    [dispatch, form, router, toast]
  );

  return {
    form,
    handleUserCreate,
  };
};

export default useCreateSystemUser;
