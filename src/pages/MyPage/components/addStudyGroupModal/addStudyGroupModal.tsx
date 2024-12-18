import Modal from "@/components/atom/modal/modal";
import Input from "@/components/atom/input/input";
import ProfileImageEditor from "../profileImageEditor/profileImageEditor";
import useInput from "@/hooks/useInput";

interface Props {
  closeModal: () => void;
}

export default function AddStudyGroupModal({ closeModal }: Props) {
  const { value: name, onChange: onNameChange } = useInput("");
  const { value: description, onChange: onDescriptionChange } = useInput("");
  return (
    <Modal
      closeModal={closeModal}
      title="스터디 그룹 추가하기"
      contents={[
        {
          title: "스터디 그룹 사진",
          content: <ProfileImageEditor width={150} />,
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
              id="study-group-description"
              placeholder="짧은 소개를 써주세요."
              value={description}
              onChange={onDescriptionChange}
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
          handleClick: closeModal,
        },
      ]}
    />
  );
}
