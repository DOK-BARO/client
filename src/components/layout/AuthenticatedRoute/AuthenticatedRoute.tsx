import useLoginModal from "@/hooks/useLoginModal";
import { closeLoginModalAndNavigateToRootAtom } from "@/store/authModalAtom";
import { isLoggedInAtom, isUserLoadingAtom } from "@/store/userAtom";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

// 권환 확인이 필요한 페이지
// 로그인 여부를 파악하고 로그인 하지 않았으면 로그인 모달 띄움. 이 때, 로그인 모달을 끌 경우 ROOT 페이지로 navigate.
export default function AuthenticatedRoute() {
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [isUserLoading] = useAtom(isUserLoadingAtom);
  const [, setCloseLoginModalAndNavigateToRoot] = useAtom(
    closeLoginModalAndNavigateToRootAtom,
  );

  const { openLoginModal } = useLoginModal();

  useEffect(() => {
    if (!isUserLoading && !isLoggedIn) {
      setCloseLoginModalAndNavigateToRoot(true);
      openLoginModal();
    }
  }, [isUserLoading, isLoggedIn]);

  if (isUserLoading) return null;

  return <Outlet />;
}
