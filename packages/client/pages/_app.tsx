import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider as ReduxProvider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import config from '~/config';
import theme from '~/config/theme';
import store from '~/redux/store';
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

      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Component {...pageProps} />
        </ThemeProvider>
      </ReduxProvider>
    </>
  );
}

export default MyApp;
