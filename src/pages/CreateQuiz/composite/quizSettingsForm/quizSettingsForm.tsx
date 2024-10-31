import { useEffect, useState } from "react";
import styles from "./_quiz_settings_form.module.scss";
import Button from "@/components/atom/button/button";
// import arrowDown from "/svg/quizSettingForm/arrowDown.svg";
// TODO: 파일 분리

// 4. 퀴즈 설정
export default function QuizSettingsForm() {
  return (
    <>
      {quizSettings.map((quizSetting) => (
        <SettingContainer key={quizSetting.name} quizSetting={quizSetting} />
      ))}
    </>
  );
}

interface QuizSettingOption {
  label: string;
  description: string;
}

interface QuizSetting {
  title: string;
  name: string;
  options: QuizSettingOption[];
  icon: string; // path
}

const quizSettings: QuizSetting[] = [
  {
    title: "제한시간 설정",
    name: "time-limit",
    options: [
      {
        label: "1분",
        description: "설정한 시간이 되면 퀴즈가 자동으로 끝납니다.",
      },
      {
        label: "3분",
        description: "설정한 시간이 되면 퀴즈가 자동으로 끝납니다.",
      },
      {
        label: "5분",
        description: "설정한 시간이 되면 퀴즈가 자동으로 끝납니다.",
      },
      {
        label: "10분",
        description: "설정한 시간이 되면 퀴즈가 자동으로 끝납니다.",
      },
      {
        label: "없음",
        description: "설정한 시간이 되면 퀴즈가 자동으로 끝납니다.",
      },
    ],
    icon: "/assets/svg/quizSettingForm/time.svg",
  },
  {
    title: "보기 설정",
    name: "view-access",
    options: [
      {
        label: "모두",
        description: "모든 사용자가 이 퀴즈를 보고 풀 수 있습니다.",
      },
      {
        label: "스터디원만",
        description: "스터디원이 이 퀴즈를 보고 풀 수 있습니다.",
      },
      {
        label: "나만",
        description: "나만 이 퀴즈를 보고 풀 수 있습니다.",
      },
    ],
    icon: "/assets/svg/quizSettingForm/view.svg",
  },
  {
    title: "편집 권한",
    name: "edit-access",
    options: [
      {
        label: "나만",
        description: "나만 이 퀴즈를 편집할 수 있습니다.",
      },
      {
        label: "스터디원만",
        description: "스터디원이 이 퀴즈를 편집할 수 있습니다.",
      },
    ],
    icon: "/assets/svg/quizSettingForm/edit.svg",
  },
];

const SettingContainer = ({ quizSetting }: { quizSetting: QuizSetting }) => {
  const arrowDown = "/assets/svg/quizSettingForm/arrowDown.svg";
  const options = quizSetting.options;
  // const [selectedLabel, setSelectedValue] = useState("");
  const [label, setLabel] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

  const onSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;
    setLabel(value);
    setIsSelectOpen((prev) => !prev);
  };

  useEffect(() => {
    const selectedOption = quizSetting.options.find(
      (option) => option.label === label
    );

    setDescription(
      selectedOption
        ? selectedOption.description
        : quizSetting.options[0].description
    );
  }, [label]);

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
        icon={<img src={arrowDown} />}
      >
        {label ?? "선택"}
      </Button>
      {isSelectOpen ? (
        <ul className={styles["option-list"]}>
          {options.map((option: QuizSettingOption) => (
            <li key={option.label}>
              <Button
                onClick={onSelect}
                value={option.label}
                className={styles.option}
              >
                {option.label}
              </Button>
            </li>
          ))}
        </ul>
      ) : null}
      <span className={styles["desc"]}>
        {/* 옵션 label에 맞는 desc을 보여줘야 함. */}
        {description}
      </span>
    </div>
  );
};
