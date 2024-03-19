"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import connectToDB from "@/lib/connect";
import { deleteFiles, uploadFileToS3 } from "@/lib/uploadImage";
import { v4 as uuidv4 } from "uuid";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const getProducts = async () => {
  try {
    const session = await getServerSession(authOptions);
    const db = await connectToDB();
    const collection = db.collection("products");
    const productsArray = await collection
      .find({ sellerId: session.user.sub })
      .toArray();
    const products = JSON.parse(JSON.stringify(productsArray));
    return products ? products : [];
  } catch (error) {
    return error.message;
  }
};

export const getProduct = async (id) => {
  try {
    const db = await connectToDB();
    const collection = db.collection("products");

    const productinfo = await collection.findOne({ _id: new ObjectId(id) });
    const product = JSON.parse(JSON.stringify(productinfo));
    return product;
  } catch (error) {
    return error.message;
  }
};
export const deleteProductAction = async (id, imagekey) => {
  try {
    const db = await connectToDB();
    const collection = db.collection("products");
    console.log(imagekey);
    await deleteFiles(imagekey);

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.acknowledged === true) {
      revalidatePath("/seller_dashboard/all-products");
      return {
        success: true,
        message: "product deleted successfully",
      };
    }
  } catch (error) {
    return error.message;
  }
};

export const CreateProducts = async (formData, data) => {
  try {
    const db = await connectToDB();

    const files = formData.getAll("images");
    const name = formData.get("name");
    const description = formData.get("description");
    const category = formData.get("category");
    const subCategory = formData.get("subCategory");
    const childCategory = formData.get("childCategory");
    const brandName = formData.get("brandName");

    const tags = formData.getAll("tag[]");

    const previousPrice = parseInt(formData.get("previousPrice"));
    const presentPrice = parseInt(formData.get("presentPrice"));
    const stock = parseInt(formData.get("stock"));
    const color = formData.getAll("color[]");
    const size = formData.getAll("size[]");
    const sellerId = formData.get("sellerId");

    if (previousPrice < presentPrice) {
      return {
        error: "old price must be greater than Present price",
      };
    }
    if (
      !name ||
      !description ||
      !category ||
      !tags ||
      !subCategory ||
      !childCategory ||
      !presentPrice ||
      !stock ||
      !sellerId ||
      !files
    ) {
      return {
        error: "All fields are required",
      };
    }
    const commition = Math.round(comitionPrice(presentPrice, category));
    const imageUrls = [];
    const names = uuidv4();
    for (const file of files) {
      try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const res = await uploadFileToS3(buffer, names + file.name);
        imageUrls.push(res);
      } catch (error) {
        return { error: error.message };
      }
    }

    const product = {
      name,
      description,
      images: imageUrls,
      category,
      subCategory,
      childCategory,
      brandName,
      tags,
      previousPrice,
      presentPrice,
      stock,
      color,
      size,
      sellerId,
      sold_out: 0,
      ratings: 0,
      reviews: [],
      commition,
      ...data,
      createdAt: new Date(),
    };

    const res = await db.collection("products").insertOne(product);

    if (res.acknowledged == true) {
      return {
        success: true,
        message: "Product created successfully",
      };
    }
  } catch (error) {
    return { message: error.message };
  }
};

export const comitionPrice = (price, category) => {
  const FashionPercentage = 7.53;
  const motherAndBaby = 3.62;
  const bag_buity = 3.43;
  const kids_electrical = 6.69;
  const kitchen_home = 4.99;
  const Automotive = 4.23;
  const food_book_other = 2.53;
  let comitionPrice = 0;
  if (
    category === "Men's Fashion" ||
    category === "Women's Fashions" ||
    category === "Boy's Fashions" ||
    category === "Girl's Fashions"
  ) {
    comitionPrice = price * (FashionPercentage / 100);
  }
  if (category === "Mother & Baby") {
    comitionPrice = price * (motherAndBaby / 100);
  }
  if (category === "Bag & Jewellery" || category === "Health & Beauty") {
    comitionPrice = price * (bag_buity / 100);
  }
  if (category === "Kids & Toys" || category === "Electronics Device") {
    comitionPrice = price * (kids_electrical / 100);
  }
  if (category === "Kitchen" || category === "Home & Lifestyle") {
    comitionPrice = price * (kitchen_home / 100);
  }
  if (category === "Automotive & Motorbike") {
    comitionPrice = price * (Automotive / 100);
  }
  if (
    category === "Foods" ||
    category === "Accessories" ||
    category === "Books"
  ) {
    comitionPrice = price * (food_book_other / 100);
  }

  return comitionPrice;
};

export const UpdateProducts = async (data, id) => {
  try {
    const db = await connectToDB();

    if (data.previousPrice < data.presentPrice) {
      return {
        error: "old price must be greater than Present price",
      };
    }
    if (
      !data.name ||
      !data.description ||
      !data.tags ||
      !data.presentPrice ||
      !data.stock
    ) {
      return {
        error: "Mark fields are required",
      };
    }

    const product = {
      ...data,
      updatedAt: new Date(),
    };

    const res = await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: product,
      }
    );
    if (res.acknowledged == true) {
      revalidatePath(`/product/${id}`);
      return {
        success: true,
        message: "Product update successfully",
      };
    }
  } catch (error) {
    return { message: error.message };
  }
};
