import styles from "./_header_menu_button.module.scss";
import { useDropDownList } from "@/hooks/useDropDownList.ts";
import Button from "@/components/atom/Button/Button.tsx";
import HeaderMenuList from "../HeaderMenuList/HeaderMenuList.tsx";
import { Person } from "@/svg/Person.tsx";
import { useAtom } from "jotai";
import { isLoggedInAtom } from "@/store/userAtom.ts";
import { currentUserAtom } from "@/store/userAtom.ts";

export default function HeaderMyInfoUtilButton() {
	const [isLoggedIn] = useAtom(isLoggedInAtom);
	const [currentUser] = useAtom(currentUserAtom);

	const {
		isOpenDropDownList,
		anchorEl,
		openDropDownList,
		closeDropDownList,
		dropDownListRef,
	} = useDropDownList();

	if (!isLoggedIn) {
		return null;
	}
	
	return (
		<div
			className={styles["header-my-info-util-container"]}
			ref={dropDownListRef}
		>
			<Button
				color="transparent"
				onClick={openDropDownList}
				iconOnly
				className={styles.profile}
				icon={
					currentUser ? (
						<img src={currentUser.profileImage ?? ""} width={40} height={40} />
					) : (
						<Person width={40} height={40} />
					)
				}
			/>
			{isOpenDropDownList && anchorEl && (
				<HeaderMenuList closeDropDownList={closeDropDownList} />
			)}
		</div>
	);
}
