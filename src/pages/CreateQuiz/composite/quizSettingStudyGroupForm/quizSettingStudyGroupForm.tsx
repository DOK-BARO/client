// 선택하면 불이 안들어와야 하는데 들어옴.. 다음버튼 누를때 들어오게 해야됨
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
import { StudyGroupPreviewType } from "@/types/StudyGroupType";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import { studyGroupService } from "@/services/server/studyGroupService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ErrorType } from "@/types/ErrorType";
import toast from "react-hot-toast";
import { studyGroupKeys } from "@/data/queryKeys";
import { useAtom } from "jotai";
import { IsQuizNextButtonEnabledAtom } from "@/store/quizAtom";

// TODO: 컴포넌트 분리
// 1.스터디 선택
export default function QuizSettingStudyGroupForm() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { quizCreationInfo, updateQuizCreationInfo } =
    useUpdateQuizCreationInfo();

  const [studyGroupList, setStudyGroupList] = useState<StudyGroupPreviewType[]>(
    []
  );

  const { data: studyGroups, isLoading: isStudyGroupsLoading } = useQuery({
    queryKey: studyGroupKeys.list(),
    queryFn: () => studyGroupService.fetchStudyGroups(),
  });
  // 초기화
  useEffect(() => {
    if (!isStudyGroupsLoading && studyGroups) {
      setStudyGroupList(studyGroups);
    }
  }, [studyGroups]);

  // 새롭게 추가된 스터디 그룹 이름
  const [newStudyGroup, setNewStudyGroup] = useState<{
    name: string;
    id: number;
  } | null>(null);

  const [isNewStudyGroupAdded, setNewStudyGroupAdded] =
    useState<boolean>(false);
  const [, setIsQuizNextButtonEnabled] = useAtom<boolean>(
    IsQuizNextButtonEnabledAtom
  );

  useEffect(() => {
    // TODO: 다음 버튼 누를 때 초록불 들어오게 하기
    setIsQuizNextButtonEnabled(true);
  }, [quizCreationInfo.studyGroup]);

  // 모달 안 인풋
  const {
    value: studyName,
    onChange: onChangeStudyName,
    resetInput: resetStudyNameInput,
  } = useInput(undefined);

  const { data: studyGroupDetail, isLoading: isStudyGroupDetailLoading } =
    useQuery({
      queryKey: studyGroupKeys.detail(newStudyGroup?.id),
      queryFn: () =>
        newStudyGroup?.id
          ? studyGroupService.fetchStudyGroup(newStudyGroup.id)
          : null,
      enabled: !!newStudyGroup?.id, // ID가 있을 때만 쿼리 실행
    });

  // 새로운 스터디 생성
  const { mutate: createStudyGroup } = useMutation<
    { id: number } | null,
    ErrorType,
    string
  >({
    mutationFn: (newStudyName) =>
      studyGroupService.createStudyGroup(newStudyName),
    onSuccess: (data, newStudyName) => {
      toast.success("스터디가 생성되었습니다.");
      if (!data) return;
      console.log("새롭게 생성된 스터디 그룹 아이디", data.id);
      setNewStudyGroup({
        name: newStudyName,
        id: data.id,
      });
    },
  });

  // 스터디 삭제
  // const {mutate: removeStudyGroup} = useMutation<void, ErrorType>({
  //   mutationFn: () =>
  // })

  // 입력한 스터디 그룹 삭제
  const removeStudyGroup = () => {
    setNewStudyGroup(null);

    // 인풋 value도 초기화
    resetStudyNameInput("");
  };

  // 링크 복사하기
  const copyLink = () => {};

  // 코드 복사하기
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      toast.success("복사되었습니다.");
    });
  };

  const handleClickCopyCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonText =
      e.currentTarget.querySelector("#invite-code")?.textContent;
    if (buttonText) {
      copyCode(buttonText);
    }
  };

  // 완료. (모달창 닫기)
  const done = () => {
    if (newStudyGroup) {
      setStudyGroupList([...studyGroupList, newStudyGroup]);
    }
    closeModal();
    setNewStudyGroupAdded((prev) => !prev);
  };

  // '스터디 만들기' 버튼 클릭
  const handleOpenCreateStudyModal = () => {
    openModal();
    setNewStudyGroup(null);
    resetStudyNameInput("");
  };

  // 스터디 선택
  const handleSelectStudyGroup = (studyGroup: StudyGroupPreviewType) => {
    updateQuizCreationInfo(
      "studyGroup",
      studyGroup === quizCreationInfo.studyGroup ? null : studyGroup
    );
  };

  // 스터디 생성
  const handleCreateStudyGroup = (studyName: string | undefined) => {
    if (!studyName) {
      toast.error("스터디 이름을 입력해주세요.");
      return;
    }
    createStudyGroup(studyName);
  };

  return (
    <>
      {studyGroupList.length > 0 && (
        <>
          {studyGroupList.map((studyGroup) => (
            <article
              key={studyGroup.id}
              id={studyGroup.id.toString()}
              className={`${styles["study-group"]} ${
                quizCreationInfo.studyGroup?.id === studyGroup.id
                  ? styles.selected
                  : null
              }`}
              onClick={() => handleSelectStudyGroup(studyGroup)}
            >
              <div className={styles["profile-container"]}>
                {studyGroup.profileImageUrl ? (
                  <img className={styles.profile} src="" alt="" />
                ) : (
                  <div className={styles.profile} />
                )}
                {studyGroup.name}
              </div>
            </article>
          ))}
        </>
      )}
      {!isNewStudyGroupAdded ? (
        <Button
          size="large"
          className={styles["add-study-group"]}
          onClick={handleOpenCreateStudyModal}
          icon={
            <QuizPlus
              alt="스터디 그룹 추가 버튼"
              width={20}
              height={20}
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
                  {newStudyGroup.name}
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
                    size="medium"
                  />
                  <Button
                    className={styles["add"]}
                    color="primary-border"
                    onClick={() => handleCreateStudyGroup(studyName)}
                    size="medium"
                  >
                    스터디 만들기
                  </Button>
                </div>
              ) : (
                // TODO: 시멘틱 태그
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
                    onClick={handleClickCopyCode}
                  >
                    <span id="invite-code" aria-label="스터디 그룹 초대 코드">
                      {!isStudyGroupDetailLoading &&
                        studyGroupDetail?.inviteCode}
                    </span>
                  </Button>
                  <div className={styles["buttons-container"]}>
                    <Button
                      className={styles["copy-link"]}
                      color="primary-border"
                      onClick={copyLink}
                      size="medium"
                      icon={
                        <Link
                          width={20}
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
                      size="medium"
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
