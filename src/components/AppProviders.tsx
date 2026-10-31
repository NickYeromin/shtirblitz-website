"use client";

import type { ReactNode } from "react";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "ClashGrotesk, sans-serif",
    h1: { fontFamily: "ClashDisplay, sans-serif" },
    h2: { fontFamily: "ClashDisplay, sans-serif" },
    h3: { fontFamily: "ClashDisplay, sans-serif" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: () => [
        { "@font-face": {
            fontFamily: "ClashDisplay",
            src: "url(\"https://cdn.fontshare.com/wf/VFMK2COV3DN37JR7JQ4CAOJPZ7KWKNY7/ODD5YJNDLHZZB2MIT3DPVH4EIHAMZ34D/BSY64LPTT3OPLVKAZKL3AHKRWZ3D74AC.woff2\") format(\"woff2\")",
            fontWeight: 400,
            fontDisplay: "swap",
          } },
        { "@font-face": {
            fontFamily: "ClashDisplay",
            src: "url(\"https://cdn.fontshare.com/wf/2GQIT54GKQY3JRFTSHS4ARTRNRQISSAA/3CIP5EBHRRHE5FVQU3VFROPUERNDSTDF/JTSL5QESUXATU47LCPUNHZQBDDIWDOSW.woff2\") format(\"woff2\")",
            fontWeight: 500,
            fontDisplay: "swap",
          } },
        { "@font-face": {
            fontFamily: "ClashDisplay",
            src: "url(\"https://cdn.fontshare.com/wf/FPDAZ2S6SW4QMSRIIKNNGTPM6VIXYMKO/5HNPQ453FRLIQWV2FNOBUU3FKTDZQVSG/Z3MGHFHX6DCTLQ55LJYRJ5MDCZPMFZU6.woff2\") format(\"woff2\")",
            fontWeight: 600,
            fontDisplay: "swap",
          } },
        { "@font-face": {
            fontFamily: "ClashDisplay",
            src: "url(\"https://cdn.fontshare.com/wf/BFBSY7LX5W2U2EROCLVVTQP4VS7S4PC3/IIUX4FGTMD2LK2VWD3RVTAS4SSMUN7B5/53RZKGODFYDW3QHTIL7IPOWTBCSUEZK7.woff2\") format(\"woff2\")",
            fontWeight: 700,
            fontDisplay: "swap",
          } },
        { "@font-face": {
            fontFamily: "ClashGrotesk",
            src: "url(\"https://cdn.fontshare.com/wf/O462VY6O6FTQCS72XVMTQHXAM4NN5CY3/TWF57ITZORMJ3MEWLQQIVO6BMXIB6FUR/MJQFMMOTEGNXDVM7HBBDTQHTVB2M7Y6G.woff2\") format(\"woff2\")",
            fontWeight: 400,
            fontDisplay: "swap",
          } },
        { "@font-face": {
            fontFamily: "ClashGrotesk",
            src: "url(\"https://cdn.fontshare.com/wf/2SAK53YLUN7RMYJU4MYLSBV6SSSJEJZB/RXS4DPGJRKOUFZMF5X5BVUGNNKJT65XZ/DJS4RYGIUYUXJQOHY5VCZPKSTXUSHTSP.woff2\") format(\"woff2\")",
            fontWeight: 500,
            fontDisplay: "swap",
          } },
        { "@font-face": {
            fontFamily: "ClashGrotesk",
            src: "url(\"https://cdn.fontshare.com/wf/MKEEQN57GWBZOSYWCRODNJOOZNPLMAKN/5SPTSZGHEACWWLF34DQ4WAA4OGU6PQIF/KN7DX4F6PXB74R6L2K2Y4NH3CB7FC53Q.woff2\") format(\"woff2\")",
            fontWeight: 600,
            fontDisplay: "swap",
          } },
        { "@font-face": {
            fontFamily: "ClashGrotesk",
            src: "url(\"https://cdn.fontshare.com/wf/P6VJ47S3OYMUC7HYSJLTK7PEIK5O2NPQ/TK62VLUWA76PMTK2XWBNDZB7QVXJGYE3/I5W5NEJGYVFUC5I4XOXVET63OE5PSVHJ.woff2\") format(\"woff2\")",
            fontWeight: 700,
            fontDisplay: "swap",
          } },
        {
          html: { minHeight: "100%" },
          body: { minHeight: "100dvh", margin: 0 },
        },
      ],
    },
  },
});

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
