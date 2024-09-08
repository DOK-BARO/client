import { PlusCircle } from "../../../../public/assets/svg/plusCircle";
import Button from "../../../components/atom/button";
import Input from "../../../components/atom/input";
import Textarea from "../../../components/atom/textarea";
import styles from "../../../styles/composite/_quiz_basic_info_form.module.scss";
import { gray90, primary, primary30 } from "../../../styles/abstracts/colors";
import useModal from "../../../hooks/useModal";
import Modal from "../../../components/atom/modal";
import { useState } from "react";
import { Close } from "../../../../public/assets/svg/close";
import useInput from "../../../hooks/useInput";
import useTextarea from "../../../hooks/useTextarea";

// 1. 기본 정보 입력
export default function QuizBasicInfoForm() {
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
      >
        <PlusCircle
          alt="스터디 그룹 추가 버튼"
          width={24}
          height={24}
          fill={primary}
          stroke={primary30}
        />
        (선택) 스터디 그룹 추가하기
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
                  icon={<Close width={20} stroke={gray90} />}
                  onIconClick={removeStudyGroup}
                  className={styles["study-name"]}
                >
                  {selectedStudy}
                </Button>
              )}

              {!selectedStudy ? (
                // 스터디 그룹이 입력되어 있지 않은 경우 (초기 상태)
                <div className={styles["input-button-container"]}>
                  <Input
                    placeholder="이름을 입력해주세요."
                    id="study-name"
                    value={studyName}
                    onChange={onChangeStudyName}
                  />
                  <Button
                    className={styles["add"]}
                    onClick={() => addStudyGroup(studyName)}
                  >
                    추가
                  </Button>
                </div>
              ) : (
                // 스터디 그룹이 입력되어 있는 경우
                <div className={styles["email-invite"]}>
                  <div className={styles.line} />
                  <div className={styles["title"]}>그룹에 초대하기</div>
                  <div className={styles["input-button-container"]}>
                    <Input
                      value={inviteEmail}
                      id="email-invite"
                      placeholder="이메일을 입력해주세요"
                      onChange={onChangeInviteEmail}
                    />
                    <Button
                      className={styles["invite"]}
                      onClick={inviteToStudyGroup}
                    >
                      초대
                    </Button>
                  </div>
                  <div className={styles["buttons-container"]}>
                    <Button className={styles["copy-link"]} onClick={copyLink}>
                      링크 복사하기
                    </Button>
                    <Button className={styles["done"]} onClick={done}>
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
      ></Input>
      <Textarea
        id="quiz-description"
        placeholder="퀴즈 설명을 입력해주세요."
        className={styles["quiz-description"]}
        onChange={onChangeQuizDesc}
        value={quizDesc}
      ></Textarea>
    </>
  );
}
