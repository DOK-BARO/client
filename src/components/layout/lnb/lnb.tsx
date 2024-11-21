// Book Category Local Navigation Bar
import styles from "./_lnb.module.scss";
import { getBookCategories } from "@/services/server/bookService.ts";
import { useQuery } from "@tanstack/react-query";
import { bookKeys } from "@/data/queryKeys";
import Button from "@/components/atom/button/button";

// Book Category GNB
export default function LNB() {
  const { data: categories, isLoading } = useQuery({
    queryKey: bookKeys.categories(),
    queryFn: getBookCategories,
  });

  if (isLoading) {
    return <div>loading</div>;
  }
  if (!categories) {
    return <div>book categories page error!!</div>;
  }
  console.log(categories);

  return (
    <nav className={styles.lnb}>
      <div className={styles["lnb-inner-container"]}>
        <ul className={styles["category-list"]}>
          {categories?.map((category, index) => (
            <li key={index} className={styles["category-item"]}>
              <Button
                color="transparent"
                className={styles["category-item-button"]}
                onClick={() => console.log(category)}
              >
                {category.name}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
