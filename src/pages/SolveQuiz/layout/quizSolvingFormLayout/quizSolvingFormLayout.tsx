import styles from "./quiz_solving_form_layout.module.scss";
import { Outlet } from "react-router-dom";

export default function QuizSolvingFormLayout() {
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
