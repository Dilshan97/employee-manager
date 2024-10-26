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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useUpdateSystemUser from "@/hooks/useUpdateSystemUser";

export default function Page({ params: { userId }}: {
  params: { userId: string }
}) {
  const { form, handleUserCreate } = useUpdateSystemUser({ userId: userId });

  return (
    <div className="flex flex-col gap-3 mb-6">
      <h1 className="text-xl text-gray-500">System User Edit</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUserCreate)}>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your First Name"
                      className="rounded-md border border-gray-300 p-3 shadow-sm"
                      {...field}
                      value={field.value ?? ""} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Last Name"
                      className="rounded-md border border-gray-300 p-3 shadow-sm"
                      {...field}
                      value={field.value ?? ""} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      value={field.value ?? ""} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Contact Number"
                      className="rounded-md border border-gray-300 p-3 shadow-sm"
                      {...field}
                      value={field.value ?? ""} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""} 
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="M">Male</SelectItem>
                      <SelectItem value="F">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role - {field.value}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="NIC"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIC Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your NIC"
                      className="rounded-md border border-gray-300 p-3 shadow-sm"
                      {...field}
                      value={field.value ?? ""} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-3 mt-5 justify-end">
            <Button
              type="reset"
              className="py-5 text-white hover:text-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="py-5 bg-rose-500 text-white font-semibold rounded-md hover:bg-rose-600"
              disabled={form.formState.isSubmitting}
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
