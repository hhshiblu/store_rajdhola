import { getProducts } from "@/serverAction/product";
import React from "react";
import { DataProductTable } from "./productTable";

async function page() {
  const products = await getProducts();
  return <DataProductTable data={products} />;
}

export default page;
