import { useEffect, useState } from "react";
import { isQuizNextButtonEnabledAtom } from "@/store/quizAtom";
import { useAtom } from "jotai";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import {
  editScopeTranslations,
  QuizCreationType,
  QuizSettingType,
  viewScopeTranslations,
} from "@/types/QuizType";
import { QuizSettingContainer } from "./QuizSettingContainer/QuizSettingContainer";

interface SelectedOptions {
  [key: string]: string | null; // 한글 label
}
// 4. 퀴즈 설정
export default function QuizSettingsForm() {
  const { quizCreationInfo, updateQuizCreationInfo } =
    useUpdateQuizCreationInfo();
  const [, setIsQuizNextButtonEnabled] = useAtom<boolean>(
    isQuizNextButtonEnabledAtom,
  );

  // 다음 버튼 초기화
  useEffect(() => {
    setIsQuizNextButtonEnabled(false);
  }, []);

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(
    () => ({
      "view-access": quizCreationInfo.viewScope
        ? viewScopeTranslations[quizCreationInfo.viewScope]
        : null,
      "edit-access": quizCreationInfo.editScope
        ? editScopeTranslations[quizCreationInfo.editScope]
        : null,
    }),
  );

  const [quizSettings, setQuizSettings] = useState<QuizSettingType[]>();

  useEffect(() => {
    setQuizSettings(getQuizSettings(!!quizCreationInfo.studyGroup));
  }, []);

  const handleOptionSelect = (settingName: string, label: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [settingName]: label,
    }));

    console.log(settingName, label);

    const updateMapping: { [key: string]: keyof QuizCreationType } = {
      "view-access": "viewScope",
      // "edit-access": "editScope",
    };
    const updateKey: keyof QuizCreationType = updateMapping[settingName]!;
    updateQuizCreationInfo(updateKey, label);
  };

  // 모든 항목이 선택되었는지 체크
  useEffect(() => {
    if (!quizSettings) {
      return;
    }
    const isAllSelected = quizSettings.every(
      (setting) => selectedOptions[setting.name] !== null,
    );

    setIsQuizNextButtonEnabled(isAllSelected);
  }, [Object.values(selectedOptions)]);

  return (
    <>
      {quizSettings?.map((quizSetting) => (
        <QuizSettingContainer
          key={quizSetting.name}
          quizSetting={quizSetting}
          onOptionSelect={handleOptionSelect}
          selectedOptionLabel={selectedOptions[quizSetting.name]}
        />
      ))}
    </>
  );
}
// TODO: 외부로 분리하기
const getQuizSettings = (isStudyGroupSelected: boolean): QuizSettingType[] => [
  {
    title: "보기 설정",
    name: "view-access",
    options: isStudyGroupSelected
      ? [
        {
          label: "스터디원만",
          description: "스터디원이 이 퀴즈를 보고 풀 수 있습니다.",
        },
        {
          label: "나만",
          description: "나만 이 퀴즈를 보고 풀 수 있습니다.",
        },
      ]
      : [
        {
          label: "모두",
          description: "모든 사용자가 이 퀴즈를 보고 풀 수 있습니다.",
        },
        {
          label: "나만",
          description: "나만 이 퀴즈를 보고 풀 수 있습니다.",
        },
      ],

    icon: "/assets/svg/quizSettingForm/view.svg",
  },
  // {
  //   title: "편집 권한",
  //   name: "edit-access",
  //   options: isStudyGroupSelected
  //     ? [
  //         {
  //           label: "스터디원만",
  //           description: "스터디원이 이 퀴즈를 편집할 수 있습니다.",
  //         },
  //         {
  //           label: "나만",
  //           description: "나만 이 퀴즈를 편집할 수 있습니다.",
  //         },
  //       ]
  //     : [
  //         {
  //           label: "나만",
  //           description: "나만 이 퀴즈를 보고 풀 수 있습니다.",
  //         },
  //       ],

  //   icon: "/assets/svg/quizSettingForm/edit.svg",
  // },
];
