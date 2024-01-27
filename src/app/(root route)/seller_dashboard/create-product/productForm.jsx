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
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [tagValue, setTagValue] = useState("");

  const handleColorChange = (e, color) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedColors((prevColors) => [...prevColors, color]);
    } else {
      setSelectedColors((prevColors) => prevColors.filter((c) => c !== color));
    }
  };

  const [product, setProduct] = useState({
    ProductName: "",
    description: "",
    tags: "",
    originalPrice: "",
    discountPrice: "",
    stock: "",
    brandName: "",
    model: "",
  });

  const handleImageChange = (e) => {
    const files = e.target.files[0];
    // const newFiles = [...files].filter((file) => {
    //   if (file.size < 1024 * 1024 && file.type.startsWith("image/")) {
    //     return file;
    //   }
    // });
    setImages((prev) => [files, ...prev]);
  };

  async function handelDeleteFile(index) {
    const newFiles = images.filter((_, i) => i !== index);
    setImages(newFiles);
  }

  const handelChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

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

  const HandelSubmit = async () => {
    if (images.length > 5) return alert("upload up to 5 image files");
    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });

    newForm.append("name", product.ProductName);
    newForm.append("description", product.description);
    newForm.append("category", category);
    newForm.append("subCategory", subCategory);
    newForm.append("sellerId", seller._id);
    newForm.append("originalPrice", product.originalPrice);
    newForm.append("discountPrice", product.discountPrice);
    newForm.append("stock", product.stock);
    newForm.append("brandName", product.brandName);
    newForm.append("model", product.model);
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
      router.push("/seller_dashboard/all-products");
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
            name="ProductName"
            value={product.ProductName}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={handelChange}
            placeholder="Enter your product name..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={product.description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={handelChange}
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
              onChange={(e) => setSubCategory(e.target.value)}
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
        </div>
        <br />
        <div className="flex gap-6 flex-wrap">
          <div className="w-full md:w-[45%]">
            <label className="pb-2">Brand Name</label>
            <input
              type="text"
              name="brandName"
              value={product.brandName}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={handelChange}
              placeholder="Enter product's brand name..."
            />
          </div>
          <div className="w-full md:w-[45%]">
            <label className="pb-2">
              Product Model <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="model"
              value={product.model}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={handelChange}
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
        <div>
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
          <div className="w-full flex gap-3  items-center">
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
              className="mt-2 appearance-none block w-[70%] md:w-[50%]  px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
        <div>
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
              placeholder="Enter size"
              className="mt-2 appearance-none block w-[70%] md:w-[50%]  px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />

            <h4
              onClick={handleAddTag}
              className="bg-slate-300 text-black border border-[#0d501715] rounded-md px-3 cursor-pointer mt-1 font-medium"
            >
              Add Tags
            </h4>
          </div>
        </div>
        <br />
        {/* price stock  */}

        <div className="flex gap-2 flex-col sm:flex-row m-auto">
          <div>
            <label className="pb-2">
              Original Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="originalPrice"
              value={product.originalPrice}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={handelChange}
              placeholder="Enter your product price..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">Price (With Discount)</label>
            <input
              type="number"
              name="discountPrice"
              value={product.discountPrice}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={handelChange}
              placeholder="Enter your product price with discount..."
            />
          </div>
          <br />
          <div>
            <label className="pb-2">
              Product Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={handelChange}
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
