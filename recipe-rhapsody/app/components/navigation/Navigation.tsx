"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import styles from "./Navigation.module.css";
import Logo from "../../../public/images/Logo.png";
import Image from "next/image";
import { useState } from "react";
import { FaUser, FaBars } from "react-icons/fa";
import { useRouter } from "next/navigation";

const links = [
  { name: "Home", href: "/" },
  { name: "Cuisine", href: "/cuisine" },
  { name: "Meal type", href: "/mealtype" },
];

const Navigation: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleUserIconClick = () => {
    router.push("/my-page");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image
            src={Logo}
            alt="Recipe Rhapsody logo"
            width={120}
            placeholder="blur"
            quality={100}
          />
        </Link>
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
                onClick={handleClose}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.icons}>
          <div className={styles.userIcon}>
            <FaUser onClick={handleUserIconClick} />
          </div>
          <div className={styles.menuIcon}>
            <FaBars onClick={handleClick} />
          </div>
          <div
            className={clsx(styles.closeButton, {
              [styles.menuOpen]: isOpen,
            })}
            onClick={handleClose}
          ></div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
