import Navbar from "./components/navbar/Navbar";
import "./globals.css";
//import { roboto } from "./fonts";

export const metadata = {
  title: "Recipe Rhapsody",
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
