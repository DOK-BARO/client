import BookDetailSection from "./composite/bookDetailSection.tsx";
import { useEffect, useState } from "react";
import { BookDetailType } from "../../types/BookDetailType.ts";
import { getBook } from "../../services/bookService.ts";
import { useParams } from "react-router-dom";
import styles from "../../styles/pages/_bookDetail.module.scss";
import QuizListSection from "./composite/quizListSection.tsx";

export default function Index() {
  const [bookDetailContent, setBookDetailContent] = useState<BookDetailType>();
  const { id } = useParams();
  useEffect(() => {

    const fetchData = async () => {
      try{
        const data = await getBook(id!);
        console.log(data);
        setBookDetailContent(data);
      }catch (error){
        console.log("Error fetching book detail content:",error);
      }
    };
    fetchData();
  }, []);

  if(!bookDetailContent){
    return (
      <div>book detail page error!!</div>
    );
  }

  return (
    <div className={styles["container"]}>
      <BookDetailSection bookDetailContent={bookDetailContent}/>
      <QuizListSection />
    </div>
  );
}