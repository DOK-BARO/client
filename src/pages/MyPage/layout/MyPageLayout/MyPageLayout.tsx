import { useAtom } from "jotai";
import styles from "./_my_page_layout.module.scss";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  isStudyGroupMainPageAtom,
  myPageTitleAtom,
  studyGroupAtom,
} from "@/store/myPageAtom";
import Button from "@/components/atom/Button/Button";
import ROUTES from "@/data/routes";
import pencilLine from "/public/assets/svg/myPage/pencilLine.svg";
import { useEffect, useState } from "react";
import { currentUserAtom } from "@/store/userAtom";
export default function MyPageLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [myPageTitle] = useAtom(myPageTitleAtom);
  const [studyGroup] = useAtom(studyGroupAtom);
  const [currentUser] = useAtom(currentUserAtom);

  const [isStudyGroupMainPage] = useAtom(isStudyGroupMainPageAtom);
  const { studyGroupId } = useParams();

  const [isSettingPage, setIsSettingPage] = useState<boolean>(false);
  const isCurrentUserIsLeaderOfStudyGroup =
    currentUser?.id === studyGroup?.leaderId;

  const handleGoToStudyGroupSetting = () => {
    navigate(ROUTES.STUDY_GROUP_SETTING(studyGroup?.id));
  };

  const isStudyGroupSettingPage =
    studyGroupId && location.pathname.split("/").includes("setting");
  const isMySettingPage = location.pathname.split("/").includes("settings");
  useEffect(() => {
    if (isStudyGroupSettingPage || isMySettingPage) {
      setIsSettingPage(true);
    } else {
      setIsSettingPage(false);
    }
  }, [pathname, studyGroupId]);

  const handleGoToBack = () => {
    if (isStudyGroupSettingPage && studyGroupId) {
      navigate(ROUTES.STUDY_GROUP(Number(studyGroupId)));
    } else {
      navigate(ROUTES.MY_STUDY_GROUPS);
    }
  };

  return (
    <section className={styles["container"]}>
      <div className={styles["header-container"]}>
        {!isStudyGroupMainPage ? (
          <Button
            iconOnly
            icon={<div className={styles["back-button"]}>&larr;</div>}
            onClick={handleGoToBack}
            ariaLabel="뒤로가기"
          />
        ) : null}
        <h2 className={styles.title}>{myPageTitle}</h2>
        {/* TODO: 관리 권한 있는지 확인 로직 추가 */}
        {isCurrentUserIsLeaderOfStudyGroup &&
        !isStudyGroupMainPage &&
        !isSettingPage ? (
          <Button
            onClick={handleGoToStudyGroupSetting}
            color="secondary"
            size="xsmall"
            className={styles["setting-button"]}
            icon={<img src={pencilLine} width={16} height={16} alt="" />}
            iconPosition="left"
          >
            스터디 관리
          </Button>
        ) : null}
      </div>
      <section className={styles.content}>
        <Outlet />
      </section>
    </section>
  );
}
