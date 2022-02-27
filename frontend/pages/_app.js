import React, { useEffect } from "react";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import Layout from "../components/layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useStore } from "../utils/store";
import Web3 from "web3";
import { ThemeProvider } from "@emotion/react";
import theme from "../styles/theme";
import { useCookies } from "react-cookie";

export default function App(props) {
  const { Component, pageProps } = props;
  const [queryClient] = React.useState(() => new QueryClient());
  const [setWeb3, network, setNetwork] = useStore((state) => [
    state.setWeb3,
    state.network,
    state.setNetwork,
  ]);
  const [cookies] = useCookies();

  const changeNetowrk = () => {
    if (cookies["network"]) {
      setNetwork(cookies["network"]);
    }
  };

  useEffect(() => {
    const NODE_URL =
      network === "testnet"
        ? "https://speedy-nodes-nyc.moralis.io/418f8e6973f3c5924015ef94/avalanche/testnet"
        : "http://127.0.0.1:9650/ext/bc/C/rpc";
    const provider = new Web3.providers.HttpProvider(NODE_URL);
    const web3 = new Web3(provider);
    setWeb3(web3);
    changeNetowrk();
  }, [network]);

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
        <ThemeProvider theme={theme}>
          <Layout>
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </Layout>
        </ThemeProvider>

        <style jsx global>{`
          /* Other global styles such as 'html, body' etc... */

          body {
            background-color: black !important;
            color: white !important;
          }
        `}</style>
      </MantineProvider>
    </>
  );
}
