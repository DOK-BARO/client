import HeaderLayout from "./headerLayout";
import { Outlet } from "react-router-dom";
import styles from "../../styles/layout/_layout.module.scss";

export default function Layout() {
  //const [isLoggedIn] = useRecoilState(isLoggedInState);
  return (
    <div className={styles["container"]}>
      <HeaderLayout isLoggedIn={true} />
      <main className={styles["main"]}>
        <div className={styles["inner-container"]}>
          <Outlet />
        </div>
      </main>
      <footer className={styles["footer"]}></footer>
    </div>
  );
}
