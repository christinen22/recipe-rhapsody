import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import { Metadata } from "next";
//import { roboto } from "./fonts";

export const metadata: Metadata = {
  title: "Recipe Rhapsody",
  description: "Inspiration for the kitchen",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="body">
        <Navbar />

        {children}
      </body>
    </html>
  );
}
