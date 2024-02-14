"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import connectToDB from "@/lib/connect";
import { deleteFiles, uploadFileToS3 } from "@/lib/uploadImage";

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

export const CreateProducts = async (formData) => {
  try {
    const db = await connectToDB();
    const collection = db.collection("products");
    const files = formData.getAll("images");
    const name = formData.get("name");
    const description = formData.get("description");
    const category = formData.get("category");
    const subCategory = formData.get("subCategory");
    const childCategory = formData.get("childCategory");
    const brandName = formData.get("brandName");
    const model = formData.get("model");
    const tags = formData.getAll("tag[]");

    const originalPrice = parseInt(formData.get("originalPrice"));
    const discountPrice = parseInt(formData.get("discountPrice"));
    const stock = parseInt(formData.get("stock"));
    const color = formData.getAll("color[]");
    const size = formData.getAll("size[]");
    const sellerId = formData.get("sellerId");
    if (
      !name ||
      !description ||
      !category ||
      !tags ||
      !subCategory ||
      !originalPrice ||
      !model ||
      !stock ||
      !sellerId ||
      !files
    ) {
      return {
        error: "All fields are required",
      };
    }
    const imageUrls = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const res = await uploadFileToS3(buffer, file.name);
      imageUrls.push({ url: res.url, objectkey: res.objectkey });
    }
    const product = {
      name,
      description,
      images: imageUrls,
      category,
      subCategory,
      childCategory,
      brandName,
      model,
      tags,
      originalPrice,
      discountPrice,
      stock,
      color,
      size,
      sellerId,
      sold_out: 0,
      ratings: 0,
      reviews: [],
      createdAt: new Date(),
    };

    const res = await collection.insertOne(product);
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
