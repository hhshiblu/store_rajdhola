import { getSeller } from "@/serverAction/seller";
import React from "react";
import AddPaynent from "./addPaynent";

async function page() {
  const seller = await getSeller();
  return (
    <div className="pt-2 w-full flex justify-center ">
      <div className=" flex justify-center items-center w-[250px] h-[160px] border-dashed border-destructive  border    ">
        <h2> Add Bank Account</h2>
      </div>
    </div>
  );
}

export default page;
