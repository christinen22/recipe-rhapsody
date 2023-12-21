import Search from "../search/Search";
import styles from "./Hero.module.css";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Hero: React.FC = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  const user = data.session?.user;

  if (!data.session) {
    redirect("/login");
  }

  return (
    <div className={`grid-container ${styles.heroContainer}`}>
      {user && (
        <span className={styles.welcome}>
          Welcome <br />
          {user.email}
        </span>
      )}
      <h2 className={styles.title}>
        Search for you next adventure in the kitchen
      </h2>
      <Search />
    </div>
  );
};

export default Hero;
