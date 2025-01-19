import styles from "./_quiz_setting_study_group_form.module.scss";
import { useState, useEffect } from "react";
import useModal from "@/hooks/useModal.ts";
import useInput from "@/hooks/useInput.ts";
import Button from "@/components/atom/Button/Button";
import { primary } from "@/styles/abstracts/colors.ts";
import Modal, { ModalContentProps } from "@/components/atom/Modal/Modal";
import Input from "@/components/atom/Input/Input";
import { QuizPlus } from "@/svg/QuizPlus";
import { XMedium } from "@/svg/XMedium";
import { Copy } from "@/svg/Copy";
import { StudyGroupPostType, StudyGroupType } from "@/types/StudyGroupType";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import { studyGroupService } from "@/services/server/studyGroupService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ErrorType } from "@/types/ErrorType";
import toast from "react-hot-toast";
import { studyGroupKeys } from "@/data/queryKeys";
import { useAtom } from "jotai";
import { isQuizNextButtonEnabledAtom, isSetAtom } from "@/store/quizAtom";

// TODO: 컴포넌트 분리
// 1.스터디 선택
export default function QuizSettingStudyGroupForm() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { quizCreationInfo, updateQuizCreationInfo } =
    useUpdateQuizCreationInfo();

  const [studyGroupList, setStudyGroupList] = useState<StudyGroupType[]>([]);

  const { data: studyGroupsData, isLoading: isStudyGroupsLoading } = useQuery({
    queryKey: studyGroupKeys.list({
      page: 1,
      size: 50,
      sort: "CREATED_AT",
      direction: "ASC",
    }),
    queryFn: () =>
      studyGroupService.fetchStudyGroups({
        page: 1,
        size: 50,
        sort: "CREATED_AT",
        direction: "DESC",
      }),
  });
  const studyGroups = studyGroupsData?.data;
  // 초기화
  useEffect(() => {
    if (!isStudyGroupsLoading && studyGroups) {
      setStudyGroupList(studyGroups);
    }
  }, [studyGroups]);

  // 새롭게 추가된 스터디 그룹 이름
  const [newStudyGroup, setNewStudyGroup] = useState<StudyGroupType | null>(
    null
  );

  const [isNewStudyGroupAdded, setNewStudyGroupAdded] =
    useState<boolean>(false);
  const [, setIsQuizNextButtonEnabled] = useAtom<boolean>(
    isQuizNextButtonEnabledAtom
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
  } = useInput("");

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
    StudyGroupPostType
  >({
    mutationFn: (newStudy) => studyGroupService.createStudyGroup(newStudy),
    onSuccess: (data, newStudy) => {
      toast.success("스터디가 생성되었습니다.");
      if (!data) return;
      // console.log("새롭게 생성된 스터디 그룹 아이디", data.id);
      setNewStudyGroup({
        name: newStudy.name,
        id: data.id,
        profileImageUrl: undefined,
      });
    },
  });

  // 입력한 스터디 그룹 삭제
  const removeStudyGroup = () => {
    setNewStudyGroup(null);

    // 인풋 value도 초기화
    resetStudyNameInput("");
  };

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

  const [, setIsSet] = useAtom(isSetAtom);

  // 스터디 선택
  const handleSelectStudyGroup = (studyGroup: StudyGroupType) => {
    if (studyGroup === quizCreationInfo.studyGroup) {
      updateQuizCreationInfo("studyGroup", undefined);
    } else {
      updateQuizCreationInfo("studyGroup", studyGroup);
    }
    setIsSet(false);
    // setSelectedStudyGroup(
    //   studyGroup === selectedStudyGroup ? null : studyGroup
    // );
  };
  const getContents = (): ModalContentProps[] => {
    const contents = [
      {
        title: "새로운 스터디 그룹 이름",
        content: newStudyGroup ? (
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
        ) : (
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
              onClick={() => createStudyGroup({ name: studyName })}
              size="medium"
              disabled={!studyName}
            >
              스터디 만들기
            </Button>
          </div>
        ),
      },

      newStudyGroup
        ? {
            title: "스터디 그룹 초대코드",
            content: (
              <div className={styles["email-invite"]}>
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
                    {!isStudyGroupDetailLoading && studyGroupDetail?.inviteCode}
                  </span>
                </Button>
              </div>
            ),
          }
        : null,
    ];
    return contents.filter(
      (content): content is ModalContentProps => content !== null
    );
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
                  <img
                    className={styles.profile}
                    src={studyGroup.profileImageUrl}
                    alt={studyGroup.name}
                  />
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
          title="스터디 그룹 추가하기"
          contents={getContents()}
          bottomButtons={
            newStudyGroup
              ? [
                  {
                    text: "완료",
                    color: "primary",
                    onClick: done,
                  },
                ]
              : undefined
          }
          closeModal={closeModal}
        />
      )}
    </>
  );
}
