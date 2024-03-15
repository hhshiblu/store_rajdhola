import OrderDetals from "@/components/orders/orderDetals";
import { getOrder } from "@/serverAction/order";
import React from "react";

async function page({ params }) {
  const order = await getOrder(params.id);
  // console.log(order);
  return (
    <div>
      <OrderDetals data={order} />
    </div>
  );
}

export default page;
