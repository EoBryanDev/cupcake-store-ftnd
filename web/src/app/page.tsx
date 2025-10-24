// page.tsx
import { MainFooter } from "@/src/components/footers/main-footer";
import { NavMenu } from "@/src/components/menus/nav-menu";
import { HomePage } from "@/src/components/pages/home-page";

export default async function Home() {
  return (
    <main className="flex min-h-screen max-w-screen flex-col">
      <NavMenu />
      <HomePage />
      <MainFooter />
    </main>
  );
}
