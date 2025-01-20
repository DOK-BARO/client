import ReactDOM from "react-dom";
import { Toaster } from "react-hot-toast";

export default function ToastPortal() {
  return ReactDOM.createPortal(
    <Toaster />,
    document.getElementById("toast") as HTMLElement,
  );
}
