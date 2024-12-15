export interface StudyGroupDetailType {
  id: number;
  name: string;
  introduction?: string;
  profileImageUrl?: string;
  studyMembers?: StudyMemberType[];
  inviteCode: string;
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
