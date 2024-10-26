/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/store/store";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createSystemUser,
  systemUserActions,
  updateSystemUser,
} from "@/store/slices/systemUserSlice";
interface useUpdateSystemUserProps {
  userId: string;
}
const useUpdateSystemUser = ({ userId }: useUpdateSystemUserProps) => {
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

  useEffect(() => {
    dispatch(systemUserActions.setSystemUser(userId));

    return () => {
      dispatch(systemUserActions.resetSystemUser());
    };
  }, [userId, dispatch]);

  const { systemUser } = useSelector((state: RootState) => state.systemUser);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: systemUser?.firstName,
      lastName: undefined,
      email: undefined,
      phoneNumber: undefined,
      gender: undefined,
      role: undefined,
      NIC: undefined,
    },
  });

  useEffect(() => {
    if (systemUser) {
      form.setValue("firstName", systemUser.firstName);
      form.setValue("lastName", systemUser.lastName);
      form.setValue("email", systemUser.email);
      form.setValue("phoneNumber", systemUser.phoneNumber);
      form.setValue("role", systemUser.role);
      form.setValue("NIC", systemUser.NIC);
      form.setValue("gender", systemUser.gender == "M" ? "M" : "F");
    }
  }, [form, systemUser]);

  const handleUserCreate = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      try {
        await dispatch(updateSystemUser({ id: userId, payload: values }))
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
    [dispatch, form, router, toast, userId]
  );

  return {
    form,
    handleUserCreate,
  };
};

export default useUpdateSystemUser;
