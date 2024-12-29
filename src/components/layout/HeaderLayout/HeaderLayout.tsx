import HeaderLogo from "@/components/atom/HeaderLogo/HeaderLogo";
import SearchBar from "@/components/composite/SearchBar/SearchBar";
import HeaderUtilArea from "@/components/composite/HeaderUtilArea/HeaderUtilArea";
import styles from "./_header_layout.module.scss";
import GNB from "../Gnb/Gnb";
import { UserType } from "@/types/UserType";

type Props = {
  isLoggedIn: boolean;
  currentUser: UserType | null;
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
