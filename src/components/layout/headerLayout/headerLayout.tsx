import HeaderLogo from "@/components/atom/headerLogo/headerLogo";
import SearchBar from "@/components/composite/searchBar/searchBar";
import HeaderUtilArea from "@/components/composite/headerUtilArea/headerUtilArea";
import styles from "./_header_layout.module.scss";

type Props = {
  isLoggedIn: boolean;
};

export default function HeaderLayout({ isLoggedIn }: Props) {
  return (
    <header className={styles["header-container"]}>
      <div className={styles["header-inner-container"]}>
        <HeaderLogo />
        <SearchBar />
        <HeaderUtilArea isLoggedIn={isLoggedIn} />
      </div>
    </header>
  );
}
