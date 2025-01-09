import { useAtom } from "jotai";
import styles from "./_my_page_layout.module.scss";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import {
  isStudyGroupMainPageAtom,
  myPageTitleAtom,
  studyGroupAtom,
} from "@/store/myPageAtom";
import Button from "@/components/atom/Button/Button";
import ROUTES from "@/data/routes";
import pencilLine from "/public/assets/svg/myPage/pencil-line.svg";
export default function MyPageLayout() {
  const navigate = useNavigate();
  const [myPageTitle] = useAtom(myPageTitleAtom);
  const [studyGroup] = useAtom(studyGroupAtom);

  const [isStudyGroupMainPage] = useAtom(isStudyGroupMainPageAtom);
  const { studyGroupId } = useParams();

  // TODO:
  // const isStudyGroupPage = (myPageTitle !== "마이페이지") && (myPageTitle !=="회원 탈퇴"); // TODO: 로직 수정해야 할 듯 합니다... 너무 하드코딩 한 듯 합니다ㅜ
  // const [isStudyGroupSettingPage] = useAtom(isStudyGroupSettingPageAtom);

  const handleGoToStudyGroupSetting = () => {
    navigate(ROUTES.STUDY_GROUP_SETTING(studyGroup?.id));
  };

  const handleGoToBack = () => {
    navigate(-1);
  };

  return (
    <section className={styles["container"]}>
      <div className={styles["header-container"]}>
        {!isStudyGroupMainPage ? (
          <Button
            iconOnly
            icon={<div className={styles["back-button"]}>&larr;</div>}
            onClick={handleGoToBack}
          />
        ) : null}
        <h2 className={styles.title}>{myPageTitle}</h2>
        {/* TODO: 관리 권한 있는지 확인 로직 추가 */}
        {studyGroupId ? (
          <Button
            onClick={handleGoToStudyGroupSetting}
            color="secondary"
            size="xsmall"
            className={styles["setting-button"]}
            icon={<img src={pencilLine} width={16} height={16} />}
            iconPosition="left"
          >
            스터디 그룹 관리
          </Button>
        ) : null}
      </div>
      <section className={styles.content}>
        <Outlet />
      </section>
    </section>
  );
}
