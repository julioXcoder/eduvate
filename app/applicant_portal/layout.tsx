import { ReactNode } from "react";
import Topbar from "@/components/topbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Topbar title="Applicant Portal" />
      <div className="mx-auto mt-12 max-w-[85rem] p-2 py-6 sm:px-6 lg:py-14">
        <div className="rounded-lg border-2 border-dashed border-gray-200 p-3 dark:border-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
