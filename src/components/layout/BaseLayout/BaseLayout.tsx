import { Outlet, useNavigate } from "react-router-dom";
import styles from "./_base_layout.module.scss";
import HeaderLayout from "../HeaderLayout/HeaderLayout";
import { useAtom } from "jotai";
import { currentUserAtom, isUserLoadingAtom } from "@/store/userAtom.ts";
import { authService } from "@/services/server/authService.ts";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { userKeys } from "@/data/queryKeys";
import ROUTES from "@/data/routes";
import useDeviceType from "@/hooks/useDeviceType";
import mobileImage1 from "/public/assets/image/mobile/mobile-image1.png";
import mobileImage2 from "/public/assets/image/mobile/mobile-image2.png";
import mobileImage3 from "/public/assets/image/mobile/mobile-image3.png";
import arrow from "/public/assets/image/mobile/arrow.png";

export default function BaseLayout({
  showHeader = true,
}: {
  showHeader?: boolean;
}) {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [isUserLoading, setIsUserLoading] = useAtom(isUserLoadingAtom);
  const navigate = useNavigate();
  const device = useDeviceType();
  const [mounted, setMounted] = useState(false);

  const handleCheckIsTermAllAgreed = async () => {
    const isAgreedAll = await authService.fetchIsTermsAgreed();
    if (isAgreedAll) {
      return;
    }

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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return device === "pc" || device === "tablet" ? (
    <div className={styles["container"]}>
      {showHeader && <HeaderLayout />}

      <main className={styles[showHeader ? "main--header" : "main"]}>
        <div className={styles["inner-container"]}>
          <Outlet />
        </div>
      </main>
      <footer className={styles["footer"]}></footer>
    </div>
  ) : (
    // mobile
    <div className={styles["mobile-container"]}>
      <main>
        {/* 이미지 */}
        <picture>
          {/* 작은 화면 (모바일) */}
          <source
            srcSet={mobileImage1}
            media="(max-width: 375px)"
            sizes="100vw"
          />
          {/* 중간 화면 (태블릿) */}
          <source
            srcSet={mobileImage2}
            media="(max-width: 440px)"
            sizes="100vw"
          />
          {/* 기본 이미지 */}
          <source
            srcSet={mobileImage3}
            media="(max-width: 700px)"
            sizes="100vw"
          />
          <img
            srcSet={mobileImage3}
            alt=""
            width={700}
            className={styles["mobile-image"]}
          />
        </picture>

        <h2 className={styles.title}>
          원활한 이용을 위해 PC 및 태블릿
          <br />
          환경에서 접속해 주세요.
        </h2>
        <p className={styles.description}>
          모바일에서 이용하실 수 있도록 준비중이에요!
        </p>
      </main>
      <footer>
        <div className={styles["note-container"]}>
          <p className={styles.note}>
            편한 곳으로 공유하고
            <br />
            <strong>PC</strong>로 바로 열어보세요!
          </p>
          <img src={arrow} width={104} alt="" />
        </div>
      </footer>
    </div>
  );
}
