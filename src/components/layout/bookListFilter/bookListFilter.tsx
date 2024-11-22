import styles from "./_book-list-filter.module.scss";
import Button from "@/components/atom/button/button";
import gridView from "/assets/svg/gridView.svg";
import listView from "/assets/svg/listView.svg";

export default function BookListFilter() {
  return (
    <div className={styles["book-list-filter"]}>
      <ul>
        <Button size="xsmall" color="transparent">
          가나다순
        </Button>
        <Button size="xsmall" color="transparent">
          퀴즈순
        </Button>
      </ul>
      <ul>
        <Button
          size="xsmall"
          color="transparent"
          iconOnly
          icon={<img src={gridView} width={24} alt="그리드 뷰로 보기" />}
        />
        <Button
          size="xsmall"
          color="transparent"
          icon={<img src={listView} width={24} alt="리스트 뷰로 보기" />}
        />
      </ul>
    </div>
  );
}
