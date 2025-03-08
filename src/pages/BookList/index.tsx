import { useEffect } from "react";
import BookListLayout from "./layout/BookListLayout/BookListLayout";
import { useLocation } from "react-router-dom";
import useLoginModal from "@/hooks/useLoginModal";
import LoginModal from "@/components/composite/LoginModal/LoginModal";

export default function Index() {
  const { isLoginModalOpen, openLoginModal, closeLoginModal } = useLoginModal();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.openModal) {
      openLoginModal();
    }
  }, [location.state]);
  return (
    <>
      <BookListLayout />
      {isLoginModalOpen && <LoginModal closeModal={closeLoginModal} />}
    </>
  );
}
