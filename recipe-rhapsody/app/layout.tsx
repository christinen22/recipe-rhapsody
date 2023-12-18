import Navigation from "./components/navigation/Navigation";
import "./globals.css";
import { Metadata } from "next";
import Providers from "../providers";
import Search from "./components/search/Search";
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
        <Providers>
          <Navigation />
          <Search />
          {children}
        </Providers>
      </body>
    </html>
  );
}
