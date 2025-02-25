import Button from "@/components/atom/Button/Button";
import styles from "./_member_item.module.scss";
import { TrashCan } from "@/svg/QuizWriteForm/TrashCan";
import memberCircle from "/public/assets/svg/myPage/memberCircle.svg";
import { StudyMemberType } from "@/types/StudyGroupType";
import { gray60 } from "@/styles/abstracts/colors";
interface Props {
  member: StudyMemberType;
  onChangeLeaderClick: () => void;
  onWithdrawMemberClick: () => void;
}

export default function MemberItem({
  member,
  onChangeLeaderClick,
  onWithdrawMemberClick,
}: Props) {
  return (
    <div className={styles.container} key={member.id}>
      <span className={styles["profile-container"]}>
        <img
          src={member.profileImageUrl ?? memberCircle}
          width={20}
          height={20}
          className={styles["profile-image"]}
          alt=""
        />
        <p className={styles.name}>{member.nickname}</p>
      </span>

      <div className={styles["button-container"]}>
        <Button color="secondary" size="xsmall" onClick={onChangeLeaderClick}>
          스터디장 위임
        </Button>
        <Button
          className={styles.button}
          icon={
            <TrashCan
              width={16}
              height={16}
              stroke={gray60}
              alt="멤버 내보내기 버튼"
            />
          }
          iconOnly
          onClick={onWithdrawMemberClick}
        />
      </div>
    </div>
  );
}
