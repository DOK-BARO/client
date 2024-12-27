import Button from "@/components/atom/button/button";
import styles from "./account_setting.module.scss";
import ProfileImageEditor from "../../components/profileImageEditor/profileImageEditor";
import { useState } from "react";
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

export default function EditMyInfo() {
	const defaultImagePath = "/public/assets/image/default-profile.png";

	const defaultProfileState: ProfileImageState = {
		url: defaultImagePath,
		file: null,
	};
	const [currentUser] = useAtom(currentUserAtom);
	const [profileImage, setProfileImage] = useState<ProfileImageState>(defaultProfileState);
	const { value, onChange, isValid: isEmailValid, } = useInput('', emailValidation);
	const { value: code, onChange: onCodeChange } = useInput('');
	const { messageContent, isError, isEmailSent, firstSendEmail, resendEmail, isMatch, isAlreadyUsed, updateUser } = useValidate({ value: value, isEmailValid: isEmailValid, code: code });
	const [isChangeEmailMode, setIsChangeEmailMode] = useState<boolean>(false);

	const handleClickChangeEmail = (_: React.MouseEvent<HTMLButtonElement>) => {
		setIsChangeEmailMode(!isChangeEmailMode);
	}

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
			<section className={styles["setting-email"]}>
				<h2 className={styles["title"]}>가입 이메일 설정</h2>
				<div className={styles["change-email"]}>
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
										onClick={() => updateUser()}
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
