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

export default function MyStudyGroupsCreate() {
  const defaultImagePath = "/public/assets/image/default-profile.png";
  const [, setMyPageTitle] = useAtom(myPageTitleAtom);
  const defaultProfileState: ProfileImageState = {
    url: defaultImagePath,
    file: null,
  };
  const [profileImage, setProfileImage] =
    useState<ProfileImageState>(defaultProfileState);
  const { value: name, onChange: onNameChange } = useInput("");
  const { value: introduction, onChange: onIntroductionChange } =
    useTextarea("");

  useEffect(() => {
    setMyPageTitle("스터디 그룹 만들기");
    return () => setMyPageTitle("마이페이지");
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles["sub-container"]}>
        <p className={styles["sub-title"]}>스터디 그룹 사진</p>
        <ProfileImageEditor
          width={150}
          profileImage={profileImage}
          setProfileImage={setProfileImage}
          initialImageState={defaultProfileState}
          isDeletable
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
      >
        완료
      </Button>
    </div>
  );
}
