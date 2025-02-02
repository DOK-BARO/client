import BookList from "@/pages/Home/components/composite/BookList/BookList";
import LoginModal from "@/components/composite/LoginModal/LoginModal";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./_home.module.scss";
import useLoginModal from "@/hooks/useLoginModal";

export default function Index() {
  const { isLoginModalOpen, openLoginModal, closeLoginModal } = useLoginModal();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.openModal) {
      openLoginModal();
    }
  }, [location.state]);

  return (
    <section className={styles.container}>
      <BookList />
      {isLoginModalOpen && <LoginModal closeModal={closeLoginModal} />}
    </section>
  );
}
