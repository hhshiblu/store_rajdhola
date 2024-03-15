import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request });
  const userProtectedRoutes = [
    "/seller_dashboard",
    "/seller_dashboard/all-orders",
    "/seller_dashboard/all-products",
    "/seller_dashboard/create-produc",
    "/seller_dashboard/withdraw-money",
    "/user-profile/",
    "/seller_dashboard",
  ];
  if (!token && userProtectedRoutes.includes(pathname)) {
    return NextResponse.redirect(
      new URL("/?error=Please login first to access this route", request.url)
    );
  }
  const Seller = ["/"];
  if (token && Seller.includes(pathname)) {
    return NextResponse.redirect(new URL("/seller_dashboard", request.url));
  }
}
