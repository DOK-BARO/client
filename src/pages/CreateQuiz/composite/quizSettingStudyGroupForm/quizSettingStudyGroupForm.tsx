import styles from "./_quiz_setting_study_group_form.module.scss";
import { useState } from "react";
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

// 1.스터디 선택
export default function QuizSettingStudyGroupForm() {
  // TODO: custom hook으로 분리하기
  const { isModalOpen, openModal, closeModal } = useModal();
  // const [selectedStudy, setSelectedStudy] = useState<string | null>(null);

  const [studyGroupList, setStudyGroupList] = useState<StudyGroupType[]>([]);
  const [selectedStudyGroupList, setSelectedStudyGroupList] = useState<
    StudyGroupType[]
  >([]);
  const [newStudyGroup, setNewStudyGroup] = useState<string | null>(null);

  // 모달 안 인풋
  const {
    value: studyName,
    onChange: onChangeStudyName,
    resetInput: resetStudyNameInput,
  } = useInput("");
  const { value: inviteEmail, onChange: onChangeInviteEmail } = useInput("");

  const [isToggleOn, setIsToggleOn] = useState<boolean>(false);

  // 새로운 스터디 그룹 추가
  const addStudyGroup = (newStudyName: string) => {
    setNewStudyGroup(newStudyName);
  };

  // 입력한 스터디 그룹 삭제
  const removeStudyGroup = () => {
    setNewStudyGroup("");
    // 인풋 value도 초기화
    resetStudyNameInput("");
  };

  // 이메일을 통해 스터디 그룹에 초대하기
  const inviteToStudyGroup = () => {
    console.log(inviteEmail);
  };

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
    // 확인 눌렀을때. // api 요청 해야됨
    if (newStudyGroup) {
      setStudyGroupList([
        ...studyGroupList,
        {
          id: -1, // 임시
          name: newStudyGroup,
        },
      ]);
    }

    closeModal();
  };

  // 퀴즈 알람 보내기 토글 버튼
  const onToggle = () => {
    setIsToggleOn(!isToggleOn);
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
                selectedStudyGroupList.includes(studyGroup)
                  ? styles["selected"]
                  : styles["non"]
              }`}
              onClick={() => {
                setSelectedStudyGroupList((prevList) =>
                  prevList.includes(studyGroup)
                    ? prevList.filter((item) => item !== studyGroup)
                    : [...prevList, studyGroup]
                );
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
              {/* toggle button -> 분리하기 */}
              <div
                className={`${styles["toggle-container"]} ${
                  isToggleOn ? styles["on"] : styles["off"]
                }`}
              >
                <button
                  className={`${styles["toggle"]} ${
                    isToggleOn ? styles["on"] : styles["off"]
                  }`}
                  value={isToggleOn.toString()}
                  onClick={onToggle}
                >
                  <div className={styles["circle"]} />
                </button>
              </div>
            </article>
          ))}
        </>
      )}

      <Button
        size="large"
        className={styles["add-study-group"]}
        onClick={() => {
          openModal();
          setNewStudyGroup(null);
          resetStudyNameInput("");
        }}
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
          } // input 요소를 넣어야함.
          closeModal={closeModal}
        />
      )}
    </>
  );
}
