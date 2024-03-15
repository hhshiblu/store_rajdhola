"use client";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

function OrderFilter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  return (
    <div className="flex flex-row scroll_x_hiiden overflow-x-auto w-full whitespace-nowrap px-2 pb-2 ">
      <a
        href={pathname + "?" + createQueryString("_status", "pending")}
        className="text-[16px] pt-1 pr-4 cursor-pointer hover:text-red-500 leading-[20px]  inline-block"
      >
        Pending
      </a>
      <a
        href={pathname + "?" + createQueryString("_status", "prossesing")}
        className="text-[16px] pt-1 pr-4 cursor-pointer hover:text-red-500 leading-[20px]  inline-block"
      >
        Prossesing
      </a>
      <a
        href={pathname + "?" + createQueryString("_status", "delivered")}
        className="text-[16px] pt-1 pr-4 cursor-pointer hover:text-red-500 leading-[20px]  inline-block"
      >
        delivered
      </a>
      <a
        href={pathname + "?" + createQueryString("_time", "today")}
        className="text-[16px] pt-1 pr-4 cursor-pointer hover:text-red-500 leading-[20px]  inline-block"
      >
        Today_orders
      </a>
      <a
        href={pathname + "?" + createQueryString("_time", "last_month")}
        className="text-[16px] pt-1 pr-4 cursor-pointer hover:text-red-500 leading-[20px]  inline-block"
      >
        LastMonth_orders
      </a>
      <a
        href={pathname + "?" + createQueryString("_time", "last_year")}
        className="text-[16px] pt-1 pr-4 cursor-pointer hover:text-red-500 leading-[20px]  inline-block"
      >
        LastMonth_orders
      </a>
    </div>
  );
}

export default OrderFilter;
