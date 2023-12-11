"use client";
import Sidebar from "@/components/sidebar";
import { IoMdAdd } from "react-icons/io";
import { FaGraduationCap } from "react-icons/fa6";
import { Path } from "@/types/path";

const links: Path[] = [
  {
    title: "new student",
    path: "/management/new_student",
    Icon: IoMdAdd,
  },
  {
    title: "colleges",
    path: "/management/colleges",
    Icon: FaGraduationCap,
  },
];

const SidebarWrapper = () => {
  return <Sidebar links={links} />;
};

export default SidebarWrapper;
