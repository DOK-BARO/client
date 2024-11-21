import BookList from "@/pages/Home/components/composite/bookList/bookList.tsx";
import useModal from "@/hooks/useModal.ts";
import LoginModal from "@/components/composite/loginModal/loginModal.tsx";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LNB from "@/components/layout/lnb/lnb";
import styles from "./_home.module.scss";

export default function Index() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.openModal) {
      openModal();
    }
  }, [location.state]);

  return (
    <section className={styles.container}>
      <LNB />
      <BookList />
      {isModalOpen && <LoginModal closeModal={closeModal} />}
    </section>
  );
}
