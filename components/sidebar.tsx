"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Path } from "@/types/path";

interface Props {
  links: Path[];
}

const Sidebar = ({ links }: Props) => {
  const pathname = usePathname();
  return (
    <div className="bg-gray-white fixed bottom-0 left-0 top-0 hidden w-52 rounded-tr-lg border-r border-gray-200 pt-20 shadow-lg dark:border-gray-700 dark:bg-gray-800 lg:flex">
      <nav className="flex w-full flex-col flex-wrap p-6">
        <ul className="space-y-2">
          {links.map(({ title, path, Icon }) => (
            <li key={title} className="capitalize">
              <Link
                className={`flex items-center gap-x-3 rounded-md px-2.5 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
                  pathname.startsWith(path)
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }`}
                href={path}
              >
                <Icon size={18} />

                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
