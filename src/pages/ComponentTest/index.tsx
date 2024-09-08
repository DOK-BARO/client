import SocialAuthButton from "../../components/composite/socialAuthButton";
import GNB from "../../components/layout/gnb.tsx";
import { AUTH_TYPES, SOCIAL_TYPES } from "../../data/constants.ts";
import Button from "../../components/atom/button.tsx";
import useGNB from "../../hooks/useGNB.ts";
import RadioButton from "../../components/atom/radioButton.tsx";
import useRadioGroup from "../../hooks/useRadioGroup.ts";
import { RadioOptions } from "../../types/RadioTypes.ts";
import AuthButton from "../../components/atom/authButton.tsx";
import styles from "../../styles/pages/_component_test.module.scss";
import useModal from "../../hooks/useModal.ts";
import Modal from "../../components/atom/modal.tsx";
import { getUser } from "../../services/authService.ts";
const options: RadioOptions[] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

export default function Index() {
  const { openGNB, closeGNB, isGNBOpen } = useGNB();
  const { selectedValue, handleChange } = useRadioGroup("");
  const { openModal, isModalOpen, closeModal } = useModal();

  return (
    <>
      <button onClick={getUser}>
        유저 데이터 가져오는 버튼
      </button>
      <RadioButton
        options={options}
        selectedValue={selectedValue}
        onChange={handleChange}
        correctOption={"option2"} // TODO: 채점 전엔 null, 답안이 오면 해당 답안으로 set
        isDisabled={false} // TODO 답안이 오면 true
      />

      <div style={{ display: "flex", gap: "10px" }}>
        {SOCIAL_TYPES.map((socialType) => (
          <div key={socialType}>
            {AUTH_TYPES.map((authType) => (
              <SocialAuthButton
                key={`${socialType}-${authType}`}
                authType={authType}
                socialType={socialType}
              />
            ))}
          </div>
        ))}
      </div>
      <Button size="large" onClick={isGNBOpen ? closeGNB : openGNB}>
        GNB {isGNBOpen ? "닫기" : "열기"}
      </Button>
      {isGNBOpen && <GNB />}
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <Button size="xsmall" onClick={() => {}}>
          button
        </Button>
        <Button size="small" onClick={() => {}}>
          button
        </Button>
        <Button size="medium" onClick={() => {}}>
          button
        </Button>
        <Button size="large" onClick={() => {}}>
          button
        </Button>
        <Button size="xlarge" onClick={() => {}}>
          button
        </Button>
      </div>
      <AuthButton onClick={() => {}} className={styles.done}>
        완료
      </AuthButton>
      <Button
        onClick={() => {
          console.log("open modal");
          openModal();
        }}
      >
        모달 열기
      </Button>
      {isModalOpen && (
        <Modal
          popUpTitle={"테스트 모달 제목"}
          contentTitle={"테스트 모달 콘텐츠 제목"}
          closeModal={closeModal}
        />
      )}
    </>
  );
}
