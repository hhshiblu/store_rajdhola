import React, { Suspense } from "react";
import MainInformation from "@/components/adminInfo/mainInformation";
import Orders from "@/components/orders/orders";
import { getSeller, sellerInfo } from "@/serverAction/seller";

const DashboardHero = async () => {
  const orderInfo = await sellerInfo();
  const seller = await getSeller();

  return (
    <div className="w-full  ml-auto scroll_y_hiiden  h-[87vh] overflow-y-auto overflow-hidden">
      <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
      <Suspense fallback={true}>
        <MainInformation info={orderInfo} />
      </Suspense>
      <br />
      <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
      <div className="w-full min-h-[49vh] bg-white rounded px-2">
        <Suspense fallback={<p>Loading...</p>}>
          <Orders />
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardHero;
