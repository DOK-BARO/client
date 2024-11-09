import styles from "./_profile_set.module.scss";
import { FormEvent, useEffect, useState } from "react";
import { useAtom } from "jotai";
// import { AUTH_ACTION, LOCAL_STORAGE_KEY } from "@/data/constants";

// import { SocialLoginType } from "@/types/SocialLoginType";
import useInput from "@/hooks/useInput.ts";
import ProfileUpload from "@/pages/Register/components/profileUpload/profileUpload.tsx";
import Input from "@/components/atom/input/input.tsx";
import { XCircle } from "@/svg/xCircle";
import { gray30, gray60 } from "@/styles/abstracts/colors.ts";
import Button from "@/components/atom/button/button.tsx";
import { RegisterInfoType } from "@/types/UserType";
import { RegisterInfoAtom } from "@/store/userAtom";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProfileSet() {
  const { method } = useParams();
  const isSubmitAble: boolean = true;
  const {
    value: nickname,
    onChange: onNicknameChange,
    resetInput,
  } = useInput("");
  const defaultImagePath = "/public/assets/image/default-profile.png";
  const [profileImage, setProfileImage] = useState<string>(defaultImagePath);
  // const navigate = useNavigate();
  const [user, setUser] = useAtom<RegisterInfoType>(RegisterInfoAtom);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setUser({
      ...user,
      nickname,
      profileImage,
    });
    setIsSubmitted(true);
    // navigate("/register/complete");
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSignUp = async () => {
    // const userInfo = {
    //   email: "gimm08377@gmail.com",
    //   password: "password123!",
    //   nickname: user.nickname,
    //   profileImage: user.profileImage,
    // };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...userInfo } = user;

    console.log("회원가입하기", userInfo);

    if (method === "email") {
      const emailUserInfo = userInfo;
      try {
        const response = await axios.post("/auth/email/signup", emailUserInfo);
        console.log("이메일 회원가입 post 응답", response);
      } catch (e) {
        console.log(e);
      }
    } else {
      // method === "social"
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...socialUserInfo } = userInfo;
        const response = await axios.put("/members/login-user", socialUserInfo);
        console.log("소셜 회원가입 put 응답", response);
      } catch (e) {
        console.log(e);
      }
    }
    // localStorage.setItem(LOCAL_STORAGE_KEY.AUTH_ACTION, AUTH_ACTION.SIGN_UP);
    // await redirectToAuthPage(SocialLoginType.EMAIL);
  };

  useEffect(() => {
    if (isSubmitted) {
      // navigate("/register/complete");
      onSignUp();
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
          onChange={onNicknameChange}
          id="nickname"
          value={nickname}
          size="large"
          rightIcon={
            nickname ? (
              <button
                style={{ background: "none", border: "none", padding: "0" }}
                onClick={() => resetInput("")}
              >
                <XCircle width={24} stroke={gray60} fill={gray30} />
              </button>
            ) : undefined
          }
        />
        <Button
          size="medium"
          className={styles.done}
          disabled={!isSubmitAble}
          type="submit"
          color="primary"
          fullWidth
        >
          완료
        </Button>
      </form>
    </section>
  );
}
