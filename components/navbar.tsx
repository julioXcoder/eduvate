"use client";

import logo from "@/public/leafLogo.png";
import Link from "next/link";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import Image from "next/image";
import { BiMenuAltLeft } from "react-icons/bi";
import { FaSortDown, FaUser } from "react-icons/fa";
import { MdSchool } from "react-icons/md";
import { ThemeSwitcher } from "@/components/themeSwitcher";

interface Props {
  title: string;
  fullName: string;
  image: string;
}

const Navbar = ({ title, fullName, image }: Props) => {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <Dropdown>
              <DropdownTrigger>
                <button
                  type="button"
                  className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden"
                >
                  <BiMenuAltLeft size={26} />
                </button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="new">New file</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Link href="/" className="ml-2 flex md:mr-24">
              <Image
                src={logo}
                width={65}
                height={65}
                className="mr-3"
                alt="SIMS Logo"
              />
              <span className="hidden flex-none self-center whitespace-nowrap text-2xl font-semibold dark:text-white sm:flex sm:text-2xl">
                {title}
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="ml-3 flex items-center">
              <div className="flex items-center gap-x-1">
                <ThemeSwitcher />
                <Dropdown>
                  <DropdownTrigger>
                    <span className="flex cursor-pointer items-center gap-x-1">
                      <span className="sm:hidden">
                        <Avatar src={image} size="md" />
                      </span>
                      <span className="hidden sm:flex">
                        <User
                          name={fullName}
                          description={
                            <span className="flex items-center gap-x-1 capitalize">
                              <MdSchool color="silver" />
                              MUST
                            </span>
                          }
                          avatarProps={{
                            src: image,
                          }}
                        />
                      </span>
                      <FaSortDown />
                    </span>
                  </DropdownTrigger>
                  <DropdownMenu
                    variant="faded"
                    aria-label="Dropdown menu with icons"
                  >
                    <DropdownItem
                      startContent={
                        <FaUser className="pointer-events-none flex-shrink-0 text-xl text-default-500" />
                      }
                    >
                      Profile
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
