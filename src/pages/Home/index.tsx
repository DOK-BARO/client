import BookList from "@/pages/Home/components/composite/bookList/bookList.tsx";
import useModal from "@/hooks/useModal.ts";
import LoginModal from "@/components/composite/loginModal/loginModal.tsx";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Index() {
  const { isModalOpen,openModal,closeModal } = useModal();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.openModal) {
      openModal();
    }
  }, [location.state]);

  return (
    <>
      <BookList />
      {isModalOpen && <LoginModal closeModal={closeModal}/>}
    </>
  );
}
