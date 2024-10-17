import styles from "./_quiz_write_form_type_util_button.module.scss";
import { useDropDownList } from "@/hooks/useDropDownList.ts";
import { ArrowDown } from "@/svg/arrowDown.tsx";
import QuizWriteFormTypeUtilList from "@/pages/CreateQuiz/composite/quizWriteForm/quizWriteFormTypeUtilList.tsx";
import React, { useState } from "react";
import { SVGProps } from "@/types/SVGProps.ts";
import Button from "@/components/atom/button/button.tsx";
import { UlList } from "@/svg/quizWriteForm/ulList.tsx";
import { OlList } from "@/svg/quizWriteForm/olList.tsx";
import { OxQuiz } from "@/svg/quizWriteForm/oxQuiz.tsx";
import { BlankQuiz } from "@/svg/quizWriteForm/blankQuiz.tsx";
import { AlignJustify } from "@/svg/quizWriteForm/align-justify.tsx";

export type QuizWriteFormTypeUtilListItemProps = {
  Icon: React.FC<SVGProps>,
  text : string,
}

function QuizWriteFormTypeUtilButton() {
  const listItem: QuizWriteFormTypeUtilListItemProps[] = [
    {
      Icon: UlList,
      text: "객관식",
    },
    {
      Icon: OlList,
      text: "복수 정답",
    },
    {
      Icon: OxQuiz,
      text: "OX 퀴즈",
    },
    {
      Icon: BlankQuiz,
      text: "빈칸 채우기",
    },
    {
      Icon: AlignJustify,
      text: "단답형 주관식",
    },
  ];

  const onClick = (option: QuizWriteFormTypeUtilListItemProps) => {
    setSelectedOption(option);
    closeDropDownList();
  };

  const { isOpenDropDownList, anchorEl, openDropDownList, closeDropDownList, dropDownListRef } = useDropDownList();
  const [selectedOption, setSelectedOption] = useState<QuizWriteFormTypeUtilListItemProps>(listItem[0]);
  return (
    <div className={styles["quiz-write-form-type-util-button-container"]} ref={dropDownListRef}>
      <Button
        className={styles["quiz-write-form-type-util-button"]}
        onClick={openDropDownList}
        iconPosition={"left"}
        icon={<selectedOption.Icon
          className={styles["header-quiz-util-icon"]}
          width={24}
          height={24}
          stroke={"black"}
        />}
      >
        <h3>{selectedOption.text}</h3>
        <ArrowDown width={24} height={24} className={styles["quiz-write-form-type-util-icon"]} stroke={"black"}/>
      </Button>
      {isOpenDropDownList && anchorEl &&
        <QuizWriteFormTypeUtilList
          list= {listItem}
          onClick={onClick}
        />}
    </div>
  );
}

export default QuizWriteFormTypeUtilButton;