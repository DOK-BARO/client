import styles from "./_my_study.module.scss";
import Button from "@/components/atom/button/button";
import { Plus } from "@/svg/plus";
import { primary } from "@/styles/abstracts/colors";
import StudyGroupItem from "../../components/studyGroupItem/studyGroupItem";
import AddStudyGroupModal from "../../components/addStudyGroupModal/addStudyGroupModal";
import useModal from "@/hooks/useModal";
import { useQuery } from "@tanstack/react-query";
import { studyGroupService } from "@/services/server/studyGroupService";
import { studyGroupKeys } from "@/data/queryKeys";

export default function MyStudy() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { data: myStudiesData } = useQuery({
    queryKey: studyGroupKeys.list(),
    queryFn: studyGroupService.fetchStudyGroups,
  });
  //   const myStudies = myStudiesData.data;
  //   const navigate = useNavigate();
  console.log(myStudiesData);
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
  if (myStudiesData)
    return (
      <section className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>내 스터디 그룹</h3>
          <Button
            size="xsmall"
            color="secondary"
            icon={<Plus stroke={primary} width={16} height={16} />}
            iconPosition="left"
            onClick={openModal}
          >
            스터디 그룹 추가
          </Button>
        </div>
        {/* <ListFilter
        handleOptionClick={handleOptionClick}
        sortFilter={filterCriteria}
        filterOptions={filterOptions}
      /> */}
        <ol className={styles["study-list"]}>
          {myStudiesData?.map((study) => (
            <StudyGroupItem key={study.id} study={study} />
          ))}
        </ol>
        {isModalOpen ? <AddStudyGroupModal closeModal={closeModal} /> : null}
      </section>
    );
}
