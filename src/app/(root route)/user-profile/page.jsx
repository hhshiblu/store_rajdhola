import { getSeller } from "@/serverAction/seller";
import React from "react";
import UpdateSellerInfo from "@/components/seller/updateSellerInfo";
import Header from "@/components/seller/header";
async function page({ searchParams }) {
  const seller = await getSeller();

  return (
    <div>
      <Header />
      <div className="min-h-[80vh]  flex  justify-center py-8  items-center w-full  ">
        <UpdateSellerInfo seller={seller} searchParams={searchParams} />
      </div>
    </div>
  );
}

export default page;
