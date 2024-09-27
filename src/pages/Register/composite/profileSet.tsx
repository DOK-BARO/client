import Button from "../../../components/atom/button";
import Input from "../../../components/atom/input";
import useInput from "../../../hooks/useInput";
import styles from "../../../styles/composite/_profile_set.module.scss";
import ProfileUpload from "../components/profileUpload";
import { XCircle } from "../../../../public/assets/svg/xCircle";
import { gray30, gray60 } from "../../../styles/abstracts/colors";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { User } from "../../../types/User";
import { userAtom } from "../../../store/userAtom";

export default function ProfileSet() {
  const isSubmitAble: boolean = true;
  const {
    value: nickname,
    onChange: onNicknameChange,
    resetInput,
  } = useInput("");
  const defaultImagePath = "/public/assets/image/default-profile.png";
  const [profileImage, setProfileImage] = useState<string>(defaultImagePath);
  const navigate = useNavigate();
  const [user, setUser] = useAtom<User>(userAtom);

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setUser({
      ...user,
      nickname,
      profileImage,
    });
    // navigate("/register/complete");
  };

  // useEffect(() => {
  //   // if (true) {
  //   //   navigate("/register/complete");
  //   // }
  // }, [user]);

  return (
    <section className={styles["profile-set"]}>
      <h3>프로필 설정</h3>
      <p className={styles.description} data-for="profile-image">
        프로필을 설정해 주세요.
      </p>
      <form onSubmit={onSubmit}>
        <ProfileUpload
          email={user.email}
          profileImage={profileImage}
          setProfileImage={setProfileImage}
          defaultImagePath={defaultImagePath}
        />
        <p className={styles.description} data-for="nickname">
          사용할 닉네임을 입력해주세요.
        </p>
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
