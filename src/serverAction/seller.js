"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import connectToDB from "@/lib/connect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

export const getSeller = async () => {
  try {
    const session = await getServerSession(authOptions);
    const db = await connectToDB();
    const collection = db.collection("shops");

    const sellerinfo = await collection.findOne(
      { _id: new ObjectId(session.user.sub) },
      { projection: { password: 0, cpassword: 0 } }
    );
    const seller = JSON.parse(JSON.stringify(sellerinfo));
    return seller;
  } catch (error) {
    return error.message;
  }
};

export async function sellerInfo() {
  try {
    const session = await getServerSession(authOptions);
    const db = await connectToDB();
    const productCollection = db.collection("products");
    const OrdersCollection = db.collection("sellerOrder");
    // const sellerId = "6461f815c680d0f7c8f66679";
    const products = await productCollection
      .find({ sellerId: session.user.sub })
      .toArray();
    const orders = await OrdersCollection.find({
      sellerId: session.user.sub,
    }).toArray();

    const totalprice = orders.reduce((acc, order) => acc + order.price, 0);

    // Define the status you want to filter
    const statuses = ["pending", "delivered"];

    const orderStatus_TotalPrice = await OrdersCollection.find({
      delivery_status: { $in: statuses },
      sellerId: session.user.sub,
    }).toArray();

    const totalOrder_ByStatus = orderStatus_TotalPrice.reduce((acc, order) => {
      const { delivery_status, price, products } = order;

      if (!acc[delivery_status]) {
        acc[delivery_status] = {
          totalProducts: 0,
          price: 0,
        };
      }

      // Summing up total products for each order
      acc[delivery_status].totalProducts += products.length;

      // Summing up total price for each order
      acc[delivery_status].price += price;

      return acc;
    }, {});

    return {
      totalProducts: products.length,
      totalOrders: orders.length,
      totalprice: totalprice,
      totalOrder_ByStatus: totalOrder_ByStatus,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
}
