import { BookDetailType } from "../../../types/BookDetailType.ts";
import Button from "../../../components/atom/button.tsx";
import styles from "../../../styles/composite/_bookDetailSection.module.scss";

interface BookDetailSectionProps {
  bookDetailContent: BookDetailType;
}

export default function BookDetailSection({ bookDetailContent }: BookDetailSectionProps) {

  return (
    <section className={"container"}>
      <div className={styles["category-depth-list"]}>
        {bookDetailContent.categories.map((category)=> (category.name)).join(">")}
      </div>
      <div className={styles["book-detail-section-container"]}>
        <img className={styles["book-img"]} src={bookDetailContent.imageUrl} alt={"책 표지 이미지"}/>
        <div className={styles["book-container"]}>
          {/*TODO 퀴즈 n개 이상 마크 필요*/}
          <div className={styles["number-of-quiz-tag"]}>퀴즈 5개 이상</div>
          <h1 className={styles["book-detail-title"]}>{bookDetailContent.title}</h1>
          <div className={styles["book-description"]}>{bookDetailContent.description}</div>

          <div className={styles["book-detail-sub-container"]}>
            <div className={styles["book-detail-info-container"]}>
              <div className={styles["book-detail-sub-title"]}>책 상세정보</div>
              <div className={styles["book-detail-sub-content"]}>
                <span>저자</span> <span>{bookDetailContent.authors.join(", ")}</span>
              </div>
              <div className={styles["book-detail-sub-content"]}>
                <span>ISBN</span><span>{bookDetailContent.isbn}</span>
              </div>
            </div>
            {/*TODO 퀴즈 갯수*/}
            <div className={styles["number-of-quiz-container"]}>
              <div className={styles["book-detail-sub-title"]}>퀴즈 갯수</div>
              <div className={styles["book-detail-sub-content"]}><span>10개</span></div>
            </div>

          </div>

          <div className={styles["button-container"]}>
            <Button className={styles["make-quiz-button"]} onClick={() => {}} size={"large"} children={"퀴즈 만들기"}/>
            <Button className={styles["take-quiz-button"]} onClick={() => {}} size={"large"} children={"퀴즈 풀기"}/>
          </div>
        </div>

      </div>

    </section>
  );
}