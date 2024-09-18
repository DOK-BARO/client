import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Button from "../../../components/atom/button";
import styles from "../../../styles/composite/_terms_agreement.module.scss";
import CheckBox from "../components/checkBox.tsx";
import { APP_NAME } from "../../../data/constants.ts";

export default function TermsAgreement({
  setCurrentStep,
}: {
  setCurrentStep: Dispatch<SetStateAction<number>>;
}) {
  const [agreements, setAgreements] = useState({
    allAgree: false,
    termsAgree: false,
    privacyAgree: false,
    emailNews: false,
    adsEmail: false,
  });

  const onAllAgreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setAgreements({
      allAgree: isChecked,
      termsAgree: isChecked,
      privacyAgree: isChecked,
      emailNews: isChecked,
      adsEmail: isChecked,
    });
  };

  const onSingleAgreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    console.log("onSingleAgreeChange", id, checked);
    setAgreements((prev) => ({
      ...prev,
      [id]: checked,
      allAgree:
        prev.termsAgree &&
        prev.privacyAgree &&
        prev.emailNews &&
        prev.adsEmail &&
        checked,
    }));
  };

  const isSubmitAble: boolean =
    agreements.termsAgree && agreements.privacyAgree;

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log("동의하고 가입하기");
    setCurrentStep((prev) => prev + 1);
  };

  // TODO : 리펙토링 필요
  return (
    <div className={styles["terms-agreement"]}>
      <p className={styles["description"]}>
        DOKBARO의 서비스 이용약관에
        <br />
        동의해 주세요.
      </p>
      <form onSubmit={onSubmit}>
        {/* 모두 동의 */}
        <div className={styles["agreement-all"]}>
          <CheckBox
            id="allAgree"
            label={"모두 동의 (선택 정보 포함)"}
            checked={agreements.allAgree}
            onChange={onAllAgreeChange}
            isOutLined={true}
          />
        </div>
        <div className={styles["agreement-item-container"]}>
          {/* 필수 약관 */}
          <fieldset>
            <legend>필수 약관</legend>
            <div className={styles["agreement-item-required"]}>
              <CheckBox
                id="termsAgree"
                label={"[필수] 이용 약관 동의"}
                checked={agreements.termsAgree}
                onChange={onSingleAgreeChange}
                isOutLined={false}
                required
              />
              <button
                type="button"
                className={styles["agreement-content-show-button"]}
              >
                보기
              </button>
            </div>
            <div className={styles["agreement-item-required"]}>
              <CheckBox
                id="privacyAgree"
                label={"[필수] 개인 정보 수집·이용 동의"}
                checked={agreements.privacyAgree}
                onChange={onSingleAgreeChange}
                isOutLined={false}
                required
              />
              <button
                type="button"
                className={styles["agreement-content-show-button"]}
              >
                보기
              </button>
            </div>
          </fieldset>

          {/* 선택 약관 */}
          <fieldset>
            <legend>선택 약관</legend>
            <div className={styles["agreement-item-optional"]}>
              <CheckBox
                id="emailNews"
                label={"[선택] 신규 퀴즈 소식을 이메일로 받기"}
                checked={agreements.emailNews}
                onChange={onSingleAgreeChange}
                isOutLined={false}
              />
              <p className={styles["agreement-item-description"]}>
                관심도서의 신규 퀴즈 업데이트 소식을 받아보세요!
              </p>
            </div>

            <div className={styles["agreement-item-optional"]}>
              <CheckBox
                id="adsEmail"
                label={`[선택] ${APP_NAME} 광고 메세지를 이메일로 받기`}
                checked={agreements.adsEmail}
                onChange={onSingleAgreeChange}
                isOutLined={false}
              />
              <p
                className={styles["agreement-item-description"]}
              >{`${APP_NAME}가 고른 도서 소식을 이메일로 받아보세요!`}</p>
            </div>
          </fieldset>
        </div>
        <Button
          type="submit"
          className={styles[isSubmitAble ? "submit" : "submit-disabled"]}
          disabled={!isSubmitAble}
        >
          동의하고 가입하기
        </Button>
      </form>
    </div>
  );
}
