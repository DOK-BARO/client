import ROUTES from "@/data/routes";
import useLoginModal from "@/hooks/useLoginModal";
import { isLoggedInAtom } from "@/store/userAtom";
import { useAtom } from "jotai";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthenticatedRoute() {
  const navigate = useNavigate();
  const { openLoginModal } = useLoginModal();
  const [isLoggedIn] = useAtom(isLoggedInAtom);

  if (!isLoggedIn) {
    navigate(ROUTES.ROOT);
    openLoginModal();
  }
  return <Outlet />
}