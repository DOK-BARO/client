export interface StudyGroupDetailType {
  id: number;
  name: string;
  introduction?: string;
  profileImageUrl?: string;
  studyMembers?: StudyMemberType[];
  inviteCode: string;
}

// export interface StudyGroupType {
//   id: number;
//   name: string;
//   profileImageUrl: string | null;
// }

export type StudyGroupType = Pick<
  StudyGroupDetailType,
  "id" | "name" | "profileImageUrl"
>;

export interface StudyMemberType {
  id: number;
  nickname: string;
  profileImageUrl: string;
  role: string;
}

// TODO: 변수명 -Prop, -Type?
export interface StudyGroupCreationType {
  name: string;
  introduction?: string;
  profileImageUrl?: string;
}
