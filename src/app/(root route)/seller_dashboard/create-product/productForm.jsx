"use client";

import React, { useRef, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { CreateProducts } from "@/serverAction/product";
import Photocard from "./photocard";
import { toast } from "sonner";
import SubmitButton from "@/components/button/submitButton";
import { useRouter } from "next/navigation";

const colorsData = [
  "Red",
  "White",
  "Green",
  "blue",
  "yellow",
  "cyan",
  "off-white",
];

function ProductForm({ categories, seller }) {
  const router = useRouter();
  const formRef = useRef();
  const childCate = useRef(null);
  const pName = useRef(null);
  const pDescription = useRef(null);
  const pModel = useRef(null);
  const pCountry = useRef(null);
  const pMaterial = useRef(null);
  const pCapacity = useRef(null);
  const pPower = useRef(null);
  const pPowerConsumed = useRef(null);
  const pWarranty = useRef(null);

  const pType = useRef(null);
  const pStock = useRef(null);
  const pBrandname = useRef(null);
  const pOriginalPrice = useRef(null);
  const pDiscountPrice = useRef(null);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const [selectedColors, setSelectedColors] = useState([]);
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState(null); // New state to store the selected subcategory

  const handleSubCategoryChange = (e) => {
    const selectedSubCategoryName = e.target.value;
    const selectedSubCategoryObject = categories
      .find((cat) => cat.name === category)
      ?.children.find((i) => i.name === selectedSubCategoryName);
    setSelectedSubCategory(selectedSubCategoryObject);
    setSubCategory(selectedSubCategoryName);
  };

  const handleColorChange = (e, color) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedColors((prevColors) => [...prevColors, color]);
    } else {
      setSelectedColors((prevColors) => prevColors.filter((c) => c !== color));
    }
  };
  const handleImageChange = (e) => {
    const files = e.target.files[0];
    if (
      files.size < 1.5 * 1024 * 1024 &&
      (files.type === "image/jpeg" || files.type === "image/png")
    ) {
      setImages((prev) => [files, ...prev]);
    } else {
      toast.error(
        "Please choose a JPG or PNG image with size less than 1.5MB",
        {
          duration: 3000,
          cancel: {
            label: "cancel",
          },
        }
      );
    }
  };
  async function handelDeleteFile(index) {
    const newFiles = images.filter((_, i) => i !== index);
    setImages(newFiles);
  }

  const handleAddSize = () => {
    if (inputValue.trim() !== "") {
      setSizes([...sizes, inputValue]);
      setInputValue("");
    }
  };
  const handleDeleteSize = (index) => {
    setSizes((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes.splice(index, 1);
      return newSizes;
    });
  };
  const handleAddTag = () => {
    if (tagValue.trim() !== "") {
      setTags([...tags, tagValue]);
      setTagValue("");
    }
  };

  const handleDeleteTag = (index) => {
    setTags((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes.splice(index, 1);
      return newSizes;
    });
  };
  const refsToReset = [
    childCate,
    pName,
    pDescription,
    pModel,
    pCountry,
    pMaterial,
    pCapacity,
    pPower,
    pPowerConsumed,
    pWarranty,
    pType,
    pStock,
    pBrandname,
    pOriginalPrice,
    pDiscountPrice,
  ];
  const HandelSubmit = async () => {
    if (!tags.length > 0)
      return toast.error("please add some  keywords ", {
        duration: 3000,
        cancel: {
          label: "cancel",
        },
      });

    if (images.length > 5)
      return toast.error("upload up to 5 image files ", {
        duration: 3000,
        cancel: {
          label: "cancel",
        },
      });

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });

    const childcategory = childCate.current.value;
    const name = pName.current.value;
    const description = pDescription.current.value;
    const stock = pStock.current.value;
    const brandName = pBrandname.current.value;
    const model = pModel.current.value;
    const originalPrice = pOriginalPrice.current.value;
    const discountPrice = pDiscountPrice.current.value;
    const productType = pType.current.value;
    const country = pCountry.current.value;
    const productMaterial = pMaterial.current.value;
    const powerSupply = pPower.current.value;
    const capacity = pCapacity.current.value;
    const powerConsumed = pPowerConsumed.current.value;
    const warranty = pWarranty.current.value;
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("subCategory", subCategory);
    newForm.append("childCategory", childcategory);
    newForm.append("sellerId", seller._id);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("brandName", brandName);
    newForm.append("country", country);
    newForm.append("model", model);

    newForm.append("productType", productType);

    // this for electrical product
    newForm.append("productMaterial", productMaterial);
    newForm.append("powerSupply", powerSupply);
    newForm.append("capacity", capacity);
    newForm.append("powerConsumed", powerConsumed);
    newForm.append("warranty", warranty);

    selectedColors.forEach((color) => {
      newForm.append("color[]", color);
    });

    sizes.forEach((size) => {
      newForm.append("size[]", size);
    });
    tags.forEach((tag) => {
      newForm.append("tag[]", tag);
    });

    const res = await CreateProducts(newForm);
    if (res.error) {
      toast.error(res.error, {
        duration: 3000,
        cancel: {
          label: "cancel",
        },
      });
    }
    if (res.success == true) {
      formRef.current.reset();
      refsToReset.forEach((ref) => (ref.current = null));
      setCategory("");
      setSubCategory("");
      setImages([]);
      setSizes([]);
      setTags([]);
      setSelectedColors([]);
      // router.push("/seller_dashboard/all-products");
      toast.success(res.message, {
        duration: 3000,
        cancel: {
          label: "cancel",
        },
      });
    }
  };
  return (
    <div>
      <form action={HandelSubmit} ref={formRef}>
        <hr />
        <br />

        <div>
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            ref={pName}
            name="name"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your product name..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            ref={pDescription}
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your product description..."
          ></textarea>
        </div>
        <br />
        <div className=" flex gap-6 flex-wrap">
          <div className="w-full md:w-[45%]">
            <label className="pb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mt-2 border h-[35px] rounded-[5px] pl-2"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Choose a category">Choose a category</option>
              {categories &&
                categories.map((i) => (
                  <option value={i.name} key={i.name}>
                    {i.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-full md:w-[45%]">
            <label className="pb-2">
              Subcategory <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mt-2 border h-[35px] rounded-[5px]"
              name="subcategory"
              value={subCategory}
              onChange={handleSubCategoryChange}
            >
              <option value="Choose a subcategory">Choose a subcategory</option>
              {categories &&
                categories
                  .find((cat) => cat.name === category)
                  ?.children.map((i, index) => (
                    <option key={index} value={i.name}>
                      {i.name}
                    </option>
                  ))}
            </select>
          </div>
          <div className="w-full md:w-[45%]">
            <label className="pb-2">
              Children category <span className="text-red-500">*</span>
            </label>
            <select
              ref={childCate}
              className="w-full mt-2 border h-[35px] rounded-[5px]"
              name="childcategory"
            >
              <option value="Choose a subcategory">Choose a subcategory</option>
              {selectedSubCategory &&
                selectedSubCategory.children.map((cate, i) => (
                  <option key={i} value={cate.name}>
                    {cate.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-full md:w-[45%]">
            <label className="pb-2">Brand Name</label>
            <input
              ref={pBrandname}
              type="text"
              name="brandName"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter product's brand name..."
            />
          </div>
          <div className="w-full md:w-[45%]">
            <label className="pb-2">
              Country Of Origin <span className="text-red-500">*</span>
            </label>
            <input
              ref={pCountry}
              type="text"
              name="country"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Product's origin country..."
            />
          </div>{" "}
        </div>
        <br />
        <div className="flex gap-6 flex-wrap">
          <div className="w-full md:w-[45%]">
            <label className="pb-2">Product Type</label>
            <input
              ref={pType}
              type="text"
              name="productType"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter product's brand name..."
            />
          </div>
          <div className="w-full md:w-[45%]">
            <label className="pb-2">
              Product Model <span className="text-red-500">*</span>
            </label>
            <input
              ref={pModel}
              type="text"
              name="model"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter product's brand name..."
            />
          </div>
        </div>
        <br />
        <div>
          <label className="pb-2">Colors : </label>
          {colorsData.map((color) => (
            <label key={color}>
              <input
                type="checkbox"
                name="colors"
                value={color}
                className="pl-2 text-red-900  cursor-pointer"
                checked={selectedColors.includes(color)}
                onChange={(e) => handleColorChange(e, color)}
              />
              <span className="px-1 cursor-pointer">{color}</span>
            </label>
          ))}
        </div>
        <br />

        {/* Size checkboxes */}
        <div className="flex flex-wrap w-full pb-4">
          <div className="w-full md:w-[45%] ">
            <div className="flex gap-3 pb-2 flex-wrap ">
              {sizes.map((size, index) => (
                <div
                  key={index}
                  className="flex gap-2 px-2 bg-slate-300 text-black border-sm rounded-md"
                >
                  <span>{size}</span>
                  <h2
                    onClick={() => handleDeleteSize(index)}
                    className="cursor-pointer"
                  >
                    ✖
                  </h2>
                </div>
              ))}
            </div>
            <div className=" flex gap-3  items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSize();
                  }
                }}
                placeholder="Enter size"
                className="mt-2 appearance-none block w-[60%]  px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              <h4
                onClick={handleAddSize}
                className="bg-slate-300 text-black border border-[#0d501715] rounded-md px-3 cursor-pointer mt-1 font-medium"
              >
                Add Size
              </h4>
            </div>
          </div>
          <br />
          {/* tag array */}
          <div className="w-full md:w-[45%]">
            <div className="flex gap-3 pb-2 flex-wrap ">
              {tags.map((size, index) => (
                <div
                  key={index}
                  className="flex gap-2 px-2 bg-slate-300 text-black border-sm rounded-md"
                >
                  <span>{size}</span>
                  <h2
                    onClick={() => handleDeleteTag(index)}
                    className="cursor-pointer"
                  >
                    ✖
                  </h2>
                </div>
              ))}
            </div>
            <div className="w-full flex gap-3  items-center">
              <input
                type="text"
                value={tagValue}
                onChange={(e) => setTagValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                placeholder="Enter keywords"
                className="mt-2 appearance-none block w-[60%]  px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              <h4
                onClick={handleAddTag}
                className="bg-slate-300 text-black border border-[#0d501715] rounded-md px-3 cursor-pointer mt-1 font-medium"
              >
                Add Keywords
              </h4>
            </div>
          </div>
        </div>
        {/* // category based some  product info */}

        {(category == "Electronics Device" ||
          category == "Electronics Accessories" ||
          category == "Kitchen") && (
          <div className="flex gap-6 flex-wrap pt-2 border border-dashed border-blue-700 p-2">
            <div className="w-full md:w-[45%]">
              <label className="pb-2">
                Product material <span className="text-red-500">*</span>
              </label>
              <input
                ref={pMaterial}
                type="text"
                name="productMaterial"
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter product's material..."
              />
            </div>
            <div className="w-full md:w-[45%]">
              <label className="pb-2">
                Power Supply <span className="text-red-500">*</span>
              </label>
              <input
                ref={pPower}
                type="text"
                name="powerSupply"
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter product's power suppy.."
              />
            </div>
            <div className="w-full md:w-[45%]">
              <label className="pb-2">Capacity </label>
              <input
                ref={pCapacity}
                type="text"
                name="capacity"
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter product's capacity..."
              />
            </div>
            <div className="w-full md:w-[45%]">
              <label className="pb-2">
                Power Consumed <span className="text-red-500">*</span>
              </label>
              <input
                ref={pPowerConsumed}
                type="text"
                name="powerConsumed"
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Power consumed (1** W)..."
              />
            </div>

            <div className="w-full md:w-[45%]">
              <label className="pb-2">Warranty</label>
              <input
                ref={pWarranty}
                type="text"
                name="warranty"
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="how days warranty ..."
              />
            </div>
          </div>
        )}

        <br />
        {/* price stock  */}

        <div className="flex gap-2 flex-col sm:flex-row m-auto">
          <div>
            <label className="pb-2">
              Original Price <span className="text-red-500">*</span>
            </label>
            <input
              ref={pOriginalPrice}
              type="number"
              name="originalPrice"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your product price..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">Price (With Discount)</label>
            <input
              ref={pDiscountPrice}
              type="number"
              name="discountPrice"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your product price with discount..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Product Stock <span className="text-red-500">*</span>
            </label>
            <input
              ref={pStock}
              type="number"
              name="stock"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your product stock..."
            />
          </div>
        </div>
        <br />

        {/* =--------------images */}
        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap ">
            <label htmlFor="upload" className="cursor-pointer">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((files, index) => (
                <Photocard
                  key={index}
                  url={URL.createObjectURL(files)}
                  onClick={() => handelDeleteFile(index)}
                />
              ))}
          </div>
          <br />
        </div>
        <div>
          <SubmitButton name="Create Product" type="loading" />
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
