import { MyQuizType } from "@/types/QuizType";
import Button from "@/components/atom/button/button";
import styles from "./_quiz_list_layout.module.scss";

export default function QuizListLayout({
  quizzes,
  titleWhenNoData,
  buttonNameWhenNoData,
  onClickBtnWhenNoData,
}: {
  quizzes: MyQuizType[],
  titleWhenNoData: string,
  buttonNameWhenNoData: string,
  onClickBtnWhenNoData: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {

  return (
    <section className={styles["list-section"]}>
      {!quizzes?.length &&
        <NoData title={titleWhenNoData} buttonName={buttonNameWhenNoData}
          onClick={onClickBtnWhenNoData}
        />}
      <ul>
        {quizzes && quizzes.map((myQuiz: MyQuizType, index: number) => {
          const updatedAtDate: Date = new Date(myQuiz.updatedAt);

          const year = updatedAtDate.getFullYear();
          const month = updatedAtDate.getMonth() + 1;
          const date = updatedAtDate.getDate();

          const formattedDate: string = `${year}년 ${month}월 ${date}일`

          return (<li key={index}>
            <div className={styles["info"]}>
              <img src={myQuiz.bookImageUrl}></img>
              <div className={styles["sub-info"]}>
                {/* TODO: 공용 컴포넌트로 만들기 */}
                <span className={styles["label"]}>최종 수정일</span>
                <span className={styles["quiz-updated-at"]}>{formattedDate}</span>
              </div>
              <span className={styles["quiz-name"]}>{myQuiz.title}</span>
            </div>
            <div className={styles["util"]}>
              <Button color="primary" size="small">수정하기</Button>
              <Button
                className={styles["delete"]}
                color="transparent" size="xsmall">퀴즈 삭제하기</Button>
            </div>
          </li>)
        })}
      </ul>
    </section>
  );
}

const NoData = ({ title, buttonName, onClick }: { title: string, buttonName: string, onClick: (e: React.MouseEvent<HTMLButtonElement>) => void }) => {

  return (
    <div className={styles["no-data"]}>
      <p>{title}</p>
      <Button
        onClick={onClick}
        color="primary"
      >{buttonName}</Button>
    </div>
  );
}
