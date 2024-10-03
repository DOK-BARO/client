export interface User {
  id: number;
  certificationId: string;
  email: string;
  password: string;
  nickname: string;
  profileImage: string;
  roles: string[];
}
