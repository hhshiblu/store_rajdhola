import UpdateButton from "@/components/button/updateButton";
import UpdateFrom from "@/components/product/updateFrom";
import { getProduct } from "@/serverAction/product";
import Image from "next/image";

async function page({ params, searchParams }) {
  const product = await getProduct(params.id);
  return (
    <div className="bg-white w-full md:w-[740px] lg:w-900px mx-auto py-10">
      {searchParams.update === "true" ? (
        <>
          <div>
            <Image
              src={product.images[0]?.url}
              alt={product.name}
              width={500}
              height={500}
              className="w-[300px] h-[200px] mx-auto"
            />
          </div>
          <div className="flex gap-2">
            {product.images.map((i, index) => (
              <div key={index}>
                <Image
                  src={i.url}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-[60px] h-[60px] mx-auto"
                />
              </div>
            ))}
          </div>
          <UpdateFrom product={product} />
        </>
      ) : (
        <div className="bg-white w-full md:w-[740px] mx-auto sm:p-4 p-3 py-10">
          <div>
            <Image
              src={product.images[0]?.url}
              alt={product.name}
              width={500}
              height={500}
              className="w-[300px] h-[200px] mx-auto"
            />
          </div>
          <div className="flex gap-2">
            {product.images.map((i, index) => (
              <div key={index}>
                <Image
                  src={i.url}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-[60px] h-[60px] mx-auto"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <h1>
              <span className="text-[16px] font-semibold">Name:</span>{" "}
              {product.name}
            </h1>
            <h2>
              <span className="text-[16px] font-semibold">Description:</span>{" "}
              {product.description}
            </h2>
            <div className="flex  gap-2 flex-wrap">
              <h1 className="sm:w-[45%] w-full">
                <span className="text-[16px] font-semibold">category:</span>{" "}
                {product.category}
              </h1>
              <h1 className="sm:w-[45%]  w-full">
                <span className="text-[16px] font-semibold">SubCategory:</span>{" "}
                {product.subCategory}
              </h1>
              <h1 className="sm:w-[45%]  w-full">
                <span className="text-[16px] font-semibold">
                  Child_Category:
                </span>
                {product.childCategory}
              </h1>
              {product.brandName && (
                <h1 className="sm:w-[45%]  w-full">
                  <span className="text-[16px] font-semibold">brandName:</span>{" "}
                  {product.brandName}
                </h1>
              )}

              {product.country && (
                <h1 className="sm:w-[45%]  w-full">
                  <span className="text-[16px] font-semibold">Country:</span>{" "}
                  {product.country}
                </h1>
              )}
              {product.productType && (
                <h1 className="sm:w-[45%]  w-full">
                  <span className="text-[16px] font-semibold">
                    Product_type:
                  </span>{" "}
                  {product.productType}
                </h1>
              )}
              {product.model && (
                <h1 className="sm:w-[45%]  w-full">
                  <span className="text-[16px] font-semibold">model:</span>{" "}
                  {product.model}
                </h1>
              )}
              {product.productMaterial && (
                <h1 className="sm:w-[45%]  w-full">
                  <span className="text-[16px] font-semibold">
                    ProductMaterial:
                  </span>{" "}
                  {product.productMaterial}
                </h1>
              )}
              {product.powerSupply && (
                <h1 className="sm:w-[45%]  w-full">
                  <span className="text-[16px] font-semibold">
                    PowerSupply:
                  </span>{" "}
                  {product.powerSupply}
                </h1>
              )}
              {product.capacity && (
                <h1 className="sm:w-[45%]  w-full">
                  <span className="text-[16px] font-semibold">Capacity:</span>{" "}
                  {product.capacity}
                </h1>
              )}
              {product.powerConsumed && (
                <h1 className="sm:w-[45%]  w-full">
                  <span className="text-[16px] font-semibold">
                    PowerConsumed:
                  </span>{" "}
                  {product.powerConsumed}
                </h1>
              )}
              {product.warranty && (
                <h1 className="sm:w-[45%]  w-full">
                  <span className="text-[16px] font-semibold">Warranty:</span>{" "}
                  {product.warranty}
                </h1>
              )}
            </div>
            <div className="flex gap-4 items-center">
              <span className=" font-semibold text-[19px]"> Keyword: </span>
              {product.tags.map((tag, index) => (
                <div key={index}>{tag} </div>
              ))}
            </div>
            {product.color.length > 0 && (
              <div className="flex gap-4 items-center">
                <span className=" font-semibold text-[19px]"> Color: </span>
                {product.color.map((color, index) => (
                  <div key={index}>{color} </div>
                ))}
              </div>
            )}
            {product.size.length > 0 && (
              <div className="flex gap-4 items-center">
                <span className=" font-semibold text-[19px]"> Size: </span>
                {product.size.map((size, index) => (
                  <div key={index}>{size} </div>
                ))}
              </div>
            )}

            <div className="flex gap-4 py-3">
              {product.previousPrice && (
                <h1>
                  <span className="text-[16px] font-semibold">Old price:</span>{" "}
                  {product.previousPrice}
                </h1>
              )}
              <h1 className="text-[16px] font-semibold">
                Price:
                {product.presentPrice}
              </h1>
              <h1>
                <span className="text-[16px] font-semibold">Stock:</span>{" "}
                {product.stock}
              </h1>
            </div>
          </div>
          <div className="flex  justify-end cursor-pointer">
            <UpdateButton />
          </div>
        </div>
      )}
    </div>
  );
}

export default page;
