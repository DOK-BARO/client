import Button from "../../../components/atom/button";
import Input from "../../../components/atom/input";
import useInput from "../../../hooks/useInput";
import styles from "../../../styles/composite/_profile_set.module.scss";
import ProfileUpload from "../components/profileUpload";
import { XCircle } from "../../../../public/assets/svg/xCircle";
import { gray30, gray60 } from "../../../styles/abstracts/colors";
import { FormEvent, useState } from "react";

export default function ProfileSet() {
  const isSubmitAble: boolean = true;
  const {
    value: nickname,
    onChange: onNicknameChange,
    resetInput,
  } = useInput("");
  const defaultImagePath = "/public/assets/image/default-profile.png";
  const [imageSrc, setImageSrc] = useState<string>(defaultImagePath);

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log("닉네임:", nickname, ", 프로필 이미지 사진", imageSrc);
  };

  return (
    <section id="profile-set" className={styles["profile-set"]}>
      <p className={styles.description}>프로필을 설정해 주세요.</p>
      <form onSubmit={onSubmit}>
        <ProfileUpload
          imageSrc={imageSrc}
          setImageSrc={setImageSrc}
          defaultImagePath={defaultImagePath}
        />
        <p className={styles.description}>사용할 닉네임을 입력해주세요.</p>
        <Input
          className={styles["nickname-input"]}
          onChange={onNicknameChange}
          id="nickname"
          value={nickname}
          rightIcon={
            <button
              style={{ background: "none", border: "none", padding: "0" }}
              onClick={() => resetInput("")}
            >
              <XCircle width={24} stroke={gray60} fill={gray30} />
            </button>
          }
        />
        <Button
          size="large"
          className={styles[isSubmitAble ? "done" : "submit-disabled"]}
          disabled={!isSubmitAble}
          type="submit"
        >
          완료
        </Button>
      </form>
    </section>
  );
}
