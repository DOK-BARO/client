import { StudyGroupType } from "@/types/StudyGroupType";
import styles from "./_study_group_item.module.scss";
import Button from "@/components/atom/Button/Button";
import member from "/public/assets/svg/myPage/member.svg";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { studyGroupAtom } from "@/store/myPageAtom";
import { Leader } from "@/svg/Leader";
import { primary } from "@/styles/abstracts/colors";
import ROUTES from "@/data/routes";
import { currentUserAtom } from "@/store/userAtom";
interface Prop {
  studyGroup: StudyGroupType;
}

export default function StudyGroupItem({ studyGroup }: Prop) {
  const navigate = useNavigate();
  const [, setStudyGroup] = useAtom(studyGroupAtom);
  const [currentUser] = useAtom(currentUserAtom);

  // 퀴즈 리스트 보기
  const handleGoToQuizList = () => {
    navigate(ROUTES.STUDY_GROUP(studyGroup.id));
    setStudyGroup({
      id: studyGroup.id,
      name: studyGroup.name,
    });
  };

  // 스터디원 관리
  const handleGoToMemberSetting = () => {
    navigate(ROUTES.STUDY_GROUP_SETTING(studyGroup.id));
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
        <div className={styles["name-button-container"]}>
          <p className={styles.name}>{studyGroup.name || "\u00A0"}</p>
          <Button
            size="xsmall"
            color="secondary"
            className={styles["member-setting"]}
            onClick={handleGoToMemberSetting}
          >
            스터디원 관리
          </Button>
        </div>
        <span className={styles["icon-text-label"]}>
          <img src={member} width={16} height={16} alt="스터디 멤버" />
          <p>{studyGroup.studyMemberCount}명</p>
        </span>
        <span
          className={`${styles["icon-text-label"]} ${
            currentUser?.id === studyGroup.leader?.id ? styles.active : null
          }`}
        >
          <Leader width={16} height={16} fill={primary} alt="스터디장" />
          <p>
            {currentUser?.id === studyGroup.leader?.id
              ? "나"
              : studyGroup.leader?.nickname}
          </p>
        </span>
        <Button
          fullWidth
          size="small"
          color="primary"
          className={styles["study-info"]}
          onClick={handleGoToQuizList}
        >
          퀴즈 리스트 보기
        </Button>
      </div>
    </li>
  );
}
