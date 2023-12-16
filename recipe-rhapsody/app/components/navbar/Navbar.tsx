"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import styles from "./Navbar.module.css";

const links = [
  { name: "Home", href: "/" },
  { name: "Cuisine", href: "/cuisine" },
  { name: "Recipes", href: "/recipes" },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        {links.map((link) => (
          <li key={link.name}>
            <Link
              key={link.name}
              href={link.href}
              className={clsx(styles.navLink, {
                [styles.activeNavLink]: pathname === link.href,
              })}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
