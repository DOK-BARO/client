import styles from "../_layout.module.scss";
import { Outlet } from "react-router-dom";

export default function NoHeaderLayout() {
	return (
		<div className={styles["container"]}>
		<main className={styles["main"]}>
			<section className={styles["inner-container"]}>
				<Outlet />
			</section>
		</main>
		</div>
	);
}
