import LNB from "../lnb/lnb";
import { Outlet, useParams } from "react-router-dom";
import styles from "./_book_list_layout.module.scss";

export default function BookListLayout() {
  const { categoryId, subCategoryId } = useParams();
  return (
    <div className={styles.container}>
      <div className={styles["lnb-container"]}>
        <LNB
          categoryId={Number(categoryId)}
          subCategoryId={Number(subCategoryId)}
        />
      </div>
      <Outlet />
    </div>
  );
}
