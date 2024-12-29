import styles from "./_mypage.module.scss";
import MyPageSectionNav from "./layout/myPageSectionNav/myPageSectionNav";
import MyPageLayout from "./layout/myPageLayout/myPageLayout";
import { SectionNavType } from "@/types/SectionNavType";

export default function Index() {
  const sectionNavList: SectionNavType[] = [
    {
      order: 0,
      title: "만든 퀴즈",
      link: "made-quiz",
    },
    {
      order: 1,
      title: "푼 퀴즈",
      link: "solved-quiz",
    },
    {
      order: 2,
      title: "내 스터디 그룹",
      link: "study-groups",
    },
    {
      order: 3,
      title: "계정 설정",
      link: "settings",
      subTitles: [
        {
          order: 3.1,
          title: "회원정보 수정",
          link: "settings/edit-profile",
        },
        {
          order: 3.2,
          title: "비밀번호 변경",
          link: "settings/change-password",
        },
        {
          order: 3.3,
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
