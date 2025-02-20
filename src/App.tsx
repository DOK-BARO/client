import { RouterProvider } from "react-router-dom";
import "./styles/main.scss";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/server/queryClient.ts";
import router from "@/route/router.tsx";
import ToastPortal from "./components/layout/ToastPortal/ToastPortal.tsx";
import { Suspense } from "react";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div></div>}>
        <RouterProvider router={router} />
      </Suspense>
      <ToastPortal />
    </QueryClientProvider>
  );
}
export default App;
