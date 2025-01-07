import { useEffect } from "react";

const useInfiniteScroll = ({
  hasNextPage,
  fetchNextPage,
  observerRef,
}: {
  hasNextPage: boolean;
  fetchNextPage: () => void;
  observerRef: React.RefObject<HTMLElement>;
}) => {
  useEffect(() => {
    if (!hasNextPage) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 } // 요소가 완전히 보일 때
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage]);
};
export default useInfiniteScroll;
