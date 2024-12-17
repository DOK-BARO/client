import { useParams } from "react-router-dom";
import styles from "./_quiz_detail.module.scss";
import { quizKeys } from "@/data/queryKeys";
import { quizService } from "@/services/server/quizService";
import { useQuery } from "@tanstack/react-query";
import Breadcrumb from "@/components/composite/breadcrumb/breadcrumb";
import QuizExplanation from "./composite/quizExplanation/quizExplanation";
import Reviews from "./composite/reviews/quizReviews";

export default function Index() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: quizKeys.explanation(id),
    queryFn: () => (id ? quizService.fetchQuizExplanation(id) : null),
  });

  if (isLoading) {
    return <div>loading</div>;
  }

  if (!data) {
    return <div>quiz detail page error!!</div>;
  }
  if (!id) {
    return <div>404</div>;
  }
  console.log(data);
  const list = [
    { id: 1, name: "OS" },
    { id: 2, name: "Windows" },
    { id: 3, name: "Windows 일반" },
  ];

  return (
    <section className={styles.container}>
      <Breadcrumb list={list} />
      {/* <QuizListLayout title={data.title} /> */}
      <div className={styles["quiz-detail-container"]}>
        <QuizExplanation quizExplanation={data} />
        <Reviews quizId={Number(id)} />
      </div>
    </section>
  );
}
