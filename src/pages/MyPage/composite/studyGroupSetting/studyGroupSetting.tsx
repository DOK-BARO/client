import {
  isStudyGroupSettingPageAtom,
  myPageTitleAtom,
  studyGroupAtom,
} from "@/store/myPageAtom";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import styles from "./_study_group_setting.module.scss";
import ProfileImageEditor from "../../components/profileImageEditor/profileImageEditor";
import { ProfileImageState } from "@/pages/Register/composite/profileSet/profileSet";
import Input from "@/components/atom/input/input";
import Textarea from "@/components/atom/textarea/textarea";
import useInput from "@/hooks/useInput";
import useTextarea from "@/hooks/useTextarea";
import Button from "@/components/atom/button/button";
import StudyMemberList from "../studyMemberList/studyMemberList";
import threeDot from "/public/assets/svg/myPage/three-dot.svg";

// 스터디 그룹 관리
export default function StudyGroupSetting() {
  // TODO: 타이틀 세팅하는 로직 훅으로 분리하기
  const [, setMyPageTitle] = useAtom(myPageTitleAtom);
  const [studyGroup] = useAtom(studyGroupAtom);
  const [, setIsStudyGroupSettingPage] = useAtom(isStudyGroupSettingPageAtom);
  const defaultImagePath = "/public/assets/image/default-profile.png";
  const [isInputChanged, setIsInputChanged] = useState<boolean>(false);

  const { value: name, onChange: onNameChange } = useInput("");
  const { value: introduction, onChange: onIntroductionChange } =
    useTextarea("");

  useEffect(() => {
    if (name || introduction) {
      setIsInputChanged(true);
    } else {
      setIsInputChanged(false);
    }
  }, [name, introduction]);

  const defaultProfileState: ProfileImageState = {
    url: defaultImagePath,
    file: null,
  };
  const [profileImage, setProfileImage] =
    useState<ProfileImageState>(defaultProfileState);

  useEffect(() => {
    if (studyGroup) {
      setMyPageTitle(studyGroup.name);
      setIsStudyGroupSettingPage(true);
    }
    return () => {
      setMyPageTitle("마이페이지");
      setIsStudyGroupSettingPage(false);
    };
  }, [studyGroup]);

  return (
    <section className={styles.container}>
      {/* TODO: 컴포넌트화 후 분리 */}
      <section>
        {/* 스터디 그룹 관리 */}
        <div className={styles["header-container"]}>
          <h3 className={styles.title}>스터디 그룹 관리</h3>
          <Button
            iconOnly
            icon={<img src={threeDot} width={16} height={16} />}
            onClick={() => {}}
          />
        </div>
        <div className={styles["edit-profile-container"]}>
          <div className={styles["edit-image-container"]}>
            <p className={styles["sub-title"]}>스터디 그룹 사진</p>
            <ProfileImageEditor
              width={150}
              profileImage={profileImage}
              setProfileImage={setProfileImage}
              initialImageState={defaultProfileState}
              isDeletable
            />
          </div>
          <div className={styles["edit-info-container"]}>
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
            <p className={styles["sub-title"]}>스터디 그룹 소개</p>
            <Textarea
              id="study-group-introduction"
              value={introduction}
              onChange={onIntroductionChange}
              placeholder="스터디 그룹 소개를 입력해주세요."
              fullWidth
              maxLength={20}
              maxLengthShow
            />
          </div>
        </div>
        {isInputChanged ? (
          <Button className={styles.save} color="primary">
            변경사항 저장
          </Button>
        ) : null}
      </section>

      {/* 스터디원 관리 */}
      <StudyMemberList studyGroupId={studyGroup?.id} />
    </section>
  );
}
