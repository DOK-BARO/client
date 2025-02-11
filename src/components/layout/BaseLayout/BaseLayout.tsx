import { Outlet, useNavigate } from "react-router-dom";
import styles from "./_base_layout.module.scss";
import HeaderLayout from "../HeaderLayout/HeaderLayout";
import { useAtom } from "jotai";
import { currentUserAtom, isUserLoadingAtom } from "@/store/userAtom.ts";
import { authService } from "@/services/server/authService.ts";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { userKeys } from "@/data/queryKeys";
import ROUTES from "@/data/routes";

export default function BaseLayout({
  showHeader = true,
}: {
  showHeader?: boolean;
}) {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [isUserLoading, setIsUserLoading] = useAtom(isUserLoadingAtom);
  const navigate = useNavigate();

  const handleCheckIsTermAllAgreed = async () => {
    const isAgreedAll = await authService.fetchIsTermsAgreed();
    if (isAgreedAll) {
      //console.log("회원가입 절차 완료");
      return;
    }

    //console.log("회원가입 절차 남음");
    // 약관 동의 되어있지 않으면
    const loggedInSocialType = localStorage.getItem("social");
    if (loggedInSocialType) {
      navigate(ROUTES.REGISTER(loggedInSocialType));
    }
  };

  useEffect(() => {
    if (!isUserLoading && currentUser) {
      // 사용자 패칭 후
      handleCheckIsTermAllAgreed();
    }
  }, [currentUser, isUserLoading]);

  const { data, isLoading } = useQuery({
    queryKey: userKeys.user(),
    queryFn: () => authService.fetchUser(true),
  });

  useEffect(() => {
    setIsUserLoading(isLoading);
    if (data) {
      setCurrentUser(data);
      setIsUserLoading(false);
    }
  }, [data, isLoading]);

  return (
    <div className={styles["container"]}>
      {showHeader && <HeaderLayout />}

      <main className={styles[showHeader ? "main--header" : "main"]}>
        <div className={styles["inner-container"]}>
          <Outlet />
        </div>
      </main>
      <footer className={styles["footer"]}></footer>
    </div>
  );
}
