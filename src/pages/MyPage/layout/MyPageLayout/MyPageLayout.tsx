import { useAtom } from "jotai";
import styles from "./_my_page_layout.module.scss";
import { Outlet, useNavigate } from "react-router-dom";
import {
  isStudyGroupSettingPageAtom,
  myPageTitleAtom,
  studyGroupAtom,
} from "@/store/myPageAtom";
import Button from "@/components/atom/Button/Button";
import ROUTES from "@/data/routes";

export default function MyPageLayout() {
  const navigate = useNavigate();
  const [myPageTitle] = useAtom(myPageTitleAtom);
  const [studyGroup] = useAtom(studyGroupAtom);
  const isStudyGroupPage = myPageTitle !== "마이페이지";
  const [isStudyGroupSettingPage] = useAtom(isStudyGroupSettingPageAtom);

  const handleGoToStudyGroupSetting = () => {
		navigate(ROUTES.STUDY_GROUP_SETTING(studyGroup?.id));
  };

  return (
    <section className={styles["container"]}>
      <div className={styles["header-container"]}>
        <h2 className={styles.title}>{myPageTitle}</h2>
        {/* TODO: 관리 권한 있는지 확인 로직 추가 */}
        {isStudyGroupPage && !isStudyGroupSettingPage ? (
          <Button
            onClick={handleGoToStudyGroupSetting}
            color="secondary"
            size="xsmall"
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
