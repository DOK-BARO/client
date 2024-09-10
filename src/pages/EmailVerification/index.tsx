import styles from "../../styles/pages/_emailVerification.module.scss";
export default function index() {
  const email = "dockbaro@gmail.com";
  const code = "3f1jr9"; // 인증 코드
  return (
    <div className={styles["email-verification-container"]}>
      <header>
        <a href="/" className={styles.logo}>
          <img src="/assets/svg/logo.tsx" alt="DOKBARO 로고" width={72} />
          <h1>DOKBARO</h1>
        </a>
      </header>
      <main>
        <p>
          {email}님 안녕하세요.
          <br />
          회원가입을 위해 인증코드를 가입 페이지에 입력해 주세요.
        </p>
        <p className={styles.code}>{code}</p>
      </main>
      <footer>
        <div className={styles.line} />
        <p>본 메일은 DOKBARO 서비스에 대한 광고가 아닙니다.</p>
      </footer>
    </div>
  );
}
