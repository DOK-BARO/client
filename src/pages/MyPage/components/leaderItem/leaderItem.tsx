import Button from "@/components/atom/button/button";
import styles from "./_leader_item.module.scss";
import exit from "/public/assets/svg/myPage/exit.svg";
import { Leader } from "@/svg/leader";
import { primary } from "@/styles/abstracts/colors";

export default function LeaderItem() {
  return (
    <div className={styles.container} >
      <span className={styles["profile-container"]}>
        <Leader width={20} height={20} fill={primary} alt="스터디장" />
        <p className={styles.name}>최바로</p>
      </span>

      <div className={styles["button-container"]}>
        <span className={styles.label}>스터디장</span>
        <Button
          className={styles.button}
          icon={<img src={exit} alt="" width={16} height={16} />}
          iconOnly
        />
      </div>
    </div>
  );
}
