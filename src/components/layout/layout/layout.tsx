import { Outlet } from "react-router-dom";
import styles from "../../styles/layout/_layout.module.scss";
import HeaderLayout from "../headerLayout/headerLayout.tsx";
import { useQueryCurrentUser } from "../../../hooks/useQueryCurrentUser.ts";

export default function Layout() {
  const { isLoggedIn, isLoading } = useQueryCurrentUser();

  if (isLoading) {
    return <div className={styles["container"]}>"로딩중"</div>;
  }

  return (
    <div className={styles["container"]}>
      <HeaderLayout isLoggedIn={isLoggedIn} />
      <main className={styles["main"]}>
        <div className={styles["inner-container"]}>
          <Outlet />
        </div>
      </main>
      <footer className={styles["footer"]}></footer>
    </div>
  );
}
