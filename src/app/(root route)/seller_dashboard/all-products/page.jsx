import { getProducts } from "@/serverAction/product";
import React from "react";
import { DataProductTable } from "./productTable";
import { getSeller } from "@/serverAction/seller";
import { redirect } from "next/dist/server/api-utils";

async function page() {
  const products = await getProducts();

  return <DataProductTable data={products} />;
}

export default page;
