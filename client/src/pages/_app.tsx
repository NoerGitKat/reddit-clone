import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { createClient, Provider } from "urql";
const client = createClient({ url: "http://localhost:4000/graphql" });

import theme from "../theme";

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
