import Button from "@/components/atom/Button/Button";
import styles from "./_member_item.module.scss";
import { TrashCan } from "@/svg/QuizWriteForm/TrashCan";
import exit from "/public/assets/svg/myPage/exit.svg";
import memberCircle from "/public/assets/svg/myPage/memberCircle.svg";
import { StudyMemberType } from "@/types/StudyGroupType";
import { gray60 } from "@/styles/abstracts/colors";
import { useAtom } from "jotai";
import { currentUserAtom } from "@/store/userAtom";
interface Props {
  member: StudyMemberType;
  onChangeLeaderClick: () => void;
  onRemoveStudyMemberClick: () => void;
  onLeaveStudyClick: () => void;
  isStudyGroupLeader: boolean;
}

export default function MemberItem({
  member,
  onChangeLeaderClick,
  onRemoveStudyMemberClick,
  onLeaveStudyClick,
  isStudyGroupLeader,
}: Props) {
  const [currentUser] = useAtom(currentUserAtom);
  const isMe: boolean = currentUser?.id === member.id;
  return (
    <div className={styles.container} key={member.id}>
      <span
        className={`${styles["profile-container"]} ${isMe ? styles["is-me"] : ""}`}
      >
        <img
          src={member.profileImageUrl ?? memberCircle}
          width={20}
          height={20}
          className={styles["profile-image"]}
          alt=""
        />
        <p className={styles.name}>{member.nickname}</p>
      </span>

      {isStudyGroupLeader ? (
        <div className={styles["button-container"]}>
          <Button color="secondary" size="xsmall" onClick={onChangeLeaderClick}>
            스터디장 위임
          </Button>
          <Button
            className={styles.button}
            icon={<TrashCan width={16} height={16} stroke={gray60} alt="" />}
            iconOnly
            onClick={onRemoveStudyMemberClick}
            ariaLabel="스터디원 내보내기"
          />
        </div>
      ) : isMe ? (
        <div className={styles["button-container"]}>
          <Button
            className={styles.button}
            icon={<img src={exit} alt="" width={16} height={16} />}
            iconOnly
            onClick={onLeaveStudyClick}
            ariaLabel="스터디 탈퇴"
          />
        </div>
      ) : null}
    </div>
  );
}
