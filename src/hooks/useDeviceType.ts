import { useEffect, useState } from "react";

const useDeviceType = () => {
  const getInitialDevice = () => {
    if (typeof window === "undefined") return "pc";

    const width = window.innerWidth;
    if (width <= 768) return "mobile";
    if (width <= 1024) return "tablet";
    return "pc";
  };

  const [device, setDevice] = useState(getInitialDevice);

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

    let timeoutId: NodeJS.Timeout;
    const debouncedUpdateDevice = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDevice, 100);
    };

    window.addEventListener("resize", debouncedUpdateDevice);
    return () => {
      window.removeEventListener("resize", debouncedUpdateDevice);
      clearTimeout(timeoutId);
    };
  }, []);

  return device;
};

export default useDeviceType;
