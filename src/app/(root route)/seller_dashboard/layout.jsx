import React from "react";

import Sidebar from "./sidebar";
import { getSeller } from "@/serverAction/seller";

async function layout({ children }) {
  const seller = await getSeller();

  return <Sidebar children={children} seller={seller} />;
}

export default layout;
