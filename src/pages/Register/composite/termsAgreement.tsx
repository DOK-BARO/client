import { useState } from "react";
import Button from "../../../components/atom/button";
import styles from "../../../styles/composite/_terms_agreement.module.scss";

export default function TermsAgreement() {
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

  return (
    <section className={styles["terms-agreement"]}>
      <h4 className={styles["description"]}>
        DOKBARO의 서비스 이용약관에
        <br />
        동의해 주세요.
      </h4>
      <form>
        {/* 모두 동의 */}
        <div>
          <input
            id="allAgree"
            className={styles["all-agree"]}
            type="checkbox"
            checked={agreements.allAgree}
            onChange={onAllAgreeChange}
          />
          <label htmlFor="all-agree">모두 동의 (선택 정보 포함)</label>
        </div>
        <hr />

        {/* 필수 약관 */}
        <fieldset>
          <legend>필수 약관</legend>
          <div>
            <input
              id="termsAgree"
              type="checkbox"
              checked={agreements.termsAgree}
              onChange={onSingleAgreeChange}
              required
            />
            <label htmlFor="termsAgree">[필수] 이용 약관 동의</label>
            <button type="button">보기</button>
          </div>

          <div>
            <input
              id="privacyAgree"
              type="checkbox"
              checked={agreements.privacyAgree}
              onChange={onSingleAgreeChange}
              required
            />
            <label htmlFor="privacyAgree">
              [필수] 개인 정보 수집·이용 동의
            </label>
            <button type="button">보기</button>
          </div>
        </fieldset>

        {/* 선택 약관 */}
        <fieldset>
          <legend>선택 약관</legend>
          <div>
            <input
              id="emailNews"
              type="checkbox"
              checked={agreements.emailNews}
              onChange={onSingleAgreeChange}
            />
            <label htmlFor="emailNews">
              [선택] 신규 퀴즈 소식을 이메일로 받기
            </label>
            <button type="button">보기</button>
            <p>관심 도서의 신규 퀴즈 업데이트 소식을 받아보세요!</p>
          </div>

          <div>
            <input
              id="adsEmail"
              type="checkbox"
              checked={agreements.adsEmail}
              onChange={onSingleAgreeChange}
            />
            <label htmlFor="adsEmail">
              [선택] DOKBARO의 광고 메시지를 이메일로 받기
            </label>
            <button type="button">보기</button>
            <p>DOKBARO가 고른 도서 소식을 이메일로 받아보세요!</p>
          </div>
        </fieldset>
        {/* 버튼 사이즈 컨벤션 안맞음 */}
        <Button size="large" onClick={() => {}}>
          동의하고 가입하기
        </Button>
      </form>
      <hr />
      <div></div>
    </section>
  );
}
