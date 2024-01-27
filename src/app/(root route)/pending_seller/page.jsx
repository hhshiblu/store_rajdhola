import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import { getSeller } from "@/serverAction/seller";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// import { useRouter } from "next/navigation";
import React from "react";

async function page() {
  // const route = useRouter();
  const session = await getServerSession(authOptions);
  const seller = await getSeller();
  if (seller.status === "active") {
    redirect("/seller_dashboard");
  }
  return (
    <div>
      <h2>
        {seller.status} {session.user.status}
      </h2>
    </div>
  );
}

export default page;
