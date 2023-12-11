"use client";
import { usePathname } from "next/navigation";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { getCollegeName } from "@/server/actions/college";
import { getDepartmentName } from "@/server/actions/department";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const CollegeBreadCrumb = () => {
  const pathname = usePathname();

  // Split the current path into its segments
  const pathSegments = useMemo(
    () => pathname.split("/").filter((segment) => segment),
    [pathname],
  );

  // If you want to start from "colleges", adjust the starting index
  const startIndex = useMemo(
    () => pathSegments.indexOf("colleges"),
    [pathSegments],
  );

  // Adjusted path segments
  const adjustedPathSegments = useMemo(
    () => (startIndex >= 0 ? pathSegments.slice(startIndex) : pathSegments),
    [startIndex, pathSegments],
  );

  // State to hold the names of each segment
  const [segmentNames, setSegmentNames] = useState<string[]>([]);

  useEffect(() => {
    // Calculate adjustedPathSegments inside the useEffect hook
    const startIndex = pathSegments.indexOf("colleges");
    const adjustedPathSegments =
      startIndex >= 0 ? pathSegments.slice(startIndex) : pathSegments;

    async function fetchNames() {
      const names = [];
      for (let i = 0; i < adjustedPathSegments.length; i++) {
        if (i === 1) {
          // index of collegeId
          const collegeName = await getCollegeName(adjustedPathSegments[i]);
          names.push(collegeName);
        } else if (i === 2) {
          // index of departmentId
          const departmentName = await getDepartmentName(
            adjustedPathSegments[i],
          );
          names.push(departmentName);
        } else {
          names.push(adjustedPathSegments[i]);
        }
      }
      setSegmentNames(names);
    }

    fetchNames();
  }, [pathSegments]); // Only depend on pathSegments

  return (
    <Breadcrumbs size="sm" variant="solid">
      {segmentNames.map((name, index) => {
        const path = "/" + pathSegments.slice(0, index + 2).join("/");
        return (
          <BreadcrumbItem key={index}>
            <Link href={path}>{name}</Link>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
};

export default CollegeBreadCrumb;
