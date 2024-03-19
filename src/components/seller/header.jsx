import { getSeller } from "@/serverAction/seller";
import HeaderContent from "./headerContent";

async function Header() {
  const seller = await getSeller();

  return <HeaderContent seller={seller} />;
}

export default Header;
