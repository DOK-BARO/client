import Button from "@/components/atom/Button/Button";
import styles from "./_edit_my_info.module.scss";
import ProfileImageEditor from "../../../components/ProfileImageEditor/ProfileImageEditor";
import { useEffect, useState } from "react";
import Input from "@/components/atom/Input/Input";
import useInput from "@/hooks/useInput";
import { ProfileImageState } from "@/pages/Register/composite/ProfileSet/ProfileSet";
import { currentUserAtom } from "@/store/userAtom";
import { useAtom } from "jotai";
import useValidate from "@/hooks/useValidate";
import { emailValidation } from "@/validation/emailValidation";
import useUpdateUser from "@/hooks/mutate/useUpdateUser";
import useUploadImageToStorage from "@/hooks/mutate/useUploadImage";
import { UploadImageArgType } from "@/types/UploadImageType";
import defaultImage from "/public/assets/image/default-profile.png";
import { XSmall } from "@/svg/XSmall";
import { systemDanger } from "@/styles/abstracts/colors";

export default function EditMyInfo() {
  const [currentUser] = useAtom(currentUserAtom);
  const defaultProfileState: ProfileImageState = {
    url: currentUser?.profileImage ?? defaultImage,
    file: null,
  };

  const [profileImage, setProfileImage] =
    useState<ProfileImageState>(defaultProfileState);

  useEffect(() => {
    const profileImgState: ProfileImageState = {
      url: currentUser?.profileImage ?? defaultImage,
      file: null,
    };
    setProfileImage(profileImgState);
  }, [currentUser?.profileImage]);

  const {
    value,
    onChange,
    isValid: isEmailValid,
  } = useInput("", emailValidation);
  const { value: code, onChange: onCodeChange } = useInput("");
  const {
    messageContent,
    isError,
    isEmailSent,
    firstSendEmail,
    resendEmail,
    isMatch,
    isAlreadyUsed,
  } = useValidate({ value: value, isEmailValid: isEmailValid, code: code });
  console.log("isAlreay", isAlreadyUsed);
  const { updateUser } = useUpdateUser();
  const [isChangeEmailMode, setIsChangeEmailMode] = useState<boolean>(false);
  const [isChangeNicknameMode, setIsChangeNicknameMode] =
    useState<boolean>(false);
  const { value: nicknameValue, onChange: onNicknameChange } = useInput("");
  const showNicknameDanger = nicknameValue.length >= 8;

  const { uploadImage, isPending } = useUploadImageToStorage(
    (imageUrl: string) => {
      updateUser({
        user: { profileImage: imageUrl },
        toastMessage: "프로필 사진가 변경되었습니다.",
      });
    },
    () => {
      // 사진 업로드 실패시
      setProfileImage((prev) => ({
        ...prev,
        url: currentUser?.profileImage ?? defaultImage,
      }));
    },
  );

  const handleClickChangeEmail = () => {
    setIsChangeEmailMode(!isChangeEmailMode);
  };
  const handleClickChangeNickname = () => {
    setIsChangeNicknameMode(!isChangeNicknameMode);
  };

  useEffect(() => {
    if (!profileImage.file) {
      return;
    }
    const arg: UploadImageArgType = {
      image: profileImage.file,
      imageTarget: "MEMBER_PROFILE",
    };
    uploadImage(arg);
  }, [profileImage.file]);

  return (
    <>
      <section className={styles["setting-img"]}>
        <h2 className={styles["sub-title"]}>프로필 사진 설정</h2>
        <ProfileImageEditor
          width={200}
          profileImage={profileImage}
          setProfileImage={setProfileImage}
          initialImageState={defaultProfileState}
          isLoading={isPending}
        />
      </section>

      <section className={styles["setting-container"]}>
        <h2 className={styles["sub-title"]}>닉네임 설정</h2>
        {!isChangeNicknameMode && (
          <div className={styles["change-form"]}>
            <span>{currentUser?.nickname}</span>
            <Button
              className={styles["button"]}
              onClick={handleClickChangeNickname}
              color="primary"
            >
              닉네임 바꾸기
            </Button>
          </div>
        )}

        {isChangeNicknameMode && (
          <form>
            <fieldset className={styles["form"]}>
              <legend className={styles["sr-only"]}>닉네임 변경</legend>
              <div className={styles["input-area"]}>
                <div className={styles["input-inner"]}>
                  <Input
                    id="nickname-change"
                    value={nicknameValue}
                    onChange={onNicknameChange}
                    placeholder="새로운 닉네임을 입력해주세요"
                    isError={showNicknameDanger}
                    message={
                      showNicknameDanger ? (
                        <span className={styles["message-container"]}>
                          <XSmall
                            stroke={systemDanger}
                            width={20}
                            height={20}
                            alt=""
                          />
                          {"8자 이내"}
                        </span>
                      ) : (
                        ""
                      )
                    }
                    maxLength={8}
                    fullWidth
                  />
                </div>
                <Button
                  color="primary"
                  onClick={() =>
                    updateUser({
                      user: { nickname: nicknameValue },
                      toastMessage: "닉네임 변경이 완료되었습니다.",
                      needToReload: true,
                    })
                  }
                  className={styles["button"]}
                  size="medium"
                >
                  저장
                </Button>
              </div>
            </fieldset>
          </form>
        )}
      </section>

      <section className={styles["setting-container"]}>
        <h2 className={styles["sub-title"]}>가입 이메일 설정</h2>
        <div className={styles["change-form"]}>
          <span
            className={isChangeEmailMode ? styles["current-email"] : styles[""]}
          >
            {currentUser?.email}
          </span>
          <Button
            className={styles["button"]}
            disabled={isChangeEmailMode}
            onClick={handleClickChangeEmail}
            color="primary"
          >
            이메일 바꾸기
          </Button>
        </div>
        {isChangeEmailMode && (
          <form>
            <fieldset className={styles["form"]}>
              <legend className={styles["sr-only"]}>이메일 변경</legend>
              <div className={styles["input-area"]}>
                <Input
                  id="email-change"
                  value={value}
                  onChange={onChange}
                  className={isError ? styles["error--input-text"] : ""}
                  placeholder="새로운 이메일을 입력해주세요"
                  message={
                    isError ? (
                      <span className={styles["message-container"]}>
                        <XSmall
                          stroke={systemDanger}
                          width={20}
                          height={20}
                          alt=""
                        />
                        {messageContent}
                      </span>
                    ) : (
                      ""
                    )
                  }
                  isError={isError}
                  fullWidth
                />
                <Button
                  disabled={!isEmailValid || isAlreadyUsed}
                  color={"primary"}
                  onClick={
                    isEmailSent ? () => resendEmail() : () => firstSendEmail()
                  }
                  className={styles["button"]}
                  size="medium"
                >
                  {isEmailSent ? "인증 코드 재발송" : "인증 코드 발송"}
                </Button>
              </div>
              {isEmailSent && (
                <div className={styles["input-area"]}>
                  <div className={styles["input"]}>
                    <Input
                      id="code-input"
                      value={code}
                      onChange={onCodeChange}
                      placeholder="인증코드를 입력해주세요"
                      isError={!isMatch}
                      message={
                        isMatch ? (
                          ""
                        ) : (
                          <span className={styles["message-container"]}>
                            <XSmall
                              stroke={systemDanger}
                              width={20}
                              height={20}
                              alt=""
                            />
                            {isMatch
                              ? "인증코드가 일치합니다."
                              : "인증 코드가 일치하지 않습니다."}
                          </span>
                        )
                      }
                      fullWidth
                    />
                  </div>

                  <Button
                    disabled={!isMatch}
                    color={"primary"}
                    size="medium"
                    className={styles["button"]}
                    onClick={() =>
                      updateUser({
                        user: { email: value },
                        toastMessage: "이메일 변경이 완료되었습니다.",
                        needToReload: true,
                      })
                    }
                  >
                    확인
                  </Button>
                </div>
              )}
            </fieldset>
          </form>
        )}
      </section>
    </>
  );
}
