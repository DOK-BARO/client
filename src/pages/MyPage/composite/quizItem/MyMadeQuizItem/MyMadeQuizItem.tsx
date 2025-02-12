import styles from "../_quiz_item.module.scss";
import infoFilled from "/public/assets/svg/myPage/info-filled.svg";
import link from "/public/assets/svg/myPage/link.svg";
import Button from "@/components/atom/Button/Button";
import ROUTES from "@/data/routes";
import { MyQuizDataType } from "@/types/QuizType";
import { Link } from "react-router-dom";

// 만든 퀴즈 아이템
export default function MyMadeQuizItem({
  myQuiz,
  formattedDate,
  onModifyQuiz,
  onClickDelete,
  onCopyQuizLink,
}: {
  myQuiz: MyQuizDataType;
  formattedDate: string;
  onModifyQuiz: (
    e: React.MouseEvent<HTMLButtonElement>,
    quizId: string,
  ) => void;
  onClickDelete: (
    e: React.MouseEvent<HTMLButtonElement>,
    quizId: number,
  ) => void;
  onCopyQuizLink: (
    e: React.MouseEvent<HTMLButtonElement>,
    quizId: number,
  ) => void;
}) {
  return (
    <li>
      <Link to={ROUTES.QUIZ_DETAIL(myQuiz.id)} className={styles.container}>
        <div className={styles["left-container"]}>
          {/* <Link to={`/book/${myQuiz.}`}> */}
          {/* 책 상세 링크? */}
          <div className={styles["img-container"]}>
            {/* TODO: alt에 책 제목 넣기 */}
            <img src={myQuiz.bookImageUrl} alt={""} className={styles.img} />
          </div>
          {/* </Link> */}
          <span className={styles["date-container"]}>
            <p className={styles.date}>{formattedDate}</p>
            <img
              src={infoFilled}
              alt="만든 날짜"
              title="만든 날짜"
              height={14}
              width={14}
            />
          </span>
        </div>
        <div className={styles["right-container"]}>
          <div>
            <div className={styles["right-container-header"]}>
              {myQuiz.studyGroup ? (
                <p className={styles["study-group-name"]}>
                  {myQuiz.studyGroup.name}
                </p>
              ) : (
                <div />
              )}
              <Button
                onClick={(e) => onCopyQuizLink(e, myQuiz.id)}
                iconOnly
                icon={
                  <img
                    src={link}
                    width={20}
                    height={20}
                    alt="퀴즈 공유 링크 복사"
                  />
                }
              />
            </div>
            <p className={styles.title}>{myQuiz.title}</p>
            <p className={styles.description}>{myQuiz.description}</p>
          </div>
          <div className={styles["button-container"]}>
            <Button
              color="primary"
              size="small"
              onClick={(e) => onModifyQuiz(e, myQuiz.id.toString())}
            >
              수정하기
            </Button>
            <Button
              className={styles.delete}
              color="transparent"
              size="xsmall"
              onClick={(e) => onClickDelete(e, myQuiz.id)}
            >
              퀴즈 삭제하기
            </Button>
          </div>
        </div>
      </Link>
    </li>
  );
}
