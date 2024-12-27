import Button from "@/components/atom/button/button";
import styles from "./_member_item.module.scss";
import trashCan from "/public/assets/svg/myPage/trash-can.svg";
import memberCircle from "/public/assets/svg/myPage/member-circle.svg";

export default function MemberItem() {
  return (
    <div className={styles.container}>
      <span className={styles["profile-container"]}>
        <img
          src={memberCircle}
          width={20}
          height={20}
          className={styles["profile-image"]}
        />
        <p className={styles.name}>최바로</p>
      </span>

      <div className={styles["button-container"]}>
        <Button color="secondary" size="xsmall">
          스터디장 위임
        </Button>
        <Button
          className={styles.button}
          icon={<img src={trashCan} width={16} height={16} />}
          iconOnly
        />
      </div>
    </div>
  );
}
