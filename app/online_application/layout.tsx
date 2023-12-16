import React, { ReactNode } from "react";
import Topbar from "@/components/topbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col">
      <Topbar title="University Application Portal" />
      <div>
        <div className="mx-auto mt-12 max-w-[85rem] p-2 sm:px-6 lg:py-14">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
