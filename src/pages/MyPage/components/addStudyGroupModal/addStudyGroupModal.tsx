import Modal from "@/components/atom/modal/modal";
import Input from "@/components/atom/input/input";
import ProfileImageEditor from "../profileImageEditor/profileImageEditor";
import useInput from "@/hooks/useInput";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ErrorType } from "@/types/ErrorType";
import { studyGroupService } from "@/services/server/studyGroupService";
import toast from "react-hot-toast";
import { StudyGroupCreationType } from "@/types/StudyGroupType";

interface Props {
  closeModal: () => void;
}

export default function AddStudyGroupModal({ closeModal }: Props) {
  const { value: name, onChange: onNameChange } = useInput("");
  const { value: introduction, onChange: onIntroductionChange } = useInput("");
  // TODO: 이미지 업로드하기
  const [profileImage, setProfileImage] = useState<string[]>([]);

  const { mutate: createStudyGroup } = useMutation<
    { id: number } | null,
    ErrorType,
    StudyGroupCreationType
  >({
    mutationFn: (newStudy) => studyGroupService.createStudyGroup(newStudy),
    onSuccess: (data) => {
      toast.success("스터디가 생성되었습니다.");
      if (!data) return;
      console.log("새롭게 생성된 스터디 그룹 아이디", data.id);
    },
  });

  useEffect(() => {
    console.log(profileImage);
  }, [profileImage]);

  const handleCreateStudyGroup = () => {
    const newStudy = {
      name,
      profileImage,
      introduction,
    };
    // createStudyGroup(newStudy);
  };

  return (
    <Modal
      closeModal={closeModal}
      title="스터디 그룹 추가하기"
      contents={[
        {
          title: "스터디 그룹 사진",
          content: (
            <ProfileImageEditor
              width={150}
              profileImage={profileImage}
              setProfileImage={setProfileImage}
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
            />
          ),
        },
        {
          title: "스터디 그룹 소개",
          content: (
            <Input
              id="study-group-introduction"
              placeholder="짧은 소개를 써주세요."
              value={introduction}
              onChange={onIntroductionChange}
            />
          ),
        },
      ]}
      bottomButtons={[
        {
          text: "코드로 참여하기",
          color: "primary-border",
          handleClick: () => {},
        },
        {
          text: "완료",
          color: "primary",
          handleClick: handleCreateStudyGroup,
        },
      ]}
    />
  );
}
