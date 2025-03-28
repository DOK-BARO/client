import { useInfiniteQuery } from "@tanstack/react-query";
import styles from "./_review_list.module.scss";
import { reviewKeys } from "@/data/queryKeys";
import { reviewService } from "@/services/server/reviewService";
import ReviewItem from "../../components/ReviewItem/ReviewItem";
import ListFilter, {
  FilterOptionType,
} from "@/components/composite/ListFilter/ListFilter";
import { useAtom, useSetAtom } from "jotai";
import useFilter from "@/hooks/useFilter";
import { currentUserAtom } from "@/store/userAtom";
import { ReviewsFilterType, ReviewsSortType } from "@/types/FilterType";
import { parseQueryParams } from "@/utils/parseQueryParams";
import { useLocation } from "react-router-dom";
import { ReviewsFetchType } from "@/types/ParamsType";
import { ReviewType } from "@/types/ReviewType";
import { ErrorType } from "@/types/ErrorType";
import { useRef } from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { resetReviewFilter, reviewFilterAtom } from "@/store/filterAtom";
import LoadingSpinner from "@/components/atom/LoadingSpinner/LoadingSpinner";

// TODO: 분리하기
const filterOptions: FilterOptionType<ReviewsFilterType>[] = [
  {
    filter: {
      sort: "CREATED_AT",
      direction: "DESC",
    },
    label: "최신순",
  },
  {
    filter: {
      sort: "STAR_RATING",
      direction: "DESC",
    },
    label: "별점 높은 순",
  },
  {
    filter: {
      sort: "STAR_RATING",
      direction: "ASC",
    },
    label: "별점 낮은 순",
  },
];
interface Props {
  quizId: number;
  quizTitle: string;
}

export default function ReviewList({ quizId, quizTitle }: Props) {
  // const { navigateWithParams} = useNavigateWithParams("quiz");
  const [, setFilterCriteria] = useAtom(reviewFilterAtom);
  const setReviewFilter = useSetAtom(reviewFilterAtom);

  const { onOptionClick } = useFilter<ReviewsFilterType>({
    type: "queryString",
    setFilterCriteria,
    resetFilter: () => resetReviewFilter(setReviewFilter),
    parentPage: "quiz",
  });

  const [currentUser] = useAtom(currentUserAtom);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // const handleOptionClick = (filter: ReviewsFilterType) => {
  //   navigateWithParams({
  //     filter,
  //     parentPage: "quiz",
  //     itemId: quizId,
  //     excludeParams: ["page"],
  //   });
  // };

  // TODO: 페이지네이션
  const [filterCriteria] = useAtom(reviewFilterAtom);

  const sort = queryParams.get("sort") || "CREATED_AT"; // 기본값: 최신순
  const direction = queryParams.get("direction") || "DESC"; // 기본값: DESC
  const page = 1;
  const size = 10; // 한번에 불러올 최대 길이

  const {
    data: reviewsData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery<
    { endPageNumber: number; data: ReviewType[] },
    ErrorType,
    {
      pageParam: number[];
      pages: { endPageNumber: number; data: ReviewType[] }[];
    }
  >({
    queryKey: reviewKeys.list(
      parseQueryParams<ReviewsSortType, ReviewsFetchType>({
        sort,
        direction,
        page,
        size,
        quizId,
      }),
    ),
    queryFn: async ({ pageParam }) => {
      const result = await reviewService.fetchReviews(
        parseQueryParams({
          sort,
          direction,
          page: pageParam as number,
          size,
          quizId,
        }),
      );
      return result || { endPageNumber: 0, data: [] };
    },

    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;
      if (currentPage < lastPage.endPageNumber) {
        return currentPage + 1;
      }
      return undefined;
    },
  });

  useInfiniteScroll({ hasNextPage, fetchNextPage, observerRef });

  if (!currentUser) {
    return;
  }
  return (
    <section className={styles.container}>
      {/* TODO: h3? */}
      <h2 className={styles["sr-only"]}>퀴즈 리뷰 리스트</h2>
      <div className={styles["list-filter-container"]}>
        <ListFilter
          onOptionClick={onOptionClick}
          sortFilter={filterCriteria}
          filterOptions={filterOptions}
        />
      </div>
      <ol className={styles["review-list"]}>
        {reviewsData?.pages
          .flatMap((page) => page.data)
          .map((review) => (
            <ReviewItem
              key={review.id}
              review={review}
              isMyReview={review.writerId === currentUser.id}
              quizTitle={quizTitle}
            />
          ))}
      </ol>
      {/* TODO: 무한 스크롤 */}
      <div ref={observerRef}>
        {isFetchingNextPage && (
          <LoadingSpinner className={styles["loading-spinner"]} width={42} />
        )}
      </div>
    </section>
  );
}
