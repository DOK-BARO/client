// 퀴즈 리뷰 요약
export interface ReviewType {
  id: number;
  quizId: number;
  starRating: number;
  difficultyLevel: number;
  writerId: number;
  writerNickname: string;
  comment: string;
  createdAt: string;
}
// 퀴즈 리뷰 생성 타입
export interface ReviewPostType {
  starRating: number;
  difficultyLevel: number;
  comment: string;
  quizId: number;
}

export interface DifficultyLevelType {
  selectCount: number;
  selectRate: number;
}

export type DifficultyType = Record<"1" | "2" | "3", DifficultyLevelType>;

// 퀴즈 리뷰 총평(별점, 난이도) 조회
export interface ReviewsTotalScoreType {
  quizId: number;
  averageStarRating: number;
  difficulty: DifficultyType;
}
