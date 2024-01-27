import { getOrders } from "@/serverAction/order";
import { DataTableDemo } from "./dataTableOrder";

async function Orders() {
  const orders = await getOrders();

  return (
    <div>
      <DataTableDemo data={orders} />
    </div>
  );
}

export default Orders;
