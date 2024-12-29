import styles from "./_mypage.module.scss";
import MyPageSectionNav from "./layout/myPageSectionNav/myPageSectionNav";
import MyPageLayout from "./layout/myPageLayout/myPageLayout";
import { SectionNavType } from "@/types/SectionNavType";

export default function Index() {
  const sectionNavList: SectionNavType[] = [
    {
      title: "만든 퀴즈",
      link: "made-quiz",
    },
    {
      title: "푼 퀴즈",
      link: "solved-quiz",
    },
    {
      title: "내 스터디 그룹",
      link: "study-groups",
    },
    {
      title: "계정 설정",
      link: "settings",
      subTitles: [
        {
          title: "회원정보 수정",
          link: "settings/edit-profile",
        },
        {
          title: "비밀번호 변경",
          link: "settings/change-password",
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
