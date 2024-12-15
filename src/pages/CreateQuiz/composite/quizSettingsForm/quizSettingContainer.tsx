import styles from "./_quiz_settings_container.module.scss";
import Button from "@/components/atom/button/button";
import { QuizSettingOptionType, QuizSettingType } from "@/types/QuizType";
import { useEffect, useState } from "react";

export const QuizSettingContainer = ({
  quizSetting,
  onOptionSelect,
  selectedOptionLabel,
}: {
  quizSetting: QuizSettingType;
  onOptionSelect: (name: string, label: string) => void;
  selectedOptionLabel: string | null;
}) => {
  const arrowDown = "/assets/svg/quizSettingForm/arrowDown.svg";
  const options = quizSetting.options;

  const [description, setDescription] = useState<string>("");
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

  useEffect(() => {
    if (quizSetting.options.length === 1) {
      onOptionSelect(quizSetting.name, quizSetting.options[0].label);
    }
  }, []);

  const handleSelect = (
    e: React.MouseEvent<HTMLButtonElement>,
    name: string
  ) => {
    const value = e.currentTarget.value;
    onOptionSelect(name, value);
    setIsSelectOpen((prev) => !prev);
  };

  useEffect(() => {
    const selectedOption = options.find(
      (option) => option.label === selectedOptionLabel
    );

    setDescription(
      selectedOption ? selectedOption.description : options[0].description
    );
  }, [selectedOptionLabel]);

  useEffect(() => {
    console.log(quizSetting.options);
  }, [selectedOptionLabel]);

  return (
    <div className={styles["quiz-setting-container"]}>
      <div className={styles.title}>
        <img src={quizSetting.icon} />
        {quizSetting.title}
      </div>
      <Button
        color="white"
        id={quizSetting.name}
        onClick={() => setIsSelectOpen(!isSelectOpen)}
        className={styles.select}
        size="medium"
        icon={<img src={arrowDown} />}
      >
        {selectedOptionLabel ?? "선택"}
      </Button>
      {quizSetting.options.length > 1 && isSelectOpen ? (
        <ul className={styles["option-list"]}>
          {options.map((option: QuizSettingOptionType) => (
            <li key={option.label}>
              <Button
                onClick={(e) => handleSelect(e, quizSetting.name)}
                value={option.label}
                color="transparent"
                fullWidth
                className={styles.option}
                size="medium"
              >
                {option.label}
              </Button>
            </li>
          ))}
        </ul>
      ) : null}
      <span className={styles["desc"]}>{description}</span>
    </div>
  );
};
