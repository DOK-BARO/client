import { AnswerImageType } from "@/pages/SolveQuiz";
import styles from "./_image_layer.module.scss";
import Button from "@/components/atom/Button/Button";
import { Close } from "@/svg/Close";
import { gray100 } from "@/styles/abstracts/colors";
import leftArrow from "/public/assets/svg/imageLayer/leftArrow.svg";
import rightArrow from "/public/assets/svg/imageLayer/rightArrow.svg";
import { useEffect } from "react";

interface Props {
  image: AnswerImageType;
  onLeftArrowClick: (e: React.MouseEvent) => void;
  onRightArrowClick: (e: React.MouseEvent) => void;
  onCloseLayer: () => void;
}

export default function ImageLayer({
  image,
  onLeftArrowClick,
  onRightArrowClick,
  onCloseLayer,
}: Props) {
  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div
      className={styles.background}
      data-no-dnd="true"
      onClick={onCloseLayer}
    >
      <Button
        className={styles.close}
        iconOnly
        onClick={onCloseLayer}
        icon={
          <div className={styles["close-button-container"]}>
            <Close
              width={22}
              height={22}
              stroke={gray100}
              strokeWidth={2.5}
              alt="닫기 버튼"
            />
          </div>
        }
      />
      <Button
        onClick={(e) => onLeftArrowClick(e)}
        iconOnly
        icon={<img src={leftArrow} width={40} height={40} alt="" />}
        className={styles["arrow-left"]}
      />
      <img
        className={styles.image}
        src={image.src}
        alt={`해설 이미지 ${image.index + 1}`}
      />
      <Button
        onClick={(e) => onRightArrowClick(e)}
        iconOnly
        icon={<img src={rightArrow} width={40} height={40} alt="" />}
        className={styles["arrow-right"]}
      />
    </div>
  );
}
