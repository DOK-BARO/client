import styles from "./_profile_set.module.scss";
import { FormEvent, useEffect, useState } from "react";
import { useAtom } from "jotai";

import useInput from "@/hooks/useInput.ts";
import ProfileUpload from "@/pages/Register/components/profileUpload/profileUpload.tsx";
import Input from "@/components/atom/input/input.tsx";
import { XCircle } from "@/svg/xCircle";
import { gray30, gray60 } from "@/styles/abstracts/colors.ts";
import Button from "@/components/atom/button/button.tsx";
import { RegisterInfoType } from "@/types/UserType";
import { RegisterInfoAtom } from "@/store/userAtom";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { signUpByEmail } from "@/services/server/authService.ts";
import { imageService } from "@/services/server/imageService.ts";

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
  const [profileImageFile, setProfileImageFile] = useState<Blob>();
  const [profileImgUrl, setProfileImgUrl] = useState<string>("");
  const navigate = useNavigate();
  const [user, setUser] = useAtom<RegisterInfoType>(RegisterInfoAtom);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
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

  const onSignUp = async () => {
    console.log("onSignUp");
    // const userInfo = {
    //   email: "gimm08377@gmail.com",
    //   password: "password123!",
    //   nickname: user.nickname,
    //   profileImage: user.profileImage,
    // };


    const { email, password, nickName: nickname, profileImage } = user as RegisterInfoType;

    const formData = new FormData();
    if(profileImageFile){
      formData.append("file", profileImageFile);
      const url= await imageService.uploadImage(formData);
      console.log("url: +",url);
      setProfileImgUrl(url);
    }

    const postData = {
      email,
      password,
      nickname,
      profileImage,
    };

    // TODO: 프로필 이미지 스토리지 업로드
    if (method === "email") {
      await signUpByEmail({ ...user,profileImage:profileImgUrl });
    } else {
      // method === "social"
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...socialUserInfo } = postData;
        const response = await axios.put("/members/login-user", socialUserInfo);
        console.log("소셜 회원가입 put 응답", response);
      } catch (e) {
        console.log(e);
      }
      // TODO: 캐싱된 유저 데이터 update
      // TODO : 유저 정보 update되는거 확인 필요
      navigate("/register/complete");

    }
    // localStorage.setItem(LOCAL_STORAGE_KEY.AUTH_ACTION, AUTH_ACTION.SIGN_UP);
    // await redirectToAuthPage(SocialLoginType.EMAIL);
  };

  useEffect(() => {
    if (isSubmitted) {
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
          setProfileImageFile={setProfileImageFile}
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
