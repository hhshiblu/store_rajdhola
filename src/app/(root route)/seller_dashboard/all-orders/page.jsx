import { DataTableDemo } from "@/components/orders/dataTableOrder";
import { getOrders } from "@/serverAction/order";
import { getSeller } from "@/serverAction/seller";

import React from "react";

async function page({ searchParams }) {
  const orders = await getOrders(searchParams);
  const seller = await getSeller();

  return <DataTableDemo data={orders} seller={seller} />;
}

export default page;
