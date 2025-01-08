import {
  RouterProvider,
} from "react-router-dom";
import "./styles/main.scss";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/server/queryClient.ts";
import router from "@/route/router.tsx";
import ToastPortal from "./components/layout/ToastPortal/ToastPortal.tsx";
import ChangePassword from "./pages/MyPage/composite/accountSetting/ChangePassword/ChangePassword.tsx";
import DeleteAccount from "./pages/MyPage/composite/accountSetting/DeleteAccount/DeleteAccount.tsx";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastPortal />
    </QueryClientProvider>
  );
}

export default App;
