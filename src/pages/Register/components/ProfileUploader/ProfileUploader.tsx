import React from "react";
import styles from "./_profile_uploader.module.scss";
import { InfoFilled } from "@/svg/InfoFilled";
import { gray40, gray60 } from "@/styles/abstracts/colors.ts";
import Button from "@/components/atom/Button/Button";
import { ProfileImageState } from "../../composite/ProfileSet/ProfileSet";
interface Props {
  email: string;
  profileImage: ProfileImageState;
  setProfileImage: React.Dispatch<React.SetStateAction<ProfileImageState>>;
  defaultImageUrl: string;
}
export default function ProfileUploader({
  email,
  profileImage,
  setProfileImage,
  defaultImageUrl,
}: Props) {
  const onDeleteProfileImage = () => {
    setProfileImage({
      url: defaultImageUrl,
      file: null,
    });
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage({
          url: reader.result as string,
          file: file,
        });
      };
      reader.readAsDataURL(file);
    }
    event.target.value = "";
  };

  return (
    <div className={styles["profile-upload-container"]}>
      <div className={styles["profile-email-container"]}>
        <div className={styles["custom-file-upload"]}>
          <img
            src={profileImage.url}
            alt="프로필 이미지"
            className={styles["profile-image"]}
          />
        </div>
        <span>
          <p className={styles.email} aria-label="사용자 이메일">
            {email}
          </p>
          <InfoFilled stroke={gray60} fill={gray40} width={24} alt="" />
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
