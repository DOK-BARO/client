import {
  isStudyGroupSettingPageAtom,
  myPageTitleAtom,
} from "@/store/myPageAtom";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import styles from "./_study_group_setting.module.scss";
import ProfileImageEditor from "../../components/ProfileImageEditor/ProfileImageEditor";
import { ProfileImageState } from "@/pages/Register/composite/ProfileSet/ProfileSet";
import Input from "@/components/atom/Input/Input";
import Textarea from "@/components/atom/Textarea/Textarea";
import useInput from "@/hooks/useInput";
import useTextarea from "@/hooks/useTextarea";
import Button from "@/components/atom/Button/Button";
import StudyMemberList from "../StudyMemberList/StudyMemberList";
import threeDot from "/public/assets/svg/myPage/three-dot.svg";
import useModal from "@/hooks/useModal";
import trashCan from "/public/assets/svg/myPage/trash-can-bigger.svg";
import SmallModal from "@/components/atom/SmallModal/SmallModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ErrorType } from "@/types/ErrorType";
import { studyGroupService } from "@/services/server/studyGroupService";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "@/components/atom/Modal/Modal";
import { studyGroupKeys } from "@/data/queryKeys";
import { StudyGroupPostType } from "@/types/StudyGroupType";
import { queryClient } from "@/services/server/queryClient";
import { UploadImageArgType } from "@/types/UploadImageType";
import { imageService } from "@/services/server/imageService";

// 스터디 그룹 관리
export default function StudyGroupSetting() {
  // TODO: 타이틀 세팅하는 로직 훅으로 분리하기
  const navigate = useNavigate();
  const { studyGroupId } = useParams();
  const studyGroupIdNumber = studyGroupId ? Number(studyGroupId) : undefined;

  const { data: studyGroupDetail } = useQuery({
    queryKey: studyGroupKeys.detail(studyGroupIdNumber),
    queryFn: () =>
      studyGroupIdNumber
        ? studyGroupService.fetchStudyGroup(studyGroupIdNumber)
        : null,
    enabled: !!studyGroupIdNumber,
  });

  const [, setMyPageTitle] = useAtom(myPageTitleAtom);
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

  const { value: name, onChange: onNameChange } = useInput(
    studyGroupDetail?.name ?? ""
  );
  const { value: introduction, onChange: onIntroductionChange } = useTextarea(
    studyGroupDetail?.introduction ?? ""
  );

  useEffect(() => {
    if (studyGroupDetail) {
      initialName.current = studyGroupDetail.name ?? "";
      initialIntroduction.current = studyGroupDetail.introduction ?? "";

      if (studyGroupDetail.profileImageUrl) {
        const fileName = studyGroupDetail.profileImageUrl.split("/").pop();
        initialProfileImage.current = fileName ?? "";
      }
    }
  }, [studyGroupDetail]);

  const initialName = useRef(studyGroupDetail?.name ?? "");
  const initialIntroduction = useRef(studyGroupDetail?.introduction ?? "");
  const initialProfileImage = useRef(studyGroupDetail?.profileImageUrl ?? "");

  const defaultProfileState: ProfileImageState = {
    url: defaultImagePath,
    file: null,
  };

  const initialProfileState: ProfileImageState = {
    url: studyGroupDetail?.profileImageUrl ?? defaultImagePath,
    file: null,
  };

  const [profileImage, setProfileImage] =
    useState<ProfileImageState>(initialProfileState);

  useEffect(() => {
    if (
      name !== initialName.current ||
      introduction !== initialIntroduction.current
    ) {
      setIsInputChanged(true);
    } else {
      setIsInputChanged(false);
    }
    if (profileImage.file) {
      console.log(profileImage.url, initialProfileImage.current);

      if (
        profileImage.url.split("/").pop() !==
        initialProfileImage.current.split("/").pop()
      ) {
        setIsInputChanged(true);
      } else {
        setIsInputChanged(false);
      }
    }
  }, [name, introduction, profileImage.url]);

  // 이미지 업로드
  const { mutate: uploadImage } = useMutation<
    string,
    ErrorType,
    UploadImageArgType
  >({
    mutationFn: (uploadImageArg) => imageService.uploadImage(uploadImageArg),
    onSuccess: (imageUrl) => {
      const newStudy: StudyGroupPostType = {
        name,
        introduction,
        profileImageUrl: imageUrl,
      };

      updateStudyGroup({ id: studyGroupIdNumber!, studyGroup: newStudy });
    },
  });

  useEffect(() => {
    if (studyGroupDetail) {
      setMyPageTitle(studyGroupDetail.name);
      setIsStudyGroupSettingPage(true);
    }
    return () => {
      setMyPageTitle("마이페이지");
      setIsStudyGroupSettingPage(false);
    };
  }, [studyGroupDetail]);

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
    if (!studyGroupDetail) {
      return;
    }
    deleteStudyGroup(studyGroupDetail.id);
  };

  const { mutate: deleteStudyGroup } = useMutation<void, ErrorType, number>({
    mutationFn: (id) => studyGroupService.deleteStudyGroup(id),
    onSuccess: () => {
      toast.success("스터디를 삭제했습니다.");
      navigate("/my/study-groups");
    },
  });

  const { mutate: updateStudyGroup } = useMutation<
    void,
    ErrorType,
    { id: number; studyGroup: StudyGroupPostType }
  >({
    mutationFn: ({ id, studyGroup }) =>
      studyGroupService.updateStudyGroup({
        id,
        studyGroup,
      }),
    onSuccess: () => {
      // 쿼리 데이터 무효화: 보통 데이터가 업데이트된 후, 화면에 표시된 데이터를 최신 상태로 유지하기 위해 사용됨
      queryClient.invalidateQueries({
        queryKey: studyGroupKeys.detail(studyGroupIdNumber),
        exact: true,
      });
      toast.success("스터디 정보가 수정되었습니다.");
      setIsInputChanged(false);
    },
  });

  const handleUpdateStudyGroup = () => {
    if (studyGroupIdNumber === undefined || !studyGroupDetail?.name) {
      return;
    }

    if (profileImage.file) {
      uploadImage({
        image: profileImage.file,
        imageTarget: "STUDY_GROUP_PROFILE",
      });
    } else {
      const newStudy: StudyGroupPostType = {
        name,
        introduction,
      };

      updateStudyGroup({ id: studyGroupIdNumber!, studyGroup: newStudy });
    }
  };

  return (
    <section className={styles.container}>
      {isDeleteConfirmModal ? (
        <Modal
          width={560}
          closeModal={closeConfirmModal}
          contents={[
            {
              title: `${studyGroupDetail?.name} 스터디 그룹을 삭제하시겠어요?`,
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
              maxLength={50}
              maxLengthShow
            />
          </div>
        </div>
        {isInputChanged ? (
          <Button
            className={styles.save}
            color="primary"
            onClick={handleUpdateStudyGroup}
          >
            변경사항 저장
          </Button>
        ) : null}
      </section>

      {/* 스터디원 관리 */}
      <StudyMemberList
        studyGroupId={studyGroupDetail?.id}
        handleDeleteStudyGroupClick={openConfirmModal}
      />
    </section>
  );
}
