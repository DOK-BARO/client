import { useCallback, useState } from "react";

export default function useTooltip() {
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);

  const showTooltip = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsTooltipVisible(true);
  }, []);

  const hideTooltip = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsTooltipVisible(false);
  }, []);

  return { isTooltipVisible, showTooltip, hideTooltip };
}
