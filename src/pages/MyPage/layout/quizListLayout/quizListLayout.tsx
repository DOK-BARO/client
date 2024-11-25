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
        {quizzes && quizzes.map((myQuiz: MyQuizType) => (
          <li>
            <img src={myQuiz.bookImageUrl}></img>
            <span>최종 수정일</span>
            <span>{myQuiz.updatedAt}</span>
            <span>{myQuiz.title}</span>
            <Button color="primary">수정하기</Button>
            <button>퀴즈 삭제하기</button>
          </li>
        ))}
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
