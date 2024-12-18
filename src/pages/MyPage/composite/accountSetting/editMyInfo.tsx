// import { useQueryCurrentUser } from "@/hooks/useQueryCurrentUser";
import Button from "@/components/atom/button/button";
import styles from "./account_setting.module.scss";
import { useRef } from "react";
import { useState } from "react";
import editProfile from "/assets/svg/accountSetting/editProfile.svg";
import { useAtom } from "jotai";
import { currentUserAtom } from "@/store/userAtom";

export default function EditMyInfo() {
  // const { user } = useQueryCurrentUser();
  const [currentUser] = useAtom(currentUserAtom);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImg, setImagePreview] = useState<string[]>([]);

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
      setImagePreview((prev) => [...prev, ...newImages]);
    }
  };
  const handleButtonClick = (_: React.MouseEvent<HTMLButtonElement>) => {
    fileInputRef.current?.click();
  };
  return (
    <>
      <section className={styles["setting-img"]}>
        <h3 className={styles["title"]}>프로필 사진 바꾸기</h3>
        <input
          className={styles["sr-only"]}
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImgChange}
        />
        <button onClick={handleButtonClick} className={styles["edit-img-btn"]}>
          <img
            src={currentUser?.profileImage ?? undefined}
            className={styles["edit-profile-img"]}
          />
          <img className={styles["edit-img-bg"]} src={previewImg[0]} />
          <div className={styles["edit-img-icon-bg"]}></div>
          <img
            src={editProfile}
            className={styles["edit-img-icon"]}
            width={100}
            height={100}
          />
        </button>
      </section>
      <section className={styles["setting-email"]}>
        <h2 className={styles["title"]}>가입 이메일 설정</h2>
        <div className={styles["change-email"]}>
          {/* <span>{user?.email}</span> */}
          <Button color="primary">이메일 바꾸기</Button>
        </div>
      </section>
    </>
  );
}
