import React, { useState } from "react";
import styles from "../../../styles/components/_profile_upload.module.scss";
import { InfoFilled } from "../../../../public/assets/svg/infoFilled";
import { gray40, gray60 } from "../../../styles/abstracts/colors";
import Button from "../../../components/atom/button";

export default function ProfileUpload() {
  const defaultImagePath = "/public/assets/image/default-profile.png";
  const [imageSrc, setImageSrc] = useState<string>(defaultImagePath);

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
        <img src={imageSrc} alt="Profile" className={styles["profile-image"]} />
      </div>
      <div className={styles["profile-edit-container"]}>
        <span>
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
