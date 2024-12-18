import React, { Dispatch, useRef, useState } from "react";
import styles from "./_profile_image_editor.module.scss";
import editProfile from "/assets/svg/accountSetting/editProfile.svg";
import { SetStateAction } from "jotai";

interface Props {
  width: number;
  initialImage?: string | undefined;
  profileImage: string[];
  setProfileImage: Dispatch<SetStateAction<string[]>>;
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

  //TODO: questionForm과 동일코드 . hook으로 분리 예정
  const readFilesAsDataURL = async (files: File[]): Promise<string[]> => {
    const readerPromises: Promise<string>[] = files.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });
    return Promise.all(readerPromises);
  };

  const handleImgChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      const newImagesFile: File[] = Array.from(files);
      const newImages = await readFilesAsDataURL(newImagesFile);
      setProfileImage((prev) => [...prev, ...newImages]);
    }
  };
  const handleButtonClick = (_: React.MouseEvent<HTMLButtonElement>) => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        className={styles["sr-only"]}
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImgChange}
      />
      <button
        onClick={handleButtonClick}
        className={`${styles["edit-img-btn"]} ${styles[`width-${width}`]}`}
      >
        <img
          src={initialImage ?? defaultImagePath}
          className={styles["edit-profile-img"]}
        />
        <img
          className={`${styles["edit-img-bg"]} ${styles[`width-${width}`]}`}
          src={profileImage[0]}
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
