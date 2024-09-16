import Button from "../../../components/atom/button";
import Input from "../../../components/atom/input";
import styles from "../../../styles/composite/_profile_set.module.scss";
import ProfileUpload from "../components/profileUpload";

export default function ProfileSet() {
  const isSubmitAble = true;
  return (
    <section id="profile-set" className={styles["profile-set"]}>
      <p className={styles.description}>프로필을 설정해 주세요.</p>
      <form>
        <ProfileUpload />
        <p className={styles.description}>사용할 닉네임을 입력해주세요.</p>
        <Input
          className={styles.input}
          onChange={() => {}}
          id={""}
          value={""}
          message="사용 가능합니다."
        />
        <Button
          size="large"
          className={styles[isSubmitAble ? "done" : "submit-disabled"]}
          disabled={!isSubmitAble}
          onClick={() => {}}
        >
          완료
        </Button>
      </form>
    </section>
  );
}
