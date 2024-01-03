"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import styles from "./Users.module.css";

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signOut();

    if (!error) {
      router.push("/login");
    }
    if (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button className={styles.logoutButton} onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Logout;
