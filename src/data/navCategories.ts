import { Category } from "../types/GNBCategoryType";

export const navCategories: Category[] = [
  {
    title: "OS",
    subCategories: [
      {
        title: "Windows",
        topics: [
          { title: "Windows일반" },
          { title: "XP/Vista/7" },
          { title: "윈도우프로그래밍 일반" },
          { title: "Windows Server2000/2002/2008" },
        ],
      },
      { title: "macOS" },
      { title: "임베디드" },
      { title: "ARM" },
      { title: "유닉스" },
      { title: "리눅스" },
    ],
  },
  {
    title: "네트워크",
    subCategories: [
      {
        title: "네트워크 일반",
        topics: [
          { title: "네트워크 일반" },
          { title: "server" },
          { title: "지리정보" },
        ],
      },
      { title: "TCP/IP", topics: [{ title: "test topic" }] },
    ],
  },
  {
    title: "보안",
    subCategories: [],
  },
  {
    title: "데이터베이스",
    subCategories: [
      { title: "데이터베이스 일반" },
      { title: "Oracle" },
      { title: "SQL" },
    ],
  },
  {
    title: "개발 방법론",
    subCategories: [
      { title: "개발 방법론 일반" },
      { title: "프로젝트 관리" },
      { title: "디자인 패턴" },
    ],
  },
  {
    title: "게임",
    subCategories: [
      { title: "게임 일반" },
      { title: "게임공략집/가이드북" },
      { title: "게임 기획" },
      { title: "모바일 게임" },
      {
        title: "게임 개발",
        topics: [
          { title: "유니티" },
          { title: "언리얼" },
          { title: "게임 개발 일반" },
        ],
      },
    ],
  },
  {
    title: "웹",
    subCategories: [
      { title: "웹프로그래밍 일반" },
      { title: "HTML/CSS" },
      { title: "JavaScript" },
      { title: "JQuery" },
      { title: "XML" },
      { title: "ASP" },
      { title: "JSP" },
      { title: "PHP" },
      { title: "AJAX" },
      { title: "Flex" },
    ],
  },
  {
    title: "프로그래밍 언어",
    subCategories: [
      { title: "프로그래밍 일반" },
      { title: "Python" },
      { title: "C" },
      { title: "C++" },
      { title: "C#" },
      { title: "Visual C++" },
      { title: "Java" },
      {
        title: ".NET",
        topics: [
          { title: ".NET 일반" },
          { title: "VisualC++ .NET" },
          { title: "VisualC#.NET" },
          { title: "ASP.NET" },
        ],
      },
    ],
  },
  {
    title: "모바일",
    subCategories: [
      { title: "모바일" },
      { title: "모바일 프로그래밍 일반" },
      { title: "아이폰/아이패드" },
      { title: "안드로이드" },
      { title: "모바일 게임" },
    ],
  },
];
