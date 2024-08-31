import Button from "../atom/button.tsx";
import styles from "../../styles/composite/_header_menu_button.module.scss";
import PersonIcon from "@mui/icons-material/Person";
import React, { useEffect, useRef, useState } from "react";
import LoginModal from "./loginModal.tsx";
import useModal from "../../hooks/useModal.ts";
// TODO : scss 파일 분리 및 import 다시 해야 함
function HeaderMyInfoUtilButton ({ isLoggedIn }: { isLoggedIn : boolean }) {
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

  if (!isLoggedIn) {
    return null;
  }

  return (
    //TODO: 로그인 했을때만 보이도록 구현 필요, 리스트 내용물도 변경 필요
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

export default HeaderMyInfoUtilButton;