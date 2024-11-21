import styles from "./_my_page_step.module.scss";
import { Step } from "@/types/StepType";
import Button from "@/components/atom/button/button";

export default function MyPageSteps({ steps }: { steps: Step[] }) {
    return (
        <aside className={styles["container"]}>
            {steps.map((step, index: number) => (
                <div key={index}>
                    <Button
                        onClick={() => { }}
                        value={step.title}
                    >
                        {step.title}
                    </Button>
                    {step.subSteps &&
                        step.subSteps.map((subStep, index: number) => (
                            <Button key={index}
                                value={subStep.title}
                                onClick={() => { }}
                                className={styles["sub-steps"]}
                            >
                                <div style={{ width: 20, height: 20 }} />
                                {subStep.title}
                            </Button>
                        ))
                    }
                </div>))}
        </aside>
    );
}