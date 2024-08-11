// import { render, screen, fireEvent } from "@testing-library/react";
// import { describe, it, expect, vi } from "vitest";
// import KakaoAuthButton from "../components/composite/kakaoAuthButton";
// import * as useKakaoAuthModule from "../hooks/useKakaoAuth";
// vi.mock("../../hooks/useKakaoAuth");

// describe("KakaoAuthButton Component", () => {
//   it("로딩 중(url을 받아오는 중)이 아닐 때 버튼이 올바른 텍스트로 렌더링되어야 한다", () => {
//     vi.spyOn(useKakaoAuthModule, "useKakaoAuth").mockReturnValue({
//       redirectToKakaoAuth: vi.fn(),
//       loading: false,
//     });

//     render(<KakaoAuthButton />);
//     const buttonElement = screen.getByText("카카오로 로그인");
//     expect(buttonElement).toBeInTheDocument();
//   });

//   it("로딩 중일 때 버튼이 'loading' 텍스트로 렌더링되어야 한다", () => {
//     vi.spyOn(useKakaoAuthModule, "useKakaoAuth").mockReturnValue({
//       redirectToKakaoAuth: vi.fn(),
//       loading: true,
//     });

//     render(<KakaoAuthButton />);
//     const buttonElement = screen.getByText("loading");
//     expect(buttonElement).toBeInTheDocument();
//   });

//   it("버튼이 클릭될 때 redirectToKakaoAuth가 호출되어야 한다", () => {
//     const mockRedirectToKakaoAuth = vi.fn();
//     vi.spyOn(useKakaoAuthModule, "useKakaoAuth").mockReturnValue({
//       redirectToKakaoAuth: mockRedirectToKakaoAuth,
//       loading: false,
//     });

//     render(<KakaoAuthButton />);
//     const buttonElement = screen.getByText("카카오로 로그인");
//     fireEvent.click(buttonElement);
//     expect(mockRedirectToKakaoAuth).toHaveBeenCalledTimes(1);
//   });

//   it("로딩 중일 때 버튼이 비활성화되어야 한다", () => {
//     vi.spyOn(useKakaoAuthModule, "useKakaoAuth").mockReturnValue({
//       redirectToKakaoAuth: vi.fn(),
//       loading: true,
//     });

//     render(<KakaoAuthButton />);
//     const buttonElement = screen.getByText("loading");
//     expect(buttonElement).toBeDisabled();
//   });
// });
