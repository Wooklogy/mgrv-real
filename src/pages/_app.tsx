import DefaultLayout from "@/layouts/Default.layout";
import { i18nInit } from "@/locales/i18next";
import "@/styles/globals.css";
import { ReactQueryBoundary } from "@/utils/error/error.util";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import "@/styles/global.antd.css";
import "@/styles/globals.css";
import "@/styles/layout.css";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
      suspense: false,
      useErrorBoundary: (error) => ReactQueryBoundary(error),
    },
    mutations: {
      useErrorBoundary: (error) => ReactQueryBoundary(error),
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  i18nInit();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>
          <Head>
            <title>::MGROVE::</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
            />
          </Head>
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </RecoilRoot>
      </Hydrate>
    </QueryClientProvider>
  );
}
