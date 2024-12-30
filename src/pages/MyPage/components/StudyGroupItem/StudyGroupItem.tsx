import { StudyGroupType } from "@/types/StudyGroupType";
import styles from "./_study_group_item.module.scss";
import Button from "@/components/atom/Button/Button";
import member from "/public/assets/svg/myPage/member.svg";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { studyGroupAtom } from "@/store/myPageAtom";
import { Leader } from "@/svg/leader";
import { gray50 } from "@/styles/abstracts/colors";
interface Prop {
  studyGroup: StudyGroupType;
}

export default function StudyGroupItem({ studyGroup }: Prop) {
  const navigate = useNavigate();
  const [, setStudyGroup] = useAtom(studyGroupAtom);

  // 스터디 그룹 정보
  const handleStudyInfoClick = () => {
    navigate(`/my/study-groups/${studyGroup.id}`);
    setStudyGroup({
      id: studyGroup.id,
      name: studyGroup.name,
    });
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
          <img src={member} width={16} height={16} alt="스터디 멤버" />
          <p>{studyGroup.studyMemberCount}명</p>
        </span>
        <span className={styles["icon-text-label"]}>
          <Leader width={16} height={16} fill={gray50} alt="스터디장" />
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
