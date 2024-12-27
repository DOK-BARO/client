import {
  isStudyGroupSettingPageAtom,
  myPageTitleAtom,
  studyGroupAtom,
} from "@/store/myPageAtom";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
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
import useModal from "@/hooks/useModal";
import trashCan from "/public/assets/svg/myPage/trash-can-bigger.svg";
import SmallModal from "@/components/atom/smallModal/smallModal";
import { useMutation } from "@tanstack/react-query";
import { ErrorType } from "@/types/ErrorType";
import { studyGroupService } from "@/services/server/studyGroupService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Modal from "@/components/atom/modal/modal";

// 스터디 그룹 관리
export default function StudyGroupSetting() {
  // TODO: 타이틀 세팅하는 로직 훅으로 분리하기
  const navigate = useNavigate();
  const [, setMyPageTitle] = useAtom(myPageTitleAtom);
  const [studyGroup] = useAtom(studyGroupAtom);
  const [, setIsStudyGroupSettingPage] = useAtom(isStudyGroupSettingPageAtom);
  const defaultImagePath = "/public/assets/image/default-profile.png";
  const [isInputChanged, setIsInputChanged] = useState<boolean>(false);
  const {
    isModalOpen: isSmallModalOpen,
    openModal: openSmallModal,
    closeModal: closeSmallModal,
  } = useModal();

  // 삭제 확인 모달
  const {
    isModalOpen: isDeleteConfirmModal,
    openModal: openConfirmModal,
    closeModal: closeConfirmModal,
  } = useModal();

  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

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

  // 작은 모달 토글
  const handleToggle = () => {
    if (isSmallModalOpen) {
      closeSmallModal();
    } else {
      openSmallModal();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalRef.current?.contains(e.target as Node) ||
        buttonRef.current?.contains(e.target as Node)
      ) {
        return;
      }
      closeSmallModal();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDeleteStudyGroup = () => {
    console.log("스터디 삭제");
    if (!studyGroup) {
      return;
    }
    deleteStudyGroup(studyGroup.id);
  };

  const { mutate: deleteStudyGroup } = useMutation<void, ErrorType, number>({
    mutationFn: (id) => studyGroupService.deleteStudyGroup(id),
    onSuccess: () => {
      toast.success("스터디를 삭제했습니다.");
      navigate("/my/study-groups");
    },
  });

  return (
    <section className={styles.container}>
      {isDeleteConfirmModal ? (
        <Modal
          width={560}
          closeModal={closeConfirmModal}
          contents={[
            {
              title: `${studyGroup?.name} 스터디 그룹을 삭제하시겠어요?`,
              content: (
                <p>
                  스터디에서 만든 퀴즈, 푼 퀴즈 등의 데이터는 모두 삭제되며,
                  복구가 불가능합니다.
                </p>
              ),
            },
          ]}
          bottomButtons={[
            {
              text: "삭제하기",
              color: "red",
              handleClick: handleDeleteStudyGroup,
            },
          ]}
        />
      ) : null}
      {/* TODO: 컴포넌트화 후 분리 */}
      <section>
        {/* 스터디 그룹 관리 */}
        <div className={styles["header-container"]}>
          <h3 className={styles.title}>스터디 그룹 관리</h3>
          <div ref={buttonRef}>
            <Button
              iconOnly
              icon={<img src={threeDot} width={16} height={16} />}
              onClick={handleToggle}
            />
          </div>

          {isSmallModalOpen ? (
            <div className={styles["small-modal-container"]} ref={modalRef}>
              <SmallModal
                handleLabelClick={openConfirmModal}
                icon={<img src={trashCan} width={20} height={20} />}
                label="스터디 삭제"
              />
            </div>
          ) : null}
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
