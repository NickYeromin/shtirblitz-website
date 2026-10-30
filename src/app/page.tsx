"use client";

import { Box, Button, colors, Typography } from "@mui/material";
import RevolverShells from "@/components/Animations/RevolverCylinder";
import CardDeck from "@/components/Animations/CardDeck";
import AnimatedText from "@/components/Animations/AnimatedText";
import BackgroundMusic from "@/components/BackgroundMusic";

const CardBack = "/images/cards/card-back.png";
const CardFaces = ["/images/cards/card-front.png"];

export default function Home() {
  const handlePlay = () => {
    alert(
      `Sorry, this game is currently under development.\nAccess to the game is temporarily restricted`,
    );
  };

  return (
    <Box
      component="main"
      className="home-viewport"
      sx={{
        backgroundColor: colors.blue[300],
        backgroundImage: 'url("/images/diagmonds.png")',
        backgroundRepeat: "repeat",
        backgroundSize: "70px 70px",
      }}
    >
      <BackgroundMusic />
      <Box
        className="home-content"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          "& > *": { flexShrink: 0 },
        }}
      >
        <Box
          sx={{
            position: "relative",
            isolation: "isolate",
            overflow: "hidden",
            minHeight: 250,
            width: "min(320px, calc(100vw - 32px))",
            px: 3,
            py: 2.5,
            color: colors.amber[700],
            backgroundColor: colors.blue[900],
            border: `3px solid ${colors.amber[200]}`,
            borderRadius: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 8,
              zIndex: -1,
              border: `1px solid ${colors.amber[500]}`,
              borderRadius: 3,
              pointerEvents: "none",
            },
          }}
        >
          <Typography
            sx={{
              color: "#dfbd7d",
              fontFamily: "ClashGrotesk",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Bluff · Bet · Survive
          </Typography>
          <Typography
            sx={{
              fontFamily: "ClashDisplay",
              fontWeight: 700,
              fontSize: 42,
              lineHeight: 1,
              letterSpacing: "-0.045em",
              textShadow: "0 3px 18px rgba(0, 0, 0, 0.28)",
            }}
          >
            Shtirblitz
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              component="div"
              sx={{
                minHeight: 28,
                color: "rgba(247, 240, 223, 0.82)",
                fontFamily: "ClashGrotesk",
                fontSize: 16,
                letterSpacing: "0.015em",
              }}
            >
              <AnimatedText
                texts={["You are ready?", "Trust no one", "Make your move"]}
              />
            </Typography>
            <Button
              onClick={handlePlay}
              variant="contained"
              disableElevation
              sx={{
                height: 46,
                width: 176,
                color: "#172b40",
                backgroundColor: "#e5c785",
                border: "1px solid rgba(255, 255, 255, 0.48)",
                borderRadius: 2,
                fontFamily: "ClashGrotesk",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                transition: "transform 160ms ease, background-color 160ms ease",
                "&:hover": {
                  backgroundColor: "#f0d99f",
                  transform: "translateY(-2px)",
                },
                "&:active": { transform: "translateY(0)" },
                "&:focus-visible": {
                  outline: "3px solid #f7f0df",
                  outlineOffset: 3,
                },
                "@media (prefers-reduced-motion: reduce)": {
                  transition: "none",
                },
              }}
            >
              Play
            </Button>
          </Box>
        </Box>
        <Box>
          <CardDeck back={CardBack} faces={CardFaces} direction="horizontal" />
        </Box>
        <Box sx={{ width: 320 }}>
          <RevolverShells />
        </Box>
        <Typography
          sx={{
            position: "absolute",
            right: 25,
            bottom: 25,
            fontFamily: "ClashGrotesk",
            fontWeight: 600,
            fontSize: 48,
            textTransform: "uppercase",
            color: "brown",
          }}
        >
          Dev
        </Typography>
      </Box>
    </Box>
  );
}
