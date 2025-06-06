import { BookDetailType } from "@/types/BookDetailType.ts";
import styles from "./_book_detail_section.module.scss";
import Button from "@/components/atom/Button/Button";
import { useAtom } from "jotai";
import { quizzesLengthAtom } from "@/store/quizAtom.ts";
import useLoginAction from "@/hooks/useLoginAction";
import { useLocation } from "react-router-dom";
interface Props {
  bookDetailContent: BookDetailType;
  onGoToMakeQuiz: () => void;
}
export default function BookDetailContent({
  bookDetailContent,
  onGoToMakeQuiz,
}: Props) {
  const [quizLength] = useAtom(quizzesLengthAtom);
  const { pathname } = useLocation();

  // TODO: 로그인 이후 바로 퀴즈 만들기 페이지로 넘어가질 것인지,
  // 아니면 현재 페이지에 머물러 있을 것인지(한번 더 퀴즈 만들기 버튼 클릭하게 할 것인지) (현재 방식)
  const { handleAuthenticatedAction } = useLoginAction(pathname);

  return (
    <section className={"container"}>
      <div className={styles["book-detail-section-container"]}>
        <div>
          <img
            className={styles["book-img"]}
            src={bookDetailContent.imageUrl}
            alt={"책 표지 사진"}
          />
        </div>
        <div className={styles["book-container"]}>
          <div>
            <h1 className={styles["book-detail-title"]}>
              {bookDetailContent.title}
            </h1>
            <div className={styles["book-description"]}>
              {bookDetailContent.description}
            </div>
          </div>

          <div className={styles["book-detail-sub-container"]}>
            <div className={styles["book-detail-info-container"]}>
              <div className={styles["book-detail-sub-title"]}>책 상세정보</div>
              <div className={styles["book-detail-sub-content"]}>
                <span>저자</span>
                <span>{bookDetailContent.authors.join(", ")}</span>
              </div>
              <div className={styles["book-detail-sub-content"]}>
                <span>ISBN</span>
                <span>{bookDetailContent.isbn}</span>
              </div>
            </div>

            <div className={styles["number-of-quiz-container"]}>
              <div className={styles["book-detail-sub-title"]}>퀴즈 개수</div>
              <div className={styles["book-detail-sub-content"]}>
                <span>{quizLength}개</span>
              </div>
            </div>
          </div>

          <div className={styles["button-container"]}>
            <Button
              className={styles["make-quiz-button"]}
              onClick={() => handleAuthenticatedAction(onGoToMakeQuiz)}
              size="medium"
              color="primary"
            >
              퀴즈 만들기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
