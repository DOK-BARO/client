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
import { useMutation } from "@tanstack/react-query";
import { ErrorType } from "@/types/ErrorType";
import { studyGroupService } from "@/services/server/studyGroupService";
import toast from "react-hot-toast";
import useModal from "@/hooks/useModal";
import defaultImage from "/public/assets/image/default-profile.png";
import StudyCodeShareModal from "../../components/StudyCodeShareModal/StudyCodeShareModal";

export default function MyStudyGroupsCreate() {
  const { isModalOpen, closeModal, openModal } = useModal();

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
      // 사진 업로드 실패시
      setProfileImage((prev) => ({
        ...prev,
        url: defaultImage,
      }));
    },
  );

  useEffect(() => {
    setMyPageTitle("스터디 만들기");
    return () => setMyPageTitle("마이페이지");
  }, []);

  // 새롭게 생성된 스터디 아이디
  const [newStudyGroupId, setNewStudyGroupId] = useState<number>();

  // 스터디 생성
  const { mutate: createStudyGroup } = useMutation<
    { id: number } | null,
    ErrorType,
    StudyGroupPostType
  >({
    mutationFn: (newStudy) => studyGroupService.createStudyGroup(newStudy),
    onSuccess: (data) => {
      toast.success("스터디가 생성되었습니다.");
      openModal();
      if (!data) return;
      setNewStudyGroupId(data.id);
    },
  });

  const handleCreateStudyGroup = () => {
    if (!name) {
      toast.error("스터디 이름을 입력해주세요.");
      return;
    }
    // 스터디 사진이 있는 경우
    if (profileImage.file) {
      const arg: UploadImageArgType = {
        image: profileImage.file,
        imageTarget: "STUDY_GROUP_PROFILE",
      };
      uploadImage(arg);
    } else {
      // 스터디 사진이 없는 경우
      const newStudy: StudyGroupPostType = {
        name,
        introduction,
      };
      createStudyGroup(newStudy);
    }
  };

  return (
    <div className={styles.container}>
      {isModalOpen && newStudyGroupId ? (
        <StudyCodeShareModal
          studyGroupId={newStudyGroupId}
          closeModal={closeModal}
        />
      ) : null}
      <div className={styles["sub-container"]}>
        <p className={styles["sub-title"]}>스터디 사진</p>
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
        <p className={styles["sub-title"]}>스터디 이름</p>
        <Input
          id="study-group-name"
          value={name}
          onChange={onNameChange}
          placeholder="스터디 이름을 입력해주세요."
          fullWidth
          maxLength={20}
          maxLengthShow
          label="스터디 이름"
          hideLabel
        />
      </div>
      <div className={styles["sub-container"]}>
        <p className={styles["sub-title"]}>스터디 소개</p>
        <Textarea
          rows={1}
          id="study-group-introduction"
          value={introduction}
          onChange={onIntroductionChange}
          placeholder="스터디 소개를 입력해주세요."
          fullWidth
          maxLength={50}
          maxLengthShow
          label="스터디 소개"
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
