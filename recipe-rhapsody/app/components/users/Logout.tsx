"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signOut();

    if (!error) {
      router.push("/user");
    }
    if (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Logout;
