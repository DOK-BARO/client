import { useEffect, useRef } from "react";
import useTextarea from "./useTextarea";

const useAutoResizeTextarea = (initialValue = "", minHeight = "48px") => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { value, onChange, resetTextarea } = useTextarea(initialValue);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = minHeight;
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 내용에 따라 높이 조절
    }
  }, [value, initialValue, textareaRef.current]);

  return { value, onChange, textareaRef, resetTextarea };
};

export default useAutoResizeTextarea;
