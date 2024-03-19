"use server";
import bcrypt from "bcryptjs";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import connectToDB from "@/lib/connect";
import { sendMail } from "@/lib/sendEmail";
import { sentOtp } from "@/lib/sentOtp";
import { uploadFileToS3 } from "@/lib/uploadImage";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { v4 as uuidv4 } from "uuid";

function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
}

export const getSeller = async () => {
  try {
    const session = await getServerSession(authOptions);
    const db = await connectToDB();
    const collection = db.collection("sellers");

    const sellerinfo = await collection.findOne(
      { _id: new ObjectId(session.user.sub) },
      { projection: { password: 0, cpassword: 0 } }
    );
    const seller = JSON.parse(JSON.stringify(sellerinfo));
    return seller;
  } catch (error) {
    return error.message;
  }
};

export async function sellerInfo() {
  try {
    const session = await getServerSession(authOptions);
    const db = await connectToDB();
    const productCollection = db.collection("products");
    const OrdersCollection = db.collection("sellerOrder");
    const products = await productCollection
      .find({ sellerId: session.user.sub })
      .toArray();
    const orders = await OrdersCollection.find({
      sellerId: session.user.sub,
    }).toArray();

    const totalprice = orders.reduce((acc, order) => acc + order.price, 0);
    const totalCommition = orders.reduce(
      (acc, order) => acc + order.commition,
      0
    );
    const statuses = ["pending", "delivered"];

    const orderStatus_TotalPrice = await OrdersCollection.find({
      delivery_status: { $in: statuses },
      sellerId: session.user.sub,
    }).toArray();

    const totalOrder_ByStatus = orderStatus_TotalPrice.reduce((acc, order) => {
      const { delivery_status, price, products, commition } = order;

      if (!acc[delivery_status]) {
        acc[delivery_status] = {
          totalProducts: 0,
          price: 0,
          commition: 0,
        };
      }
      acc[delivery_status].commition += commition;
      acc[delivery_status].totalProducts += products.length;

      acc[delivery_status].price += price;

      return acc;
    }, {});

    return {
      totalProducts: products.length,
      totalOrders: orders.length,
      totalprice: totalprice,
      totalCommition,
      totalOrder_ByStatus: totalOrder_ByStatus,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
}

export async function UpdateInfo(fromData) {
  const shopName = fromData.get("shopName");
  const userName = fromData.get("userName");
  const email = fromData.get("email");
  const address = JSON.parse(fromData.get("address"));
  const phoneNumber = fromData.get("phoneNumber");
  const category = fromData.get("category");
  const zipCode = fromData.get("zipCode");
  const image = fromData.get("file");
  const phoneNumberRegex = /^(019|013|014|018|015|016|017)\d{8}$/;
  if (!phoneNumberRegex.test(phoneNumber) || phoneNumber.length !== 11) {
    return {
      error: "Invalid phone number",
    };
  }
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return {
      error: "Invalid email address",
    };
  }

  if (
    !userName ||
    !shopName ||
    !email ||
    !phoneNumber ||
    !address ||
    !address.division ||
    !address.district ||
    !address.upazila ||
    !zipCode ||
    !category
  ) {
    return { error: "please fill all  fields" };
  }

  try {
    const session = await getServerSession(authOptions);
    const db = await connectToDB();
    const seller = await db.collection("sellers").findOne({
      $or: [{ email: email }, { phoneNumber: parseInt(phoneNumber, 10) }],
      _id: { $ne: new ObjectId(session.user.sub) },
    });
    if (seller) {
      return {
        error: "This email already exits",
      };
    }
    let images = null;
    const name = uuidv4();
    try {
      const buffer = Buffer.from(await image.arrayBuffer());
      const res = await uploadFileToS3(buffer, name + image.name);
      images = res;
    } catch (error) {
      return { error: "Something error occurs" };
    }

    const filter = { _id: new ObjectId(session.user.sub) };
    const update = {
      $set: {
        userName,
        shopName,
        images,
        address,
        category,
        email,
        zipCode: parseInt(zipCode, 10),
        category,
        phoneNumber: parseInt(phoneNumber, 10),
        updated: new Date(),
      },
    };

    const res = await db.collection("sellers").updateOne(filter, update);
    if (res.acknowledged == true) {
      return {
        success: true,
        message: "Update Information successfully",
      };
    }
  } catch (error) {
    return {
      error: "Something wrong! Try later",
    };
  }
}

export const getSellerByIdentity = async (identity) => {
  try {
    const db = await connectToDB();
    const seller = await db.collection("sellers").findOne({
      $or: [{ email: identity }, { phoneNumber: parseInt(identity, 10) }],
    });

    if (!seller) {
      return {
        error: "Users not found",
      };
    } else {
      const otp = generateOTP();

      if (/[a-zA-Z@]/.test(identity)) {
        const res = await sendMail({
          email: identity,
          subject: "Activate your shop",
          html: `
                <html lang="en">
        
              <head></head>
              <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">${otp} security code . Begin your Rajdhola venture - start selling with us today!.<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
              </div>
        
              <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
                <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;margin:0 auto;padding:20px 0 48px">
                  <tr style="width:100%">
                    <td><img alt="rajdhola.com" src="https://rajdhola.s3.ap-south-1.amazonaws.com/rajdhola.jpg" width="140" height="40" style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto" />
                      <p style="font-size:16px;line-height:26px;margin:16px 0">Hi ${identity},</p>
                      <p style="font-size:16px;line-height:26px;margin:16px 0">Welcome to Rajdhola, transform your sales journey! Discover leads, close deals, and become a vendor powerhouse. Click below to activate your account now..</p>
                      <table style="text-align:center" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                        <tbody>
                          <tr>
                       <td style="font-weight: bold; font-size: 22px;">${otp}</td>
        
                          </tr>
                        </tbody>
                      </table>
                      <p style="font-size:16px;line-height:26px;margin:16px 0">Best,<br />The Rajdhola team</p>
                      <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc;margin:20px 0" />
                      <p style="font-size:12px;line-height:24px;margin:16px 0;color:#8898aa">@rajdhola </p>
                    </td>
                  </tr>
                </table>
              </body>
        
            </html>
              `,
        });
        if (res.success == true) {
          await db.collection("sellers").updateOne(
            { _id: seller._id },
            {
              $set: {
                otp: otp,
              },
            }
          );

          if (seller.otp) {
            setTimeout(async () => {
              await db
                .collection("sellers")
                .updateOne(
                  { _id: seller._id },
                  { $unset: { otp: "", otpExpiration: "" } }
                );
            }, 5 * 60 * 1000);
          }

          return {
            success: true,
            message: "Send Otp successfully",
          };
        }
      } else {
        const res = await sentOtp(identity, otp);
        if (res.success === 1) {
          await db.collection("sellers").updateOne(
            { _id: seller._id },
            {
              $set: {
                otp: otp,
              },
            }
          );

          if (seller.otp) {
            setTimeout(async () => {
              await db
                .collection("sellers")
                .updateOne(
                  { _id: seller._id },
                  { $unset: { otp: "", otpExpiration: "" } }
                );
            }, 5 * 60 * 1000);
          }

          return {
            success: true,
            message: "Send Otp successfully",
          };
        }
      }
    }
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const verifyOtpForForgot = async (otp, identity) => {
  try {
    if (!otp) {
      return {
        error: "otp  field is required",
      };
    }
    const db = await connectToDB();
    const seller = await db.collection("sellers").findOne({
      $or: [{ email: identity }, { phoneNumber: parseInt(identity, 10) }],
    });
    if (otp == seller.otp) {
      return {
        success: true,
        message: "Otp Verification successful",
      };
    } else {
      return { error: "Invalid OTP. Retry or get a new one." };
    }
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const ChangePassword = async (password, identity) => {
  try {
    if (!password) {
      return {
        error: "Password field is required",
      };
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const db = await connectToDB();
    const seller = await db.collection("sellers").findOne({
      $or: [{ email: identity }, { phoneNumber: parseInt(identity, 10) }],
    });

    const res = await db
      .collection("sellers")
      .updateOne(
        { _id: seller._id },
        { $set: { password: hashPassword, cPassword: hashPassword } }
      );

    if (res.acknowledged == true) {
      await db
        .collection("users")
        .updateOne({ _id: seller._id }, { $unset: { otp: "" } });
      return {
        success: true,
        message: "Password change successfully",
      };
    }
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
