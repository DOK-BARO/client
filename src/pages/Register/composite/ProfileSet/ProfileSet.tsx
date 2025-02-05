import styles from "./_profile_set.module.scss";
import { FormEvent, useState } from "react";
import { useAtom } from "jotai";
import useInput from "@/hooks/useInput.ts";
import Input from "@/components/atom/Input/Input";
import { XCircle } from "@/svg/XCircle";
import { gray30, gray60 } from "@/styles/abstracts/colors.ts";
import Button from "@/components/atom/Button/Button";
import { RegisterInfoType } from "@/types/UserType";
import { registerInfoAtom } from "@/store/userAtom";
import { useNavigate, useParams } from "react-router-dom";
import { authService } from "@/services/server/authService";
import { imageService } from "@/services/server/imageService";
import { useMutation } from "@tanstack/react-query";
import { ErrorType } from "@/types/ErrorType";
import { UploadImageArgType } from "@/types/UploadImageType";
import ProfileUploader from "../../components/ProfileUploader/ProfileUploader";
import ROUTES from "@/data/routes";
import defaultImage from "/public/assets/image/default-profile.png";

export interface ProfileImageState {
  url: string;
  file: File | null;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export default function ProfileSet() {
  const { method } = useParams();
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState<ProfileImageState>({
    url: defaultImage,
    file: null,
  });
  const [userInfo, setUserInfo] = useAtom<RegisterInfoType>(registerInfoAtom);

  const {
    value: nickname,
    onChange: onNicknameChange,
    resetInput,
  } = useInput("");

  const isSubmitAble: boolean = !!nickname;

  const { mutate: uploadImage } = useMutation<
    string,
    ErrorType,
    UploadImageArgType
  >({
    mutationFn: (uploadImageArg) => imageService.uploadImage(uploadImageArg),
    onSuccess: (imageUrl) => {
      setUserInfo({
        ...userInfo,
        nickname,
        profileImage: imageUrl,
      });

      handleSignUp({
        ...userInfo,
        nickname,
        profileImage: imageUrl,
      });
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 프로필 사진 등록
    if (profileImage.file) {
      // 에러처리
      uploadImage({
        image: profileImage.file,
        imageTarget: "MEMBER_PROFILE",
      });
    } else {
      // 프로필 사진 없는 경우
      setUserInfo({
        ...userInfo,
        nickname,
      });
      handleSignUp({
        ...userInfo,
        nickname,
      });
    }
  };

  const { mutate: sendAgreement } = useMutation<void, ErrorType, number[]>({
    mutationFn: (termsAgreements) =>
      authService.sendTermsAgreement(termsAgreements),
    onSuccess: () => {
      navigate(ROUTES.REGISTER_COMPLETE);
    },
  });
  const { mutate: emailSignup } = useMutation<
    void,
    ErrorType,
    {
      password: string;
      email: string;
      nickname: string;
      profileImage?: string | null;
    }
  >({
    mutationFn: (emailUserInfo) => authService.emailSignup(emailUserInfo),
    onSuccess: () => {
      // 2. 회원가입 성공하면 약관 동의
      sendAgreement(userInfo.termsAgreements);
    },
  });

  const { mutate: updateUser } = useMutation<
    void,
    ErrorType,
    {
      nickname: string;
      profileImage: string | null | undefined;
    }
  >({
    mutationFn: (socialUserInfo) => authService.updateUser(socialUserInfo),
    onSuccess: () => {
      navigate(ROUTES.REGISTER_COMPLETE);
    },
  });

  const handleSignUp = async (user: RegisterInfoType) => {
    const { id, ...userInfo } = user;

    if (method === "email") {
      // 이메일 회원가입
      const emailUserInfo = {
        ...userInfo,
      };
      // 1. 회원가입
      emailSignup(emailUserInfo);
    } else {
      // 소셜 회원가입
      const { nickname, profileImage } = userInfo;

      const socialUserInfo = {
        nickname,
        profileImage,
      };
      // 프로필 업데이트
      updateUser(socialUserInfo);
    }
  };

  return (
    <section className={styles["profile-set"]}>
      <h3 className={styles["sr-only"]}>프로필 설정</h3>
      <p className={styles.description} data-for="profile-image">
        프로필을 설정해 주세요.
      </p>
      <form onSubmit={handleSubmit}>
        <ProfileUploader
          email={userInfo.email}
          profileImage={profileImage}
          setProfileImage={setProfileImage}
          defaultImageUrl={defaultImage}
          // handleUploadImage={handleUploadImage}
        />
        <p className={styles.description} data-for="nickname">
          사용할 닉네임을 입력해주세요.
        </p>
        <Input
          onChange={onNicknameChange}
          id="nickname"
          value={nickname}
          size="medium"
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
