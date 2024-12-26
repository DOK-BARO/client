import { useLocation, useParams } from "react-router-dom";
import styles from "./_study_group.module.scss";
import { useQuery } from "@tanstack/react-query";
import { studyGroupKeys } from "@/data/queryKeys";
import { studyGroupService } from "@/services/server/studyGroupService";
import { parseQueryParams } from "@/utils/parseQueryParams";
import { FetchStudyGroupsParams } from "@/types/ParamsType";
import { StudyGroupsSortType } from "@/types/FilterType";

export default function StudyGroup() {
  const { studyGroupId } = useParams();
  const id = studyGroupId ? Number(studyGroupId) : undefined;
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const sort = queryParams.get("sort") || "CREATED_AT"; // 기본값: 최신순
  const direction = queryParams.get("direction") || "ASC"; // 기본값: ASC
  const page = queryParams.get("page") || undefined; // parseQueryParams함수 안에서 기본값 1로 설정
  const size = 10; // 한번에 불러올 최대 길이: 책 목록에서는 10 고정값.

  const { data: studyGroupDetail, isLoading: isStudyGroupDetailLoading } =
    useQuery({
      queryKey: studyGroupKeys.myUnsolvedQuizList(
        id,
        parseQueryParams<StudyGroupsSortType, FetchStudyGroupsParams>({
          sort,
          direction,
          page,
          size,
        })
      ),
      queryFn: () =>
        id
          ? studyGroupService.fetchStudyGroupMyUnsolvedQuizzes(
              id,
              parseQueryParams<StudyGroupsSortType, FetchStudyGroupsParams>({
                sort,
                direction,
                page,
                size,
              })
            )
          : null,
      enabled: !!id,
    });

  console.log(studyGroupDetail, isStudyGroupDetailLoading);
  return <div className={styles.container}>StudyGroup {id}</div>;
}
