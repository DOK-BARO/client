import { useState, useEffect } from "react";

const useDeviceType = () => {
  const [device, setDevice] = useState<"mobile" | "tablet" | "pc">("pc");

  useEffect(() => {
    const updateDevice = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setDevice("mobile");
      } else if (width <= 1024) {
        setDevice("tablet");
      } else {
        setDevice("pc");
      }
    };

    updateDevice();
    window.addEventListener("resize", updateDevice);
    return () => window.removeEventListener("resize", updateDevice);
  }, []);

  return device;
};
export default useDeviceType;
