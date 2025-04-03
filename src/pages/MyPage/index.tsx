import styles from "./_mypage.module.scss";
import MyPageLayout from "./layout/MyPageLayout/MyPageLayout";
import { SectionNavType } from "@/types/SectionNavType";
import MyPageSectionNav from "./layout/MyPageSectionNav/MyPageSectionNav";
import ROUTES from "@/data/routes";

export default function Index() {
  const sectionNavList: SectionNavType[] = [
    {
      title: "만든 퀴즈",
      link: ROUTES.MY_MADE_QUIZ,
    },
    {
      title: "푼 퀴즈",
      link: ROUTES.SOLVED_QUIZ,
    },
    {
      title: "작성 중인 퀴즈",
      link: ROUTES.DRAFT_QUIZ,
    },
    {
      title: "내 스터디",
      link: ROUTES.MY_STUDY_GROUPS,
    },
    {
      title: "계정 설정",
      link: ROUTES.SETTINGS,
      subTitles: [
        {
          title: "회원정보 수정",
          link: `${ROUTES.SETTINGS}/${ROUTES.EDIT_PROFILE}`,
        },
        {
          title: "비밀번호 변경",
          link: `${ROUTES.SETTINGS}/${ROUTES.CHANGE_PASSWORD}`,
        },
        {
          title: "회원 탈퇴",
          link: "settings/delete-account",
        },
      ],
    },
  ];

  return (
    <section className={styles["container"]}>
      <div className={styles["section-content"]}>
        <MyPageSectionNav sectionNavList={sectionNavList} />
        <MyPageLayout />
      </div>
    </section>
  );
}
