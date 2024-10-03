import { AUTH_TYPES, SOCIAL_TYPES } from "@/data/constants.ts";
import useGNB from "@/hooks/useGNB.ts";
import useRadioGroup from "@/hooks/useRadioGroup.ts";
import { RadioOptions } from "@/types/RadioTypes.ts";
import styles from "./_component_test.module.scss";
import useModal from "@/hooks/useModal.ts";
import { getUser } from "@/services/server/authService.ts";
import { useState } from "react";
import { Invisible } from "@/svg/invisible.tsx";
import { gray60 } from "@/styles/abstracts/colors.ts";
import RadioButton from "@/components/atom/radioButton/radioButton.tsx";
import SocialAuthButton from "@/components/composite/socialAuthButton/socialAuthButton.tsx";
import Button from "@/components/atom/button/button.tsx";
import GNB from "@/components/layout/gnb/gnb.tsx";
import AuthButton from "@/components/atom/authButton/authButton.tsx";
import Modal from "@/components/atom/modal/modal.tsx";
import Input from "@/components/atom/input/input.tsx";

const options: RadioOptions[] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

export default function Index() {
  const { openGNB, closeGNB, isGNBOpen } = useGNB();
  const { selectedValue, handleChange } = useRadioGroup("");
  const { openModal, isModalOpen, closeModal } = useModal();

  const [inputValue, setInputValue] = useState<string>("");

  return (
    <>
      <button onClick={getUser}>유저 데이터 가져오는 버튼</button>
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
      <Input
        size="small"
        id="component-test"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        placeholder="플레이스홀더"
        label="설명 레이블"
        message="대소문자 어쩌구"
        leftIcon={<Invisible stroke={gray60} width={20} />}
        rightIcon={<Invisible stroke={gray60} width={20} />}
      />
      <Input
        size="medium"
        id="component-test2"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        placeholder="플레이스홀더"
        label="설명 레이블"
        message="대소문자 어쩌구"
        leftIcon={<Invisible stroke={gray60} width={24} />}
        rightIcon={<Invisible stroke={gray60} width={24} />}
      />
      <Input
        size="large"
        id="component-test2"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        placeholder="플레이스홀더"
        label="설명 레이블"
        message="대소문자 어쩌구"
        leftIcon={<Invisible stroke={gray60} width={24} />}
        rightIcon={<Invisible stroke={gray60} width={24} />}
      />
    </>
  );
}
