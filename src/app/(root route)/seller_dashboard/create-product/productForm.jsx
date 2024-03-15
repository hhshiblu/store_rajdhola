"use client";

// import React, { useRef, useState } from "react";
// import { AiOutlinePlusCircle } from "react-icons/ai";
// import { CreateProducts } from "@/serverAction/product";
// import Photocard from "./photocard";
// import { toast } from "sonner";
// import SubmitButton from "@/components/button/submitButton";
// import { useRouter } from "next/navigation";

// const colorsData = [
//   "Red",
//   "White",
//   "Green",
//   "Blue",
//   "Yellow",
//   "Cyan",
//   "Pink",
//   "Silver",
//   "Dark blue",
//   "Off-white",
// ];

// function ProductForm({ categories, seller }) {
//   const formRef = useRef();
//   const childCate = useRef(null);
//   const pName = useRef(null);
//   const pDescription = useRef(null);
//   const pModel = useRef(null);
//   const pCountry = useRef(null);
//   const pMaterial = useRef(null);
//   const pCapacity = useRef(null);
//   const pPower = useRef(null);
//   const pPowerConsumed = useRef(null);
//   const pWarranty = useRef(null);

//   const pType = useRef(null);
//   const pStock = useRef(null);
//   const pBrandname = useRef(null);
//   const pPrevious = useRef(null);
//   const pPresent = useRef(null);
//   const [category, setCategory] = useState("");
//   const [subCategory, setSubCategory] = useState("");

//   const [selectedColors, setSelectedColors] = useState([]);
//   const [images, setImages] = useState([]);
//   const [sizes, setSizes] = useState([]);
//   const [tags, setTags] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const [tagValue, setTagValue] = useState("");
//   const [selectedSubCategory, setSelectedSubCategory] = useState(null); // New state to store the selected subcategory

//   const handleSubCategoryChange = (e) => {
//     const selectedSubCategoryName = e.target.value;
//     const selectedSubCategoryObject = categories
//       .find((cat) => cat.name === category)
//       ?.children.find((i) => i.name === selectedSubCategoryName);
//     setSelectedSubCategory(selectedSubCategoryObject);
//     setSubCategory(selectedSubCategoryName);
//   };

//   const handleColorChange = (e, color) => {
//     const { checked } = e.target;
//     if (checked) {
//       setSelectedColors((prevColors) => [...prevColors, color]);
//     } else {
//       setSelectedColors((prevColors) => prevColors.filter((c) => c !== color));
//     }
//   };
//   const handleImageChange = (e) => {
//     const files = e.target.files[0];
//     if (
//       files.size < 1.5 * 1024 * 1024 &&
//       (files.type === "image/jpeg" || files.type === "image/png")
//     ) {
//       setImages((prev) => [files, ...prev]);
//     } else {
//       toast.error(
//         "Please choose a JPG or PNG image with size less than 1.5MB",
//         {
//           duration: 3000,
//           cancel: {
//             label: "cancel",
//           },
//         }
//       );
//     }
//   };
//   async function handelDeleteFile(index) {
//     const newFiles = images.filter((_, i) => i !== index);
//     setImages(newFiles);
//   }

//   const handleAddSize = () => {
//     if (inputValue.trim() !== "") {
//       setSizes([...sizes, inputValue]);
//       setInputValue("");
//     }
//   };
//   const handleDeleteSize = (index) => {
//     setSizes((prevSizes) => {
//       const newSizes = [...prevSizes];
//       newSizes.splice(index, 1);
//       return newSizes;
//     });
//   };
//   const handleAddTag = () => {
//     if (tagValue.trim() !== "") {
//       setTags([...tags, tagValue]);
//       setTagValue("");
//     }
//   };

//   const handleDeleteTag = (index) => {
//     setTags((prevSizes) => {
//       const newSizes = [...prevSizes];
//       newSizes.splice(index, 1);
//       return newSizes;
//     });
//   };
//   const refsToReset = [
//     childCate,
//     pName,
//     pDescription,
//     pModel,
//     pCountry,
//     pMaterial,
//     pCapacity,
//     pPower,
//     pPowerConsumed,
//     pWarranty,
//     pType,
//     pStock,
//     pBrandname,
//   ];
//   const HandelSubmit = async () => {
//     if (!tags.length > 0)
//       return toast.error("please add some  keywords ", {
//         duration: 3000,
//         cancel: {
//           label: "cancel",
//         },
//       });

//     if (images.length > 5)
//       return toast.error("upload up to 5 image files ", {
//         duration: 3000,
//         cancel: {
//           label: "cancel",
//         },
//       });

//     const newForm = new FormData();

//     images.forEach((image) => {
//       newForm.append("images", image);
//     });

//     const childcategory = childCate.current ? childCate.current.value : "";
//     const name = pName.current ? pName.current.value : "";
//     const description = pDescription.current ? pDescription.current.value : "";
//     const stock = pStock.current ? pStock.current.value : "";
//     const brandName = pBrandname.current ? pBrandname.current.value : "";
//     const model = pModel.current ? pModel.current.value : "";
//     const previousPrice = pPrevious.current ? pPrevious.current.value : "";
//     const presentPrice = pPresent.current ? pPresent.current.value : "";
//     const productType = pType.current ? pType.current.value : "";
//     const country = pCountry.current ? pCountry.current.value : "";
//     const productMaterial = pMaterial.current ? pMaterial.current.value : "";
//     const powerSupply = pPower.current ? pPower.current.value : "";
//     const capacity = pCapacity.current ? pCapacity.current.value : "";
//     const powerConsumed = pPowerConsumed.current
//       ? pPowerConsumed.current.value
//       : "";
//     const warranty = pWarranty.current ? pWarranty.current.value : "";
//     newForm.append("name", name);
//     newForm.append("description", description);
//     newForm.append("category", category);
//     newForm.append("subCategory", subCategory);
//     newForm.append("childCategory", childcategory);
//     newForm.append("sellerId", seller._id);
//     newForm.append("previousPrice", previousPrice);
//     newForm.append("presentPrice", presentPrice);
//     newForm.append("stock", stock);
//     newForm.append("brandName", brandName);
//     newForm.append("country", country);
//     newForm.append("model", model);

//     newForm.append("type", productType);

//     // this for electrical product
//     newForm.append("productMaterial", productMaterial);
//     newForm.append("powerSupply", powerSupply);
//     newForm.append("capacity", capacity);
//     newForm.append("powerConsumed", powerConsumed);
//     newForm.append("warranty", warranty);

//     selectedColors.forEach((color) => {
//       newForm.append("color[]", color);
//     });

//     sizes.forEach((size) => {
//       newForm.append("size[]", size);
//     });
//     tags.forEach((tag) => {
//       newForm.append("tag[]", tag);
//     });

//     const res = await CreateProducts(newForm);
//     if (res.error) {
//       toast.error(res.error, {
//         duration: 3000,
//         cancel: {
//           label: "cancel",
//         },
//       });
//     }
//     if (res.success == true) {
//       formRef.current.reset();
//       refsToReset.forEach((ref) => (ref.current = null));
//       setCategory("");
//       setSubCategory("");
//       setImages([]);
//       setSizes([]);
//       setTags([]);
//       setSelectedColors([]);
//       // router.push("/seller_dashboard/all-products");
//       toast.success(res.message, {
//         duration: 3000,
//         cancel: {
//           label: "cancel",
//         },
//       });
//     }
//   };
//   return (
//     <div>
//       <form action={HandelSubmit} ref={formRef}>
//         <hr />
//         <br />

//         <div>
//           <label className="pb-2">
//             Name <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             ref={pName}
//             name="name"
//             className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             placeholder="Enter your product name..."
//           />
//         </div>
//         <br />
//         <div>
//           <label className="pb-2">
//             Description <span className="text-red-500">*</span>
//           </label>
//           <textarea
//             ref={pDescription}
//             cols="30"
//             required
//             rows="8"
//             type="text"
//             name="description"
//             className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             placeholder="Enter your product description..."
//           ></textarea>
//         </div>
//         <br />
//           <div className="w-full md:w-[45%]">
//             <label className="pb-2">
//               Country Of Origin <span className="text-red-500">*</span>
//             </label>
//             <input
//               ref={pCountry}
//               type="text"
//               name="country"
//               className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Product's origin country..."
//             />
//           </div>{" "}
//         </div>
//         <br />
//         <div className="flex gap-6 flex-wrap">
//           <div className="w-full md:w-[45%]">
//             <label className="pb-2">Product Type</label>
//             <input
//               ref={pType}
//               type="text"
//               name="productType"
//               className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Enter product's brand name..."
//             />
//           </div>
//           <div className="w-full md:w-[45%]">
//             <label className="pb-2">
//               Product Model <span className="text-red-500">*</span>
//             </label>
//             <input
//               ref={pModel}
//               type="text"
//               name="model"
//               className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Enter product's brand name..."
//             />
//           </div>
//         </div>
//         <br />
//         <div>
//           <label className="pb-2">Colors : </label>
//           {colorsData.map((color) => (
//             <label key={color}>
//               <input
//                 type="checkbox"
//                 name="colors"
//                 value={color}
//                 className="pl-2 text-red-900  cursor-pointer"
//                 checked={selectedColors.includes(color)}
//                 onChange={(e) => handleColorChange(e, color)}
//               />
//               <span className="px-1 cursor-pointer">{color}</span>
//             </label>
//           ))}
//         </div>
//         <br />

//         {/* Size checkboxes */}
//         <div className="flex flex-wrap w-full pb-4">
//           <div className="w-full md:w-[45%] ">
//             <div className="flex gap-3 pb-2 flex-wrap ">
//               {sizes.map((size, index) => (
//                 <div
//                   key={index}
//                   className="flex gap-2 px-2 bg-slate-300 text-black border-sm rounded-md"
//                 >
//                   <span>{size}</span>
//                   <h2
//                     onClick={() => handleDeleteSize(index)}
//                     className="cursor-pointer"
//                   >
//                     ✖
//                   </h2>
//                 </div>
//               ))}
//             </div>
//             <div className=" flex gap-3  items-center">
//               <input
//                 type="text"
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     e.preventDefault();
//                     handleAddSize();
//                   }
//                 }}
//                 placeholder="Enter size"
//                 className="mt-2 appearance-none block w-[60%]  px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               />

//               <h4
//                 onClick={handleAddSize}
//                 className="bg-slate-300 text-black border border-[#0d501715] rounded-md px-3 cursor-pointer mt-1 font-medium"
//               >
//                 Add Size
//               </h4>
//             </div>
//           </div>
//           <br />
//           {/* tag array */}
//           <div className="w-full md:w-[45%]">
//             <div className="flex gap-3 pb-2 flex-wrap ">
//               {tags.map((size, index) => (
//                 <div
//                   key={index}
//                   className="flex gap-2 px-2 bg-slate-300 text-black border-sm rounded-md"
//                 >
//                   <span>{size}</span>
//                   <h2
//                     onClick={() => handleDeleteTag(index)}
//                     className="cursor-pointer"
//                   >
//                     ✖
//                   </h2>
//                 </div>
//               ))}
//             </div>
//             <div className="w-full flex gap-3  items-center">
//               <input
//                 type="text"
//                 value={tagValue}
//                 onChange={(e) => setTagValue(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     e.preventDefault();
//                     handleAddTag();
//                   }
//                 }}
//                 placeholder="Enter keywords"
//                 className="mt-2 appearance-none block w-[60%]  px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               />

//               <h4
//                 onClick={handleAddTag}
//                 className="bg-slate-300 text-black border border-[#0d501715] rounded-md px-3 cursor-pointer mt-1 font-medium"
//               >
//                 Add Keywords
//               </h4>
//             </div>
//           </div>
//         </div>
//         {/* // category based some  product info */}

//         {(category == "Electronics Device" ||
//           category == "Electronics Accessories" ||
//           category == "Kitchen") && (
//           <div className="flex gap-6 flex-wrap pt-2 border border-dashed border-blue-700 p-2">
//             <div className="w-full md:w-[45%]">
//               <label className="pb-2">
//                 Product material <span className="text-red-500">*</span>
//               </label>
//               <input
//                 ref={pMaterial}
//                 type="text"
//                 name="productMaterial"
//                 className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 placeholder="Enter product's material..."
//               />
//             </div>
//             <div className="w-full md:w-[45%]">
//               <label className="pb-2">
//                 Power Supply <span className="text-red-500">*</span>
//               </label>
//               <input
//                 ref={pPower}
//                 type="text"
//                 name="powerSupply"
//                 className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 placeholder="Enter product's power suppy.."
//               />
//             </div>
//             <div className="w-full md:w-[45%]">
//               <label className="pb-2">Capacity </label>
//               <input
//                 ref={pCapacity}
//                 type="text"
//                 name="capacity"
//                 className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 placeholder="Enter product's capacity..."
//               />
//             </div>
//             <div className="w-full md:w-[45%]">
//               <label className="pb-2">
//                 Power Consumed <span className="text-red-500">*</span>
//               </label>
//               <input
//                 ref={pPowerConsumed}
//                 type="text"
//                 name="powerConsumed"
//                 className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 placeholder="Power consumed (1** W)..."
//               />
//             </div>

//             <div className="w-full md:w-[45%]">
//               <label className="pb-2">Warranty</label>
//               <input
//                 ref={pWarranty}
//                 type="text"
//                 name="warranty"
//                 className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 placeholder="how days warranty ..."
//               />
//             </div>
//           </div>
//         )}

//         <br />
//         {/* price stock  */}

//         <div className="flex gap-2 flex-col sm:flex-row m-auto">
//           <div>
//             <label className="pb-2">Old Price</label>
//             <input
//               ref={pPrevious}
//               type="number"
//               name="previousPrice"
//               className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Enter your product price..."
//             />
//           </div>
//           <br />
//           <div>
//             <label className="pb-2">
//               Present Price <span className="text-red-500">*</span>{" "}
//             </label>
//             <input
//               required
//               ref={pPresent}
//               type="number"
//               name="presentPrice"
//               className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Enter your product price with discount..."
//             />
//           </div>
//           <br />
//           <div>
//             <label className="pb-2">
//               Product Stock <span className="text-red-500">*</span>
//             </label>
//             <input
//               ref={pStock}
//               type="number"
//               name="stock"
//               className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Enter your product stock..."
//             />
//           </div>
//         </div>
//         <br />

//         {/* =--------------images */}
//         <div>
//           <label className="pb-2">
//             Upload Images <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="file"
//             name=""
//             id="upload"
//             className="hidden"
//             multiple
//             onChange={handleImageChange}
//           />
//           <div className="w-full flex items-center flex-wrap ">
//             <label htmlFor="upload" className="cursor-pointer">
//               <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
//             </label>
//             {images &&
//               images.map((files, index) => (
//                 <Photocard
//                   key={index}
//                   url={URL.createObjectURL(files)}
//                   onClick={() => handelDeleteFile(index)}
//                 />
//               ))}
//           </div>
//           <br />
//         </div>
//         <div>
//           <SubmitButton name="Create Product" type="loading" />
//         </div>
//       </form>
//     </div>
//   );
// }

// export default ProductForm;

"use client";
import SubmitButton from "@/components/button/submitButton";
import { CreateProducts } from "@/serverAction/product";
import { useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const childcategory = childCate.current ? childCate.current.value : "";
    const name = pName.current ? pName.current.value : "";
    const description = pDescription.current ? pDescription.current.value : "";
    const stock = pStock.current ? pStock.current.value : "";
    const previousPrice = pPrevious.current ? pPrevious.current.value : "";
    const presentPrice = pPresent.current ? pPresent.current.value : "";
    const formData = new FormData(event.target);

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
      // refsToReset.forEach((ref) => (ref.current = null));
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
              <img
                src={URL.createObjectURL(image)}
                alt={`Preview ${index}`}
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

        <form onSubmit={handleSubmit}>
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
            <div className="w-full md:w-[45%] ">
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
