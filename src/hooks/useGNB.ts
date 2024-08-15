import { useState } from "react";

const useGNB = () => {
  const [isGNBOpen, setIsGNBOpen] = useState(false);
  const openGNB = () => {
    setIsGNBOpen(true);
  };
  const closeGNB = () => {
    setIsGNBOpen(false);
  };
  return { isGNBOpen, openGNB, closeGNB };
};

export default useGNB;
