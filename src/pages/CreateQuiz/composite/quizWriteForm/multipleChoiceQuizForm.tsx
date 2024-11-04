import styles from "@/pages/CreateQuiz/composite/quizWriteForm/_quiz_write_form_item.module.scss";
import QuizWriteFormOptionItem from "@/pages/CreateQuiz/composite/quizWriteForm/quizWriteFormOptionItem.tsx";
import { RadioOption } from "@/types/RadioTypes.ts";
import { FC, useEffect, useState } from "react";
import { QuizFormMode } from "@/data/constants.ts";
import useRadioGroup from "@/hooks/useRadioGroup.ts";

export const MultipleChoiceQuizForm: FC<{ quizMode?: string, questionFormId?: string }> = ({ quizMode, questionFormId }) => {
  const [options, setOptions] = useState<RadioOption[]>([]);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number | null>(null);
  const { selectedValue: selectedRadioGroupValue, handleChange: handleRadioGroupChange } = useRadioGroup(null);

  const deleteOption = (optionId: number) => {
    setOptions(options.filter((option) => option.id !== optionId));
  };

  const handleOptionFocus = (id: number) => {
    setFocusedOptionIndex(id);
  };

  useEffect(() => {
    handleRadioGroupChange(null);
  }, [quizMode]);

  const handleOptionBlur = () => {
    setFocusedOptionIndex(null);
  };
  const setText = (optionId: number, value: string) => {
    handleRadioGroupChange(value);
    const updatedOptions = options.map((option) => {
      if (option.id === optionId) {
        return { ...option, value, label: value };
      }
      return option;
    });
    setOptions(updatedOptions);
    handleRadioGroupChange(null); // value가 변경되면 라디오 버튼이 자동 선택되기 때문에 라디오 버튼 선택 해제
  };

  const onClickAddQuizOptionItem = () => {
    const id = Date.now();
    setOptions((prev) => [
      ...prev,
      {
        id: id,
        value: "",
        label: "",
      },
    ]);
  };

  return (
    <fieldset className={styles["question-options"]}>
      <legend>답안 선택지</legend>
      {options.map((item) =>
        <QuizWriteFormOptionItem
          key={item.id}
          questionFormId={questionFormId!}
          option={item}
          deleteOption={deleteOption}
          focusedOptionIndex={focusedOptionIndex}
          handleOptionFocus={handleOptionFocus}
          handleOptionBlur={handleOptionBlur}
          quizMode={quizMode!}
          onChange={handleRadioGroupChange}
          setText={setText}
          selectedValue={selectedRadioGroupValue}
        />,
      )}
      {
        quizMode == QuizFormMode.QUESTION &&
        <AddOptionButton onAdd={onClickAddQuizOptionItem} />
      }
    </fieldset>
  );
};


function AddOptionButton({ onAdd }: { onAdd: () => void }) {

  return (
    <div className={styles["option-add-button-container"]}>
      <button
        className={styles["option-add-button"]}
        onClick={onAdd}>
        <div className={styles["option-add-button-check-circle"]} />
        <span>옵션 추가하기</span>
      </button>
    </div>
  );
}
