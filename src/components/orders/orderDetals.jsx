"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
// import { upDate } from "@/serverAction/order/order";

const OrderDetals = ({ data }) => {
  const [statuss, setStatus] = useState("");
  const { info, status } = data.orderArray[0].paymentInfo;

  const createdAt = new Date(data.createdAt);
  const formattedDate = `${createdAt.getDate()}/${
    createdAt.getMonth() + 1
  }/${createdAt.getFullYear()}`;

  const deliveredAt = new Date(data.deliveredAt);
  const deliveryDate = `${deliveredAt.getDate()}/${
    deliveredAt.getMonth() + 1
  }/${deliveredAt.getFullYear()}`;

  // order paid date
  const paidAt = new Date(data.paidAt);
  const PaidDate = `${paidAt.getDate()}/${
    paidAt.getMonth() + 1
  }/${paidAt.getFullYear()}`;
  console.log(statuss);
  return (
    <div className="w-[98%] md:w-11/12 mx-auto">
      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
          Order ID: <span>#{data?.orderId?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Placed on: <span>{formattedDate}</span>
        </h5>
      </div>

      {/* order items */}

      <br />

      {data?.orderArray.map((i, index) => {
        return (
          <div key={index}>
            {i.products.map((product, index) => {
              const { name, presentPrice, images } = product.Products;
              return (
                <div
                  className="w-full gap-8 flex items-center  my-5"
                  key={index}
                >
                  <div>
                    <Image
                      src={""}
                      alt=""
                      width={50}
                      height={50}
                      className="w-[50x] h-[50px] "
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h5 className=" text-sm  text-blue-950">{name}</h5>
                    <h5 className="pl-3 text-[20px] text-[#00000091] text-sm">
                      bdt {presentPrice} x {product.quantity}
                    </h5>
                  </div>
                  <div className="">
                    <h5 className="pl-8 text-sm  text-[#0C134F] ">hello</h5>
                  </div>
                </div>
              );
            })}
            <hr />
            <hr />
            <div className="text-right pr-8">
              Products_Price :
              <span>
                {" "}
                bdt {i?.price} : commition :{i?.commition}{" "}
              </span>
            </div>
            <div className="text-right pr-8">
              :<span className="font-semibold"> bdt {i?.price} </span>
            </div>
            <div className="text-right pr-8">
              totalPrice :
              <span className="font-semibold"> bdt {i?.price} </span>
            </div>
          </div>
        );
      })}

      <div className="w-full  mx-auto  flex flex-col md:flex-row  items-center">
        <div className="w-full  800px:w-[60%]">
          <h4 className=" text-[20px] md:text-md font-normal ">
            Shipping Address:
          </h4>

          {/* <h4 className="pt-3 text-sm md:text-md py-1 font-[500] text-[#00000084]">
              {data?.shippingAddress.address1}
            </h4>
            <div className="flex  ">
              <h4 className=" text-sm md:text-md pr-2 font-[500] text-[#00000084]">
                {data?.shippingAddress.district}
              </h4>
              {
                <h4 className=" text-sm  md:text-md font-[500] text-[#00000084]">
                  , {data?.shippingAddress.division}
                </h4>
              }
            </div> */}

          {/* <h4 className="font-[500] py-1 text-sm md:text-md text-[#00000084] ">
              Number : {data?.user?.phoneNumber}
            </h4>
            <h4 className="font-[500] text-sm md:text-md text-[#00000084] ">
              email : {data?.user?.email}
            </h4> */}
        </div>
        <br />
        <hr />
        <hr />

        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px] font-normal">Payment Info:</h4>
          <h3 className=" text-sm">
            Type : <span className="font-semibold">{info}</span>
          </h3>
          <h4 className="text-sm ">
            Status:{" "}
            <span className="font-semibold">
              {status ? status : "Not Paid"}
            </span>
          </h4>
        </div>
        <br />
        <div className="w-full mx-auto 800px:w-[40%]">
          <h4 className="pt-3 text-[20px]">Order Status :</h4>
          <h3 className=" text-sm">
            status :{" "}
            <span className="font-semibold">{data.delivery_status}</span>
          </h3>

          <h5 className="text-[#00000084] text-sm py-2">
            Paid on: <span>{PaidDate}</span>
          </h5>
          <h5 className="text-[#00000084] text-sm">
            Delivery date: <span>{deliveryDate}</span>
          </h5>
        </div>
      </div>
      <button
        className={`$w-[150px]  my-3 flex items-center justify-center  cursor-pointer mt-5 !bg-[#FCE1E6] !rounded-[4px] text-[#E94560] font-[600] !h-[45px] text-[18px]`}
        // onClick={
        //   data?.status !== "Processing refund"
        //     ? orderUpdateHandler
        //     : refundOrderUpdateHandler
        // }
      >
        {data?.delivery_status !== "Processing refund" &&
          data?.delivery_status !== "Refund Success" && (
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
            >
              {[
                "pending",
                "processing",
                "Transferred to delivery partner",
                "Shipping",
                "On the way",
                "Delivered",
              ]
                .slice(
                  [
                    "pending",
                    "processing",
                    "Transferred to delivery partner",
                    "Shipping",
                    "On the way",
                    "Delivered",
                  ].indexOf(data?.delivery_status)
                )
                .map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
            </select>
          )}
        {data?.delivery_status === "Processing refund" ||
        data?.delivery_status === "Refund Success" ? (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
          >
            {["Processing refund", "Refund Success"]
              .slice(
                ["Processing refund", "Refund Success"].indexOf(data?.status)
              )
              .map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
          </select>
        ) : null}
        Update Status
      </button>
    </div>
  );
};

export default OrderDetals;

{
  /* {data?.status !== "Processing refund" &&
          data?.status !== "Refund Success" && (
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
            >
              {[
                "Processing",
                "Transferred to delivery partner",
                "Shipping",
                "Received",
                "On the way",
                "Delivered",
              ]
                .slice(
                  [
                    "Processing",
                    "Transferred to delivery partner",
                    "Shipping",
                    "Received",
                    "On the way",
                    "Delivered",
                  ].indexOf(data?.status)
                )
                .map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
            </select>
          )}
        {data?.status === "Processing refund" ||
        data?.status === "Refund Success" ? (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
          >
            {["Processing refund", "Refund Success"]
              .slice(
                ["Processing refund", "Refund Success"].indexOf(data?.status)
              )
              .map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
          </select>
        ) : null} */
}
