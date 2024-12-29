import { useQuery } from "@tanstack/react-query";
import styles from "./_review_list.module.scss";
import { reviewKeys } from "@/data/queryKeys";
import { reviewService } from "@/services/server/reviewService";
import ReviewItem from "../../components/ReviewItem/ReviewItem";
import ListFilter, {
  FilterOptionType,
} from "@/components/composite/ListFilter/ListFilter";
import { useAtom } from "jotai";
import { reviewFilterAtom } from "@/store/reviewAtom";
import useNavigateWithParams from "@/hooks/useNavigateWithParams";
import useFilter from "@/hooks/useFilter";
import { currentUserAtom } from "@/store/userAtom";
import { ReviewsFilterType, ReviewsSortType } from "@/types/FilterType";
import { parseQueryParams } from "@/utils/parseQueryParams";
import { useLocation } from "react-router-dom";
import { FetchReviewsParams } from "@/types/ParamsType";

// TODO: 분리하기
const filterOptions: FilterOptionType<ReviewsFilterType>[] = [
  {
    filter: {
      sort: "CREATED_AT",
      direction: "ASC",
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
}

export default function ReviewList({ quizId }: Props) {
  const { navigateWithParams } = useNavigateWithParams("quiz");
  const [, setFilterCriteria] = useAtom(reviewFilterAtom);
  useFilter<ReviewsFilterType>(setFilterCriteria);
  const [currentUser] = useAtom(currentUserAtom);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const handleOptionClick = (filter: ReviewsFilterType) => {
    navigateWithParams({
      filter,
      parentPage: "quiz",
      itemId: quizId,
    });
  };

  // TODO: 페이지네이션
  const [filterCriteria] = useAtom(reviewFilterAtom);

  const sort = queryParams.get("sort") || "CREATED_AT"; // 기본값: 최신순
  const direction = queryParams.get("direction") || "ASC"; // 기본값: ASC
  const page = queryParams.get("page") || undefined; // parseQueryParams함수 안에서 기본값 1로 설정
  const size = 10; // 한번에 불러올 최대 길이: 책 목록에서는 10 고정값.

  const { data: reviewsData } = useQuery({
    queryKey: reviewKeys.list(
      parseQueryParams<ReviewsSortType, FetchReviewsParams>({
        sort,
        direction,
        page,
        size,
        quizId,
      })
    ),
    queryFn: () =>
      reviewService.fetchReviews(
        parseQueryParams({ sort, direction, page, size, quizId })
      ),
  });
  if (!currentUser) {
    return;
  }
  console.log(reviewsData?.data);
  const reviews = reviewsData?.data;

  const myReviews =
    reviews?.filter((review) => review.writerId === currentUser.id) ?? [];

  const otherReviews =
    reviews?.filter((review) => review.writerId !== currentUser.id) ?? [];

  return (
    <section className={styles.container}>
      {/* TODO: h3? */}
      <h2 className={styles["sr-only"]}>퀴즈 리뷰 리스트</h2>
      <div className={styles["list-filter-container"]}>
        <ListFilter
          handleOptionClick={handleOptionClick}
          sortFilter={filterCriteria}
          filterOptions={filterOptions}
        />
      </div>
      <ul className={styles["review-list"]}>
        {myReviews?.concat(otherReviews)?.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
            isMyReview={review.writerId === currentUser.id}
          />
        ))}
      </ul>
      {/* TODO: 무한 스크롤 */}
    </section>
  );
}
