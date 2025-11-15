import { MainFooter } from "@/src/components/footers/main-footer";
import "../../../globals.css";
import type { Metadata } from "next";
import { LoginAdminMenu } from "@/src/components/menus/admin/login-admin-menu";
import { AsideAdminMenu } from "@/src/components/menus/admin/aside-admin-menu";

export const metadata: Metadata = {
  title: "Admin - CK-Store",
  description: "Admin - Cupcake Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen grid-cols-15 grid-rows-[auto_1fr_auto]">
      <header className="col-span-15">
        <nav>
          <LoginAdminMenu />
        </nav>
      </header>

      <aside className="group peer bg-chart-2 col-span-1 p-4 text-white transition-all duration-700 ease-in-out hover:col-span-2">
        <nav className="h-full">
          <AsideAdminMenu />
        </nav>
      </aside>

      <main className="col-span-14 pl-6 transition-all duration-700 ease-in-out peer-hover:col-span-13">
        {children}
      </main>

      {/* <footer className="col-span-15">
        <MainFooter />
      </footer> */}
    </div>
  );
}
