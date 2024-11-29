import { useQueryCurrentUser } from "@/hooks/useQueryCurrentUser";
import Button from "@/components/atom/button/button";
import styles from "./account_setting.module.scss";
import { useRef } from "react";
import { useState } from "react";
import editProfile from "/assets/svg/accountSetting/editProfile.svg";
import Input
  from "@/components/atom/input/input";
import useInput from "@/hooks/useInput";
export default function EditMyInfo() {
  const { user } = useQueryCurrentUser();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImg, setImagePreview] = useState<string[]>([]);
  const { value, onChange } = useInput('');


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

  const handleImgChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImagesFile: File[] = Array.from(files);
      const newImages = await readFilesAsDataURL(newImagesFile);
      setImagePreview((prev) => [...prev, ...newImages]);
    }
  }
  const handleButtonClick = (_: React.MouseEvent<HTMLButtonElement>) => {
    fileInputRef.current?.click();
  }
  const [changeEmailMode, isChangeEmailMode] = useState<boolean>(false);

  const handleClickChangeEmail = (_: React.MouseEvent<HTMLButtonElement>) => {
    isChangeEmailMode(!changeEmailMode);
  }
  return (
    <section>
      <section className={styles["setting-img"]}>
        <h2 className={styles["title"]}>프로필 사진 바꾸기</h2>
        <input
          className={styles["sr-only"]}
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImgChange}
        />
        <button
          onClick={handleButtonClick}
          className={styles["edit-img-btn"]}
        >
          <img src={user?.profileImage}
            className={styles["edit-profile-img"]}
          />
          <img
            className={styles["edit-img-bg"]}
            src={previewImg[0]}
          />
          <div className={styles["edit-img-icon-bg"]}></div>
          <img src={editProfile}
            className={styles["edit-img-icon"]}
            width={100} height={100} />
        </button>
      </section>
      <section className={styles["setting-email"]}>
        <h2 className={styles["title"]}>가입 이메일 설정</h2>

          <div className={styles["current-email"]}>
            <span className={styles[changeEmailMode ? "disabled" : ""]}>{user?.email}</span>
            <Button
              disabled={changeEmailMode}
              onClick={handleClickChangeEmail}
              color="primary">이메일 바꾸기</Button>
          </div>

          {
            changeEmailMode &&
              <form>
                <fieldset className={styles["change-email"]}>
                  <legend className={styles["sr-only"]}>이메일 변경</legend>
                    <Input
                      id="email-change"
                      value={value}
                      onChange={onChange}
                      placeholder="새로운 이메일을 입력해주세요"
                      className={styles["new-email-input"]}
                      
                    />
                    {/* TODO: isvalid */}
                    <Button disabled={false}>
                      인증 코드 발송</Button>
                </fieldset>
              </form>
          }
      </section>
    </section>
  );
}