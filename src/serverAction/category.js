"use server";

import connectToDB from "@/lib/connect";

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id.toString(),
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}

export const getCategories = async () => {
  try {
    const db = await connectToDB();
    const collection = db.collection("categories");

    const category = await collection.find({}).toArray();

    const categoryList = createCategories(category);
    return categoryList;
  } catch (err) {
    return err.message;
  }
};
