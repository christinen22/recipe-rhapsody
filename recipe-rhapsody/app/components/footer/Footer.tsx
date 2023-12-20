"use client";

import Image from "next/image";
import Logo from "../../../public/images/Logo.png";
import Link from "next/link";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoContainer}>
        <Image
          src={Logo}
          alt="Recipe Rhapsody logo"
          width={250}
          height={200}
          placeholder="blur"
          quality={100}
        />
      </div>

      <div className={styles.links}>
        <Link href="/terms-of-service">Terms of Service</Link>
        <Link href="/cookie-policy">Cookie Policy</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
      </div>

      <div className={styles.copyright}>
        <p>&copy; Recipe Rhapsody. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
