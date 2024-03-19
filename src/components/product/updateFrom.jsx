"use client";
import { UpdateProducts } from "@/serverAction/product";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import SubmitButton from "../button/submitButton";
function UpdateForm({ product }) {
  const router = useRouter();
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name || "",
    description: product.description || "",
    brandName: product.brandName || "",
    country: product.country || "",
    productType: product.productType || "",
    model: product.model || "",
    productMaterial: product.productMaterial || "",
    powerSupply: product.powerSupply || "",
    capacity: product.capacity || "",
    powerConsumed: product.powerConsumed || "",
    warranty: product.warranty || "",
    color: product.color || [],
    tags: product.tags || [],
    size: product.size || [],
    presentPrice: product.presentPrice || "",
    previousPrice: product.previousPrice || "",
    stock: product.stock || "",
  });

  const handleTagChange = (e, index) => {
    const newTags = [...updatedProduct.tags];
    newTags[index] = e.target.value;
    setUpdatedProduct({ ...updatedProduct, tags: newTags });
  };

  const addTag = () => {
    const lastTag = updatedProduct.tags[updatedProduct.tags.length - 1].trim();
    if (lastTag !== "") {
      setUpdatedProduct({
        ...updatedProduct,
        tags: [...updatedProduct.tags, ""],
      });
    }
  };

  const deleteTag = (index) => {
    const newTags = [...updatedProduct.tags];
    newTags.splice(index, 1);
    setUpdatedProduct({ ...updatedProduct, tags: newTags });
  };
  const handleColorChange = (e, index) => {
    const newColor = [...updatedProduct.color];
    newColor[index] = e.target.value;
    setUpdatedProduct({ ...updatedProduct, color: newColor });
  };

  const addColor = () => {
    const lastColor =
      updatedProduct.color[updatedProduct.color.length - 1].trim();
    if (lastColor !== "") {
      setUpdatedProduct({
        ...updatedProduct,
        color: [...updatedProduct.color, ""],
      });
    }
  };

  const deleteColor = (index) => {
    const newColor = [...updatedProduct.color];
    newColor.splice(index, 1);
    setUpdatedProduct({ ...updatedProduct, color: newColor });
  };
  const handleSizeChange = (e, index) => {
    const newSize = [...updatedProduct.size];
    newSize[index] = e.target.value;
    setUpdatedProduct({ ...updatedProduct, size: newSize });
  };

  const addSize = () => {
    const lastSize = updatedProduct.size[updatedProduct.size.length - 1].trim();
    if (lastSize !== "") {
      setUpdatedProduct({
        ...updatedProduct,
        size: [...updatedProduct.size, ""],
      });
    }
  };

  const deleteSize = (index) => {
    const newSize = [...updatedProduct.size];
    newSize.splice(index, 1);
    setUpdatedProduct({ ...updatedProduct, size: newSize });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleSubmit = async () => {
    const nonEmptyFields = Object.fromEntries(
      Object.entries(updatedProduct).filter(([key, value]) => value !== "")
    );

    try {
      const res = await UpdateProducts(nonEmptyFields, product._id);
      if (res.error) {
        toast.error(res.error, {
          duration: 3000,
          cancel: {
            label: "cancel",
          },
        });
      }
      if (res.success == true) {
        router.push(`/product/${product._id}`);
        toast.success(res.message, {
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
    <form action={handleSubmit} className="sm:p-4 p-3">
      <div className="flex flex-col gap-2">
        <h1>
          <span className="text-[16px] font-semibold">Name:</span>{" "}
          <input
            type="text"
            name="name"
            className="mt-2 appearance-none block w-full px-3 h-[35px]  border-b-[2px] md:border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={updatedProduct.name}
            onChange={handleChange}
          />
        </h1>
        <h2>
          <span className="text-[16px] font-semibold">Description:</span>{" "}
          <textarea
            type="text"
            cols="30"
            required
            rows="8"
            name="description"
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your product description..."
            value={updatedProduct.description}
            onChange={handleChange}
          ></textarea>
        </h2>
        <div className="flex  gap-2 flex-wrap py-2">
          <h1 className="sm:w-[45%] w-full ">
            <span className=" font-semibold text-[19px] ">category:</span>{" "}
            {product.category}
          </h1>
          <h1 className="sm:w-[45%]  w-full">
            <span className=" font-semibold text-[19px]">SubCategory:</span>{" "}
            {product.subCategory}
          </h1>
          <h1 className="sm:w-[45%]  w-full">
            <span className=" font-semibold text-[19px]">Child_Category:</span>
            {product.childCategory}
          </h1>
        </div>
        {updatedProduct.color.length > 0 && (
          <div className=" gap-4 items-center">
            <span className="font-semibold text-[19px]">Color:</span>
            {updatedProduct.color.map((color, index) => (
              <div key={index} className="relative">
                <input
                  type="text"
                  value={color}
                  className="mt-2 appearance-none block w-full px-3 h-[35px]  border-b-[2px] md:border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => handleColorChange(e, index)}
                />
                <button
                  type="button"
                  onClick={() => deleteColor(index)}
                  className=" absolute right-0 z-1 top-1 px-3"
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addColor}
              className="py-1  font-semibold "
            >
              Add color
            </button>
          </div>
        )}
        {updatedProduct.size.length > 0 && (
          <div className=" gap-4 items-center">
            <span className="font-semibold text-[19px]">Size:</span>
            {updatedProduct.size.map((size, index) => (
              <div key={index} className="relative">
                <input
                  type="text"
                  value={size}
                  className="mt-2 appearance-none block w-full px-3 h-[35px]  border-b-[2px] md:border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => handleSizeChange(e, index)}
                />
                <button
                  type="button"
                  onClick={() => deleteSize(index)}
                  className=" absolute right-0 z-1 top-1 px-3"
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSize}
              className="py-1  font-semibold "
            >
              Add size
            </button>
          </div>
        )}
        {updatedProduct.tags.length > 0 && (
          <div className=" gap-4 items-center">
            <span className="font-semibold text-[19px]">Keywords:</span>
            {updatedProduct.tags.map((tag, index) => (
              <div key={index} className="relative">
                <input
                  type="text"
                  value={tag}
                  className="mt-2  appearance-none block w-full px-3 h-[35px]  border-b-[2px] md:border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => handleTagChange(e, index)}
                />
                <button
                  type="button"
                  onClick={() => deleteTag(index)}
                  className=" absolute right-0 z-1 top-1 px-3"
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addTag}
              className="py-1  font-semibold "
            >
              Add Tag
            </button>
          </div>
        )}
        <h1>
          <span className="text-[16px] font-semibold">Brand Name:</span>{" "}
          <input
            type="text"
            name="brandName"
            className="mt-2 appearance-none block w-full px-3 h-[35px]  border-b-[2px] md:border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={updatedProduct.brandName}
            onChange={handleChange}
          />
        </h1>
        <h1>
          <span className="text-[16px] font-semibold">Country:</span>{" "}
          <input
            type="text"
            name="country"
            className="mt-2 appearance-none block w-full px-3 h-[35px]  border-b-[2px] md:border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={updatedProduct.country}
            onChange={handleChange}
          />
        </h1>
        <h1>
          <span className="text-[16px] font-semibold">Product Type:</span>{" "}
          <input
            type="text"
            name="productType"
            className="mt-2 appearance-none block w-full px-3 h-[35px]  border-b-[2px] md:border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={updatedProduct.productType}
            onChange={handleChange}
          />
        </h1>
        <h1>
          <span className="text-[16px] font-semibold">Model:</span>{" "}
          <input
            type="text"
            name="model"
            className="mt-2 appearance-none block w-full px-3 h-[35px]  border-b-[2px] md:border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={updatedProduct.model}
            onChange={handleChange}
          />
        </h1>
        <h1>
          <span className="text-[16px] font-semibold">Product Material:</span>{" "}
          <input
            type="text"
            name="productMaterial"
            className="mt-2 appearance-none block w-full px-3 h-[35px]  border-b-[2px] md:border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={updatedProduct.productMaterial}
            onChange={handleChange}
          />
        </h1>
        <h1>
          <span className="text-[16px] font-semibold">Power Supply:</span>{" "}
          <input
            type="text"
            name="powerSupply"
            className="mt-2 appearance-none block w-full px-3 h-[35px]  border-b-[2px] md:border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={updatedProduct.powerSupply}
            onChange={handleChange}
          />
        </h1>
        <h1>
          <span className="text-[16px] font-semibold">Capacity:</span>{" "}
          <input
            type="text"
            name="capacity"
            className="mt-2 appearance-none block w-full px-3 h-[35px]  border-b-[2px] md:border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={updatedProduct.capacity}
            onChange={handleChange}
          />
        </h1>
        <h1>
          <span className="text-[16px] font-semibold">Power Consumed:</span>{" "}
          <input
            type="text"
            name="powerConsumed"
            className="mt-2 appearance-none block w-full px-3 h-[35px]  border-b-[2px] md:border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={updatedProduct.powerConsumed}
            onChange={handleChange}
          />
        </h1>
        <h1>
          <span className="text-[16px] font-semibold">Warranty:</span>{" "}
          <input
            type="text"
            name="warranty"
            className="mt-2 appearance-none block w-full px-3 h-[35px]  border-b-[2px] md:border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={updatedProduct.warranty}
            onChange={handleChange}
          />
        </h1>
        <div className="flex items-center flex-wrap">
          <h1 className="w-full lg:w-[45%] mx-auto">
            <span className="text-[16px] font-semibold">Old Price:</span>{" "}
            <input
              type="text"
              name="previousPrice"
              className="mt-2 appearance-none block w-full px-3 h-[35px]  border-b-[2px] md:border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={updatedProduct.previousPrice}
              onChange={handleChange}
            />
          </h1>
          <h1 className="w-full lg:w-[45%] mx-auto">
            <span className="text-[16px] font-semibold">Present Price:</span>{" "}
            <input
              type="text"
              name="presentPrice"
              className="mt-2 appearance-none block w-full px-3 h-[35px]  border-b-[2px] md:border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={updatedProduct.presentPrice}
              onChange={handleChange}
            />
          </h1>
          <h1 className="w-full lg:w-[45%] mx-auto">
            <span className="text-[16px] font-semibold">Stock:</span>{" "}
            <input
              type="text"
              name="stock"
              className="mt-2 appearance-none block w-full px-3 h-[35px]  border-b-[2px] md:border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={updatedProduct.stock}
              onChange={handleChange}
            />
          </h1>
        </div>
        <SubmitButton name="update Product" type="loading" />
      </div>
    </form>
  );
}

export default UpdateForm;
