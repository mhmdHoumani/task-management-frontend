import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Alexandria } from "next/font/google";

const alexandria = Alexandria({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Management",
  description: "Web app to manage multiple tasks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${alexandria.className} bg-slate-800 text-slate-100 container mx-auto p-4`}
      >
        <Header />
        <div className="mx-20 my-10">{children}</div>
      </body>
    </html>
  );
}
