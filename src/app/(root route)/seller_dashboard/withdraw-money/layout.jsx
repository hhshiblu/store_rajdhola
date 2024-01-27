import React from "react";

async function layout({ children }) {
  return (
    <div className=" w-full overflow-hidden">
      <div className=" py-4 pl-8 text-[17px] font-semibold ">
        <h2>widthdraw money</h2>
      </div>
      <hr className="px-6" />
      <hr className="px-6 pb-2" />
      {children}
    </div>
  );
}

export default layout;
