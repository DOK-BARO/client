import { useState } from "react";

interface ValidationRule {
  rule: (value: string) => boolean;
  message: string;
}
interface UseInputReturn {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validations: { [key: string]: boolean };
  resetInput: (newInitialValue?: string) => void;
  isValid: boolean | undefined;
}

const useInput = (
  initialValue: string,
  validationRules: ValidationRule[] = [],
): UseInputReturn => {
  const [value, setValue] = useState<string>(initialValue);

  const initialValidations = validationRules.reduce(
    (acc, rule) => ({
      ...acc,
      [rule.message]: false,
    }),
    {},
  );
  const [validations, setValidations] = useState<{ [key: string]: boolean }>(
    initialValidations,
  );
  const [isValid, setIsValid] = useState<boolean | undefined>(undefined);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    const newValidations = validationRules.reduce(
      (acc, rule) => ({
        ...acc,
        [rule.message]: rule.rule(inputValue),
      }),
      {},
    );
    setValidations(newValidations);

    const allValid = Object.values(newValidations).every((isValid) => isValid);
    setIsValid(allValid ? true : false);
    // }

    if (!inputValue) {
      setIsValid(undefined);
      // setValidations({});
    }
  };
  const resetInput = (newInitialValue: string | undefined = initialValue) => {
    setValue(newInitialValue);
    setIsValid(undefined);
    setValidations({});
  };

  return { value, onChange, resetInput, validations, isValid };
};
export default useInput;
