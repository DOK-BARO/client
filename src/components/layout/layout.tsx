import HeaderLayout from "./headerLayout";
import { Outlet } from "react-router-dom";
import styles from "../../styles/layout/_layout.module.scss";

export default function Layout() {
  return (
    <div className={styles["container"]}>
      <header>
        <HeaderLayout isLoggedIn={false} />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
}
