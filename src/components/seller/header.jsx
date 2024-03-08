"use client";
import React, { useState } from "react";
import { BiSolidCartDownload } from "react-icons/bi";
import { FaAlignLeft } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

function Header() {
  const [profile, setShowProfile] = useState(false);
  return (
    <div className="w-full h-[8vh] bg-[#00453e] shadow-xl  flex items-center justify-between  ">
      <div className="flex items-center gap-4 pl-8  text-white font-semibold ">
        <div className="block lg:hidden cursor-pointer">
          <FaAlignLeft size={25} />
        </div>
        <div>
          <Link href="">
            <Image
              src="/rajdhola_title_logo_white.svg"
              alt="rajdhola logo"
              width={100}
              height={100}
            />
          </Link>
        </div>
      </div>
      <div className="flex gap-4 pr-8">
        <div className="  cursor-not-allowed h-9 w-9 rounded-full bg-white flex justify-center items-center">
          <IoIosNotifications />
        </div>
        <div className=" cursor-pointer h-9 w-9 rounded-full bg-white flex justify-center items-center">
          <BiSolidCartDownload />
        </div>

        <div
          className=" cursor-pointer h-9 w-9 rounded-full bg-[#bbeec4fa] flex justify-center items-center overflow-hidden"
          onClick={() => setShowProfile(!profile)}
        >
          <Image
            src={""}
            height={40}
            width={40}
            alt="profile picture"
            className="w-[30px] h-[30px]"
          />
        </div>
      </div>
      <div
        className=" overflow-hidden  fixed top-[8vh] right-0 bg-white z-50  shadow-lg rounded-md h-[12vh] w-[160px] flex flex-col px-4   duration-200"
        style={{ height: profile ? "12vh" : "0px" }}
      >
        <Link href="/user-profile" className="flex gap-2 pt-4 items-center">
          <RxAvatar size={21} onClick={() => setShowProfile(!profile)} />
          <h2
            className="font-semibold "
            onClick={() => setShowProfile(!profile)}
          >
            View Profile
          </h2>
        </Link>
        <div className="flex items-center gap-2 pt-2 pl-1">
          <MdOutlineLogout />
          <h2
            className=" font-semibold cursor-pointer "
            onClick={() =>
              signOut({
                callbackUrl: "/?error=Please login first to access this route",
              })
            }
          >
            LogOut
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Header;
