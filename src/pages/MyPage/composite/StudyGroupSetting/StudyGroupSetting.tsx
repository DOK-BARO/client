import { myPageTitleAtom, studyGroupAtom } from "@/store/myPageAtom";
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
import threeDot from "/public/assets/svg/myPage/threeDot.svg";
import useModal from "@/hooks/useModal";
import { TrashCan } from "@/svg/QuizWriteForm/TrashCan";
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
import ROUTES from "@/data/routes";
import useOutsideClick from "@/hooks/useOutsideClick";
import useUploadImageToStorage from "@/hooks/mutate/useUploadImage";
import defaultImage from "/public/assets/image/default-profile.png";
import { currentUserAtom, isLoggedInAtom } from "@/store/userAtom";
import { gray60 } from "@/styles/abstracts/colors";
// 스터디 그룹 관리
export default function StudyGroupSetting() {
  // TODO: 타이틀 세팅하는 로직 훅으로 분리하기

  const navigate = useNavigate();
  const [isLoggedIn] = useAtom(isLoggedInAtom);

  const { studyGroupId } = useParams();
  const studyGroupIdNumber = studyGroupId ? Number(studyGroupId) : undefined;
  const [currentUser] = useAtom(currentUserAtom);

  // TODO: 중복. 훅으로 분리
  const { data: studyGroupDetail, isLoading: isStudyGroupDetailLoading } =
    useQuery({
      queryKey: studyGroupKeys.detail(studyGroupIdNumber),
      queryFn: () =>
        studyGroupIdNumber
          ? studyGroupService.fetchStudyGroup(studyGroupIdNumber)
          : null,
      enabled: isLoggedIn && !!studyGroupIdNumber,
    });

  const [, setMyPageTitle] = useAtom(myPageTitleAtom);
  const [, setStudyGroup] = useAtom(studyGroupAtom);
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
  const buttonRef = useRef<HTMLButtonElement>(null);

  const {
    value: name,
    onChange: onNameChange,
    resetInput: resetNameInput,
  } = useInput(studyGroupDetail?.name ?? "");
  const {
    value: introduction,
    onChange: onIntroductionChange,
    resetTextarea: ResetIntroductionTextarea,
  } = useTextarea(studyGroupDetail?.introduction ?? "");

  useEffect(() => {
    if (studyGroupDetail) {
      resetNameInput(studyGroupDetail.name);
      ResetIntroductionTextarea(studyGroupDetail.introduction ?? "");

      setProfileImage({
        url: studyGroupDetail.profileImageUrl ?? defaultImage,
        file: null,
      });
    }
  }, [studyGroupDetail]);

  const defaultProfileState: ProfileImageState = {
    url: defaultImage,
    file: null,
  };

  const initialProfileState: ProfileImageState = {
    url: studyGroupDetail?.profileImageUrl ?? defaultImage,
    file: null,
  };

  const [profileImage, setProfileImage] =
    useState<ProfileImageState>(initialProfileState);

  useEffect(() => {
    if (
      name !== studyGroupDetail?.name ||
      introduction !== studyGroupDetail?.introduction
    ) {
      setIsInputChanged(true);
    } else {
      setIsInputChanged(false);
    }
    if (profileImage.file) {
      // console.log(profileImage.url, initialProfileImage.current);

      if (profileImage.url !== studyGroupDetail?.profileImageUrl) {
        setIsInputChanged(true);
      } else {
        setIsInputChanged(false);
      }
    }
  }, [name, introduction, profileImage.url]);

  const { uploadImage, isPending } = useUploadImageToStorage(
    (imageUrl: string) => {
      const newStudy: StudyGroupPostType = {
        name,
        introduction,
        profileImageUrl: imageUrl,
      };
      updateStudyGroup({ id: studyGroupIdNumber!, studyGroup: newStudy });
    },
    () => {
      // 이미지 업로드 실패시
      setProfileImage((prev) => ({
        ...prev,
        url: studyGroupDetail?.profileImageUrl ?? defaultImage,
      }));
    },
  );

  useEffect(() => {
    if (studyGroupDetail) {
      setMyPageTitle(studyGroupDetail.name);
      setStudyGroup({ id: studyGroupDetail.id, name: studyGroupDetail.name });
    }
    return () => {
      setMyPageTitle("마이페이지");
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

  useOutsideClick([modalRef, buttonRef], closeSmallModal);

  const handleDeleteStudyGroup = () => {
    if (!studyGroupDetail) {
      return;
    }
    deleteStudyGroup(studyGroupDetail.id);
  };

  const { mutate: deleteStudyGroup } = useMutation<void, ErrorType, number>({
    mutationFn: (id) => studyGroupService.deleteStudyGroup(id),
    onSuccess: () => {
      toast.success("스터디가 삭제되었습니다.");
      navigate(`${ROUTES.MY_PAGE}/${ROUTES.MY_STUDY_GROUPS}`);
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

    if (profileImage.file && profileImage.url !== initialProfileState.url) {
      // 이미지가 바뀌었을 경우
      uploadImage({
        image: profileImage.file,
        imageTarget: "STUDY_GROUP_PROFILE",
      });
    } else {
      // 이미지가 바뀌지 않았을 경우
      const newStudy: StudyGroupPostType = {
        name,
        introduction,
        profileImageUrl: profileImage.url,
      };

      updateStudyGroup({ id: studyGroupIdNumber!, studyGroup: newStudy });
    }
  };

  const handleDeleteStudyGroupClick = () => {
    openConfirmModal();
    closeSmallModal();
  };

  const isStudyGroupLeader =
    currentUser?.id !==
    studyGroupDetail?.studyMembers?.find((member) => member.role === "LEADER");

  useEffect(() => {
    if (!isStudyGroupLeader) {
      // TODO: 적절한 권한이 필요하다는 토스트 알람
      navigate(-1);
    }
  }, [isStudyGroupLeader]);

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
              onClick: handleDeleteStudyGroup,
            },
          ]}
        />
      ) : null}
      {/* TODO: 컴포넌트화 후 분리 */}
      <section>
        {/* 스터디 그룹 관리 */}
        <div className={styles["header-container"]}>
          <h3 className={styles.title}>스터디 그룹 관리</h3>
          <Button
            iconOnly
            icon={<img src={threeDot} width={16} height={16} />}
            onClick={handleToggle}
            ref={buttonRef}
          />

          {isSmallModalOpen ? (
            <div className={styles["small-modal-container"]} ref={modalRef}>
              <SmallModal
                onLabelClick={handleDeleteStudyGroupClick}
                icon={<TrashCan width={20} height={20} stroke={gray60} />}
                label="스터디 삭제"
              />
            </div>
          ) : null}
        </div>

        {!isStudyGroupDetailLoading && studyGroupDetail !== undefined ? (
          <div className={styles["edit-profile-container"]}>
            <div className={styles["edit-image-container"]}>
              <p className={styles["sub-title"]}>스터디 그룹 사진</p>
              <ProfileImageEditor
                isLoading={isPending}
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
        ) : null}
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
        onDeleteStudyGroupClick={openConfirmModal}
      />
    </section>
  );
}
