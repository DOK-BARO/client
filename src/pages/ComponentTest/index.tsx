import { AUTH_TYPES, SOCIAL_TYPES } from "@/data/constants.ts";
import useRadioGroup from "@/hooks/useRadioGroup.ts";
import { RadioOptionType } from "@/types/RadioTypes";
// import useModal from "@/hooks/useModal.ts";
import { useState } from "react";
import { Invisible } from "@/svg/Invisible";
import RadioOption from "@/components/atom/RadioOption/RadioOption";
import { gray60 } from "@/styles/abstracts/colors.ts";
import SocialAuthButton from "@/components/composite/SocialAuthButton/SocialAuthButton";
import Button from "@/components/atom/Button/Button";
// import Modal from "@/components/atom/modal/modal.tsx";
import Input from "@/components/atom/Input/Input";
import { useRef } from "react";
import { imageService } from "@/services/server/imageService";
import { ImageTargetType } from "@/types/UploadImageType";

const options: RadioOptionType[] = [
  { id: 1, value: "option1", label: "Option 1" },
  { id: 2, value: "option2", label: "Option 2" },
  { id: 3, value: "option3", label: "Option 3" },
];

export default function Index() {
  const { selectedValue, handleChange } = useRadioGroup("");
  // const { openModal, isModalOpen, closeModal } = useModal();
  const fileInputRef = useRef<HTMLInputElement | null>(null); // 파일 입력 참조

  const [inputValue, setInputValue] = useState<string>("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

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
    const uploadImgArg: {
      image: File;
      imageTarget: ImageTargetType;
    } = {
      image: img,
      imageTarget: "STUDY_GROUP_PROFILE",
    };

    await imageService.uploadImage(uploadImgArg);
  };
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
        <button onClick={handleUploadImg}>사진 업로드 버튼</button>
      </div>
      {/* <button onClick={authService.getUser}>유저 데이터 가져오는 버튼</button> */}
      {options.map((option: RadioOptionType) => {
        return (
          <RadioOption
            key={option.id}
            radioGroupName={"radio-group"}
            option={option}
            checked={selectedValue === option.value}
            onChange={handleChange}
            disabled={false}
            labelValue={option.label}
            type="option-correct"
          />
        );
      })}

      <div style={{ display: "flex", gap: "10px" }}>
        {SOCIAL_TYPES.map((socialType) => (
          <div key={socialType}>
            {AUTH_TYPES.map((authType) => (
              <SocialAuthButton
                key={`${socialType}-${authType}`}
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
      {/* <Button
        onClick={() => {
          console.log("open modal");
          openModal();
        }}
      >
        모달 열기
      </Button> */}
      {/* {isModalOpen && (
        <Modal
          popUpTitle={"테스트 모달 제목"}
          contentTitle={"테스트 모달 콘텐츠 제목"}
          closeModal={closeModal}
        />
      )} */}
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
