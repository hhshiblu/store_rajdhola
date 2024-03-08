import { getSeller } from "@/serverAction/seller";

import React from "react";

import UpdateSellerInfo from "@/components/seller/updateSellerInfo";
async function page() {
  const seller = await getSeller();

  if (!seller.address) {
    redirect("/pending_seller");
  }
  return (
    <div className="h-[88vh]  w-full overflow-y-auto scroll_y_hiiden ">
      <UpdateSellerInfo seller={seller} />
    </div>
  );
}

export default page;
