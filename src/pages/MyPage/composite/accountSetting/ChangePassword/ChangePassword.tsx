import Button from "@/components/atom/Button/Button";
import { useState } from "react";
import useInput from "@/hooks/useInput";
import { passwordValidation } from "@/validation/passwordValidation";
import PasswordValidationMessage from "@/components/atom/PasswordValidationMessage/PasswordValidationMessage";
import styles from "./_change_password.module.scss";
import { Visible } from "@/svg/Visible";
import { Invisible } from "@/svg/Invisible";
import { gray60 } from "@/styles/abstracts/colors";
import Input from "@/components/atom/Input/Input";
import PasswordMatchCheckMessage from "@/components/atom/PasswordMatchCheckMessage/PasswordMatchCheckMessage";
import { useMutation } from "@tanstack/react-query";
import { ErrorType } from "@/types/ErrorType";
import { authService } from "@/services/server/authService";
import { useNavigate } from "react-router-dom";
// TODO: 대소문자 규정 체크 필요 (현재 대문자 없어도 valid 처리됨)
export default function ChangePassword() {
	const navigate = useNavigate();
	const { value: currentPassword, onChange: onCurrentPasswordChange } =
		useInput("");
	const {
		value: password,
		onChange: onPasswordChange,
		isValid: isPasswordValid,
		validations: passwordValidations,
	} = useInput("", passwordValidation);
	const { value: passwordCheck, onChange: onPasswordCheckChange } =
		useInput("");
	const [subStep, setSubStep] = useState<number>(1);
	const isPasswordMatched = password === passwordCheck && passwordCheck !== "";
	const [isPasswordVisible, setIsPasswordVisibleCheck] =
		useState<boolean>(false);
	const { mutate: changePassword } = useMutation<
		void,
		ErrorType,
		{ oldPassword: string, newPassword: string }
	>({
		mutationFn: ({ oldPassword, newPassword }) => authService.changePassword({ oldPassword, newPassword }),
		onSuccess: () => {
			// TODO: 변경하고 결과가 확인안됨
			navigate("/my/settings/change-password");
		}
	});


	const handleSubmit = (): void => {
		changePassword({oldPassword: currentPassword, newPassword: password});
	}
	const handleMoveToNext = (): void => {
		setSubStep(2);
	};

	const handleVisibleToggle = () => {
		setIsPasswordVisibleCheck((prev) => !prev);
	};


	return (
		<section className={styles["container"]}>
			{subStep === 1 && (<>
				<h2 className={styles["title"]}>현재 비밀번호를 입력해 주세요.</h2>
				<div className={styles["input"]}>
					<Input
						fullWidth
						id="password"
						type={isPasswordVisible ? "text" : "password"}
						value={currentPassword}
						placeholder="비밀번호를 입력해주세요"
						onChange={onCurrentPasswordChange}
						rightIcon={
							<Button
								onClick={handleVisibleToggle}
								iconOnly
								icon={
									isPasswordVisible ? (
										<Visible
											alt="비밀번호 표시 해제"
											stroke={gray60}
											width={24}
											height={24}
										/>
									) : (
										<Invisible
											alt="비밀번호 표시"
											stroke={gray60}
											width={24}
											height={24}
										/>
									)
								}
							/>
						}
					/>
				</div>
			</>)}
			{subStep === 2 && (
				<>
					<div className={styles["input-area"]}>
						<h2 className={styles["title"]}>변경할 비밀번호를 입력해 주세요.</h2>
						<Input
							type={isPasswordVisible ? "text" : "password"}
							isSuccess={isPasswordValid}
							message={<PasswordValidationMessage passwordValidations={passwordValidations} />}
							rightIcon={
								<Button iconOnly onClick={handleVisibleToggle}>
									{isPasswordVisible ? (
										<Visible alt="비밀번호 표시 해제" stroke={gray60} width={24} />
									) : (
										<Invisible alt="비밀번호 표시" stroke={gray60} width={24} />
									)}
								</Button>
							}
							id="password"
							className={styles.password}
							value={password}
							onChange={onPasswordChange}
							placeholder="비밀번호 입력"
							size="medium"
						/>
					</div>

					<div className={styles["input-area"]}>
						<p className={styles["title"]}>
							비밀번호를 다시 한 번 입력해 주세요.
						</p>
						<Input
							id="password-check"
							value={passwordCheck}
							onChange={onPasswordCheckChange}
							className={styles["password-check"]}
							placeholder="비밀번호를 다시 한 번 입력해 주세요."
							size="medium"
							type={isPasswordVisible ? "text" : "password"}
							rightIcon={
								<Button iconOnly onClick={handleVisibleToggle}>
									{isPasswordVisible ? (
										<Visible
											alt="비밀번호 표시 해제"
											stroke={gray60}
											width={24}
										/>
									) : (
										<Invisible alt="비밀번호 표시" stroke={gray60} width={24} />
									)}
								</Button>
							}
							isError={!isPasswordMatched && passwordCheck !== ""}
							isSuccess={isPasswordMatched}
							message={
								passwordCheck && <PasswordMatchCheckMessage isPasswordMatched={isPasswordMatched} />
							}
						/>
					</div>
				</>)}

			<Button
				disabled={subStep === 1 ? !currentPassword?.length : (!isPasswordValid || !isPasswordMatched)}
				className={styles["btn-next"]}
				onClick={subStep === 1 ? handleMoveToNext : handleSubmit}
				color="primary"
			>{subStep === 1 ? "다음" : "완료"}</Button>
		</section>
	);
}