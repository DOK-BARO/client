// import { renderHook, act } from "@testing-library/react";
// import { describe, it, expect, vi } from "vitest";
// import { useKakaoAuth } from "../hooks/useKakaoAuth";
// import { getKakaoAuthUrl } from "../services/authService";

// // authService 모킹
// vi.mock("../services/authService");

// describe("useKakaoAuth Hook", () => {
//   it("should initialize with loading false", () => {
//     const { result } = renderHook(() => useKakaoAuth());
//     expect(result.current.loading).toBe(false);
//   });

//   it("should set loading to true when redirectToKakaoAuth is called", async () => {
//     vi.mocked(getKakaoAuthUrl).mockResolvedValue("https://kakao.auth.url");
//     const { result } = renderHook(() => useKakaoAuth());

//     await act(async () => {
//       await result.current.redirectToKakaoAuth();
//     });

//     expect(result.current.loading).toBe(false);
//   });

//   it("should redirect to Kakao auth URL", async () => {
//     const mockUrl = "https://kakao.auth.url";
//     vi.mocked(getKakaoAuthUrl).mockResolvedValue(mockUrl);

//     const { result } = renderHook(() => useKakaoAuth());

//     const originalLocation = window.location;
//     delete window.location;
//     window.location = { ...originalLocation, href: "" };

//     await act(async () => {
//       await result.current.redirectToKakaoAuth();
//     });

//     expect(window.location.href).toBe(mockUrl);

//     window.location = originalLocation;
//   });

//   it("should handle errors when getting auth URL fails", async () => {
//     const consoleErrorSpy = vi
//       .spyOn(console, "error")
//       .mockImplementation(() => {});
//     vi.mocked(getKakaoAuthUrl).mockRejectedValue(new Error("Auth URL error"));

//     const { result } = renderHook(() => useKakaoAuth());

//     await act(async () => {
//       await result.current.redirectToKakaoAuth();
//     });

//     expect(consoleErrorSpy).toHaveBeenCalledWith(
//       "권한 부여 URL 가져오기 실패: Error: Auth URL error"
//     );
//     expect(result.current.loading).toBe(false);

//     consoleErrorSpy.mockRestore();
//   });
// });
