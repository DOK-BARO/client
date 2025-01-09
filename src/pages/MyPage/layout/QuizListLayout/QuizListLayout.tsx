import { MyQuizDataType } from "@/types/QuizType";
import Button from "@/components/atom/Button/Button";
import styles from "./_quiz_list_layout.module.scss";
import { Link } from "react-router-dom";
import { NoDataSection } from "@/components/composite/NoDataSection/NoDataSection";
import { BookQuizzesFilterType } from "@/types/BookType";
import ListFilter from "@/components/composite/ListFilter/ListFilter";
import { FilterOptionType } from "@/components/composite/ListFilter/ListFilter";
import { MySolvedQuizDataType } from "@/types/QuizType";
import useDeleteQuiz from "@/hooks/mutate/useDeleteQuiz";
import ROUTES from "@/data/routes";

export default function QuizListLayout({
  title,
  quizzes,
  titleWhenNoData,
  buttonNameWhenNoData,
  onClickBtnWhenNoData,
  handleOptionClick,
  filterCriteria,
  filterOptions,
}: {
  title: string;
  quizzes: MyQuizDataType[] | MySolvedQuizDataType[];
  titleWhenNoData: string;
  buttonNameWhenNoData: string;
  onClickBtnWhenNoData: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleOptionClick: (filter: BookQuizzesFilterType) => void;
  filterCriteria: BookQuizzesFilterType;
  filterOptions: FilterOptionType<BookQuizzesFilterType>[];
}) {

	const { deleteQuiz } = useDeleteQuiz();
  const handleReSovingQuiz = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

	const handleModifyQuiz = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
	}

	const handleDeleteQuiz = (e: React.MouseEvent<HTMLButtonElement>, quizId: number) => {
		e.preventDefault();
		deleteQuiz(quizId.toString());
	}

  return (
    <section className={styles["list-section"]}>
      <ListHeader
        title={title}
        handleOptionClick={handleOptionClick}
        filterCriteria={filterCriteria}
        filterOptions={filterOptions}
      />
      {!quizzes?.length && (
        <NoDataSection
          title={titleWhenNoData}
          buttonName={buttonNameWhenNoData}
          onClick={onClickBtnWhenNoData}
        />
      )}
      <ul className={styles["quiz-list"]}>
        {quizzes &&
          quizzes.map(
            (myQuiz: MyQuizDataType | MySolvedQuizDataType, index: number) => {
              const updatedAtDate: Date =
                "updatedAt" in myQuiz
                  ? new Date(myQuiz.updatedAt)
                  : new Date(myQuiz.solvedAt);

              const year = updatedAtDate.getFullYear();
              const month = updatedAtDate.getMonth() + 1;
              const date = updatedAtDate.getDate();

              const formattedDate: string = `${year}년 ${month}월 ${date}일`;

						return (
							<li className={styles["quiz"]}
								key={index}>
								<Link to={("quiz" in myQuiz) ? ROUTES.QUIZ_DETAIL(myQuiz.id) : ROUTES.QUIZ_DETAIL(myQuiz.id)}>
									<div className={styles["info"]}>
										<div className={styles["img-container"]}>
											<img src={myQuiz.bookImageUrl} />
										</div>
										<div className={styles["sub-info"]}>
											<span className={styles["label"]}>{("updatedAt" in myQuiz) ? "최종 수정일" : "최종 제출일"}</span>
											<span className={styles["quiz-updated-at"]}>
												{formattedDate}
											</span>
										</div>
										<span className={styles["quiz-name"]}>
											{("title" in myQuiz) && myQuiz.title}
											{(("quiz" in myQuiz)) && myQuiz?.quiz?.title}
										</span>
									</div>
									<div className={styles["util"]}>
										<Button
											color="primary"
											size="small"
											onClick={("quiz" in myQuiz) ? handleReSovingQuiz : handleModifyQuiz}
										>
											{("quiz" in myQuiz) ? "다시 풀기" : "수정하기"}
										</Button>
										{
											!("quiz" in myQuiz) &&
											<Button
												className={styles["delete"]}
												color="transparent"
												size="xsmall"
												onClick={(e) => handleDeleteQuiz(e, ("quiz" in myQuiz) ? myQuiz.quiz!.id : myQuiz.id)}
											>
												퀴즈 삭제하기
											</Button>}
									</div>
								</Link>
							</li>
						);
					})}
			</ul>


		</section>
	);
}

const ListHeader = ({
  title,
  handleOptionClick,
  filterCriteria,
  filterOptions,
}: {
  title: string;
  handleOptionClick: (filter: BookQuizzesFilterType) => void;
  filterCriteria: BookQuizzesFilterType;
  filterOptions: FilterOptionType<BookQuizzesFilterType>[];
}) => {
  return (
    <div className={styles["list-header"]}>
      <h3>{title}</h3>
      <div className={styles["filter-button-area"]}>
        <ListFilter
          onOptionClick={handleOptionClick}
          sortFilter={filterCriteria}
          filterOptions={filterOptions}
        />
      </div>
    </div>
  );
};
