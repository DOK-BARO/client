import { useNavigate } from "react-router-dom";
import styles from "./_not_found.module.scss";
import Button from "@/components/atom/button/button";

export default function NotFound() {
	const errorImgPath = "/public/assets/svg/notFoundPage/404ErrorImage.svg"
	const navigate = useNavigate();
	const handleGoToHome = () => {
		navigate('/');
	}
	return (
		<div className={styles["container"]}>
			<img src={errorImgPath} alt="없는 페이지 입니다."/>
			<Button 
			color="primary"
			size="medium"
			onClick={handleGoToHome}
			className={styles["home-btn"]}
			>홈으로 이동
			</Button>
			</div>
	);
}