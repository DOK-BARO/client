import { useEffect, useState } from "react";
import styles from "./_quiz_settings_form.module.scss";
// TODO: 파일 분리

// 4. 퀴즈 설정
export default function QuizSettingsForm() {
  return (
    <>
      {quizSettings.map((quizSetting) => (
        <SettingContainer quizSetting={quizSetting} />
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
        label: "2분",
        description: "설정한 시간이 되면 퀴즈가 자동으로 끝납니다.",
      },
    ],
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
    ],
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
        description: "스터디원이 이 퀴즈를 선택할 수 있습니다.",
      },
    ],
  },
];

const SettingContainer = ({ quizSetting }: { quizSetting: QuizSetting }) => {
  const name = quizSetting.name;
  const options = quizSetting.options;
  // const [selectedLabel, setSelectedValue] = useState("");
  const [label, setLabel] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    console.log(value);
    setLabel(value);
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
      <label htmlFor={name}>편집 권한</label>
      <select name={name} id={quizSetting.name} onChange={onSelect}>
        {options.map((option: QuizSettingOption) => (
          <option value={option.label}>{option.label}</option>
        ))}
      </select>

      <span className={styles["desc"]}>
        {/* 옵션 label에 맞는 desc을 보여줘야 함. */}
        {description}
      </span>
    </div>
  );
};
