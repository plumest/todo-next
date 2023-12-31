import "./globals.scss";
import { Mulish } from "next/font/google";
import type { Metadata } from "next";

const mulish = Mulish({
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Next Todo App",
  description: "Next todo app that you will love",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={mulish.className}>{children}</body>
    </html>
  );
}
