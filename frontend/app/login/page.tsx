/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
// import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid"; // for show/hide password

import { useState } from "react";
import { Eye } from "lucide-react";
import { EyeSlash } from "iconsax-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="w-full max-w-lg mx-auto p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    className="rounded-md border border-gray-300 p-3 shadow-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="rounded-md border border-gray-300 p-3 shadow-sm"
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlash className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 cursor-pointer">
              <Checkbox id="remember-me" />
              <label
                htmlFor="remember-me"
                className="text-base font-medium"
              >
                Remember me
              </label>
            </div>
            <p className="text-base cursor-pointer text-gray-600">
              Forgot Password?
            </p>
          </div>

          <Button
            type="submit"
            className="w-full py-5 bg-rose-500 text-white text-lg font-semibold rounded-md hover:bg-rose-600"
          >
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}
