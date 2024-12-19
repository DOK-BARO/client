export type ImageTargetType =
  | "MEMBER_PROFILE"
  | "STUDY_GROUP_PROFILE"
  | "BOOK_QUIZ_ANSWER";

export interface UploadImageArgType {
  image: File;
  imageTarget: ImageTargetType;
}
