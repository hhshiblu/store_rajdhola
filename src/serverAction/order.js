"use server";

import { ObjectId } from "mongodb";
import connectToDB from "@/lib/connect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";

export const getOrders = async (query) => {
  try {
    const session = await getServerSession(authOptions);
    const db = await connectToDB();
    const { query: queryParameters, sortOptions } = buildMongoDBQuery(query);
    const { page = 1, limit = 30 } = queryParameters;
    const collection = db.collection("sellerOrder");

    // Build the MongoDB query by adding the sellerId to the existing query
    const mongodbQuery = {
      ...queryParameters,
      sellerId: "65cc64615c8b2fd19cda6610",
    };

    const totalProducts = await collection.countDocuments(mongodbQuery);

    // Use the MongoDB query to filter orders
    const ordersArray = await collection
      .find(mongodbQuery)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sortOptions)
      .toArray();

    // Continue with the rest of your code...

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

const buildMongoDBQuery = (query) => {
  const mongodbQuery = {};
  const sortOptions = {};

  if (query && query._status) {
    mongodbQuery.delivery_status = query._status;
  }

  if (query && query._payment_status) {
    mongodbQuery.paymentInfo.status = query._payment_status;
  }

  if (query && query._time) {
    if (query._time == "today") {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);

      mongodbQuery.createdAt = {
        $gte: todayStart,
        $lte: todayEnd,
      };
    } else if (query._time == "last_month") {
      const lastMonthStart = new Date();
      lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
      lastMonthStart.setHours(0, 0, 0, 0);

      const lastMonthEnd = new Date();
      lastMonthEnd.setHours(23, 59, 59, 999);

      mongodbQuery.createdAt = {
        ...mongodbQuery.createdAt,
        $gte: lastMonthStart,
        $lte: lastMonthEnd,
      };
    } else {
      const lastYearStart = new Date();
      lastYearStart.setFullYear(lastYearStart.getFullYear() - 1);
      lastYearStart.setHours(0, 0, 0, 0);

      const lastYearEnd = new Date();
      lastYearEnd.setHours(23, 59, 59, 999);

      mongodbQuery.createdAt = {
        ...mongodbQuery.createdAt,
        $gte: lastYearStart,
        $lte: lastYearEnd,
      };
    }
  }

  if (query && query._sortby) {
    if (query._sortby === "highToLow") {
      sortOptions.price = -1; // for descending order
    } else if (query._sortby === "lowToHigh") {
      sortOptions.price = 1; // for ascending order
    }
  }

  return { query: mongodbQuery, sortOptions };
};
