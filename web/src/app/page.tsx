import { MainFooter } from "@/src/components/footers/main-footer";
import { NavMenu } from "@/src/components/menus/nav-menu";
import { HomePage } from "@/src/components/pages/home-page";

export default function Home() {
  return (
    <>
      <NavMenu />
      <HomePage />
      <MainFooter />
    </>
  );
}
