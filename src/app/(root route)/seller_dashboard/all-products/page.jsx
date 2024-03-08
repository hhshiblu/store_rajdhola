import { getProducts } from "@/serverAction/product";
import React from "react";
import { DataProductTable } from "./productTable";
import { getSeller } from "@/serverAction/seller";
import { redirect } from "next/dist/server/api-utils";

async function page() {
  const products = await getProducts();
  const seller = await getSeller();

  if (!seller.address) {
    redirect("/pending_seller");
  }
  return <DataProductTable data={products} />;
}

export default page;
