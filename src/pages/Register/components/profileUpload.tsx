import React from "react";
import styles from "../../../styles/components/_profile_upload.module.scss";
import { InfoFilled } from "../../../../public/assets/svg/infoFilled";
import { gray40, gray60 } from "../../../styles/abstracts/colors";
import Button from "../../../components/atom/button";

export default function ProfileUpload({
  imageSrc,
  setImageSrc,
  defaultImagePath,
}: {
  imageSrc: string;
  setImageSrc: React.Dispatch<React.SetStateAction<string>>;
  defaultImagePath: string;
}) {
  const onDeleteProfileImage = () => {
    setImageSrc(defaultImagePath);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles["profile-upload-container"]}>
      <div className={styles["custom-file-upload"]}>
        <img
          src={imageSrc}
          alt="프로필 이미지"
          className={styles["profile-image"]}
        />
      </div>
      <div className={styles["profile-edit-container"]}>
        <span>
          {/* TODO: 현재 로그인한 사용자 이메일 계정 가져와서 적용하기 */}
          <p>이메일@gmail.com</p>
          <InfoFilled stroke={gray60} fill={gray40} width={24} />
        </span>

        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{ display: "none" }}
        />
        <div className={styles["button-container"]}>
          <Button
            id="edit-profile"
            className={styles["upload-btn"]}
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            편집
          </Button>
          <Button id="delete-profile" onClick={onDeleteProfileImage}>
            이미지 삭제
          </Button>
        </div>
      </div>
    </div>
  );
}
