import { ReactNode } from "react";
import CollegeBreadCrumb from "@/components/collegeBreadCrumb";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <CollegeBreadCrumb />
      {children}
    </div>
  );
};

export default Layout;
