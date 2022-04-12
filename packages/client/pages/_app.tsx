import type { AppProps } from 'next/app';
import Head from 'next/head';
import config from '~/config';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '~/config/theme';
import '~/styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{config.app.name}</title>
        <link rel="icon" type="image/svg+xml" href="data:image/x-icon;" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={`${config.app.name}`} />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
