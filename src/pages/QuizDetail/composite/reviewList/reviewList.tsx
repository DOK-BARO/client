import { useQuery } from "@tanstack/react-query";
import styles from "./_review_list.module.scss";
import { reviewKeys } from "@/data/queryKeys";
import { ReviewType } from "@/types/ReviewType";
import { reviewService } from "@/services/server/reviewService";
import ReviewItem from "../../components/reviewItem/reviewItem";
import ListFilter, {
  FilterOptionType,
} from "@/components/composite/listFilter/listFilter";
import { useAtom } from "jotai";
import { reviewFilterAtom } from "@/store/reviewAtom";
import useNavigateWithParams from "@/hooks/useNavigateWithParams";
import useFilter from "@/hooks/useBookFilter";
import { currentUserAtom } from "@/store/userAtom";
import { ReviewsFilterType } from "@/types/FilterType";

interface Props {
  quizId: number;
}
export default function ReviewList({ quizId }: Props) {
  const { navigateWithParams } = useNavigateWithParams();
  const [, setFilterCriteria] = useAtom(reviewFilterAtom);
  useFilter<ReviewsFilterType>(setFilterCriteria);
  const [currentUser] = useAtom(currentUserAtom);

  const handleOptionClick = (filter: ReviewsFilterType) => {
    navigateWithParams({
      filter,
      parentComponentType: "QUIZ",
      itemId: quizId,
    });
  };

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

  // TODO: 페이지네이션
  const [filterCriteria] = useAtom(reviewFilterAtom);
  const page = 1;
  const {
    sort,
    direction,
  }: {
    sort: ReviewsFilterType["sort"] | undefined;
    direction: ReviewsFilterType["direction"] | undefined;
  } = filterCriteria;

  const { data: reviewsData } = useQuery<{
    endPageNumber: number;
    data: ReviewType[];
  } | null>({
    queryKey: reviewKeys.list({
      sort: sort ? (sort as ReviewsFilterType["sort"]) : undefined,
      direction: direction
        ? (direction as ReviewsFilterType["direction"])
        : undefined,
      page: page ? Number(page) : undefined,
      size: 10,
      quizId,
    }),
    queryFn: () =>
      reviewService.fetchReviews({
        sort: sort ? (sort as ReviewsFilterType["sort"]) : undefined,
        direction: direction
          ? (direction as ReviewsFilterType["direction"])
          : undefined,
        page: 1,
        size: 10,
        quizId,
      }),
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
    </section>
  );
}
