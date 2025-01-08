import styles from "./_header_menu_list.module.scss";
import React from "react";
import { Quiz } from "@/svg/Quiz";
import { Study } from "@/svg/Study";
import { Info } from "@/svg/Info";
import { SVGProps } from "@/types/SVGProps.ts";
import { ICON_SIZE } from "@/data/constants.ts";
import { gray70 } from "@/styles/abstracts/colors.ts";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { currentUserAtom } from "@/store/userAtom";
import ROUTES from "@/data/routes";
import useLogout from "@/hooks/mutate/useLogout";

type HeaderMenuListItem = {
	Icon: React.FC<SVGProps>;
	content: string;
};

const iconProps = { width: ICON_SIZE, height: ICON_SIZE, color: gray70 };

const headerMenuListItems: HeaderMenuListItem[] = [
	{
		Icon: Quiz,
		content: "내 퀴즈",
	},
	{
		Icon: Study,
		content: "스터디 관리",
	},
	{
		Icon: Info,
		content: "도움말",
	},
];

type Props = {
	closeDropDownList: () => void;
};

export default function HeaderMenuList({ closeDropDownList }: Props) {
	const [currentUser] = useAtom(currentUserAtom);
	const { logout } = useLogout();
	const navigate = useNavigate();


	const handleLogout = () => {
		closeDropDownList();
		logout();
	};

	// const nickName =
	//   (currentUser?.nickname.length ?? 0) > 5
	//     ? `${currentUser?.nickname.slice(0, 6) + "..."}`
	//     : currentUser?.nickname;

	return (
		<ul className={styles["header-menu-list"]}>
			<li className={styles["user-info-container"]}>
				<button
					className={styles["user-info"]}
					onClick={() => {
						navigate(ROUTES.MY_PAGE);
					}}
				>
					<span className={styles["user-name"]}>
						{currentUser?.nickname} 님
					</span>
					<span className={styles["user-email"]}>{currentUser?.email}</span>
				</button>
			</li>
			<div className={styles["header-menu-list-item-container"]}>
				{headerMenuListItems.map((item) => (
					<HeaderMenuListItem
						key={item.content}
						Icon={item.Icon}
						content={item.content}
					/>
				))}
			</div>
			<li className={styles["logout"]} onClick={handleLogout}>
				로그아웃
			</li>
		</ul>
	);
}

function HeaderMenuListItem({ Icon, content }: HeaderMenuListItem) {
	return (
		<li className={styles["header-menu-list-item"]}>
			<Icon {...iconProps} />
			<span>{content}</span>
		</li>
	);
}
