export interface StudyGroupDetailType {
  id: number;
  name: string;
  introduction?: string;
  profileImageUrl?: string;
  studyMembers?: StudyMemberType[];
  inviteCode: string;
}

export interface StudyGroupType {
  id: number;
  name: string;
  profileImageUrl: string | null;
}

export type StudyGroupPreviewType = Pick<
  StudyGroupDetailType,
  "id" | "name" | "profileImageUrl"
>;

export interface StudyMemberType {
  id: number;
  nickname: string;
  profileImageUrl: string;
  role: string;
}
// TODO: Filter 타입 따로 모아서 분리할까 고민
export type StudiesSortType = "CREATED_AT" | "STAR_RATING";
export type DirectionType = "ASC" | "DESC";
export interface StudiesFilterType {
  sort: StudiesSortType;
  direction: DirectionType;
}

// TODO: 변수명 -Prop, -Type?
export interface StudyGroupCreationType {
  name: string;
  introduction?: string;
  profileImageUrl?: string;
}
