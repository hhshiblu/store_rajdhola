import OrderFilter from "@/components/orders/orderFilter";
import React from "react";

function layout({ children }) {
  return (
    <div className=" w-full  h-[80vh] ">
      <div className=" py-3  text-[17px] font-semibold ">
        <h2 className="px-3">All Orders</h2>
        <div className="border-b-2 py-1"></div>
        <OrderFilter />
      </div>
      <hr className="px-6" />
      <hr className="px-6" />
      <div className="px-1 pt-2">{children}</div>
    </div>
  );
}

export default layout;
