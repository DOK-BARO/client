import { BookDetailType } from "@/types/BookDetailType.ts";
import styles from "./_book_detail_section.module.scss";
import Button from "@/components/atom/button/button";
import { useNavigate } from "react-router-dom";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import { BookType } from "@/types/BookType";

interface BookDetailContentProps {
  bookDetailContent: BookDetailType;
}

export default function BookDetailContent({
  bookDetailContent,
}: BookDetailContentProps) {
	const { updateQuizCreationInfo } = useUpdateQuizCreationInfo();

	const navigate = useNavigate();
	const goToMakeQuiz = () => {
		//TODO: 리팩토링
		const book :BookType = {
			id: bookDetailContent.id,
			isbn: bookDetailContent.isbn,
			title: bookDetailContent.title,
			publisher: bookDetailContent.publisher,
			publishedAt: bookDetailContent.publishedAt,
			imageUrl: bookDetailContent.imageUrl,
			categories: bookDetailContent.categories,
			authors: bookDetailContent.authors,
		}
		updateQuizCreationInfo("book", book);
		navigate('/create-quiz');
	}
  return (
    <section className={"container"}>
      <div className={styles["book-detail-section-container"]}>
				<div>
        <img
          className={styles["book-img"]}
          src={bookDetailContent.imageUrl}
          alt={"책 표지 이미지"}
        />
				</div>
        <div className={styles["book-container"]}>
          {/*TODO 퀴즈 n개 이상 마크 필요*/}


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
            {/*TODO 퀴즈 갯수*/}
            <div className={styles["number-of-quiz-container"]}>
              <div className={styles["book-detail-sub-title"]}>퀴즈 개수</div>
              <div className={styles["book-detail-sub-content"]}>
                <span>10개</span>
              </div>
            </div>
          </div>

          <div className={styles["button-container"]}>
            <Button
              className={styles["make-quiz-button"]}
              onClick={goToMakeQuiz}
              size="medium"
							color="primary"
            >퀴즈 만들기</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
