import { gray50, gray90 } from "@/styles/abstracts/colors";
import styles from "./_quiz_settings_container.module.scss";
import Button from "@/components/atom/Button/Button";
import { QuizSettingOptionType, QuizSettingType } from "@/types/QuizType";
import { useEffect, useState } from "react";
import { ArrowDown } from "@/svg/ArrowDown";

interface Props {
  quizSetting: QuizSettingType;
  onOptionSelect: (name: string, label: string) => void;
  selectedOptionLabel: string | null;
}

export const QuizSettingContainer = ({
  quizSetting,
  onOptionSelect,
  selectedOptionLabel,
}: Props) => {
  const options = quizSetting.options;

  const [description, setDescription] = useState<string>("");
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

  useEffect(() => {
    if (options.length === 1) {
      onOptionSelect(quizSetting.name, options[0].label);
    }
  }, []);

  const handleSelect = (
    e: React.MouseEvent<HTMLButtonElement>,
    name: string,
  ) => {
    const value = e.currentTarget.value;
    onOptionSelect(name, value);
    setIsSelectOpen((prev) => !prev);
  };

  useEffect(() => {
    const selectedOption = options.find(
      (option) => option.label === selectedOptionLabel,
    );

    setDescription(
      selectedOption ? selectedOption.description : options[0].description,
    );
  }, [selectedOptionLabel]);

  return (
    <div className={styles["quiz-setting-container"]}>
      <div className={styles.title}>
        <img src={quizSetting.icon} alt="" />
        {quizSetting.title}
      </div>
      <Button
        color="white"
        id={quizSetting.name}
        onClick={() => setIsSelectOpen(!isSelectOpen)}
        className={styles.select}
        size="medium"
        icon={
          <ArrowDown
            stroke={options.length > 1 ? gray90 : gray50}
            width={20}
            height={20}
            alt=""
          />
        }
      >
        {selectedOptionLabel ?? "선택"}
      </Button>
      {options.length > 1 && isSelectOpen ? (
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
