import "../../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - CK-Store",
  description: "Admin - Cupcake Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
