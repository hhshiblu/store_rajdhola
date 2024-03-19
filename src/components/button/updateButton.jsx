"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

function UpdateButton() {
  const pathname = usePathname();
  return (
    <h2 className=" px-3 py-[4px] rounded-lg border ">
      <Link href={pathname + "?update=true"}>Update</Link>{" "}
    </h2>
  );
}

export default UpdateButton;
