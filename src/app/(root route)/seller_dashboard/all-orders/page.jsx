import { DataTableDemo } from "@/components/orders/dataTableOrder";
import { getOrders } from "@/serverAction/order";
import { getSeller } from "@/serverAction/seller";
import { redirect } from "next/dist/server/api-utils";

import React from "react";

async function page() {
  const orders = await getOrders();
  const seller = await getSeller();

  return <DataTableDemo data={orders} seller={seller} />;
}

export default page;
