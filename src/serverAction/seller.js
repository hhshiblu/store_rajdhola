"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import connectToDB from "@/lib/connect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

export const getSeller = async () => {
  try {
    const session = await getServerSession(authOptions);
    const db = await connectToDB();
    const collection = db.collection("sellers");

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
    const products = await productCollection
      .find({ sellerId: session.user.sub })
      .toArray();
    const orders = await OrdersCollection.find({
      sellerId: session.user.sub,
    }).toArray();

    const totalprice = orders.reduce((acc, order) => acc + order.price, 0);
    const totalCommition = orders.reduce(
      (acc, order) => acc + order.commition,
      0
    );
    const statuses = ["pending", "delivered"];

    const orderStatus_TotalPrice = await OrdersCollection.find({
      delivery_status: { $in: statuses },
      sellerId: session.user.sub,
    }).toArray();

    const totalOrder_ByStatus = orderStatus_TotalPrice.reduce((acc, order) => {
      const { delivery_status, price, products, commition } = order;

      if (!acc[delivery_status]) {
        acc[delivery_status] = {
          totalProducts: 0,
          price: 0,
          commition: 0,
        };
      }
      acc[delivery_status].commition += commition;
      acc[delivery_status].totalProducts += products.length;

      acc[delivery_status].price += price;

      return acc;
    }, {});

    return {
      totalProducts: products.length,
      totalOrders: orders.length,
      totalprice: totalprice,
      totalCommition,
      totalOrder_ByStatus: totalOrder_ByStatus,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
}
