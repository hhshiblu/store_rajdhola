"use server";

import { ObjectId } from "mongodb";
import connectToDB from "@/lib/connect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";

export const getOrders = async () => {
  try {
    const session = await getServerSession(authOptions);
    const db = await connectToDB();
    const collection = db.collection("sellerOrder");

    const ordersArray = await collection
      .find({
        sellerId: session.user.sub,
      })
      .toArray();

    const orders = JSON.parse(JSON.stringify(ordersArray));

    return orders;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

export const getOrder = async (id) => {
  try {
    const db = await connectToDB();
    const collection = db.collection("adminorder");

    const singleOrder = await collection.findOne({ orderId: new ObjectId(id) });
    const order = JSON.parse(JSON.stringify(singleOrder));
    return order;
  } catch (error) {
    return error.message;
  }
};
