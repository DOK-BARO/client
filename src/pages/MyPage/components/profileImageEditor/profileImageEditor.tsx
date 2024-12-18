import React, { useRef } from "react";
import styles from "./_profile_image_editor.module.scss";
import editProfile from "/assets/svg/accountSetting/editProfile.svg";
import { ProfileImageState } from "@/pages/Register/composite/profileSet/profileSet";

interface Props {
  width: number;
  initialImage?: string | undefined;
  profileImage: ProfileImageState;
  setProfileImage: React.Dispatch<React.SetStateAction<ProfileImageState>>;
}

export default function ProfileImageEditor({
  width,
  initialImage,
  profileImage,
  setProfileImage,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // const [previewImg, setImagePreview] = useState<string[]>([]);
  const defaultImagePath = "/public/assets/image/default-profile.png";

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <>
      <input
        className={styles["sr-only"]}
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={onFileChange}
        id="file-upload"
      />
      <button
        onClick={() => document.getElementById("file-upload")?.click()}
        className={`${styles["edit-img-btn"]} ${styles[`width-${width}`]}`}
      >
        <img
          src={initialImage ?? defaultImagePath}
          className={styles["edit-profile-img"]}
        />
        <img
          className={`${styles["edit-img-bg"]} ${styles[`width-${width}`]}`}
          src={profileImage.url}
          alt="프로필 이미지"
        />
        <div
          className={`${styles["edit-img-icon-bg"]} ${
            styles[`width-${width}`]
          }`}
        >
          <img
            src={editProfile}
            className={styles["edit-img-icon"]}
            width={width === 200 ? 40 : 30}
            height={width === 200 ? 40 : 30}
          />
        </div>
      </button>
    </>
  );
}
