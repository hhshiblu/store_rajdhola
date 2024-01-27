import { DataTableDemo } from "@/components/orders/dataTableOrder";
import { getOrders } from "@/serverAction/order";
import React from "react";

async function page() {
  const orders = await getOrders();
  return <DataTableDemo data={orders} />;
}

export default page;
