import styles from "../../../styles/composite/_terms_agreement.module.scss";

export default function TermsAgreement() {
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
            id="all-agree"
            className={styles["all-agree"]}
            type="checkbox"
          />
          <label htmlFor="all-agree">모두 동의 (선택 정보 포함)</label>
        </div>
        <hr />

        {/* 필수 약관 */}
        <fieldset>
          <legend>필수 약관</legend>
          <div>
            <input id="terms-agree" type="checkbox" required />
            <label htmlFor="terms-agree">[필수] 이용 약관 동의</label>
            <button type="button">보기</button>
          </div>

          <div>
            <input id="privacy-agree" type="checkbox" required />
            <label htmlFor="privacy-agree">
              [필수] 개인 정보 수집·이용 동의
            </label>
            <button type="button">보기</button>
          </div>
        </fieldset>

        {/* 선택 약관 */}
        <fieldset>
          <legend>선택 약관</legend>
          <div>
            <input id="email-news" type="checkbox" />
            <label htmlFor="email-news">
              [선택] 신규 퀴즈 소식을 이메일로 받기
            </label>
            <button type="button">보기</button>
            <p>관심 도서의 신규 퀴즈 업데이트 소식을 받아보세요!</p>
          </div>

          <div>
            <input id="ads-email" type="checkbox" />
            <label htmlFor="ads-email">
              [선택] DOKBARO의 광고 메시지를 이메일로 받기
            </label>
            <button type="button">보기</button>
            <p>DOKBARO가 고른 도서 소식을 이메일로 받아보세요!</p>
          </div>
        </fieldset>
      </form>
      <hr />
      <div></div>
    </section>
  );
}
