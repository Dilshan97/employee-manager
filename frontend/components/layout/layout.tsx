/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import { FC } from "react";
import Header from "./header";
import Sidebar from "./sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}
const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen max-h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        <div className="h-screen p-10 overflow-scroll">{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;
