import styles from "./_my_page_layout.module.scss";
import { Outlet } from "react-router-dom";

export default function MyPageLayout() {
  return (
    <section className={styles["container"]}>
      <h2 className={styles.title}>마이페이지</h2>
      <section className={styles.content}>
        <Outlet />
      </section>
    </section>
  );
}
