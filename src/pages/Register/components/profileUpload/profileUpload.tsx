import React from "react";
import styles from "./_profile_upload.module.scss";
import { InfoFilled } from "@/svg/infoFilled.tsx";
import { gray40, gray60 } from "@/styles/abstracts/colors.ts";
import Button from "@/components/atom/button/button.tsx";

export default function ProfileUpload({
  email,
  profileImage,
  setProfileImage,
  defaultImagePath,
  setProfileImageFile,
}: {
  email: string;
  profileImage: string;
  setProfileImage: React.Dispatch<React.SetStateAction<string>>;
  defaultImagePath: string;
  setProfileImageFile: (file: Blob) => void;
}) {
  const onDeleteProfileImage = () => {
    setProfileImage(defaultImagePath);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setProfileImage(reader.result as string);
        console.log("filE: %o:",file);
        setProfileImageFile(file);
      };
    }
  };

  return (
    <div className={styles["profile-upload-container"]}>
      <div className={styles["profile-email-container"]}>
        <div className={styles["custom-file-upload"]}>
          <img
            src={profileImage}
            alt="프로필 이미지"
            className={styles["profile-image"]}
          />
        </div>
        <span>
          <p className={styles.email} aria-label="사용자 이메일">
            {email}
          </p>
          <InfoFilled stroke={gray60} fill={gray40} width={24} />
        </span>
      </div>

      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{ display: "none" }}
      />
      <div className={styles["button-container"]}>
        <Button
          color="white"
          id="edit-profile"
          fullWidth
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          이미지 편집
        </Button>
        <Button
          color="white"
          fullWidth
          id="delete-profile"
          onClick={onDeleteProfileImage}
        >
          이미지 삭제
        </Button>
      </div>
    </div>
  );
}
