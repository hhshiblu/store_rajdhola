"use client";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { signIn } from "next-auth/react";
import SubmitButton from "@/components/route/button/submitButton";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
function LoginFrom() {
  const router = useRouter();
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const HandelSubmit = async () => {
    try {
      const res = await signIn("credentials", {
        identity,
        password,
        callbackUrl: "/seller_dashboard",
        redirect: false,
      });

      if (res.ok == false) {
        toast.error(res.error, {
          duration: 3000,
          cancel: {
            label: "cancel",
          },
        });
      }
      if (res.ok == true) {
        router.push(res.url);
        toast.success("user login successfully", {
          duration: 3000,
          cancel: {
            label: "cancel",
          },
        });
      }
    } catch (error) {
      toast.error(error.message, {
        duration: 3000,
        cancel: {
          label: "cancel",
        },
      });
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6 sm:px-6 lg:px-8 z-50">
      <div
        className="sm:mx-auto sm:w-full sm:max-w-md pl-36 pb-1"
        style={{ zIndex: "inherit" }}
      >
        <Image
          src={"/rajdhola_title_logo.svg"}
          alt={"rajdhola-logo"}
          className="w-[140px]"
          width={100}
          height={100}
        />
      </div>

      <div
        className=" sm:mx-auto sm:w-full sm:max-w-md "
        style={{ zIndex: "inherit" }}
      >
        <hr />
        <hr />
        <h2 className="pt-2 text-center text-xl font-semibold text-gray-600">
          Login to your account
        </h2>
      </div>

      <div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        style={{ zIndex: "inherit" }}
      >
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-3" action={HandelSubmit}>
            <div>
              <label
                htmlFor="identity"
                className="block text-sm font-medium text-gray-700"
              >
                Enter email or Number
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="identity"
                  autoComplete="email"
                  placeholder="Enter email or Number"
                  required
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPassword1 ? "text" : "password"}
                  name="password"
                  autoComplete="curent-password"
                  placeholder="*****"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 sm:text-sm"
                />
                {showPassword1 ? (
                  <AiOutlineEye
                    className=" absolute right-3 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setShowPassword1(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className=" absolute right-3 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setShowPassword1(true)}
                  />
                )}
              </div>
            </div>
            <div className="text-[14px] text-[#00453e] font[500] text-right   ">
              <Link href="/login/forgot-password"> Forgotten password? </Link>
            </div>
            <div>
              <SubmitButton name="Login" type="loading..." />
            </div>
          </form>
        </div>
      </div>
      <div
        className="flex justify-center text-center font-semibold pt-8 text-gray-600 gap-4 w-full mx-auto text-[14px]"
        style={{ zIndex: "inherit" }}
      >
        <span>
          <Link href="#">© Rajdhola</Link>
        </span>
        <span>
          <Link href="#">Contact</Link>
        </span>
        <span>
          <Link href="#">Privacy & terms</Link>
        </span>
      </div>
    </div>
  );
}

export default LoginFrom;
