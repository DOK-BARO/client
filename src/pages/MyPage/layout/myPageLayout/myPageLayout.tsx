import { useAtom } from "jotai";
import styles from "./_my_page_layout.module.scss";
import { Outlet } from "react-router-dom";
import { myPageTitleAtom } from "@/store/myPageAtom";

export default function MyPageLayout() {
  const [myPageTitle] = useAtom(myPageTitleAtom);
  return (
    <section className={styles["container"]}>
      <h2 className={styles.title}>{myPageTitle}</h2>
      <section className={styles.content}>
        <Outlet />
      </section>
    </section>
  );
}
