import Button from "@/components/atom/button/button";
import styles from "./_create_quiz_complete.module.scss";
// TODO: Depth 레이아웃 또는 페이지 레벨로 이동 고려 (Register complete도 함께 고려)
import createQuizCompleteImage from "/assets/image/create-quiz-complete.png";
import { primary } from "@/styles/abstracts/colors";
import { Copy } from "@/svg/copy";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CreateQuizComplete() {
  const quizId = 7;
  const quizPath = `quiz/${quizId}`;
  const quizLink = `${import.meta.env.VITE_DEFAULT_URL}/${quizPath}`;

  const navigate = useNavigate();

  const handleGoToQuiz = () => {
    navigate(`/${quizPath}`);
  };
  const handleCopyQuizLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value: quizLink } = e.target as HTMLButtonElement;
    navigator.clipboard.writeText(quizLink).then(() => {
      toast.success("복사되었습니다.");
    });
  };

  return (
    <section className={styles["create-quiz-complete"]}>
      <h3 className={styles.title}>퀴즈 출제가 완료되었어요! 🎉🎊</h3>
      <p className={styles.description}>
        링크를 복사하여 친구나 스터디원과 함께 퀴즈를 풀어보세요.
      </p>
      <img
        className={styles.image}
        src={createQuizCompleteImage}
        alt="퀴즈 출제 완료 이미지"
        height={214}
      />
      <div className={styles["button-container"]}>
        <Button
          className={styles["copy-link"]}
          color="secondary"
          value={quizLink}
          onClick={handleCopyQuizLink}
          size="medium"
          icon={<Copy width={20} stroke={primary} alt="퀴즈 링크 복사" />}
          iconPosition="right"
        >
          {quizLink}
        </Button>
        <Button color="primary" onClick={handleGoToQuiz}>
          퀴즈 풀러 가기
        </Button>
      </div>
    </section>
  );
}
