// page.tsx
import { MainFooter } from "@/src/components/footers/main-footer";
import { NavMenu } from "@/src/components/menus/nav-menu";
import { HomePage } from "@/src/components/pages/home-page";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get(process.env.TOKEN_KEY || "token");
  return (
    <main className="flex min-h-screen max-w-screen flex-col">
      <NavMenu token={token} />
      <HomePage />
      <MainFooter />
    </main>
  );
}
