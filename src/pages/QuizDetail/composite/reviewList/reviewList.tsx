import { useQuery } from "@tanstack/react-query";
import styles from "./_review_list.module.scss";
import { reviewKeys } from "@/data/queryKeys";
import { ReviewsFilterType, ReviewType } from "@/types/ReviewType";
import { reviewService } from "@/services/server/reviewService";
import ReviewItem from "../../components/reviewItem/reviewItem";
import ListFilter, {
  FilterOptionType,
} from "@/components/composite/listFilter/listFilter";
import { useAtom } from "jotai";
import { reviewFilterAtom } from "@/store/reviewAtom";
import useNavigateWithParams from "@/hooks/useNavigateWithParams";
import useFilter from "@/hooks/useBookFilter";

interface Props {
  quizId: number;
}
export default function ReviewList({ quizId }: Props) {
  const { navigateWithParams } = useNavigateWithParams();
  const [, setFilterCriteria] = useAtom(reviewFilterAtom);
  useFilter<ReviewsFilterType>(setFilterCriteria);

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

  const [filterCriteria] = useAtom(reviewFilterAtom);
  const page = 1;
  const { sort, direction } = filterCriteria;
  console.log(sort, direction);

  const { data, isLoading } = useQuery<{
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
  console.log(data?.data);
  const reviews = data?.data;

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
        {reviews?.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
    </section>
  );
}
