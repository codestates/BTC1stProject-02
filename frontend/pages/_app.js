import React, { useEffect } from "react";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import Layout from "../components/layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useStore } from "../utils/store";
import Web3 from "web3";

export default function App(props) {
  const { Component, pageProps } = props;
  const [queryClient] = React.useState(() => new QueryClient());
  const setWeb3 = useStore((state) => state.setWeb3);

  useEffect(() => {
    const NODE_URL =
      "https://speedy-nodes-nyc.moralis.io/418f8e6973f3c5924015ef94/avalanche/testnet";
    const provider = new Web3.providers.HttpProvider(NODE_URL);
    const web3 = new Web3(provider);
    setWeb3(web3);
  }, []);

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
