import styles from "./_add_study_group_modal.module.scss";
import Modal, { BottomButtonProps } from "@/components/atom/modal/modal";
import Input from "@/components/atom/input/input";
import ProfileImageEditor from "../profileImageEditor/profileImageEditor";
import useInput from "@/hooks/useInput";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ErrorType } from "@/types/ErrorType";
import { studyGroupService } from "@/services/server/studyGroupService";
import toast from "react-hot-toast";
import { StudyGroupCreationType } from "@/types/StudyGroupType";
import CodeInput from "@/components/composite/codeInput/codeInput";
import useCodeInput from "@/hooks/useCodeInput";
import { UploadImageArgType } from "@/types/UploadImageType";
import { imageService } from "@/services/server/imageService";
import { ProfileImageState } from "@/pages/Register/composite/profileSet/profileSet";
import Button, { ButtonColorProps } from "@/components/atom/button/button";
import { studyGroupKeys } from "@/data/queryKeys";
import { Copy } from "@/svg/copy";
import { primary } from "@/styles/abstracts/colors";
import Textarea from "@/components/atom/textarea/textarea";
import useAutoResizeTextarea from "@/hooks/useAutoResizeTextArea";
interface Props {
  closeModal: () => void;
}

export default function AddStudyGroupModal({ closeModal }: Props) {
  const { value: name, onChange: onNameChange } = useInput("");

  const {
    value: introduction,
    onChange: onIntroductionChange,
    textareaRef,
  } = useAutoResizeTextarea("", "48px");

  // TODO: 이미지 업로드하기
  const defaultImagePath = "/public/assets/image/default-profile.png";

  const defaultProfileState: ProfileImageState = {
    url: defaultImagePath,
    file: null,
  };
  const [profileImage, setProfileImage] =
    useState<ProfileImageState>(defaultProfileState);
  const { handleCodeChange, handleKeyDown, codeList, combinedCode } =
    useCodeInput();
  // 코드로 스터디 그룹 참여
  const [isJoinByCode, setIsJoinByCode] = useState<boolean>(false);
  const [joinedStudyGroupName] = useState<string>();

  // 새롭게 생성된 스터디그룹 아이디
  const [newStudyGroupId, setNewStudyGroupId] = useState<number>();
  const { mutate: createStudyGroup } = useMutation<
    { id: number } | null,
    ErrorType,
    StudyGroupCreationType
  >({
    mutationFn: (newStudy) => studyGroupService.createStudyGroup(newStudy),
    onSuccess: (data) => {
      toast.success("스터디가 생성되었습니다.");
      setIsStudyCreated(true);
      if (!data) return;
      console.log("새롭게 생성된 스터디 그룹 아이디", data.id);
      setNewStudyGroupId(data.id);
    },
  });

  const { data: studyGroupDetail, isLoading: isStudyGroupDetailLoading } =
    useQuery({
      queryKey: studyGroupKeys.detail(newStudyGroupId),
      queryFn: () =>
        newStudyGroupId
          ? studyGroupService.fetchStudyGroup(newStudyGroupId)
          : null,
      enabled: !!newStudyGroupId,
    });

  useEffect(() => {
    setIsMatch(undefined);
  }, [codeList]);

  useEffect(() => {
    console.log(profileImage);
  }, [profileImage]);

  const { mutate: uploadImage } = useMutation<
    string,
    ErrorType,
    UploadImageArgType
  >({
    mutationFn: (uploadImageArg) => imageService.uploadImage(uploadImageArg),
    onSuccess: (imageUrl) => {
      const newStudy = {
        name,
        introduction,
        profileImage: imageUrl,
      };
      createStudyGroup(newStudy);
    },
  });
  const [isStudyCreated, setIsStudyCreated] = useState<boolean>(false);
  const [isMatch, setIsMatch] = useState<boolean | undefined>(undefined);
  const [isInvitedByCode, setIsInvitedByCode] = useState<boolean>(false);
  const { mutate: joinStudyGroup } = useMutation<void, ErrorType, string>({
    mutationFn: (inviteCode) => studyGroupService.joinStudyGroup(inviteCode),
    onError: () => {
      setIsMatch(false);
    },
    onSuccess: () => {
      setIsInvitedByCode(true);
    },
  });

  const handleCreateStudyGroup = () => {
    console.log("스터디 만들기!", profileImage.file);
    console.log(profileImage.file);

    if (profileImage.file) {
      uploadImage({
        image: profileImage.file,
        imageTarget: "STUDY_GROUP_PROFILE",
      });
    }
    // createStudyGroup(newStudy);
  };
  const handleJoinStudyGroupByCode = () => {
    console.log("스터디 참여!");
    console.log(codeList);
    joinStudyGroup(combinedCode);
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
  const getBottomButtons = (): BottomButtonProps[] => {
    const bottomButtons = [
      !isStudyCreated
        ? {
            text: !isJoinByCode ? "코드로 참여하기" : "스터디 새로 만들기",
            color: "primary-border" as ButtonColorProps,
            handleClick: () => setIsJoinByCode((prev) => !prev),
          }
        : null,
      {
        text: !isInvitedByCode ? "완료" : "그룹 페이지 가기",
        color: "primary" as ButtonColorProps,
        handleClick: () => {
          if (isJoinByCode) {
            handleJoinStudyGroupByCode();
          } else if (!isStudyCreated) {
            handleCreateStudyGroup();
          } else if (isInvitedByCode) {
            console.log("그룹 페이지 가기");
          } else {
            closeModal();
          }
        },
      },
    ];

    // null 제거
    return bottomButtons.filter(
      (button): button is BottomButtonProps => button !== null
    );
  };

  return (
    <Modal
      closeModal={closeModal}
      title={
        !isJoinByCode ? "스터디 그룹 추가하기" : "코드로 스터디 그룹 참여하기"
      }
      contents={
        !isJoinByCode
          ? !isStudyCreated
            ? [
                {
                  title: "스터디 그룹 사진",
                  content: (
                    <ProfileImageEditor
                      width={150}
                      profileImage={profileImage}
                      setProfileImage={setProfileImage}
                      initialImageState={defaultProfileState}
                      isDeletable
                    />
                  ),
                },
                {
                  title: "스터디 그룹 이름",
                  content: (
                    <Input
                      id="study-group-name"
                      placeholder="스터디 그룹 이름을 입력해주세요."
                      value={name}
                      onChange={onNameChange}
                      maxLength={20}
                    />
                  ),
                },
                {
                  title: "스터디 그룹 소개",
                  content: (
                    <Textarea
                      id="study-group-introduction"
                      placeholder="짧은 소개를 써주세요."
                      value={introduction}
                      onChange={onIntroductionChange}
                      maxLength={50}
                      className={styles["introduction"]}
                      size="medium"
                      maxLengthShow
                      textAreaRef={textareaRef}
                    />
                  ),
                },
              ]
            : [
                {
                  title:
                    "스터디 그룹 초대코드를 초대하고 싶은 친구에게 보내세요.",
                  content: (
                    <Button
                      fullWidth
                      className={styles["new-study-invite-code"]}
                      icon={
                        <Copy
                          stroke={primary}
                          width={20}
                          height={20}
                          alt="초대 코드 복사"
                        />
                      }
                      iconPosition="right"
                      onClick={handleClickCopyCode}
                    >
                      <span id="invite-code" aria-label="스터디 그룹 초대 코드">
                        {!isStudyGroupDetailLoading &&
                          studyGroupDetail?.inviteCode}
                      </span>
                    </Button>
                  ),
                },
              ]
          : [
              !isInvitedByCode
                ? {
                    title: "초대 코드를 입력해 주세요.",
                    content: (
                      <div className={styles["code-input-container"]}>
                        <CodeInput
                          codeList={codeList}
                          borderColor={"default"}
                          handleCodeChange={handleCodeChange}
                          handleKeyDown={handleKeyDown}
                          isMatch={isMatch ?? true}
                          errorMessage="올바르지 않은 그룹 코드입니다."
                        />
                      </div>
                    ),
                  }
                : {
                    title: `${joinedStudyGroupName}에 가입하신 걸 환영해요!`,
                    content: <></>,
                  },
            ]
      }
      bottomButtons={getBottomButtons()}
    />
  );
}
