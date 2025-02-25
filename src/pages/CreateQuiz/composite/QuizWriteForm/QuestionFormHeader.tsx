import styles from "./_question_form.module.scss";
import { Move } from "@/svg/QuizWriteForm/Move";
import { gray70 } from "@/styles/abstracts/colors.ts";
import { TrashCan } from "@/svg/QuizWriteForm/TrashCan";
import Button from "@/components/atom/Button/Button";
import { isFirstVisitAtom, quizGuideStepAtom } from "@/store/quizAtom";
import { useAtom } from "jotai";
import QuizWriteGuideBubble from "../QuizWriteGuideBubble/QuizWriteGuideBubble";

interface QuizWriteFormItemHeaderProps {
  id: number;
  deleteQuizWriteForm: (id: number) => void;
}

export default function QuestionFormHeader({
  id,
  deleteQuizWriteForm,
}: QuizWriteFormItemHeaderProps) {
  const [isFirstVisit] = useAtom(isFirstVisitAtom);
  const [currentQuizGuideStep] = useAtom(quizGuideStepAtom);
  const isEditMode =
    localStorage.getItem("isEditMode") == "true" ? true : false;
  return (
    <div className={styles["question-form-header"]}>
      <div
        data-allow-dnd="true"
        style={
          isFirstVisit && !isEditMode && currentQuizGuideStep == 3
            ? {
                position: "relative",
                zIndex: 999,
                marginLeft: "-8px",
              }
            : {}
        }
      >
        <QuizWriteGuideBubble
          marginTop={-80}
          text={
            <p>
              <em>드래그로 순서</em>를 바꿀 수 있어요.
            </p>
          }
          guideStep={3}
        />
        <Button
          className={styles["move-quiz-button"]}
          iconOnly
          icon={
            <Move
              width={24}
              height={24}
              stroke={gray70}
              alt="퀴즈 순서 변경 버튼"
            />
          }
        />
      </div>
      <Button
        iconOnly
        onClick={() => {
          deleteQuizWriteForm(id);
        }}
        icon={
          <TrashCan
            width={24}
            height={24}
            stroke={gray70}
            alt="퀴즈 삭제 버튼"
          />
        }
      />
    </div>
  );
}
