import { MyQuizDataType } from "@/types/QuizType";
import styles from "./_quiz_list_layout.module.scss";
import { useNavigate } from "react-router-dom";
import { NoDataSection } from "@/components/composite/NoDataSection/NoDataSection";
import ListFilter from "@/components/composite/ListFilter/ListFilter";
import { FilterOptionType } from "@/components/composite/ListFilter/ListFilter";
import { MySolvedQuizDataType } from "@/types/QuizType";
import useDeleteQuiz from "@/hooks/mutate/useDeleteQuiz";
import ROUTES from "@/data/routes";
import useModal from "@/hooks/useModal";
import Modal from "@/components/atom/Modal/Modal";
import { useState } from "react";
import SolvedQuizItem from "../../composite/quizItem/SolvedQuizItem/SolvedQuizItem";
import MyMadeQuizItem from "../../composite/quizItem/MyMadeQuizItem/MyMadeQuizItem";

export default function QuizListLayout<
  T extends { sort: string; direction: string },
>({
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
  handleOptionClick: (filter: T) => void;
  filterCriteria: T;
  filterOptions: FilterOptionType<T>[];
}) {
  const navigate = useNavigate();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [quizId, setQuizId] = useState<string>();

  const { deleteQuiz } = useDeleteQuiz();
  const handleReSolveQuiz = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleModifyQuiz = (
    e: React.MouseEvent<HTMLButtonElement>,
    quizId: string,
  ) => {
    e.preventDefault();
    // TODO: 엑셀문서 확인하고 해당페이지로 이동하면 될듯
    // 퀴즈 작성으로 이동하여 스터디 그룹 선택, 도서 선택 disble처리..
    navigate(ROUTES.CREATE_QUIZ(quizId));
  };

  const handleClickDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    quizId: number,
  ) => {
    e.preventDefault();
    openModal();
    setQuizId(quizId.toString());
  };

  const handleDeleteQuiz = () => {
    if (quizId) {
      deleteQuiz(quizId);
      closeModal();
    }
  };

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

              return "quiz" in myQuiz ? (
                <SolvedQuizItem
                  index={index}
                  myQuiz={myQuiz as MySolvedQuizDataType}
                  onReSolveQuiz={handleReSolveQuiz}
                  formattedDate={formattedDate}
                />
              ) : (
                <MyMadeQuizItem
                  index={index}
                  myQuiz={myQuiz as MyQuizDataType}
                  onModifyQuiz={handleModifyQuiz}
                  formattedDate={formattedDate}
                  onClickDelete={handleClickDelete}
                />
              );
            },
          )}
      </ul>
      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          title={"퀴즈를 삭제하시겠습니까?"}
          bottomButtons={[
            { text: "취소", color: "white", onClick: closeModal },
            {
              text: "확인",
              color: "primary",
              onClick: () => handleDeleteQuiz(),
            },
          ]}
          showHeaderCloseButton={false}
          contents={[]}
        />
      )}
    </section>
  );
}

const ListHeader = <T extends { sort: string; direction: string }>({
  title,
  handleOptionClick,
  filterCriteria,
  filterOptions,
}: {
  title: string;
  handleOptionClick: (filter: T) => void;
  filterCriteria: T;
  filterOptions: FilterOptionType<T>[];
}) => {
  return (
    <div className={styles["list-header"]}>
      <h3 className={styles["sub-title"]}>{title}</h3>
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
