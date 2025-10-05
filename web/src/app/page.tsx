import { MainFooter } from "@/components/footers/main-footer";
import { NavMenu } from "@/components/menus/nav-menu";
import { HomePage } from "@/components/pages/home-page";

export default function Home() {
  return (
    <>
      <NavMenu />
      <HomePage />
      <MainFooter />
    </>
  );
}
