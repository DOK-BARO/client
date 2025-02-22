import { useEffect, useState } from "react";
import { myPageTitleAtom } from "@/store/myPageAtom";
import { useAtom } from "jotai";
import styles from "../MyStudyGroupsJoin/_my_study_groups_join.module.scss";
import Button from "@/components/atom/Button/Button";
import ProfileImageEditor from "../../components/ProfileImageEditor/ProfileImageEditor";
import { ProfileImageState } from "@/pages/Register/composite/ProfileSet/ProfileSet";
import Input from "@/components/atom/Input/Input";
import Textarea from "@/components/atom/Textarea/Textarea";
import useInput from "@/hooks/useInput";
import useTextarea from "@/hooks/useTextarea";
import useUploadImageToStorage from "@/hooks/mutate/useUploadImage";
import { UploadImageArgType } from "@/types/UploadImageType";
import { StudyGroupPostType } from "@/types/StudyGroupType";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ErrorType } from "@/types/ErrorType";
import { studyGroupService } from "@/services/server/studyGroupService";
// import { queryClient } from "@/services/server/queryClient";
import toast from "react-hot-toast";
import { studyGroupKeys } from "@/data/queryKeys";
import useModal from "@/hooks/useModal";
import Modal from "@/components/atom/Modal/Modal";
import { Copy } from "@/svg/Copy";
import { primary } from "@/styles/abstracts/colors";
import defaultImage from "/public/assets/image/default-profile.png";
import { useNavigate } from "react-router-dom";
import { copyText } from "@/utils/copyText";
import { isLoggedInAtom } from "@/store/userAtom";

export default function MyStudyGroupsCreate() {
  const navigate = useNavigate();
  const { isModalOpen, closeModal, openModal } = useModal();
  const [isLoggedIn] = useAtom(isLoggedInAtom);

  const [, setMyPageTitle] = useAtom(myPageTitleAtom);
  const defaultProfileState: ProfileImageState = {
    url: defaultImage,
    file: null,
  };
  const [profileImage, setProfileImage] =
    useState<ProfileImageState>(defaultProfileState);
  const { value: name, onChange: onNameChange } = useInput("");
  const { value: introduction, onChange: onIntroductionChange } =
    useTextarea("");

  const { uploadImage, isPending } = useUploadImageToStorage(
    (imageUrl: string) => {
      // 스터디 생성
      const newStudy = {
        name,
        introduction,
        profileImageUrl: imageUrl,
      };
      createStudyGroup(newStudy);
    },
    () => {
      // 이미지 업로드 실패시
      setProfileImage((prev) => ({
        ...prev,
        url: defaultImage,
      }));
    },
  );

  useEffect(() => {
    setMyPageTitle("스터디 그룹 만들기");
    return () => setMyPageTitle("마이페이지");
  }, []);

  const handleDoneClick = () => {
    closeModal();
    navigate(-1);
  };

  // 새롭게 생성된 스터디그룹 아이디
  const [newStudyGroupId, setNewStudyGroupId] = useState<number>();

  // 스터디 생성
  const { mutate: createStudyGroup } = useMutation<
    { id: number } | null,
    ErrorType,
    StudyGroupPostType
  >({
    mutationFn: (newStudy) => studyGroupService.createStudyGroup(newStudy),
    onSuccess: (data) => {
      // queryClient.invalidateQueries({
      //   queryKey: studyGroupKeys.list({
      //     page: currentPage,
      //   }),
      // });
      toast.success("스터디가 생성되었습니다.");
      openModal();
      // setIsStudyCreated(true);
      if (!data) return;
      // console.log("새롭게 생성된 스터디 그룹 아이디", data.id);
      setNewStudyGroupId(data.id);
    },
  });

  // 스터디 그룹 생성 후 초대 코드를 가져오기 위함
  const { data: studyGroupDetail, isLoading: isStudyGroupDetailLoading } =
    useQuery({
      queryKey: studyGroupKeys.detail(newStudyGroupId),
      queryFn: () =>
        newStudyGroupId
          ? studyGroupService.fetchStudyGroup(newStudyGroupId)
          : null,
      enabled: isLoggedIn && !!newStudyGroupId,
    });

  const handleCreateStudyGroup = () => {
    if (!name) {
      toast.error("스터디 이름을 입력해주세요.");
      return;
    }
    // 스터디 그룹 사진이 있는 경우
    if (profileImage.file) {
      const arg: UploadImageArgType = {
        image: profileImage.file,
        imageTarget: "STUDY_GROUP_PROFILE",
      };
      uploadImage(arg);
    } else {
      // 스터디 그룹 사진이 없는 경우
      const newStudy: StudyGroupPostType = {
        name,
        introduction,
      };
      createStudyGroup(newStudy);
    }
  };

  const handleClickCopyCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonText =
      e.currentTarget.querySelector("#invite-code")?.textContent;
    if (buttonText) {
      copyText(buttonText);
    }
  };

  return (
    <div className={styles.container}>
      {isModalOpen ? (
        <Modal
          closeModal={closeModal}
          title="스터디 추가하기"
          contents={[
            {
              title: "스터디 초대코드를 초대하고 싶은 친구에게 보내세요.",
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
                    {!isStudyGroupDetailLoading && studyGroupDetail?.inviteCode}
                  </span>
                </Button>
              ),
            },
          ]}
          bottomButtons={[
            {
              text: "완료",
              color: "primary",
              onClick: handleDoneClick,
            },
          ]}
        />
      ) : null}
      <div className={styles["sub-container"]}>
        <p className={styles["sub-title"]}>스터디 그룹 사진</p>
        <ProfileImageEditor
          isLoading={isPending}
          width={150}
          profileImage={profileImage}
          setProfileImage={setProfileImage}
          initialImageState={defaultProfileState}
          isDeletable
          deleteButtonDisabled={profileImage.url === defaultImage}
        />
      </div>
      <div className={styles["sub-container"]}>
        <p className={styles["sub-title"]}>스터디 그룹 이름</p>
        <Input
          id="study-group-name"
          value={name}
          onChange={onNameChange}
          placeholder="스터디 그룹 이름을 입력해주세요."
          fullWidth
          maxLength={20}
          maxLengthShow
        />
      </div>
      <div className={styles["sub-container"]}>
        <p className={styles["sub-title"]}>스터디 그룹 소개</p>
        <Textarea
          rows={1}
          id="study-group-introduction"
          value={introduction}
          onChange={onIntroductionChange}
          placeholder="스터디 그룹 소개를 입력해주세요."
          fullWidth
          maxLength={50}
          maxLengthShow
        />
      </div>
      <Button
        className={`${styles.done} ${styles["right-end"]}`}
        color="primary"
        onClick={handleCreateStudyGroup}
        disabled={!name}
      >
        완료
      </Button>
    </div>
  );
}
