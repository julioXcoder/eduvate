import logo from "@/public/leafLogo.png";
import Link from "next/link";
import Image from "next/image";
import { ThemeSwitcher } from "@/components/themeSwitcher";

interface Props {
  title: string;
}

const Topbar = ({ title }: Props) => {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <Link href="#" className="ml-2 flex md:mr-24">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
