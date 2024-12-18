// import { useQueryCurrentUser } from "@/hooks/useQueryCurrentUser";
import Button from "@/components/atom/button/button";
import styles from "./account_setting.module.scss";
import ProfileImageEditor from "../../components/profileImageEditor/profileImageEditor";
import { currentUserAtom } from "@/store/userAtom";
import { useAtom } from "jotai";
import { useState } from "react";
export default function EditMyInfo() {
  const [currentUser] = useAtom(currentUserAtom);
  const [profileImage, setProfileImage] = useState<string[]>([]);

  return (
    <>
      <section className={styles["setting-img"]}>
        <h3 className={styles["title"]}>프로필 사진 설정</h3>
        <ProfileImageEditor
          width={200}
          initialImage={currentUser?.profileImage}
          profileImage={profileImage}
          setProfileImage={setProfileImage}
        />
      </section>
      <section className={styles["setting-email"]}>
        <h2 className={styles["title"]}>가입 이메일 설정</h2>
        <div className={styles["change-email"]}>
          {/* <span>{user?.email}</span> */}
          <Button color="primary">이메일 바꾸기</Button>
        </div>
      </section>
    </>
  );
}
