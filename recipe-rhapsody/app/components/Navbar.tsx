import Link from "next/link";

function Navbar() {
  return (
    <nav>
      <h1>This is a nav</h1>
      <Link href="/">Home</Link>
      <Link href="/cuisine">Cuisine</Link>
    </nav>
  );
}

export default Navbar;
