"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdBorderClear } from "react-icons/md";
import { BiSolidCartDownload } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
import { FaAlignLeft } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import Image from "next/image";
import { signOut } from "next-auth/react";
const mainMenu = [
  {
    id: 1,
    icon: <MdBorderClear />,
    label: "DashBoard",
    link: "/seller_dashboard",
  },
  {
    id: 3,
    icon: "zp zp-credit-card",
    label: "Order",
    subMenuItems: [
      {
        id: 21,
        icon: "zp zp-circle",
        label: "All_orders",
        link: "/seller_dashboard/all-orders",
      },
      {
        id: 22,
        icon: "zp zp-circle",
        label: "Today_Orders",
        link: "#",
      },
      {
        id: 23,
        icon: "zp zp-circle",
        label: "Refund_Orders",
        link: "#",
      },
    ],
  },
  {
    id: 4,
    icon: "zp zp-credit-card",
    label: "Products",
    subMenuItems: [
      {
        id: 21,
        icon: "zp zp-circle",
        label: "All_Product",
        link: "/seller_dashboard/all-products",
      },
      {
        id: 22,
        icon: "zp zp-circle",
        label: "Create_Product",
        link: "/seller_dashboard/create-product",
      },
    ],
  },
  {
    id: 6,
    icon: "zp zp-private-connectivity",
    label: "Withdraw",
    link: "/seller_dashboard/withdraw-money",
  },
];
function Sidebar({ children, seller }) {
  const [sidebar, setSidebar] = useState(false);
  const [profile, setShowProfile] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const toggleSubMenu = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };
  return (
    <div>
      <div className="w-full h-[8vh] bg-[#00453e] shadow-xl  flex items-center justify-between  ">
        <div className="flex items-center gap-4 pl-8  text-white font-semibold ">
          <div
            onClick={() => setSidebar(!sidebar)}
            className="block lg:hidden cursor-pointer"
          >
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
              src={seller?.images?.url}
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
            {" "}
            <RxAvatar size={21} />
            <h2 className="font-semibold ">View Profile</h2>
          </Link>
          <div className="flex items-center gap-2 pt-2 pl-1">
            <MdOutlineLogout />
            <h2
              className=" font-semibold cursor-pointer "
              onClick={() => signOut()}
            >
              LogOut
            </h2>
          </div>
        </div>
      </div>
      <div className="flex gap-1">
        <div className="hidden lg:flex flex-col shadow-lg justify-start h-[92vh] w-[290px] bg-[#195851] text-gray-50 duration-1000">
          <ul className="w-full ">
            {mainMenu.map((item) => (
              <li
                key={item.id}
                className={`${
                  item.subMenuItems ? "" : "hover:bg-[#3A9188] hover:w-full "
                } mt-2 px-3`}
              >
                <Link
                  className="w-full	py-2.5  flex text-sm	font-semibold items-center "
                  href={item.link || "#"}
                  onClick={() => toggleSubMenu(item.id)}
                >
                  <div className="flex w-full justify-between items-center">
                    {/* <div>{item.icon}</div> */}
                    <h2> {item.label}</h2>
                    <h3 className="pr-2">
                      {item.subMenuItems ? (
                        activeId === item.id ? (
                          <IoIosArrowUp />
                        ) : (
                          <IoIosArrowDown />
                        )
                      ) : (
                        ""
                      )}
                    </h3>
                  </div>
                </Link>
                {item.subMenuItems && activeId === item.id && (
                  <ul className="overflow-hidden w-full h-auto font-medium text-white duration-1000">
                    {item.subMenuItems.map((subItem) => (
                      <li
                        key={subItem.id}
                        className="hover:bg-[#3A9188] hover:rounded-md w-full font-medium text-white"
                      >
                        <Link
                          className="px-3  text-sm	font-medium py-2.5 block "
                          href={subItem.link || "#"}
                        >
                          <i className={subItem.icon + " pl-1.5 pr-3"}></i>
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div
          className=" z-50 lg:hidden overflow-hidden  fixed top-[8vh]  flex flex-col justify-start h-[92vh] bg-[#195851] text-gray-50 duration-500"
          style={{ width: sidebar ? "250px" : "0px" }}
        >
          <div className="flex flex-row justify-normal items-center w-full">
            <ul className="w-full ">
              {mainMenu.map((item) => (
                <li
                  key={item.id}
                  className={`${
                    item.subMenuItems ? "" : "hover:bg-[#3A9188]  hover:w-full "
                  } mt-2 px-3`}
                >
                  <Link
                    className="w-full	py-2.5  flex text-sm	font-semibold items-center text-white"
                    href={item.link || "#"}
                    onClick={
                      !item.subMenuItems
                        ? () => setSidebar(!sidebar)
                        : () => toggleSubMenu(item.id)
                    }
                  >
                    <div className="flex w-full justify-between items-center">
                      <h2> {item.label}</h2>
                      <h3 className="pr-2">
                        {item.subMenuItems ? (
                          activeId === item.id ? (
                            <IoIosArrowUp />
                          ) : (
                            <IoIosArrowDown />
                          )
                        ) : (
                          ""
                        )}
                      </h3>
                    </div>
                  </Link>
                  {item.subMenuItems && activeId === item.id && (
                    <ul
                      className="overflow-hidden w-full font-medium text-white duration-1000"
                      style={{
                        height: activeId ? `auto` : "0px",
                      }}
                    >
                      {item.subMenuItems.map((subItem) => (
                        <li
                          key={subItem.id}
                          className="hover:bg-[#3A9188] hover:rounded-md w-full font-medium text-white"
                        >
                          <Link
                            className="px-3  text-sm	font-medium py-2.5 block "
                            href={subItem.link || "#"}
                            onClick={() => setSidebar(!sidebar)}
                          >
                            <i className={subItem.icon + " pl-1.5 pr-3"}></i>
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="md:px-4 px-1 py-1 w-full ">{children}</div>
      </div>
    </div>
  );
}

export default Sidebar;
