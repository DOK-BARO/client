import BookDetailSection from "./composite/bookDetailSection.tsx";
import { getBook } from "../../services/bookService.ts";
import { useParams } from "react-router-dom";
import styles from "../../styles/pages/_bookDetail.module.scss";
import QuizListSection from "./composite/quizListSection.tsx";
import { useQuery } from "@tanstack/react-query";

export default function Index() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["bookDetailContent",id],
    queryFn: () => getBook(id!),
  });

  if(isLoading){
    return (<div>loading</div>);
  }

  if(!data){
    return (
      <div>book detail page error!!</div>
    );
  }

  return (
    <div className={styles["container"]}>
      <BookDetailSection bookDetailContent={data!}/>
      <QuizListSection />
    </div>
  );
}