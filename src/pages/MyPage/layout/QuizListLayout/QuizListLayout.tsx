import { MyDraftQuizDataType, MyQuizDataType } from "@/types/QuizType";
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
import { copyText } from "@/utils/copyText";
import DraftQuizItem from "../../composite/quizItem/DraftQuizItem/DraftQuizItem";
interface Props<T extends { sort: string; direction: string }> {
  title: string;
  quizzes: MyQuizDataType[] | MySolvedQuizDataType[] | MyDraftQuizDataType[];
  titleWhenNoData: string;
  buttonNameWhenNoData: string;
  onClickBtnWhenNoData: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleOptionClick: (filter: T) => void;
  filterCriteria: T;
  filterOptions: FilterOptionType<T>[];
  quizListType: "made" | "solved" | "draft";
}
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
  quizListType,
}: Props<T>) {
  const navigate = useNavigate();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [quizId, setQuizId] = useState<number>();

  const { deleteQuiz } = useDeleteQuiz();
  const handleReSolveQuiz = (
    e: React.MouseEvent<HTMLButtonElement>,
    quizId: number,
  ) => {
    e.preventDefault();
    navigate(ROUTES.SOLVING_QUIZ(quizId), {
      state: { fromInternal: true },
    });
  };

  const handleModifyQuiz = (
    e: React.MouseEvent<HTMLButtonElement>,
    quizId: string,
  ) => {
    e.preventDefault();
    navigate(ROUTES.CREATE_QUIZ(quizId));
  };

  const handleClickDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    quizId: number,
  ) => {
    e.preventDefault();
    openModal();
    setQuizId(quizId);
  };

  const handleDeleteQuiz = () => {
    if (quizId) {
      deleteQuiz(quizId);
      closeModal();
    }
  };

  const handleCopyQuizLink = (
    e: React.MouseEvent<HTMLButtonElement>,
    quizId: number,
  ) => {
    e.preventDefault();
    copyText(
      `${import.meta.env.VITE_DEFAULT_URL}${ROUTES.SOLVING_QUIZ(quizId)}`,
      () => "퀴즈 공유 링크가 복사되었어요!",
    );
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

              switch (quizListType) {
                case "solved":
                  return (
                    <SolvedQuizItem
                      key={index}
                      myQuiz={myQuiz as MySolvedQuizDataType}
                      onReSolveQuiz={handleReSolveQuiz}
                      formattedDate={formattedDate}
                      onCopyQuizLink={handleCopyQuizLink}
                    />
                  );
                case "made":
                  return (
                    <MyMadeQuizItem
                      key={index}
                      myQuiz={myQuiz as MyQuizDataType}
                      onModifyQuiz={handleModifyQuiz}
                      formattedDate={formattedDate}
                      onClickDelete={handleClickDelete}
                      onCopyQuizLink={handleCopyQuizLink}
                    />
                  );
                case "draft":
                  return (
                    <DraftQuizItem
                      key={index}
                      myQuiz={myQuiz as MyDraftQuizDataType}
                      onModifyQuiz={handleModifyQuiz}
                      formattedDate={formattedDate}
                      onClickDelete={handleClickDelete}
                      onCopyQuizLink={handleCopyQuizLink}
                    />
                  );
                default:
                  return null;
              }
            },
          )}
      </ul>
      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          title={"퀴즈를 삭제하시겠어요?"}
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
