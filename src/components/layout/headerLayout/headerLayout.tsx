import styles from "../../styles/layout/_header_layout.module.scss";
import HeaderLogo from "../atom/headerLogo.tsx";
import HeaderUtilArea from "../composite/headerUtilArea.tsx";
import SearchBar from "../composite/searchBar.tsx";

type Props = {
  isLoggedIn: boolean
}

export default function HeaderLayout({ isLoggedIn }: Props)  {

  return (
    <header className={styles["header-container"]}>
      <div className={styles["header-inner-container"]}>
        <HeaderLogo/>
        <SearchBar />
        <HeaderUtilArea isLoggedIn={isLoggedIn}/>
      </div>
    </header>
  );
}