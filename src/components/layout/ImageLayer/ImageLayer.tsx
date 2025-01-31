import { AnswerImageType } from "@/pages/SolveQuiz";
import styles from "./_image_layer.module.scss";
import Button from "@/components/atom/Button/Button";
import { Close } from "@/svg/Close";
import { gray100 } from "@/styles/abstracts/colors";
import leftArrow from "/public/assets/svg/imageLayer/left-arrow.svg";
import rightArrow from "/public/assets/svg/imageLayer/right-arrow.svg";
import { useEffect } from "react";

export default function ImageLayer({
  image,
  onLeftArrowClick,
  onRightArrowClick,
  onCloseLayer,
}: {
  image: AnswerImageType;
  onLeftArrowClick: () => void;
  onRightArrowClick: () => void;
  onCloseLayer: () => void;
}) {
  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div className={styles.background}>
      <Button
        className={styles.close}
        iconOnly
        onClick={onCloseLayer}
        icon={
          <div className={styles["close-button-container"]}>
            <Close width={22} height={22} stroke={gray100} strokeWidth={2.5} />
          </div>
        }
      />
      <Button
        onClick={onLeftArrowClick}
        iconOnly
        icon={<img src={leftArrow} width={40} height={40} />}
        className={styles["arrow-left"]}
      />
      <img
        className={styles.image}
        src={image.src}
        alt={`해설 이미지 ${image.index + 1}`}
      />
      <Button
        onClick={onRightArrowClick}
        iconOnly
        icon={<img src={rightArrow} width={40} height={40} />}
        className={styles["arrow-right"]}
      />
    </div>
  );
}
