import React, { useRef } from "react";
import styles from "./_profile_image_editor.module.scss";
import editProfile from "/assets/svg/accountSetting/editProfile.svg";
import { ProfileImageState } from "@/pages/Register/composite/profileSet/profileSet";
import Button from "@/components/atom/Button/Button";

interface Props {
  width: number;
  profileImage: ProfileImageState;
  setProfileImage: React.Dispatch<React.SetStateAction<ProfileImageState>>;
  isDeletable?: boolean;
  initialImageState: ProfileImageState;
}
// TODO: hover 시 background 어두워지기
export default function ProfileImageEditor({
  width,
  initialImageState,
  profileImage,
  setProfileImage,
  isDeletable,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("on file change");
    const file = event.target.files?.[0];
    console.log(file);
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
  const handleFileDelete = () => {
    setProfileImage(initialImageState);
  };

  return (
    <div className={styles.container}>
      <input
        className={styles["sr-only"]}
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        id="file-upload"
      />
      <button
        onClick={() => document.getElementById("file-upload")?.click()}
        className={`${styles["edit-img-btn"]} ${styles[`width-${width}`]}`}
      >
        {/* 프로필 이미지 */}

        <img
          className={`${styles["profile-img"]} ${styles[`width-${width}`]}`}
          src={profileImage.url ?? initialImageState.url}
          alt="프로필 이미지"
        />
        {/* 편집 아이콘 */}
        <div className={styles["edit-img-bg"]}>
          <div
            className={`${styles["edit-img-icon-bg"]} ${
              styles[`width-${width}`]
            }`}
          >
            <img
              src={editProfile}
              width={width === 200 ? 40 : 30}
              height={width === 200 ? 40 : 30}
            />
          </div>
        </div>
      </button>
      {isDeletable ? (
        <Button
          color="secondary"
          fullWidth
          className={styles.delete}
          onClick={handleFileDelete}
          size="small"
        >
          사진 삭제하기
        </Button>
      ) : null}
    </div>
  );
}
