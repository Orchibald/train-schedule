import Provider from "@/utils/providers";
import { AppProps } from "next/app";
import '@/app/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}
