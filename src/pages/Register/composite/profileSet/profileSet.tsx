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
import {
  emailSignup,
  sendTermsAgreement,
  updateUser,
} from "@/services/server/authService";
import { uploadImage } from "@/services/server/imageService";

export interface ProfileImageState {
  url: string;
  file: File | null;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export default function ProfileSet() {
  const { method } = useParams();
  const navigate = useNavigate();
  const nextPage = "/register/complete";

  const defaultImagePath = "/public/assets/image/default-profile.png";
  const [profileImage, setProfileImage] = useState<ProfileImageState>({
    url: defaultImagePath,
    file: null,
  });
  const [user, setUser] = useAtom<RegisterInfoType>(RegisterInfoAtom);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const {
    value: nickname,
    onChange: onNicknameChange,
    resetInput,
  } = useInput("");
  const isSubmitAble: boolean = !!nickname;

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setUser({
      ...user,
      nickname,
      profileImage: profileImage.file,
    });
    setIsSubmitted(true);
  };

  const handleSignUp = async () => {
    const { id, termsAgreements, ...userInfo } = user;
    // TODO: 프로필 이미지 없을 경우?

    if (userInfo.profileImage) {
      // 프로필 이미지 업로드
      const imageUrl = await uploadImage({
        image: userInfo.profileImage,
        imageTarget: "MEMBER_PROFILE",
      });

      // }

      if (method === "email") {
        // 이메일 회원가입
        const emailUserInfo = {
          ...userInfo,
          profileImage: imageUrl,
        };

        // 1. 회원가입
        // 2. 약관 동의
        await Promise.all([
          emailSignup(emailUserInfo),
          sendTermsAgreement(termsAgreements),
        ]);
      } else {
        // 소셜 회원가입
        const { password, ...rest } = userInfo;
        const socialUserInfo = {
          ...rest,
          profileImage: imageUrl,
        };
        // 프로필 업데이트
        await updateUser(socialUserInfo);
      }
      navigate(nextPage);
    }
  };

  useEffect(() => {
    if (!isSubmitted) {
      return;
    }
    handleSignUp();
  }, [isSubmitted]);

  return (
    <section className={styles["profile-set"]}>
      <h3>프로필 설정</h3>
      <p className={styles.description} data-for="profile-image">
        프로필을 설정해 주세요.
      </p>
      <form onSubmit={handleSubmit}>
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
