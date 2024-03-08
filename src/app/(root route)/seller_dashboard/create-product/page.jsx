import { getCategories } from "@/serverAction/category";
import ProductForm from "./productForm";
import { getSeller } from "@/serverAction/seller";
import { redirect } from "next/dist/server/api-utils";

async function CreateProduct() {
  const categories = await getCategories();
  const seller = await getSeller();

  if (!seller.address) {
    redirect("/pending_seller");
  }
  return (
    <div className="w-full  bg-[#fff] scroll_y_hiiden   shadow-lg h-[87vh] rounded-[4px] p-6 overflow-y-auto">
      <h5 className="text-[20px] font-semibold font-Poppins text-center py-2">
        Create Product
      </h5>
      <ProductForm categories={categories} seller={seller} />
    </div>
  );
}

export default CreateProduct;
