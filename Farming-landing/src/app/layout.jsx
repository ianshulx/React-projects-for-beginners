'use client';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeSettings } from '@/utils/theme/Theme';
import { store } from '@/store/store';
import { useSelector } from 'react-redux';
// import { AppState } from "@/store/store";
import { Provider } from 'react-redux';
import 'tailwindcss/tailwind.css';
// import './global.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import '@/utils/i18n';
import { NextAppDirEmotionCacheProvider } from '@/utils/theme/EmotionCache';
import 'react-quill/dist/quill.snow.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const MyApp = ({ children }) => {
  const theme = ThemeSettings();

  const customizer = useSelector((state) => state.customizer);

  return (
    <>
      <NextAppDirEmotionCacheProvider options={{ key: 'modernize' }}>
        <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {children}
        </ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </>
  );
};

export default function RootLayout({ children }) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => setLoading(true), 3000);
  }, []);
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider store={store}>
          {loading ? (
            // eslint-disable-next-line react/no-children-prop
            <MyApp children={children} />
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Provider>
      </body>
    </html>
  );
}
