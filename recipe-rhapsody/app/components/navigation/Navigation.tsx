"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import styles from "./Navigation.module.css";
import Logo from "../../../public/images/Logo.png";
import Image from "next/image";
import { useState } from "react";
import { FaUser, FaBars } from "react-icons/fa";

const links = [
  { name: "Home", href: "/" },
  { name: "Cuisine", href: "/cuisine" },
  { name: "Meal type", href: "/mealtype" },
];

const Navigation: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Image
          src={Logo}
          alt="Recipe Rhapsody logo"
          width={70}
          placeholder="blur"
          quality={100}
        />
      </div>

      <div className={clsx(styles.menu, { [styles.menuOpen]: isOpen })}>
        <ul className={clsx(styles.navList, { [styles.mobileMenu]: isOpen })}>
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
        <div className={styles.icons}>
          {/*  <FaUser className={styles.icon} /> */}
          <FaBars className={styles.icon} onClick={handleClick} />
          <div
            className={clsx(styles.closeButton, {
              [styles.menuOpen]: isOpen,
            })}
            onClick={handleClose}
          >
            Close
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
