import styles from "./_my_study.module.scss";
import { useQuery } from "@tanstack/react-query";
import { quizKeys } from "@/data/queryKeys";
import QuizListLayout from "../../layout/quizListLayout/quizListLayout";
import { useNavigate } from "react-router-dom";
import { quizService } from "@/services/server/quizService";
import Button from "@/components/atom/button/button";
import { Plus } from "@/svg/plus";
import { primary } from "@/styles/abstracts/colors";
import ListFilter from "@/components/composite/listFilter/listFilter";
import { useAtom } from "jotai";
import StudyGroupItem from "../../components/studyGroupItem/studyGroupItem";
import AddStudyGroupModal from "../../components/addStudyGroupModal/addStudyGroupModal";
import useModal from "@/hooks/useModal";

export default function MyStudy() {
  //   const { isLoading, data: myQuizzesData } = useQuery({
  //     queryKey: quizKeys.myQuiz(),
  //     queryFn: async () => await quizService.fetchMyMadeQuizzes(),
  //   });
  const navigate = useNavigate();
  //   const handleClickWhenNoData = (_: React.MouseEvent<HTMLButtonElement>) => {
  //     navigate("/create-quiz");
  //   };

  //   const myQuizzes = myQuizzesData?.data;

  //   if (isLoading || !myQuizzes) {
  //     return <>로딩</>;
  //   }

  //   const [filterCriteria] = useAtom(reviewFilterAtom);
  //   const page = 1;
  //   const {
  //     sort,
  //     direction,
  //   }: {
  //     sort: "CREATED_AT" | "STAR_RATING" | undefined;
  //     direction: "ASC" | "DESC" | undefined;
  //   } = filterCriteria;

  //   const handleOptionClick = (filter: BooksFilterType) => {
  //     // navigateWithParams({ filter: filter, parentComponentType: "BOOKS" });
  //   };
  const { closeModal } = useModal();

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>내 스터디 그룹</h3>
        <Button
          size="xsmall"
          color="secondary"
          icon={<Plus stroke={primary} width={16} height={16} />}
          iconPosition="left"
        >
          스터디 그룹 추가
        </Button>
      </div>
      {/* <ListFilter
        handleOptionClick={handleOptionClick}
        sortFilter={filterCriteria}
        filterOptions={filterOptions}
      /> */}
      <StudyGroupItem />
      <AddStudyGroupModal />
    </section>
  );
}
