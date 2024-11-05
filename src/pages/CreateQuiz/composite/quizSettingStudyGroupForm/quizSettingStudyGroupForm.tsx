import styles from "./_quiz_setting_study_group_form.module.scss";
import { useState, useEffect } from "react";
import useModal from "@/hooks/useModal.ts";
import useInput from "@/hooks/useInput.ts";
import Button from "@/components/atom/button/button.tsx";
import { primary } from "@/styles/abstracts/colors.ts";
import Modal from "@/components/atom/modal/modal.tsx";
import Input from "@/components/atom/input/input.tsx";
import { QuizPlus } from "@/svg/quizPlus";
import { XMedium } from "@/svg/xMedium";
import { Link } from "@/svg/link";
import { Copy } from "@/svg/copy";
import { StudyGroupType } from "@/types/StudyGroupType";
import Toggle from "@/components/atom/toggle/toggle";
import { useAtom } from "jotai";
import { IsQuizNextButtonEnabledAtom } from "@/store/quizAtom";

export interface StudyGroupSelectType extends StudyGroupType {
  isSetAlarm: boolean;
}

// TODO: 컴포넌트 분리
// 1.스터디 선택
export default function QuizSettingStudyGroupForm() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [studyGroupList, setStudyGroupList] = useState<StudyGroupSelectType[]>(
    []
  );
  const [selectedStudyGroup, setSelectedStudyGroup] =
    useState<StudyGroupSelectType | null>(null);
  const [newStudyGroup, setNewStudyGroup] = useState<string | null>(null);
  const [isNewStudyGroupAdded, setNewStudyGroupAdded] =
    useState<boolean>(false);
  const [, setIsQuizNextButtonEnabled] = useAtom<boolean>(
    IsQuizNextButtonEnabledAtom
  );

  useEffect(() => {
    setIsQuizNextButtonEnabled(true);
  }, []);

  // 모달 안 인풋
  const {
    value: studyName,
    onChange: onChangeStudyName,
    resetInput: resetStudyNameInput,
  } = useInput("");

  // const { value: inviteEmail, onChange: onChangeInviteEmail } = useInput("");
  const [tempId, setTempId] = useState<number>(-1);

  // 새로운 스터디 그룹 추가
  const addStudyGroup = (newStudyName: string) => {
    setNewStudyGroup(newStudyName);
  };

  // 입력한 스터디 그룹 삭제
  const removeStudyGroup = () => {
    setNewStudyGroup(null);
    // 인풋 value도 초기화
    resetStudyNameInput("");
  };

  // 이메일을 통해 스터디 그룹에 초대하기
  // const inviteToStudyGroup = () => {
  //   console.log(inviteEmail);
  // };

  // 링크 복사하기
  const copyLink = () => {};

  // 코드 복사하기
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      alert("복사되었습니다.");
    });
  };

  // 완료. (모달창 닫기)
  const done = () => {
    // 완료 눌렀을때.
    // api 요청 해야됨
    if (newStudyGroup) {
      setStudyGroupList([
        ...studyGroupList,
        {
          id: tempId, // 임시
          name: newStudyGroup,
          isSetAlarm: false,
        },
      ]);
    }

    setTempId(tempId - 1);
    closeModal();
    setNewStudyGroupAdded((prev) => !prev);
  };

  // '스터디 만들기' 버튼 클릭
  const handleAddStudyGroupButton = () => {
    openModal();
    setNewStudyGroup(null);
    resetStudyNameInput("");
  };

  return (
    <>
      {studyGroupList.length > 0 && (
        <>
          <p className={styles["email-notification"]}>
            스터디원들의 이메일로 퀴즈 생성 알림이 가요.
          </p>
          {studyGroupList.map((studyGroup) => (
            <article
              id={studyGroup.id.toString()}
              className={`${styles["study-group"]} ${
                selectedStudyGroup?.id === studyGroup.id
                  ? styles.selected
                  : null
              }`}
              onClick={() => {
                setSelectedStudyGroup((prev) => {
                  const isAlreadySelected = prev?.id === studyGroup.id;

                  // 이미 선택 o -> 선택 x (해제)
                  if (isAlreadySelected) {
                    // 전체 리스트
                    setStudyGroupList((prevList) =>
                      prevList.map((item) =>
                        item.id === studyGroup.id
                          ? { ...item, isSetAlarm: false } // 알람 자동으로 해제
                          : item
                      )
                    );
                    return null;
                  }

                  // 이미 선택 x -> 선택 o
                  // 전체 리스트
                  // 나머지 알람 삭제
                  setStudyGroupList((prevList) =>
                    prevList.map((item) =>
                      item.id === studyGroup.id
                        ? { ...item, isSetAlarm: true } // 알람 자동으로 설정
                        : { ...item, isSetAlarm: false }
                    )
                  );

                  // 선택 스터디그룹
                  return { ...studyGroup, isSetAlarm: true };
                });
              }}
            >
              <div className={styles["profile-container"]}>
                {studyGroup.profileImageUrl ? (
                  <img className={styles.profile} src="" alt="" />
                ) : (
                  <div className={styles.profile} />
                )}
                {studyGroup.name}
              </div>

              <Toggle
                isActive={studyGroup.isSetAlarm}
                onClick={() => {
                  // 전체 리스트 - 토글
                  setStudyGroupList((prevList) =>
                    prevList.map((item) =>
                      item.id === studyGroup.id
                        ? { ...item, isSetAlarm: !item.isSetAlarm }
                        : item
                    )
                  );

                  setSelectedStudyGroup((prev) => {
                    const isAlreadySelected = prev?.id === studyGroup.id;

                    // 선택된 스터디가 아닐 경우 토글 on
                    if (!isAlreadySelected) {
                      return { ...studyGroup, isSetAlarm: true };
                    }

                    return prev;
                  });
                }}
              />
            </article>
          ))}
        </>
      )}
      {!isNewStudyGroupAdded ? (
        <Button
          size="large"
          className={styles["add-study-group"]}
          onClick={handleAddStudyGroupButton}
          icon={
            <QuizPlus
              alt="스터디 그룹 추가 버튼"
              width={24}
              height={24}
              stroke={primary}
            />
          }
          color="secondary"
        >
          스터디 만들기
        </Button>
      ) : null}
      {isModalOpen && (
        <Modal
          className={styles["add-study-group-modal"]}
          popUpTitle="스터디 그룹 추가하기"
          contentTitle="새로운 스터디 그룹 이름"
          content={
            <div className={styles["add-study-name"]}>
              {newStudyGroup && (
                <Button
                  onClick={() => {}}
                  iconPosition="right"
                  icon={
                    <XMedium
                      width={20}
                      height={20}
                      stroke={primary}
                      alt="스터디 그룹 이름 삭제"
                    />
                  }
                  onIconClick={removeStudyGroup}
                  className={styles["study-name"]}
                  color="secondary"
                >
                  {newStudyGroup}
                </Button>
              )}

              {!newStudyGroup ? (
                // 스터디 그룹이 입력되어 있지 않은 경우 (초기 상태)
                <div className={styles["input-button-container"]}>
                  <Input
                    fullWidth
                    placeholder="이름을 입력해주세요."
                    id="study-name"
                    value={studyName}
                    onChange={onChangeStudyName}
                    className={styles.input}
                  />
                  <Button
                    className={styles["add"]}
                    color="primary-border"
                    onClick={() => addStudyGroup(studyName)}
                  >
                    스터디 만들기
                  </Button>
                </div>
              ) : (
                // 스터디 그룹이 입력되어 있는 경우
                <div className={styles["email-invite"]}>
                  <div className={styles.line} />
                  <div className={styles.title}>스터디 그룹 초대코드</div>
                  <Button
                    fullWidth
                    color="secondary"
                    icon={
                      <Copy width={20} stroke={primary} alt="초대 코드 복사" />
                    }
                    iconPosition="left"
                    onClick={(e) => {
                      const buttonText =
                        e.currentTarget.querySelector(
                          "#invite-code"
                        )?.textContent;
                      if (buttonText) {
                        copyCode(buttonText);
                      }
                    }}
                  >
                    <span id="invite-code">ABC123</span>
                  </Button>
                  <div className={styles["buttons-container"]}>
                    <Button
                      className={styles["copy-link"]}
                      color="primary-border"
                      onClick={copyLink}
                      icon={
                        <Link
                          width={24}
                          stroke={primary}
                          alt="초대 링크 복사"
                        />
                      }
                      iconPosition="left"
                    >
                      초대 링크 복사
                    </Button>
                    <Button
                      color="primary"
                      className={styles.done}
                      onClick={done}
                    >
                      완료
                    </Button>
                  </div>
                </div>
              )}
            </div>
          }
          closeModal={closeModal}
        />
      )}
    </>
  );
}
