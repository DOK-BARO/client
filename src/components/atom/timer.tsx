import { FC, useEffect, useState } from "react";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import styles from "../../styles/components/_timer.module.scss";

interface TimerProps{
  initialTime: number;
  onTimerEnd: () => void;
}
const Timer: FC<TimerProps> = ({ initialTime, onTimerEnd }) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);

  useEffect(() => {
    if(timeLeft === 0){
      onTimerEnd();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime - 1));
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, onTimerEnd]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`

  return (
    <div className={styles["timer-container"]}>
      <AccessAlarmIcon className={styles["timer-icon"]}/>
      <span>{formattedTime}</span>
    </div>
  );
};

export default Timer;