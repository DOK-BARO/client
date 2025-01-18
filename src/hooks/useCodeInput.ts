import { useState } from "react";

const useCodeInput = () => {
  const [codeList, setCodeList] = useState<string[]>(Array(6).fill(""));
  const combinedCode: string = codeList.join("");

  const handleCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    // setIsMatch(undefined);
    let { value } = e.target;
    if (value.length > 1) return;

    value = value.toUpperCase();

    const newCodeList = [...codeList];

    if (value) {
      newCodeList[index] = value;
      setCodeList(newCodeList);

      // 다음 인풋으로 포커스
      if (index < 5) {
        setTimeout(() => {
          const nextInput = document.getElementById(`code-input-${index + 1}`);
          if (nextInput) {
            (nextInput as HTMLInputElement).focus();
          }
        }, 0);
      }
    } else {
      newCodeList[index] = "";
      setCodeList(newCodeList);

      // 이전 인풋으로 포커스
      if (index > 0) {
        setTimeout(() => {
          const prevInput = document.getElementById(`code-input-${index - 1}`);
          if (prevInput) {
            (prevInput as HTMLInputElement).focus();
          }
        }, 0);
      }
    }
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && codeList[index] === "") {
      if (index > 0) {
        setTimeout(() => {
          const prevInput = document.getElementById(`code-input-${index - 1}`);
          if (prevInput) {
            (prevInput as HTMLInputElement).focus();
          }
        }, 0);
      }
    }
  };
  return { handleCodeChange, handleKeyDown, combinedCode, codeList };
};
export default useCodeInput;
