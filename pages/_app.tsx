import type { AppProps } from "next/app";
import { ToastContextProvider } from "contexts/Toast";
import { SessionContextProvider } from "contexts/Session";
import "styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ToastContextProvider>
        <SessionContextProvider>
          <Component {...pageProps} />
        </SessionContextProvider>
    </ToastContextProvider>
  );
}
