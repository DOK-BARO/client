import styles from "./_mypage.module.scss"
import { Step } from "@/types/StepType";
import MyPageSteps from "./layout/myPageSteps/myPageSteps";
export default function Index() {
    const steps: Step[] = [
        {
            title: "내 퀴즈",
            subSteps: [
                {
                    title: "만든 퀴즈",
                },
                {
                    title: "푼 퀴즈",
                }
            ],
        },
        {
            title: "내 스터디",
        }
    ];

    return (
        <section className={styles["container"]}>
            <h2 className={styles["sr-only"]}>마이페이지</h2>
        <MyPageSteps steps={steps}/>
        
        </section>
    );

}