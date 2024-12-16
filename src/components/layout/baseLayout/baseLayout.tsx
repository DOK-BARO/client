import { Outlet, useLocation } from "react-router-dom";
import styles from "./_base_layout.module.scss";
import HeaderLayout from "../headerLayout/headerLayout.tsx";
import { useAtom } from "jotai";
import { currentUserAtom, isLoggedInAtom } from "@/store/userAtom.ts";
import { authService } from "@/services/server/authService.ts";
import { useEffect } from "react";
// import { useQueryCurrentUser } from "@/hooks/useQueryCurrentUser.ts";

export default function BaseLayout() {
  // const { isLoggedIn, isLoading } = useQueryCurrentUser();

  // if (isLoading) {
  //   return <div className={styles["container"]}>"로딩중"</div>;
  // }
  const [, setCurrentUser] = useAtom(currentUserAtom);
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const { pathname } = useLocation();

  // 전역에 사용자 정보 저장
  const setLoggedInUser = async () => {
    const currentUser = await authService.fetchUser();
    setCurrentUser(currentUser);
  };

  useEffect(() => {
    setLoggedInUser();
  }, [pathname]);

  return (
    <div className={styles["container"]}>
      <HeaderLayout isLoggedIn={isLoggedIn} />

      <main className={styles["main"]}>
        <div className={styles["inner-container"]}>
          <Outlet />
        </div>
      </main>
      <footer className={styles["footer"]}></footer>
    </div>
  );
}
