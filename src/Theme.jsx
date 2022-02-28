import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    h1: {
      fontFamily: 'Digital Numbers'
    },
  },
});

export const Theme = ({children, ...props}) => (
  <ThemeProvider theme={theme} {...props}>
    <style>@import url('http://fonts.cdnfonts.com/css/digital-numbers');</style>
    {children}
  </ThemeProvider>
);
