import React from "react";

function layout({ children }) {
  return (
    <div className=" w-full  h-[80vh] ">
      <div className=" py-3 pl-8 text-[17px] font-semibold ">
        <h2>All Orders</h2>
      </div>
      <hr className="px-6" />
      <hr className="px-6" />
      <div className="px-4 pt-2">{children}</div>
    </div>
  );
}

export default layout;
