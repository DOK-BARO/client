import { StudyGroupType } from "@/types/StudyGroupType";
import styles from "./_study_group_item.module.scss";
import Button from "@/components/atom/button/button";
import member from "/public/assets/svg/myPage/member.svg";
import leader from "/public/assets/svg/myPage/leader.svg";
import { useNavigate } from "react-router-dom";

interface Prop {
  studyGroup: StudyGroupType;
}

export default function StudyGroupItem({ studyGroup }: Prop) {
  const navigate = useNavigate();

  // 스터디 그룹 정보
  const handleStudyInfoClick = () => {
    navigate(`/my/study-groups/${studyGroup.id}`);
  };

  return (
    <li className={styles.container}>
      {studyGroup.profileImageUrl ? (
        <img
          className={styles["profile-image"]}
          src={studyGroup.profileImageUrl}
          alt={studyGroup.name}
        />
      ) : (
        <div className={styles["profile-image"]} />
      )}
      <div className={styles.info}>
        <p className={styles.name}>{studyGroup.name || "\u00A0"}</p>
        <span className={styles["icon-text-label"]}>
          <img src={member} width={16} height={16} />
          <p>{studyGroup.studyMemberCount}명</p>
        </span>
        <span className={styles["icon-text-label"]}>
          <img src={leader} width={16} height={16} />
          <p>{studyGroup.leader?.nickname}</p>
        </span>
        <Button
          fullWidth
          size="small"
          color="primary"
          className={styles["study-info"]}
          onClick={handleStudyInfoClick}
        >
          스터디 그룹 정보
        </Button>
      </div>
    </li>
  );
}
