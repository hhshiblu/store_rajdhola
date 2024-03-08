"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import connectToDB from "@/lib/connect";
import { uploadFileToS3 } from "@/lib/uploadImage";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { v4 as uuidv4 } from "uuid";
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

export async function UpdateInfo(fromData) {
  const shopName = fromData.get("shopName");
  const userName = fromData.get("userName");
  const email = fromData.get("email");
  const address = JSON.parse(fromData.get("address"));
  const phoneNumber = fromData.get("phoneNumber");
  const category = fromData.get("category");
  const zipCode = fromData.get("zipCode");
  const image = fromData.get("file");
  const phoneNumberRegex = /^(019|013|014|018|015|016|017)\d{8}$/;
  if (!phoneNumberRegex.test(phoneNumber) || phoneNumber.length !== 11) {
    return {
      error: "Invalid phone number",
    };
  }
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return {
      error: "Invalid email address",
    };
  }

  if (
    !userName ||
    !shopName ||
    !email ||
    !phoneNumber ||
    !address ||
    !address.division ||
    !address.district ||
    !address.upazila ||
    !zipCode ||
    !image ||
    !category
  ) {
    return { error: "please fill all  fields" };
  }

  try {
    const session = await getServerSession(authOptions);
    const db = await connectToDB();
    const seller = await db.collection("sellers").findOne({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
      _id: { $ne: new ObjectId(session.user.sub) },
    });
    if (seller) {
      return {
        error: "This email already exits",
      };
    }
    let images = null;
    const name = uuidv4();
    try {
      const buffer = Buffer.from(await image.arrayBuffer());
      const res = await uploadFileToS3(buffer, name + image.name);
      images = res;
    } catch (error) {
      console.log(error.message);
      return { error: "Network error" };
    }

    const filter = { _id: new ObjectId(session.user.sub) };
    const update = {
      $set: {
        userName,
        shopName,
        images,
        address,
        category,
        email,
        zipCode: parseInt(zipCode, 10),
        category,
        phoneNumber: parseInt(phoneNumber, 10),
        updated: new Date(),
      },
    };

    const res = await db.collection("sellers").updateOne(filter, update);
    if (res.acknowledged == true) {
      return {
        success: true,
        message: "Update Information successfully",
      };
    }
  } catch (error) {
    return {
      error: "Something wrong! Try later",
    };
  }
}
