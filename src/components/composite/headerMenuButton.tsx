import Button from "../atom/button.tsx";
import styles from "../../styles/composite/_header_menu_button.module.scss";
import PersonIcon from "@mui/icons-material/Person";
import React, { useEffect, useRef, useState } from "react";
import LoginModal from "./loginModal.tsx";
import useModal from "../../hooks/useModal.ts";

const HeaderMenuButton: React.FC = () => {
  const [isOpenHeaderMenuList, setIsOpenHeaderMenuList] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const { isModalOpen: isLoginModalOpen, openModal: openLoginModal, closeModal: closeLoginModal } = useModal();

  // 모달을 감싸고 있는 div 참조
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outSideClick = (e: MouseEvent) => {
      const { target } = e;
      if (isOpenHeaderMenuList && modalRef.current && !modalRef.current.contains(target as Node)) {
        setIsOpenHeaderMenuList(false);
      }
    };
    document.addEventListener("mousedown", outSideClick);
    return () => {
      document.removeEventListener("mousedown", outSideClick);
    };
  }, [isOpenHeaderMenuList]);

  const openHeaderMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpenHeaderMenuList(!isOpenHeaderMenuList);
  };

  const closeHeaderMenu = () => {
    setIsOpenHeaderMenuList(false);
  };

  return (
    <div className={styles["header-menu-container"]} ref={modalRef}>
      <Button className={styles["header-menu-button"]} onClick={openHeaderMenu}>
        <PersonIcon/>
      </Button>
      {isOpenHeaderMenuList && anchorEl &&
        (<ul className={styles["header-menu-list"]}>
          <li onClick={() => {
            openLoginModal();
            closeHeaderMenu();
          }}>로그인
          </li>
          <li onClick={closeHeaderMenu}>마이페이지</li>
        </ul>)}
      {isLoginModalOpen && <LoginModal closeModal={closeLoginModal}/>}

    </div>
  );
};

export default HeaderMenuButton;