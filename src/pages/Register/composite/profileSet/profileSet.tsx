import styles from "./_profile_set.module.scss";
import { FormEvent, useEffect, useState } from "react";
import { useAtom } from "jotai";

import { AUTH_ACTION, LOCAL_STORAGE_KEY } from "@/data/constants";
import { useAuth } from "@/hooks/useAuth";
import { SocialLoginType } from "@/types/SocialLoginType";
import useInput from "@/hooks/useInput.ts";
import ProfileUpload from "@/pages/Register/components/profileUpload/profileUpload.tsx";
import Input from "@/components/atom/input/input.tsx";
import { XCircle } from "@/svg/xCircle";
import { gray30, gray60 } from "@/styles/abstracts/colors.ts";
import Button from "@/components/atom/button/button.tsx";
import { RegisterInfoType } from "@/types/UserType";
import { RegisterInfoAtom } from "@/store/userAtom";

export default function ProfileSet() {
  const isSubmitAble: boolean = true;
  const {
    value: nickname,
    onChange: onNicknameChange,
    resetInput,
  } = useInput("");
  const defaultImagePath = "/public/svg/image/default-profile.png";
  const [profileImage, setProfileImage] = useState<string>(defaultImagePath);
  // const navigate = useNavigate();
  const [user, setUser] = useAtom<RegisterInfoType>(RegisterInfoAtom);

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { redirectToAuthPage } = useAuth();
  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setUser({
      ...user,
      nickName: nickname,
      profileImage,
    });
    setIsSubmitted(true);
    // navigate("/register/complete");
  };

  const handleAuth = async () => {
    localStorage.setItem(LOCAL_STORAGE_KEY.AUTH_ACTION, AUTH_ACTION.SIGN_UP);
    await redirectToAuthPage(SocialLoginType.EMAIL);
  };

  useEffect(() => {
    if (isSubmitted) {
      // navigate("/register/complete");
      console.log(user);
      handleAuth();
    }
  }, [isSubmitted]);

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
