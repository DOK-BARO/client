// import Button from "../../components/atom/button";
import Input from "../../components/atom/input";
import Textarea from "../../components/atom/textarea";
import useModal from "../../hooks/useModal.tsx";
import Modal from "../../components/atom/modal.tsx";
import GNB from "../../components/layout/gnb.tsx";
import { navCategories } from "../../data/navCategories.ts";
import Button from "../../components/atom/button.tsx";
import { useState } from "react";
import useInput from "../../hooks/useInput.tsx";
import useTextarea from "../../hooks/useTextarea.tsx";
// import Dropdown from "../../components/atom/dropdown";

export default function Index() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const inputProps = useInput("");
  const textareaProps = useTextarea("");

  const [isGNBOpen, setIsGNBOpen] = useState<boolean>(); // 시험용

  return (
    <>
      Home
      <div style={{ display: "flex", gap: "30px", marginTop: "400px" }}>
        <Input
          id="input"
          {...inputProps}
          message="메시지 내용"
          isError={false}
          size="small"
          // disabled
          placeholder="플레이스홀더"
        ></Input>
        <Textarea
          id="textarea"
          {...textareaProps}
          // disabled
          placeholder="플레이스홀더"
          isError={false}
          message="메시지 내용"
        ></Textarea>
      </div>
      <Button size="large" onClick={openModal}>
        팝업 열기
      </Button>
      {isModalOpen && (
        <Modal
          popUpTitle="팝업 타이틀"
          contentTitle="내용 타이틀"
          content="대화상자는 사용자에게 작업에대해 알리고 중요한 정보를~"
          closeModal={closeModal}
        />
      )}
      <Button
        size="large"
        onClick={() => {
          setIsGNBOpen(!isGNBOpen);
        }}
      >
        GNB {isGNBOpen ? "닫기" : "열기"}
      </Button>
      {isGNBOpen && <GNB categories={navCategories}></GNB>}
    </>
  );
}
