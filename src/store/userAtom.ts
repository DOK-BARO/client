import { atom } from "jotai";
import { User } from "../types/User";

export const userAtom = atom<User>({
  id: 0,
  certificationId: "",
  email: "",
  password: "",
  nickname: "",
  profileImage: "",
  roles: [],
});
