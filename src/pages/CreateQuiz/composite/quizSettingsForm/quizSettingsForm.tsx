import { useEffect, useState } from "react";
import styles from "./_quiz_settings_form.module.scss";
import Button from "@/components/atom/button/button";
import { IsQuizNextButtonEnabledAtom } from "@/store/quizAtom";
import { useAtom } from "jotai";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import { QuizCreationType } from "@/types/QuizType";

// TODO: 파일 분리
interface SelectedOptions {
  [key: string]: string | null;
}
// 4. 퀴즈 설정
export default function QuizSettingsForm() {
  const { quizCreationInfo, updateQuizCreationInfo } =
    useUpdateQuizCreationInfo();
  const [, setIsQuizNextButtonEnabled] = useAtom<boolean>(
    IsQuizNextButtonEnabledAtom
  );

  const setInitialSetting = (): SelectedOptions => {
    const selectOptions: SelectedOptions = {
      "time-limit": quizCreationInfo.timeLimitSecond ?? null,
      "view-access": quizCreationInfo.viewScope,
      "edit-access": quizCreationInfo.editScope,
    };
    return selectOptions;
  };

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(
    setInitialSetting()
  ); // 선택된 옵션들

  const handleOptionSelect = (settingName: string, label: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [settingName]: label,
    }));

    const updateMapping: { [key: string]: keyof QuizCreationType } = {
      "time-limit": "timeLimitSecond",
      "view-access": "viewScope",
      "edit-access": "editScope",
    };
    const updateKey: keyof QuizCreationType = updateMapping[settingName]!;
    updateQuizCreationInfo(updateKey, label);
  };

  // 모든 항목이 선택되었는지 체크
  useEffect(() => {
    const isAllSelected = quizSettings.every(
      (setting) => selectedOptions[setting.name] !== null
    );
    console.log(selectedOptions, isAllSelected);

    setIsQuizNextButtonEnabled(isAllSelected);
  }, [selectedOptions, setIsQuizNextButtonEnabled]);

  return (
    <>
      {quizSettings.map((quizSetting) => (
        <SettingContainer
          key={quizSetting.name}
          quizSetting={quizSetting}
          onOptionSelect={handleOptionSelect}
          selectedOptionLabel={selectedOptions[quizSetting.name]}
        />
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

const SettingContainer = ({
  quizSetting,
  onOptionSelect,
  selectedOptionLabel,
}: {
  quizSetting: QuizSetting;
  onOptionSelect: (name: string, label: string) => void;
  selectedOptionLabel: string | null;
}) => {
  const arrowDown = "/assets/svg/quizSettingForm/arrowDown.svg";
  const options = quizSetting.options;
  //const [label, setLabel] = useState<string | null>();
  const [description, setDescription] = useState<string>("");
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

  const onSelect = (e: React.MouseEvent<HTMLButtonElement>, name: string) => {
    const value = e.currentTarget.value;
    //setLabel(value);
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
      {isSelectOpen ? (
        <ul className={styles["option-list"]}>
          {options.map((option: QuizSettingOption) => (
            <li key={option.label}>
              <Button
                onClick={(e) => onSelect(e, quizSetting.name)}
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
