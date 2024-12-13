import { Outlet, useLocation } from "react-router-dom";
import styles from "./_base_layout.module.scss";
import HeaderLayout from "../headerLayout/headerLayout.tsx";
import { useAtom } from "jotai";
import { CurrentUserAtom, IsLoggedInAtom } from "@/store/userAtom.ts";
import { authService } from "@/services/server/authService.ts";
import { useEffect } from "react";
// import { useQueryCurrentUser } from "@/hooks/useQueryCurrentUser.ts";

export default function BaseLayout() {
  // const { isLoggedIn, isLoading } = useQueryCurrentUser();

  // if (isLoading) {
  //   return <div className={styles["container"]}>"로딩중"</div>;
  // }
  const [currentUser, setCurrentUser] = useAtom(CurrentUserAtom);
  const [isLoggedIn] = useAtom(IsLoggedInAtom);
  const { pathname } = useLocation();

  const setUser = async () => {
    console.log("전역에 사용자 정보 저장");
    const currentUser = await authService.fetchUser();
    setCurrentUser(currentUser);
  };

  useEffect(() => {
    // 전역에 사용자 정보 저장
    setUser();
  }, [pathname]);

  return (
    <div className={styles["container"]}>
      <HeaderLayout isLoggedIn={isLoggedIn} />

      <main className={styles["main"]}>
        <div className={styles["inner-container"]}>
          <button onClick={() => console.log(currentUser)}>
            현재 로그인한 사용자
          </button>{" "}
          <button
            onClick={async () => {
              await authService.fetchUser();
            }}
          >
            fetch user
          </button>
          <Outlet />
        </div>
      </main>
      <footer className={styles["footer"]}></footer>
    </div>
  );
}
