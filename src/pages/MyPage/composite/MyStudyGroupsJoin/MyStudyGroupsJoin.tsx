import styles from "./_my_study_groups_join.module.scss";
import { useEffect, useState } from "react";
import { myPageTitleAtom } from "@/store/myPageAtom";
import { useAtom } from "jotai";
import Button from "@/components/atom/Button/Button";
import CodeInput from "@/components/composite/CodeInput/CodeInput";
import useCodeInput from "@/hooks/useCodeInput";
import { useMutation, useQuery } from "@tanstack/react-query";
import { studyGroupService } from "@/services/server/studyGroupService";
import { ErrorType } from "@/types/ErrorType";
import useModal from "@/hooks/useModal";
import Modal from "@/components/atom/Modal/Modal";
import { studyGroupKeys } from "@/data/queryKeys";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/data/routes";

export default function MyStudyGroupsJoin() {
  const navigate = useNavigate();
  const [, setMyPageTitle] = useAtom(myPageTitleAtom);
  const [isMatch, setIsMatch] = useState<boolean | undefined>(undefined);

  const [joinedStudyGroupInviteCode, setJoinedStudyGroupInviteCode] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    setMyPageTitle("코드로 가입하기");
    return () => setMyPageTitle("마이페이지");
  }, []);

  const { openModal, closeModal, isModalOpen } = useModal();
  const {
    handleCodeChange,
    handleKeyDown,
    handlePaste,
    codeList,
    combinedCode,
  } = useCodeInput();
  const { mutate: joinStudyGroup } = useMutation<void, ErrorType, string>({
    mutationFn: (inviteCode) => studyGroupService.joinStudyGroup(inviteCode),
    onError: () => {
      setIsMatch(false);
    },
    onSuccess: (_, inviteCode) => {
      // 모달 오픈
      openModal();
      setJoinedStudyGroupInviteCode(inviteCode);
    },
  });

  const { data: studyGroupDetail } = useQuery({
    queryKey: studyGroupKeys.detailByInviteCode(joinedStudyGroupInviteCode),
    queryFn: ({ queryKey }) => {
      const [, code] = queryKey;
      if (code) {
        return studyGroupService.fetchStudyGroupDetailByInviteCode(code);
      }
    },
    enabled: !!joinedStudyGroupInviteCode,
  });

  const handleJoinStudyGroupByCode = () => {
    // console.log(codeList, combinedCode);
    joinStudyGroup(combinedCode);
  };

  useEffect(() => {
    setIsMatch(undefined);
  }, [codeList]);

  const handleGoToStudyGroupPage = () => {
    closeModal();
    navigate(ROUTES.STUDY_GROUP(studyGroupDetail?.id));
  };

  return (
    <div className={styles.container}>
      {isModalOpen ? (
        // 가입 완료 환영 모달
        <Modal
          closeModal={closeModal}
          title="코드로 스터디 그룹 참여하기"
          contents={[
            {
              title: `${studyGroupDetail?.name}에 가입하신 걸 환영해요!`,
              content: <></>,
            },
          ]}
          bottomButtons={[
            {
              text: "스터디 그룹 페이지 가기",
              color: "primary",
              onClick: handleGoToStudyGroupPage,
            },
          ]}
        />
      ) : null}
      <p className={styles["sub-title"]}>
        스터디 그룹 초대코드를 입력해주세요.
      </p>
      <div className={styles["code-input-container"]}>
        <CodeInput
          codeList={codeList}
          borderColor={"default"}
          onCodeChange={handleCodeChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          isMatch={isMatch ?? true}
          errorMessage="올바르지 않은 그룹 코드입니다."
        />
      </div>
      <Button
        className={styles.done}
        color="primary"
        fullWidth
        onClick={handleJoinStudyGroupByCode}
        disabled={codeList.some((code) => code === "")}
      >
        완료
      </Button>
    </div>
  );
}
