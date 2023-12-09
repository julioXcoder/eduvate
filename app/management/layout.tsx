import React, { ReactNode } from "react";
import SidebarWrapper from "./sidebarWrapper";
import Navbar from "@/components/navbar";

const ManagementLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col">
      <Navbar
        image="/profile/gon.png"
        fullName="Naruto Uzumaki"
        title="Management"
      />
      <div>
        <SidebarWrapper />
        <div className="mx-auto mt-12 max-w-[85rem] p-2 sm:px-6 lg:ml-52 lg:py-14">
          <div className=" h-full rounded-lg border-2 border-dashed border-gray-200 p-3 dark:border-gray-700">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementLayout;
