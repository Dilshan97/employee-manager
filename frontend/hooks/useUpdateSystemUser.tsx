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
      .string({ required_error: "First Name is required" })
      .min(6, { message: "First Name should be at least 6 characters long" })
      .max(10, { message: "First Name should not exceed 10 characters" }),
    lastName: z
      .string({ required_error: "Last Name is required" })
      .min(6, { message: "Last Name should be at least 6 characters long" })
      .max(10, { message: "Last Name should not exceed 10 characters" }),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid Email Address" }),
    phoneNumber: z
      .string({ required_error: "Phone Number is required" })
      .regex(/^\+94\d{9}$/, { message: "Invalid Phone Number format" }),
    gender: z.enum(["M", "F"], {
      required_error: "Gender is required",
      invalid_type_error: "Gender must be either 'M' or 'F'",
    }),
    role: z.string({ required_error: "Role is required" }),
    NIC: z
      .string({ required_error: "NIC is required" })
      .regex(/^[0-9]{9}[vVxX]$/, { message: "Invalid NIC number format" }),
  });

  // Fetch user data when component loads
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
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      gender: undefined,
      role: "",
      NIC: "",
    },
  });

  useEffect(() => {
    if (systemUser) {
      form.reset({
        firstName: systemUser.firstName || "",
        lastName: systemUser.lastName || "",
        email: systemUser.email || "",
        phoneNumber: systemUser.phoneNumber || "",
        gender: systemUser.gender === "M"? "M" : "F", 
        role: systemUser.role || "user",
        NIC: systemUser.NIC || "",
      });
    }
  }, [systemUser, form]);

  // Handle form submission
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
          title: "Error",
          description: error.message || "Form submission failed",
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
