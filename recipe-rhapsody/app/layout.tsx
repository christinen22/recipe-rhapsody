import Navbar from "./components/Navbar";
import "./globals.scss";
import { roboto } from "./fonts";

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
      <body className={roboto.className}>
        <Navbar />

        {children}
      </body>
    </html>
  );
}
