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
import share from "/public/assets/svg/myPage/share.svg";
import useModal from "@/hooks/useModal";
import StudyCodeShareModal from "../StudyCodeShareModal/StudyCodeShareModal";

interface Props {
  studyGroup: StudyGroupType;
}

export default function StudyGroupItem({ studyGroup }: Props) {
  const navigate = useNavigate();
  const [, setStudyGroup] = useAtom(studyGroupAtom);
  const [currentUser] = useAtom(currentUserAtom);

  const {
    isModalOpen: isStudyCodeShareModalOpen,
    closeModal: closeStudyCodeShareModal,
    openModal: openStudyCodeShareModal,
  } = useModal();

  // 스터디 그룹 상세
  const handleGoToStudyDetail = () => {
    navigate(ROUTES.STUDY_GROUP(studyGroup.id));
    setStudyGroup({
      id: studyGroup.id,
      name: studyGroup.name,
    });
  };

  return (
    <li className={styles.container}>
      {isStudyCodeShareModalOpen ? (
        <StudyCodeShareModal
          closeModal={closeStudyCodeShareModal}
          studyGroupId={studyGroup.id}
          title="초대하기"
        />
      ) : null}
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
        <div className={styles["info-header"]}>
          <p className={styles.name}>{studyGroup.name || "\u00A0"}</p>
          <Button
            className={styles["share-study-code-button"]}
            icon={<img src={share} alt="" width={18} height={18} />}
            iconOnly
            onClick={() => {
              openStudyCodeShareModal();
            }}
            ariaLabel="스터디 코드 공유하기"
          />
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
          onClick={handleGoToStudyDetail}
        >
          스터디 그룹 상세
        </Button>
      </div>
    </li>
  );
}
