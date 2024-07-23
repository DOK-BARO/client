import { Category } from "../components/layout/gnb";

export const navCategories: Category[] = [
  {
    title: "하드 스킬",
    subCategories: [
      {
        title: "컴퓨터 공학",
        topics: [
          {
            title: "네트워크/데이터 통신",
            // books: ["데이터베이스를 위한 책", "데이터 어쩌구"],
          },
          {
            title: "데이터베이스 개론",
            // books: ["데이터베이스", "데이터 어쩌구"],
          },
          {
            title: "마이크로프로세서",
            // books: ["마이크로프로세서 책", "책 이름"],
          },
          {
            title: "소프트웨어 공학",
            // books: ["책 이름", "책 이름"],
          },
        ],
      },
      {
        title: "프로그래밍 개발/방법론",
        topics: [
          {
            title: "객체지향 프로그래밍/UML",
            // books: ["책 이름", "책 이름"],
          },
          {
            title: "게임 프로그래밍",
            // books: ["책 이름", "책 이름"],
          },
          {
            title: "네트워크 프로그래밍",
            // books: ["책 이름", "책 이름"],
          },
          {
            title: "리눅스/유닉스 프로그래밍",
            // books: ["책 이름", "책 이름"],
          },
        ],
      },
      {
        title: "프로그래밍 언어",
        topics: [
          {
            title: ".NET",
            // books: ["책 이름", "책 이름"],
          },
          {
            title: "델파이",
            //// books: ["책 이름", "책 이름"],
          },
          {
            title: "자바",
            // books: ["책 이름", "책 이름"],
          },
          {
            title: "프로그래밍 언어 기타",
            // books: ["책 이름", "책 이름"],
          },
        ],
      },

      {
        title: "OS/Networking",
        topics: [
          {
            title: "네트워크 구축",
            // books: ["책 이름", "책 이름"],
          },
          {
            title: "네트워크 보안/해킹",
            // books: ["책 이름", "책 이름"],
          },
          {
            title: "리눅스",
            // books: ["책 이름", "책 이름"],
          },
          {
            title: "매킨토시",
            // books: ["책 이름", "책 이름"],
          },
        ],
      },
    ],
  },
  {
    title: "소프트 스킬",
    subCategories: [
      {
        title: "소프트 스킬1",

        topics: [
          {
            title: "커뮤니케이션",
            // books: ["커뮤니케이션을 위한 책", "책 이름"],
          },
        ],
      },
    ],
  },
];
