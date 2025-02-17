export interface StudyGroupDetailType {
  id: number;
  name: string;
  introduction?: string;
  profileImageUrl?: string;
  studyMembers?: StudyMemberType[];
  inviteCode: string;
}

export type StudyGroupType = Pick<
  StudyGroupDetailType,
  "id" | "name" | "profileImageUrl"
> & {
  studyMemberCount?: number;
  leader?: {
    id: number;
    nickname: string;
  };
};

export interface StudyMemberType {
  id: number;
  nickname: string;
  profileImageUrl: string;
  role: "LEADER" | "MEMBER";
}

// TODO: 변수명 -Prop, -Type?
export interface StudyGroupPostType {
  name: string;
  introduction?: string;
  profileImageUrl?: string;
}

interface UserType {
  id: number;
  nickname: string;
  profileImageUrl: string;
}

export interface StudyGroupMyUnSolvedQuizType {
  book: {
    id: number;
    title: string;
    imageUrl: string;
  };
  quiz: {
    id: number;
    title: string;
    description: string;
    creator: UserType;
    createdAt: string;
    contributors: UserType[];
  };
}

export interface StudyGroupMySolvedQuizType
  extends StudyGroupMyUnSolvedQuizType {
  id: number;
  solvedAt: string;
}

export interface StudyGroupMemberType {
  id: number;
  nickname: string;
  profileImageUrl: string;
}

export interface UnSolvedMemberType extends StudyGroupMemberType {}

export interface SolvedMemberType {
  member: StudyGroupMemberType;
  solvingQuizId: number;
  correctCount: number;
}

// 스터디 그룹 내 랭킹 조회
export interface QuizStudyGroupGradeResultType {
  quizId: number;
  studyGroupId: number;
  totalQuestionCount: number;
  solvedMember: SolvedMemberType[];
  unSolvedMember: UnSolvedMemberType[];
}
