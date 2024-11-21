import { Step } from "@/types/StepType";
import styles from "./_my_page_layout.module.scss";
import Button from "@/components/atom/button/button";
import { useNavigate } from "react-router-dom";
export default function MyPageLayout({ steps,
  currentStep,
}: {
  steps: Step[];
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const getCurrentStep = (): Step => {
    const step = steps[currentStep];
    if (step) return step;

    const truncatedStep = Math.trunc(currentStep);
    return steps[truncatedStep]!.subSteps!.find(
      (subStep) => subStep.order === currentStep
    )!;
  };

  const step: Step = getCurrentStep();

  const title = step?.subSteps?.[0].title
    ? step.subSteps?.[0].title
    : step!.title;

  const navigate = useNavigate();

  return (
    <section className={styles["container"]}>
      <h2>📝 {title}</h2>
      <section className={styles["list-section"]}>
        <ListHeader title="내가 만든 퀴즈" />
        <NoData title={"아직 내가 만든 퀴즈가 없어요. 😞"} buttonName="퀴즈 만들러 가기"
          onClick={() =>{ navigate("/create-quiz") }}
        />
        {/* TODO: 리스트 */}
      </section>

      <section className={styles["list-section"]}>
        <ListHeader title="내가 푼 퀴즈" />
        <NoData title={"아직 내가 푼 퀴즈가 없어요. 😞"} buttonName="퀴즈 풀러 가기"
          onClick={() => () => { }}
        />
        <div></div>
        {/* TODO: 리스트 */}
      </section>
    </section>
  );
}

const ListHeader = ({ title }: { title: string }) => {
  return (
    <p className={styles["list-header"]}>
      <p>{title}</p>
      <span className={styles["button-area"]}>
        <button>최신순</button>
        <button>가나다순</button>
      </span>
    </p>
  );
}

const NoData = ({ title, buttonName, onClick }: { title: string, buttonName: string,onClick: (e: React.MouseEvent<HTMLButtonElement>) => void }) => {

  return (
    <div className={styles["no-data"]}>
      <p>{title}</p>
      <Button
        onClick={onClick}
        color="primary"
      >{buttonName}</Button>
    </div>
  );
}