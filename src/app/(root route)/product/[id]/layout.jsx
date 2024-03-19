import Header from "@/components/seller/header";
import React from "react";

function layout({ children }) {
  return (
    <div>
      <Header />
      <div className="w-[98%] md:w-11/12 mx-auto">{children}</div>
    </div>
  );
}

export default layout;
