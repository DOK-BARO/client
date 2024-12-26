import { MyQuizType } from "@/types/QuizType";
import Button from "@/components/atom/button/button";
import styles from "./_quiz_list_layout.module.scss";
import { Link } from "react-router-dom";
import { NoDataSection } from "@/components/composite/noDataSection/noDataSection";

export default function QuizListLayout({
  title,
  quizzes,
  titleWhenNoData,
  buttonNameWhenNoData,
  onClickBtnWhenNoData,
}: {
  title: string;
  quizzes: MyQuizType[];
  titleWhenNoData: string;
  buttonNameWhenNoData: string;
  onClickBtnWhenNoData: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <section className={styles["list-section"]}>
      <ListHeader title={title} />
      {!quizzes?.length && (
        <NoDataSection
          title={titleWhenNoData}
          buttonName={buttonNameWhenNoData}
          onClick={onClickBtnWhenNoData}
        />
      )}
      <ul>
        {quizzes &&
          quizzes.map((myQuiz: MyQuizType, index: number) => {
            const updatedAtDate: Date = new Date(myQuiz.updatedAt);

            const year = updatedAtDate.getFullYear();
            const month = updatedAtDate.getMonth() + 1;
            const date = updatedAtDate.getDate();

            const formattedDate: string = `${year}년 ${month}월 ${date}일`;

            return (
              <li key={index}>
                <Link to={`/quiz/${myQuiz.id}`}>
                  <div className={styles["info"]}>
                    <img src={myQuiz.bookImageUrl}></img>
                    <div className={styles["sub-info"]}>
                      {/* TODO: 공용 컴포넌트로 만들기 */}
                      <span className={styles["label"]}>최종 수정일</span>
                      <span className={styles["quiz-updated-at"]}>
                        {formattedDate}
                      </span>
                    </div>
                    <span className={styles["quiz-name"]}>{myQuiz.title}</span>
                  </div>
                  <div className={styles["util"]}>
                    <Button color="primary" size="small">
                      수정하기
                    </Button>
                    <Button
                      className={styles["delete"]}
                      color="transparent"
                      size="xsmall"
                    >
                      퀴즈 삭제하기
                    </Button>
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>
    </section>
  );
}

const ListHeader = ({ title }: { title: string }) => {
  return (
    <div className={styles["list-header"]}>
      <h3>{title}</h3>
      <span className={styles["button-area"]}>
        <Button size="xsmall" color="transparent">
          최신순
        </Button>
        <Button size="xsmall" color="transparent">
          가나다순
        </Button>
      </span>
    </div>
  );
};
