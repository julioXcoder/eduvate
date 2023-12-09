"use client";
import Sidebar from "@/components/sidebar";
import { IoMdAdd } from "react-icons/io";
import { Path } from "@/types/path";

const links: Path[] = [
  {
    title: "new student",
    path: "/management/new_student",
    Icon: IoMdAdd,
  },
];

const SidebarWrapper = () => {
  return <Sidebar links={links} />;
};

export default SidebarWrapper;
