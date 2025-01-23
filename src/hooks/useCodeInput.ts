import { useState } from "react";

const useCodeInput = () => {
  const [codeList, setCodeList] = useState<string[]>(Array(6).fill(""));
  const combinedCode: string = codeList.join("");

  const handleCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    // setIsMatch(undefined);
    console.log("?d");
    let { value } = e.target;
    console.log("code change", value);
    value = value.toUpperCase();
    const newCodeList = [...codeList];

    if (value.length > 1) {
      // 다음 인풋 포커스
      newCodeList[index + 1] = value[1];
      setCodeList(newCodeList);
      setTimeout(() => {
        const nextInput = document.getElementById(`code-input-${index + 2}`);
        if (nextInput) {
          (nextInput as HTMLInputElement).focus();
        }
      }, 0);

      return;
    }

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

  // const handl
  return { handleCodeChange, handleKeyDown, combinedCode, codeList };
};
export default useCodeInput;
