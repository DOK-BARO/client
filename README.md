# 📚똑바로 읽었는지 DOKBARO가 확인해 드릴게요.

서비스 바로 이용해보기 (beta) -> https://dokbaro.com
---

### 자기 계발과 성장을 위해 독서를 활용하는 **개발자들을 위한 퀴즈 학습 플랫폼, DOKBARO**입니다.

개발 서적을 즐겨 읽지만, **매번 내용을 제대로 이해했는지 확인하기 어렵지 않으셨나요?** 혹은 이해 부족으로 인해 **독서 스터디가 소수만 적극적으로 참여하는 형태로 변질되는 경험**을 하셨을지도 모릅니다.

우리는 이러한 문제점에서 시작해 퀴즈를 통해 **독서의 핵심 내용**을 더욱 효과적으로 **이해**하고, 나아가 스터디원 모두가 참여하며 성장할 수 있는 환경을 제공하기 위해 서비스를 기획했습니다.

## 📕Main Service

1. 도서를 선택해 **전체 공개용 퀴즈를 출제하고 풀어볼** 수 있어요.
2. 스터디 맞춤용 퀴즈로 **함께 퀴즈에 참여하고, 스터디원들의 학습 현황 및 피드백을 확인**할 수 있어요.
  
 | **기능** | **설명** |
   | --- | --- |
   | SNS 가입/로그인 | 카카오톡,네이버,구글,깃허브 계정을 연동해 가입 및 로그인 |
   | 이메일 가입/로그인 | 이외 이메일 계정을 사용해 가입 및 로그인 |
   | 메인화면 | 도서 카테고리, 퀴즈 출제 및 풀이 접근 |
   | 도서 카테고리 | 여러 분야의 개발 서적 확인 |
   | 퀴즈 출제/풀이 | 하나의 개발 서적을 선택해 퀴즈 출제 및 풀이 |
   | 마이페이지 | 개인 별 퀴즈 참여 기록 확인 및 관리 |
   | 스터디 그룹 | 스터디 그룹 별 퀴즈 관리 및 그룹원 별 학습 현황 확인 |
   | 퀴즈 후기 | 퀴즈 별 별점 및 텍스트 후기 작성 및 확인 |

# FE 사용 기술
<div>
  <img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white" /> 
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white" />
</div>
<div>
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black" /> 
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=SCSS&logoColor=white"/>
  <img src="https://img.shields.io/badge/Scss-CC6699?style=for-the-badge&logo=Sass&logoColor=white"/>
  <img src="https://img.shields.io/badge/TanStack Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" />
  <img src="https://img.shields.io/badge/Jotai-181717?style=for-the-badge&logo=""&logoColor=white" />
</div>
<div>
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white" /> 
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white" /> 
</div>

# 폴더 구조
주요 폴더 및 파일에 대한 설명입니다. 일부 생략된 폴더 및 파일도 있으며, 전체 구조는 코드베이스에서 확인할 수 있습니다.
```plaintext
📦src
 ┣ 📂components               # 재사용 가능한 UI 컴포넌트
 ┃ ┣ 📂atom                   # 기본적인 UI 요소 (Button 등)
 ┃ ┃ ┣ 📂Button
 ┃ ┃ ┃ ┣ 📜Button.tsx
 ┃ ┃ ┃ ┗ 📜_button.module.scss
 ┃ ┣ 📂composite              # 여러 개의 atom을 조합한 복합 컴포넌트
 ┃ ┃ ┣ 📂Breadcrumb
 ┃ ┃ ┃ ┣ 📜Breadcrumb.tsx
 ┃ ┃ ┃ ┗ 📜_breadcrumb.module.scss
 ┃ ┗ 📂layout                 # 레이아웃 관련 컴포넌트
 ┃ ┃ ┣ 📂BaseLayout
 ┃ ┃ ┃ ┣ 📜BaseLayout.tsx
 ┃ ┃ ┃ ┗ 📜_base_layout.module.scss
 ┣ 📂config                   # 설정 파일 (예: Axios 설정)
 ┃ ┗ 📜axiosConfig.ts
 ┣ 📂data                     # 상수 및 데이터 관련 파일
 ┃ ┣ 📜constants.ts           # 공통적으로 사용되는 상수
 ┃ ┣ 📜queryKeys.ts           # React-Query 키 관리
 ┃ ┗ 📜routes.ts              # 라우트 정보
 ┣ 📂hooks                    # 커스텀 훅
 ┃ ┣ 📂mutate                 # 데이터 변경(mutate) 관련 훅
 ┣ 📂pages                    # 각 페이지별 폴더
 ┃ ┣ 📂BookDetail             # 도서 상세 페이지
 ┃ ┃ ┣ 📂composite            # 상세 페이지 내 복합 컴포넌트
 ┃ ┃ ┣ 📜_book_detail.module.scss
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂BookList               # 도서 목록 페이지
 ┃ ┣ 📂CreateQuiz             # 퀴즈 생성 페이지
 ┃ ┣ 📂FindPassword           # 비밀번호 찾기 페이지
 ┃ ┣ 📂Home                   # 홈 페이지
 ┃ ┣ 📂Landing                # 랜딩 페이지
 ┃ ┣ 📂MyPage                 # 마이페이지
 ┃ ┣ 📂NotFound               # 404 페이지
 ┃ ┣ 📂QuizDetail             # 퀴즈 상세 페이지
 ┃ ┣ 📂QuizResult             # 퀴즈 결과 페이지
 ┃ ┣ 📂QuizReview             # 퀴즈 리뷰 페이지
 ┃ ┣ 📂Redirect               # 리디렉트 처리 페이지
 ┃ ┣ 📂Register               # 회원가입 페이지
 ┃ ┗ 📂SolveQuiz              # 퀴즈 풀이 페이지
 ┣ 📂route                    # 라우터 설정
 ┃ ┗ 📜router.tsx
 ┣ 📂services                 # API 서비스 로직
 ┃ ┣ 📂local                  # 로컬 API 처리
 ┃ ┃ ┗ 📜LocalApi.ts
 ┃ ┗ 📂server                 # 서버 API 요청 처리
 ┃ ┃ ┗ 📜studyGroupService.ts # 스터디 그룹 관련 API
 ┣ 📂store                    # 전역 상태 관리 (Recoil)
 ┃ ┣ 📜authModalAtom.ts       # Atom 정의
 ┣ 📂styles                   # 전역 스타일
 ┃ ┣ 📂abstracts              # 스타일 추상화 (믹스인, 변수 등)
 ┃ ┣ 📂base                   # 기본 스타일
 ┃ ┗ 📜main.scss              # 프로젝트 메인 스타일 파일
 ┣ 📂svg                      # SVG 아이콘 및 이미지
 ┣ 📂types                    # TypeScript 타입 정의
 ┣ 📂utils                    # 유틸리티 함수
 ┣ 📂validation               # 입력값 검증 관련 파일
 ┣ 📜App.css                  
 ┣ 📜App.tsx                 
 ┗ 📜main.tsx                 # 프로젝트 진입점 (ReactDOM)
```

# blog
개발하면서 겪은 고민거리나 해결 방식을 블로그를 통해 게시하고 있습니다.

- [회원가입 단계에서 새로고침 시 처리 고려](https://velog.io/@page1597/회원가입-단계에서-새로고침-시-처리-고려)
- [Tanstack Query + Axios로 전역 에러 처리하기](https://velog.io/@page1597/Tanstack-Query-Axios로-전역-에러-처리하기)
