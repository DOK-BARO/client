import { StudyGroupType } from "@/types/StudyGroupType";
import styles from "./_study_group_item.module.scss";
import Button from "@/components/atom/button/button";
interface Prop {
  study: StudyGroupType;
}

export default function StudyGroupItem({ study }: Prop) {
  return (
    <li className={styles.container}>
      {study.profileImageUrl ? (
        <img
          className={styles["profile-image"]}
          src={study.profileImageUrl}
          alt={study.name}
        />
      ) : (
        <div className={styles["profile-image"]} />
      )}
      <div className={styles.info}>
        <p className={styles.name}>{study.name}</p>
        <span>
          <p>7명</p>
        </span>
        <Button
          fullWidth
          size="small"
          color="primary"
          className={styles["more-info"]}
        >
          스터디 그룹 정보
        </Button>
      </div>
    </li>
  );
}
