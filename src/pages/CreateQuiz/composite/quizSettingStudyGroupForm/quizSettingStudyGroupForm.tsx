import styles from "./_quiz_setting_study_group_form.module.scss";
import { useState } from "react";
import useModal from "@/hooks/useModal.ts";
import useInput from "@/hooks/useInput.ts";
import useTextarea from "@/hooks/useTextarea.ts";
import Button from "@/components/atom/button/button.tsx";
import { primary } from "@/styles/abstracts/colors.ts";
import Modal from "@/components/atom/modal/modal.tsx";
import Input from "@/components/atom/input/input.tsx";
import Textarea from "@/components/atom/textarea/textarea.tsx";
import { QuizPlus } from "@/svg/quizPlus";
import { XMedium } from "@/svg/xMedium";
import { Link } from "@/svg/link";
import { Copy } from "@/svg/copy";

// 1.스터디 생성 / 선택
export default function QuizSettingStudyGroupForm() {
  // TODO: custom hook으로 분리하기
  const { isModalOpen, openModal, closeModal } = useModal();
  const [selectedStudy, setSelectedStudy] = useState<string>("");

  // 모달 안 인풋
  const {
    value: studyName,
    onChange: onChangeStudyName,
    resetInput,
  } = useInput("");
  const { value: inviteEmail, onChange: onChangeInviteEmail } = useInput("");

  const { value: quizTitle, onChange: onChangeQuizTitle } = useInput("");
  const { value: quizDesc, onChange: onChangeQuizDesc } = useTextarea("");

  const profileImgSrc = "";

  const [isStudySelected, setIsStudySelected] = useState<boolean>(false);

  const [isToggleOn, setIsToggleOn] = useState<boolean>(false);

  // 새로운 스터디 그룹 추가
  const addStudyGroup = (studyNameInputValue: string) => {
    setSelectedStudy(studyNameInputValue);
  };

  // 입력한 스터디 그룹 삭제
  const removeStudyGroup = () => {
    setSelectedStudy("");
    // 인풋 value도 초기화
    resetInput("");
  };

  // 이메일을 통해 스터디 그룹에 초대하기
  const inviteToStudyGroup = () => {
    console.log(inviteEmail);
  };

  // 링크 복사하기
  const copyLink = () => {};

  // 완료. (모달창 닫기)
  const done = () => {
    setIsStudySelected(true);
    console.log(selectedStudy);
    closeModal();
  };

  // 퀴즈 알람 보내기 토글 버튼
  const onToggle = () => {
    setIsToggleOn(!isToggleOn);
  };

  return (
    <>
      {isStudySelected && (
        <article className={styles["selected-study-group"]}>
          <div className={styles["profile-container"]}>
            {profileImgSrc ? (
              <img className={styles["profile"]} src="" alt="" />
            ) : (
              <div className={styles["profile"]} />
            )}
            {selectedStudy}
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
            퀴즈 알람 보내기
          </div>
        </article>
      )}
      <Button
        size="large"
        className={styles["add-study-group"]}
        onClick={openModal}
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
              {selectedStudy && (
                <Button
                  onClick={() => {}}
                  iconPosition="right"
                  icon={
                    <XMedium
                      width={20}
                      height={20}
                      stroke={primary}
                      alt="새로운 스터디 그룹 이름 삭제"
                    />
                  }
                  onIconClick={removeStudyGroup}
                  className={styles["study-name"]}
                  color="secondary"
                >
                  {selectedStudy}
                </Button>
              )}

              {!selectedStudy ? (
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
                  >
                    ABC123
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
      <Input
        className={styles["quiz-title"]}
        id="quiz-title"
        placeholder="퀴즈 제목을 입력해주세요."
        onChange={onChangeQuizTitle}
        value={quizTitle}
      />
      <Textarea
        id="quiz-description"
        placeholder="퀴즈 설명을 입력해주세요."
        className={styles["quiz-description"]}
        onChange={onChangeQuizDesc}
        value={quizDesc}
      />
    </>
  );
}
