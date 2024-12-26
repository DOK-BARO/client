import HeaderLogo from "@/components/atom/headerLogo/headerLogo";
import SearchBar from "@/components/composite/searchBar/searchBar";
import HeaderUtilArea from "@/components/composite/headerUtilArea/headerUtilArea";
import styles from "./_header_layout.module.scss";
import GNB from "@/components/layout/gnb/gnb";
import { UserType } from "@/types/UserType";

type Props = {
  isLoggedIn: boolean;
  currentUser: UserType;
};

export default function HeaderLayout({ isLoggedIn, currentUser }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles["header-container"]}>
        <div className={styles["header-inner-container"]}>
          <HeaderLogo />
          <SearchBar />
          <HeaderUtilArea isLoggedIn={isLoggedIn} currentUser={currentUser} />
        </div>
      </div>
      <GNB />
    </header>
  );
}
