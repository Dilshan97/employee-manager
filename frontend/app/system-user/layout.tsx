/*
*   Copyright (c) 2024 Dilshan Ramesh
*   All rights reserved.
*/
import AppLayout from "@/components/layout/layout";
import { FC } from "react";
import { Toaster } from "@/components/ui/toaster"

interface LayoutProps {
    children: React.ReactNode;
}
const Layout:FC<LayoutProps> = ({ children }) => {
  return (
    <AppLayout>
      <Toaster />
      {children}
    </AppLayout>
  );
};

export default Layout;
