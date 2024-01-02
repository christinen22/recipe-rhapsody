import Navigation from "./components/navigation/Navigation";
import "./globals.css";
import { Metadata } from "next";
import Providers from "../providers";
import Footer from "./components/footer/Footer";
import Search from "./components/search/Search";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
          />
          <Navigation />
          <Search />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
