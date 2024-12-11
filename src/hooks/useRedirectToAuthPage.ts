// import { useState } from "react";
// import { SocialLoginType } from "@/types/SocialLoginType.ts";
// import { authService } from "@/services/server/authService";

// export const useRedirectToAuthPage = () => {
//   const [loading, setLoading] = useState(false);

//   const redirectToAuthPage = async (socialLoginType: SocialLoginType) => {
//     setLoading(true);
//     try {
//       const url = await authService.fetchAuthUrl(socialLoginType);
//       console.log(url);
//       window.location.href = url; // 해당 url로 이동
//     } catch (error) {
//       console.error(`권한 부여 URL 가져오기 실패: ${error}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { redirectToAuthPage, loading };
// };
