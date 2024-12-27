import Button from "@/components/atom/button/button";
import styles from "./account_setting.module.scss";
import ProfileImageEditor from "../../components/profileImageEditor/profileImageEditor";
import { useEffect, useState } from "react";
import Input
	from "@/components/atom/input/input";
import useInput from "@/hooks/useInput";
import { ProfileImageState } from "@/pages/Register/composite/profileSet/profileSet";
import { currentUserAtom } from "@/store/userAtom";
import { useAtom } from "jotai";
import useValidate from "@/hooks/useValidate";
import { emailValidation } from "@/validation/emailValidation";
import correct from "/public/assets/svg/common/correct.svg";
import incorrect from "/public/assets/svg/common/incorrect.svg";
import useUpdateUser from "@/hooks/useUpdateUser";
import useUploadImageToStorage from "@/hooks/useUploadImage";
import { UploadImageArgType } from "@/types/UploadImageType";

export default function EditMyInfo() {
	const [currentUser] = useAtom(currentUserAtom);

	const defaultImagePath = "/public/assets/image/default-profile.png";

	const defaultProfileState: ProfileImageState = {
		url: currentUser?.profileImage ?? defaultImagePath,
		file: null,
	};
	const [profileImage, setProfileImage] = useState<ProfileImageState>(defaultProfileState);
	const { value, onChange, isValid: isEmailValid, } = useInput('', emailValidation);
	const { value: code, onChange: onCodeChange } = useInput('');
	const { messageContent, isError, isEmailSent, firstSendEmail, resendEmail, isMatch, isAlreadyUsed } = useValidate({ value: value, isEmailValid: isEmailValid, code: code });
	const { updateUser } = useUpdateUser();
	const [isChangeEmailMode, setIsChangeEmailMode] = useState<boolean>(false);
	const [isChangeNicknameMode, setIsChangeNicknameMode] = useState<boolean>(false);
	const { value: nicknameValue, onChange: onNicknameChange } = useInput('');
	const isNicknameValidate = nicknameValue.length <= 8;

	const { uploadImage } = useUploadImageToStorage((imageUrl: string) => {
		updateUser({ user: { profileImage: imageUrl }, toastMessage: "프로필 이미지가 변경되었습니다." })
	});

	const handleClickChangeEmail = (_: React.MouseEvent<HTMLButtonElement>) => {
		setIsChangeEmailMode(!isChangeEmailMode);
	}
	const handleClickChangeNickname = () => {
		setIsChangeNicknameMode(!isChangeNicknameMode);
	}

	// TODO : UI 보정
	useEffect(() => {
		if (profileImage.file) {
			const arg: UploadImageArgType = {
				image: profileImage.file,
				imageTarget: "MEMBER_PROFILE",
			}
			uploadImage(arg);
		}
	}, [profileImage.file]);

	return (
		<>
			<section className={styles["setting-img"]}>
				<h2 className={styles["title"]}>프로필 사진 설정</h2>
				<ProfileImageEditor
					width={200}
					profileImage={profileImage}
					setProfileImage={setProfileImage}
					initialImageState={defaultProfileState}
				/>
			</section>

			<section className={styles["setting-nickname"]}>
				<h2 className={styles["title"]}>닉네임 설정</h2>
				<div className={styles["change-form"]}>
					{!isChangeNicknameMode &&
						<>
							<span>{currentUser?.nickname}</span>
							<Button
								className={styles["button"]}
								onClick={handleClickChangeNickname}
								color="primary"
							>
								닉네임 바꾸기
							</Button>
						</>
					}

					{
						isChangeNicknameMode &&
						<form>
							<fieldset className={styles["form"]}>
								<legend className={styles["sr-only"]}>닉네임 변경</legend>
								<div className={styles["input-area"]}>
									<Input
										id="nickname-change"
										value={nicknameValue}
										onChange={onNicknameChange}
										placeholder="새로운 닉네임을 입력해주세요"
										isError={!isNicknameValidate}
										maxLength={8}
										fullWidth
									/>

									<div className={styles["message-container"]}>
										<img src={isNicknameValidate ? "" : incorrect} />
										<span className={isNicknameValidate ? "" : styles["not-match"]}>{isNicknameValidate ? "" : "8자 이내"}</span>
									</div>
								</div>

								<Button
									color="primary"
									onClick={() => updateUser({ user: { nickname: nicknameValue }, toastMessage: "닉네임 변경이 완료되었습니다.", needToReload: true })}
									className={styles["button"]}
									size="medium"
								>저장</Button>
							</fieldset>
						</form>
					}
				</div>

			</section>

			<section className={styles["setting-email"]}>
				<h2 className={styles["title"]}>가입 이메일 설정</h2>
				<div className={styles["change-form"]}>
					<span>{currentUser?.email}</span>
					<Button
						className={styles["button"]}
						disabled={isChangeEmailMode}
						onClick={handleClickChangeEmail}
						color="primary">이메일 바꾸기</Button>
				</div>
				{
					isChangeEmailMode &&
					<form>
						<fieldset className={styles["form"]}>
							<legend className={styles["sr-only"]}>이메일 변경</legend>
							<div className={styles["input-area"]}>
								<Input
									id="email-change"
									value={value}
									onChange={onChange}
									placeholder="새로운 이메일을 입력해주세요"
									message={messageContent}
									isError={isError}
									fullWidth
								/>
								<Button
									disabled={!isEmailValid && isAlreadyUsed}
									color={"primary"}
									onClick={isEmailSent ? () => resendEmail() : () => firstSendEmail()}
									className={styles["button"]}
									size="medium"
								>
									{isEmailSent ? "인증 코드 재발송" : "인증 코드 발송"}</Button>
							</div>
							{isEmailSent &&
								<div className={styles["input-area"]}>
									<div className={styles["input"]}>
										<Input
											id="code-input"
											value={code}
											onChange={onCodeChange}
											placeholder="인증코드를 입력해주세요"
											isError={!isMatch}
											fullWidth
										/>

										<div className={styles["message-container"]}>
											<img src={isMatch ? correct : incorrect} />
											<span className={isMatch ? styles["match"] : styles["not-match"]}>{isMatch ? "인증코드가 일치합니다." : "인증 코드가 일치하지 않습니다."}</span>
										</div>
									</div>

									<Button
										disabled={!isMatch}
										color={"primary"}
										size="medium"
										className={styles["button"]}
										onClick={() => updateUser({ user: { email: value }, toastMessage: "이메일 변경이 완료되었습니다.", needToReload: true })}
									>
										확인
									</Button>
								</div>
							}
						</fieldset>
					</form>
				}
			</section>
		</>
	);
}
