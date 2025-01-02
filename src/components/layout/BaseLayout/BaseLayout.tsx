import { Outlet } from "react-router-dom";
import styles from "./_base_layout.module.scss";
import HeaderLayout from "../HeaderLayout/HeaderLayout";
import { useAtom } from "jotai";
import { currentUserAtom } from "@/store/userAtom.ts";
import { authService } from "@/services/server/authService.ts";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { userKeys } from "@/data/queryKeys";

export default function BaseLayout({ showHeader = true }: { showHeader?: boolean }) {
	const [, setCurrentUser] = useAtom(currentUserAtom);

	const { isLoading, data, isError } = useQuery({
		queryKey: userKeys.user(),
		queryFn: () => authService.fetchUser(),
	});

	useEffect(() => {
		setCurrentUser(data!);
	}, [data]);

	if (isLoading) {
		return <div>"로딩중"</div>;
	}

	if (isError) {
		return <div>로그인 에러</div>;
	}

	return (
		<div className={styles["container"]}>
			{showHeader && <HeaderLayout />}

			<main className={styles[showHeader ? "main--header" : "main"]}>
				<div className={styles["inner-container"]}>
					<Outlet />
				</div>
			</main>
			<footer className={styles["footer"]}></footer>
		</div>
	);
}
