"use client";

import SubmitButton from "@/components/button/submitButton";
import { CreateProducts } from "@/serverAction/product";
import { useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { toast } from "sonner";
import Image from "next/image";
function ProductForm({ categories, seller }) {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState(null); // New state to store the selected subcategory
  const [fields, setFields] = useState([]);
  const [images, setImages] = useState([]);
  const [clickedButtons, setClickedButtons] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [colorValue, setColorValue] = useState("");
  const formRef = useRef();
  const pName = useRef(null);
  const childCate = useRef(null);
  const pDescription = useRef(null);
  const pBrandname = useRef(null);
  const pStock = useRef(null);
  const pPrevious = useRef(null);
  const pPresent = useRef(null);
  const [sizes, setSizes] = useState([]);
  const [tags, setTags] = useState([]);
  const [colors, setColors] = useState([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleSubCategoryChange = (e) => {
    const selectedSubCategoryName = e.target.value;
    const selectedSubCategoryObject = categories
      .find((cat) => cat.name === category)
      ?.children.find((i) => i.name === selectedSubCategoryName);
    setSelectedSubCategory(selectedSubCategoryObject);
    setSubCategory(selectedSubCategoryName);
  };

  const handleAddColor = () => {
    if (colorValue.trim() !== "") {
      setColors([...colors, colorValue]);
      setColorValue("");
    }
  };

  const handleDeleteColor = (index) => {
    setColors((prev) => {
      const newColors = [...prev];
      newColors.splice(index, 1);
      return newColors;
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
  const handleButtonClick = (fieldName) => {
    const newField = (
      <div key={fieldName}>
        <label className="pb-2">
          {fieldName} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name={fieldName}
          className="mt-2 appearance-none block w-full px-3 h-[35px] md:border  border-b-[2px] border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder={`Enter your ${fieldName.toLowerCase()}...`}
        />
      </div>
    );
    setFields([...fields, newField]);
    setClickedButtons([...clickedButtons, fieldName]);
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    setIsDraggingOver(false);
    const droppedFiles = Array.from(event.dataTransfer.files);
    const filteredFiles = droppedFiles.filter(
      (file) =>
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg"
    );
    const filesUnderLimit = filteredFiles.filter(
      (file) => file.size <= 2 * 1024 * 1024
    );
    setImages([...images, ...filesUnderLimit]);
  };
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();

    setIsDraggingOver(false);
  };
  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const filteredFiles = selectedFiles.filter(
      (file) =>
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg"
    );
    const filesUnderLimit = filteredFiles.filter(
      (file) => file.size <= 2 * 1024 * 1024
    ); // 2 MB limit
    setImages([...images, ...filesUnderLimit]);
  };

  const handleImageDelete = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };
  const refsToReset = [childCate, pName, pDescription, pStock, pBrandname];
  const handleSubmit = async () => {
    const childcategory = childCate.current ? childCate.current.value : "";
    const name = pName.current ? pName.current.value : "";
    const description = pDescription.current ? pDescription.current.value : "";
    const stock = pStock.current ? pStock.current.value : "";
    const previousPrice = pPrevious.current ? pPrevious.current.value : "";
    const presentPrice = pPresent.current ? pPresent.current.value : "";
    const formData = new FormData();

    const data = {};
    for (let [key, value] of formData.entries()) {
      if (value.trim() !== "" && clickedButtons.includes(key)) {
        data[key] = value;
      }
    }
    // Append additional data to formData
    formData.append("name", name);
    formData.append("description", description);
    formData.append("stock", stock);
    formData.append("previousPrice", previousPrice);
    formData.append("presentPrice", presentPrice);
    formData.append("sellerId", seller._id);
    formData.append("subCategory", subCategory);
    formData.append("childCategory", childcategory);
    sizes.forEach((size) => {
      formData.append("size[]", size);
    });

    sizes.forEach((color) => {
      formData.append("color[]", color);
    });

    tags.forEach((tag) => {
      formData.append("tag[]", tag);
    });

    images.forEach((image) => {
      formData.append("images", image);
    });
    try {
      const res = await CreateProducts(formData, data);
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
    <div className="w-[98%] md:w-11/12 mx-auto ">
      <div className="space-y-2">
        <div
          className={`border ${
            isDraggingOver
              ? "border-[#0ae7ff] bg-[#f0f0f0]"
              : "border-dashed border-spacing-8 border-collapse "
          } p-4 flex flex-col justify-center items-center mx-auto w-[98%] md:w-[550px] md:h-[240px] bg-gray-50  rounded-lg`}
          onDrop={handleFileDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          <IoCloudUploadOutline size={60} className="mx-auto" />
          <h1>Drag & Drop files here</h1>
          <p>or</p>
          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            id="imageUpload"
          />
          <label
            htmlFor="imageUpload"
            className="border-[#0ae7ff] cursor-pointer text-[#1c9aa8] p-[5px] rounded-lg border-[2px]"
          >
            Browse Files
          </label>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-3">
          {images.map((image, index) => (
            <div key={index} className=" relative">
              <Image
                src={URL.createObjectURL(image)}
                alt={`Preview ${index}`}
                width={500}
                height={500}
                className="h-[50px] w-[60px]  object-cover rounded"
              />

              <button
                onClick={() => handleImageDelete(index)}
                className="absolute top-0 right-0 bg-red-500 text-white h-[20px] w-[20px] rounded-full hover:bg-red-600"
              >
                X
              </button>
            </div>
          ))}
        </div>

        <form action={handleSubmit}>
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
          <div className=" flex gap-6 flex-wrap">
            <div className="w-full md:w-[45%]">
              <label className="pb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full mt-2 md:border border-b-[2px] h-[35px] rounded-[5px] pl-2 cursor-pointer"
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
                className="w-full mt-2 md:border border-b-[2px] h-[35px] rounded-[5px] cursor-pointer"
                name="subcategory"
                value={subCategory}
                onChange={handleSubCategoryChange}
              >
                <option value="Choose a subcategory">
                  Choose a subcategory
                </option>
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
                className="w-full mt-2 md:border border-b-[2px] h-[35px] rounded-[5px] cursor-pointer"
                name="childcategory"
              >
                <option value="Choose a subcategory">
                  Choose a subcategory
                </option>
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
                className="mt-2 appearance-none block w-full px-3 h-[35px] md:border border-b-[2px] border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter product's brand name..."
              />
            </div>
          </div>
          <br />
          {/* Size checkboxes */}
          <div className="flex flex-wrap w-full pb-4  gap-2  ">
            <div className="w-full md:w-[45%]  ">
              <div className="flex gap-3 pb-2 flex-wrap ">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="flex gap-2 px-2 bg-slate-100 text-black border-sm rounded-md"
                  >
                    <span>{color}</span>
                    <h2
                      onClick={() => handleDeleteColor(index)}
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
                  value={colorValue}
                  onChange={(e) => setColorValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddColor();
                    }
                  }}
                  placeholder="Enter colors"
                  className=" appearance-none block w-[60%]  px-3 h-[35px] md:border border-b-[2px] border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />

                <h4
                  onClick={handleAddColor}
                  className="bg-slate-300 text-black border border-[#0d501715] rounded-md px-3 cursor-pointer py-1 font-medium"
                >
                  Add color
                </h4>
              </div>
            </div>
            <div className="w-full md:w-[45%] mx-auto ">
              <div className="flex gap-3 pb-2 flex-wrap ">
                {sizes.map((size, index) => (
                  <div
                    key={index}
                    className="flex gap-2 px-2 bg-slate-100 text-black border-sm rounded-md"
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
                  className=" appearance-none block w-[60%]  px-3 h-[35px] md:border border-b-[2px] border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />

                <h4
                  onClick={handleAddSize}
                  className="bg-slate-300 text-black border border-[#0d501715] rounded-md px-3 cursor-pointer py-1 font-medium"
                >
                  Add Size
                </h4>
              </div>
            </div>

            {/* tag array */}
            <div className="w-full md:w-[48%] ">
              <div className="flex gap-3 pb-2 flex-wrap ">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex gap-2 px-2 bg-slate-100 text-black border-sm rounded-md"
                  >
                    <span>{tag}</span>
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
                  className=" appearance-none block w-[60%]  px-3 h-[35px] md:border border-b-[2px] border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />

                <h4
                  onClick={handleAddTag}
                  className="bg-slate-300 text-black border border-[#0d501715] rounded-md px-3 cursor-pointer py-1 font-medium"
                >
                  Add tags <span className="text-red-500">*</span>
                </h4>
              </div>
            </div>
          </div>
          <div className="flex w-full gap-4 flex-col sm:flex-row  py-6">
            <div className="">
              <label className="pb-2">Old Price</label>
              <input
                ref={pPrevious}
                type="number"
                name="previousPrice"
                className="mt-2 appearance-none block w-full px-3 h-[35px] md:border border-b-[2px] border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your product price..."
              />
            </div>

            <div className="">
              <label className="pb-2">
                Present Price <span className="text-red-500">*</span>{" "}
              </label>
              <input
                required
                ref={pPresent}
                type="number"
                name="presentPrice"
                className="mt-2 appearance-none block w-full px-3 h-[35px] md:border border-b-[2px] border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your product price with discount..."
              />
            </div>

            <div className="">
              <label className="pb-2">
                Product Stock <span className="text-red-500">*</span>
              </label>
              <input
                ref={pStock}
                type="number"
                name="stock"
                className="mt-2 appearance-none block w-full px-3 h-[35px]  border-b-[2px] md:border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your product stock..."
              />
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            {fields.map((field, index) => (
              <div key={index} className="w-full md:w-[47%]">
                {field}
              </div>
            ))}
          </div>
          <br />

          <div>
            <SubmitButton name="Create Product" type="loading" />
          </div>
        </form>
        <div className="py-8 flex gap-2 flex-wrap">
          {!clickedButtons.includes("country") && (
            <button
              className="  px-2 py-[3px] rounded border border-black "
              onClick={() => {
                handleButtonClick("country");
                setClickedButtons([...clickedButtons, "country"]);
              }}
            >
              Country of Origin
            </button>
          )}
          {!clickedButtons.includes("productType") && (
            <button
              className="  px-2 py-[3px] rounded border border-black "
              onClick={() => {
                handleButtonClick("productType");
                setClickedButtons([...clickedButtons, "productType"]);
              }}
            >
              Product Type
            </button>
          )}
          {!clickedButtons.includes("model") && (
            <button
              className="  px-2 py-[3px] rounded border border-black "
              onClick={() => {
                handleButtonClick("model");
                setClickedButtons([...clickedButtons, "model"]);
              }}
            >
              Product Model
            </button>
          )}
          {!clickedButtons.includes("productMaterial") && (
            <button
              className="  px-2 py-[3px] rounded border border-black "
              onClick={() => {
                handleButtonClick("productMaterial");
                setClickedButtons([...clickedButtons, "productMaterial"]);
              }}
            >
              Product Material
            </button>
          )}
          {!clickedButtons.includes("powerSupply") && (
            <button
              className="  px-2 py-[3px] rounded border border-black "
              onClick={() => {
                handleButtonClick("powerSupply");
                setClickedButtons([...clickedButtons, "powerSupply"]);
              }}
            >
              Power Supply
            </button>
          )}
          {!clickedButtons.includes("capacity") && (
            <button
              className="  px-2 py-[3px] rounded border border-black "
              onClick={() => {
                handleButtonClick("capacity");
                setClickedButtons([...clickedButtons, "capacity"]);
              }}
            >
              Capacity
            </button>
          )}
          {!clickedButtons.includes("powerConsumed") && (
            <button
              className="  px-2 py-[3px] rounded border border-black "
              onClick={() => {
                handleButtonClick("powerConsumed");
                setClickedButtons([...clickedButtons, "powerConsumed"]);
              }}
            >
              Power Consumed
            </button>
          )}
          {!clickedButtons.includes("warranty") && (
            <button
              className="  px-2 py-[3px] rounded border border-black "
              onClick={() => {
                handleButtonClick("warranty");
                setClickedButtons([...clickedButtons, "warranty"]);
              }}
            >
              Warranty
            </button>
          )}

          {/* Add more buttons for additional fields */}
        </div>
      </div>
    </div>
  );
}
export default ProductForm;
