"use client";

import { useRef, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import Image from "next/image";
import { MdOutlineCameraEnhance } from "react-icons/md";
import {
  DistrictSelector,
  DivisionSelector,
  UpazilaSelector,
} from "@/lib/address";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Division } from "@/lib/data";
import SubmitButton from "../button/submitButton";
import { UpdateInfo } from "@/serverAction/seller";
function UpdateSellerInfo({ seller }) {
  const router = useRouter();
  const [name, setName] = useState(seller?.userName || "");
  const [shopName, setShopName] = useState(seller?.shopName || "");
  const [category, setCategory] = useState(seller.category || "");
  const [number, setPhoneNumber] = useState(seller?.phoneNumber || "");
  const [email, setEmail] = useState(seller?.email || "");
  const [area, setArea] = useState(seller.address?.area || "");
  const [zipcode, setZipcode] = useState(seller?.zipCode || "");
  const [avatar, setAvatar] = useState(null);
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const selectedDivisionRef = useRef("");
  const selectedDistrictRef = useRef("");
  const selectedUpazilaRef = useRef("");
  const [selectedDivisionData, setSelectedDivisionData] = useState({
    districts: [],
  });
  const [selectedDistrictData, setSelectedDistrictData] = useState({
    upazilas: [],
  });
  const handleDivisionChange = (value) => {
    selectedDivisionRef.current = value;
    const divisionData = Division.find(
      (division) => division.name === value
    ) || { districts: [] };
    setSelectedDivisionData(divisionData);
    selectedDistrictRef.current = "";
    setSelectedDistrictData({ upazilas: [] });
    selectedUpazilaRef.current = "";
  };
  const handleDistrictChange = (value) => {
    selectedDistrictRef.current = value;
    const districtData = selectedDivisionData.districts.find(
      (district) => district.name === value
    ) || { upazilas: [] };
    setSelectedDistrictData(districtData);
    selectedUpazilaRef.current = "";
  };
  const handleUpazilaChange = (value) => {
    selectedUpazilaRef.current = value;
  };

  // action here

  const handleFormSubmit = async () => {
    if (!avatar) {
      toast.error("Please provide Image", {
        duration: 3000,
        cancel: {
          label: "cancel",
        },
      });
    } else {
      try {
        const newForm = new FormData();

        newForm.append("file", avatar);
        newForm.append("shopName", shopName);
        newForm.append("userName", name);
        newForm.append("email", email);

        newForm.append("zipCode", zipcode);
        newForm.append("phoneNumber", number);
        newForm.append("category", category);
        newForm.append(
          "address",
          JSON.stringify({
            division: selectedDivisionRef.current,
            district: selectedDistrictRef.current,
            upazila: selectedUpazilaRef.current,
            area: area,
          })
        );
        const res = await UpdateInfo(newForm);
        if (res.error) {
          toast.error(res.error, {
            duration: 3000,
            cancel: {
              label: "cancel",
            },
          });
        }
        if (res.success == true) {
          router.push(
            `/seller_dashboard/?message= Shop information updated successfully`
          );
          toast.success(res.message, {
            duration: 3000,
            cancel: {
              label: "cancel",
            },
          });
        }
      } catch (error) {
        if (error) {
          toast.error(error, {
            duration: 3000,
            cancel: {
              label: "cancel",
            },
          });
        }
      }
    }
  };

  return (
    <div className="bg-white shadow-lg sm:rounded-lg rounded-lg py-12 md:px-20 px-4">
      <form action={handleFormSubmit}>
        <div className=" flex items-center relative">
          <span className="inline-block w-[100px] h-[100px] rounded-full overflow-hidden">
            {avatar ? (
              <Image
                src={URL.createObjectURL(avatar)}
                alt="avatar"
                width={50}
                height={50}
                className=" w-full h-full rounded-full"
              />
            ) : seller?.images ? (
              <Image
                src={seller.images.url}
                alt="avatar"
                width={500}
                height={500}
                className="h-full w-full  rounded-full border-[#00453e] border-[3px]"
              />
            ) : (
              <RxAvatar className="h-full w-full" />
            )}
          </span>
          <label
            htmlFor="file-input"
            className="absolute bottom-7 left-[70px] w-[20px] h-[15px] cursor-pointer"
          >
            <MdOutlineCameraEnhance
              className="w-[30px] h-[30px] border-white bg-white"
              size={24}
            />
            <input
              type="file"
              name="avatar"
              id="file-input"
              onChange={handleFileInputChange}
              className="sr-only"
            />
          </label>
        </div>
        <div className="flex gap-2 pt-8 pb-3 flex-wrap">
          <div className="w-full md:w-[49%] mx-auto">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Seller Name<span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter seller name"
                className="appearance-none block w-full px-3 py-[6px] border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="w-full md:w-[49%] mx-auto">
            <label
              htmlFor="shopName"
              className="block text-sm font-medium text-gray-700"
            >
              Shop Name<span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="shopName"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                required
                placeholder="Enter shop name"
                className="appearance-none block w-full px-3 py-[6px] border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="w-full md:w-[49%] mx-auto">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Email<span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter seller email"
                className="appearance-none block w-full px-3 py-[6px] border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="w-full md:w-[49%] mx-auto">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number<span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="phoneNumber"
                value={number}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                placeholder="Enter seller number"
                className="appearance-none block w-full px-3 py-[6px] border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div className=" md:gap-2 flex flex-wrap items-center">
          <DivisionSelector
            divisions={Division}
            onSelectDivision={handleDivisionChange}
            address={seller.address}
          />
          <br />
          <DistrictSelector
            districts={selectedDivisionData.districts}
            onSelectDistrict={handleDistrictChange}
            address={seller.address}
          />
          <br />

          <UpazilaSelector
            upazilas={selectedDistrictData.upazilas}
            onSelectUpazila={handleUpazilaChange}
            address={seller.address}
          />
          <div className="w-[98%] md:w-[49%] md:pl-2">
            <label
              htmlFor="area"
              className="block text-sm font-medium text-gray-700"
            >
              Street Address<span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                required
                placeholder="Enter area"
                className="appearance-none block w-full px-3 py-[6px] border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div className="w-full py-2">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Which category product do you sell
            <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              placeholder="Enter category name"
              className="appearance-none block w-full px-3 py-[6px] border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="w-full py-2">
          <label
            htmlFor="zipcode"
            className="block text-sm font-medium text-gray-700"
          >
            Zipcode<span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="zipcode"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              required
              placeholder="Enter zipcode"
              className="appearance-none block w-full px-3 py-[6px] border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <SubmitButton name="Update" type="Updating..." />
      </form>
    </div>
  );
}

export default UpdateSellerInfo;
