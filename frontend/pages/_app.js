import { AppProps } from "next/app";
import React from "react";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import Layout from "../components/layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export default function App(props) {
  const { Component, pageProps } = props;
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <Layout>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </Layout>
      </MantineProvider>
    </>
  );
}
