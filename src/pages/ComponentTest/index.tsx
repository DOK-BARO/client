import { AUTH_TYPES, SOCIAL_TYPES } from "@/data/constants.ts";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import useRadioGroup from "@/hooks/useRadioGroup.ts";
import { RadioOptionType } from "@/types/RadioTypes";
import useModal from "@/hooks/useModal.ts";
import { useState } from "react";
import { Invisible } from "@/svg/invisible.tsx";
import RadioOption from "@/components/atom/radioOption/radioOption";
import {
  gray60,
  systemDanger,
  systemSuccess,
} from "@/styles/abstracts/colors.ts";
import SocialAuthButton from "@/components/composite/socialAuthButton/socialAuthButton.tsx";
import Button from "@/components/atom/button/button.tsx";
import Modal from "@/components/atom/modal/modal.tsx";
import Input from "@/components/atom/input/input.tsx";
import { useRef } from "react";
import { uploadImage } from "@/services/server/imageService";
import { authService } from "@/services/server/authService";

const options: RadioOptionType[] = [
  { id: 1, value: "option1", label: "Option 1" },
  { id: 2, value: "option2", label: "Option 2" },
  { id: 3, value: "option3", label: "Option 3" },
];

export default function Index() {
  const { selectedValue, handleChange } = useRadioGroup("");
  const { openModal, isModalOpen, closeModal } = useModal();
  const fileInputRef = useRef<HTMLInputElement | null>(null); // 파일 입력 참조

  const [inputValue, setInputValue] = useState<string>("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const getClassNameAndIcon = (optionValue: string, correctOption?: string) => {
    // TODO: currentOption : 채점 전엔 null, 답안이 오면 해당 답안으로 set
    const isCorrect = correctOption === optionValue; // 정답인 항목
    const isSelected = selectedValue === optionValue; // 선택된 항목

    // 선택된 항목의 경우 정답 or 오답에 따른 분기 스타일링
    if (isSelected) {
      return {
        className: isCorrect
          ? "radio-button-item-corrected"
          : "radio-button-item-wrong",
        icon: isCorrect ? (
          <CheckIcon style={{ color: systemSuccess }} />
        ) : (
          <CloseIcon style={{ color: systemDanger }} />
        ),
      };
    }
    // 선택되지 않은 항목이라면 따로 스타일링 x
    return { className: "radio-button-item", icon: null };
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    fileInputRef.current?.click();

    const files = event.target.files;
    if (files) {
      const newImagesFile: File[] = Array.from(files);
      setSelectedImages((prev) => [...prev, ...newImagesFile]);
    }
  };

  const handleUploadImg = async () => {
    const img: File = selectedImages[0];
    const uploadImgArg: { image: File, imageTarget: "MEMBER_PROFILE" | "STUDY_GROUP_PROFILE" } = {
      image: img,
      imageTarget: "STUDY_GROUP_PROFILE"
    };

    await uploadImage(uploadImgArg);
  }
  return (
    <>
      {/* <GNB /> */}
      <div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          multiple
        />
        <button onClick={handleUploadImg}>이미지 업로드 버튼</button>
      </div>
      <button onClick={authService.getUser}>유저 데이터 가져오는 버튼</button>
      {options.map((option: RadioOptionType) => {
        const { className, icon } = getClassNameAndIcon(
          option.value,
          "option2"
        );

        return (
          <RadioOption
            key={option.id}
            radioGroupName={"radio-group"}
            option={option}
            selectedValue={selectedValue}
            onChange={handleChange}
            disabled={false} // TODO 답안이 오면 true
            className={className}
            autoFocus={false}
					labelValue={inputValue}
					type="option-correct" // TODO:로직 작성 필요
          />
        );
      })}

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
      <span style={{ display: "flex", gap: "10px" }}>
        <Button color="primary" size="medium" onClick={() => {}}>
          button
        </Button>
        <Button color="secondary" size="medium" onClick={() => {}}>
          button
        </Button>
        <Button color="primary-border" size="medium" onClick={() => {}}>
          button
        </Button>
        <Button color="black" size="medium" onClick={() => {}}>
          button
        </Button>
        <Button color="white" size="medium" onClick={() => {}}>
          button
        </Button>
        <Button color="transparent" size="medium" onClick={() => {}}>
          button
        </Button>
        <Button color="primary" size="medium" disabled onClick={() => {}}>
          disabled button
        </Button>
      </span>
      <div
        style={{ margin: "20px 0", width: "390px", background: "lightGray" }}
      >
        <Button fullWidth color="primary" size="medium" onClick={() => {}}>
          button fullWidth
        </Button>
        <Button color="white" size="medium" onClick={() => {}}>
          button
        </Button>
      </div>
      <div
        style={{
          margin: "20px 0",
          width: "390px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Input
          color="black"
          id="input-test"
          fullWidth={true}
          placeholder="placeholder"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          message={"message"}
        />
        <Input
          color="default"
          id="input-test"
          fullWidth={false}
          placeholder="placeholder"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          message={"message"}
        />
        <Input
          isSuccess
          id="input-test"
          fullWidth={false}
          placeholder="placeholder"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          message={"message"}
        />
        <Input
          isError
          id="input-test"
          fullWidth={false}
          placeholder="placeholder"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          message={"message"}
        />
        <Input
          color="primary"
          id="input-test"
          fullWidth={false}
          placeholder="placeholder"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          message={"message"}
        />
      </div>
    </>
  );
}
