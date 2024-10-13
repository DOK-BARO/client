import React from "react";
import styles from "./_toggle.module.scss";

interface ToggleProps {
  onClick?: () => void;
  isActive?: boolean;
}
export default function Toggle({ onClick = () => {}, isActive }: ToggleProps) {
  return (
    <div
      className={`${styles["toggle-container"]} ${
        isActive ? styles.on : styles.off
      }`}
    >
      <button
        className={`${styles["toggle"]} ${isActive ? styles.on : styles.off}`}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <div className={styles.circle} />
      </button>
    </div>
  );
}
