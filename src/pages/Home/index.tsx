import BookList from "@/pages/Home/components/composite/BookList/BookList";
import useModal from "@/hooks/useModal.ts";
import LoginModal from "@/components/composite/LoginModal/LoginModal";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
      <BookList />
      {isModalOpen && <LoginModal closeModal={closeModal} />}
    </section>
  );
}
