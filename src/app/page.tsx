"use client";

import { Box, Button, colors, Typography } from "@mui/material";
import type { PointerEvent } from "react";
import RevolverShells from "@/components/Animations/RevolverCylinder";
import CardDeck from "@/components/Animations/CardDeck";
import AnimatedText from "@/components/Animations/AnimatedText";
import BackgroundMusic from "@/components/BackgroundMusic";

const CardBack = "/images/cards/card-back.png";
const CardFaces = ["/images/cards/card-front.png"];

export default function Home() {
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(
      -1,
      Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2),
    );
    const y = Math.max(
      -1,
      Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2),
    );

    event.currentTarget.style.setProperty("--background-x", `${x * 10}px`);
    event.currentTarget.style.setProperty("--background-y", `${y * 10}px`);
    event.currentTarget.style.setProperty("--background-rotate-x", `${-y * 2}deg`);
    event.currentTarget.style.setProperty("--background-rotate-y", `${x * 2}deg`);
  };

  const resetBackground = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.removeProperty("--background-x");
    event.currentTarget.style.removeProperty("--background-y");
    event.currentTarget.style.removeProperty("--background-rotate-x");
    event.currentTarget.style.removeProperty("--background-rotate-y");
  };

  const handlePlay = () => {
    alert(
      `Sorry, this game is currently under development.\nAccess to the game is temporarily restricted`,
    );
  };

  return (
    <Box
      component="main"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetBackground}
      onPointerCancel={resetBackground}
      sx={{
        position: "relative",
        isolation: "isolate",
        width: "100%",
        height: "100dvh",
        overflow: "hidden",
        backgroundColor: "#0d2345",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: "-32px",
          zIndex: -2,
          pointerEvents: "none",
          backgroundImage: 'url("/background.png")',
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          filter: "blur(15px)",
          transform:
            "perspective(1200px) translate3d(var(--background-x, 0px), var(--background-y, 0px), 0) rotateX(var(--background-rotate-x, 0deg)) rotateY(var(--background-rotate-y, 0deg)) scale(1.12)",
          transition: "transform 350ms ease-out",
          "@media (prefers-reduced-motion: reduce)": {
            transform: "scale(1.12)",
            transition: "none",
          },
        },
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
          backgroundColor: "rgba(0, 0, 0, 0.25)",
        },
      }}
    >
      {/* <BackgroundMusic /> */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          minHeight: "1082px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          "& > *": { flexShrink: 0 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              marginTop: 3,
              color: colors.amber[300],
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
              marginBottom: 3,
              color: colors.amber[700],
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
                sx={{ color: colors.amber[300] }}
                texts={["You are ready?", "Trust no one", "Make your move"]}
              />
            </Typography>
            <Button
              onClick={handlePlay}
              variant="contained"
              disableElevation
              // sx={{
              //   height: 46,
              //   width: 176,
              //   color: "#172b40",
              //   backgroundColor: "#e5c785",
              //   border: "1px solid rgba(255, 255, 255, 0.48)",
              //   borderRadius: 2,
              //   fontFamily: "ClashGrotesk",
              //   fontWeight: 600,
              //   letterSpacing: "0.12em",
              //   textTransform: "uppercase",
              //   transition: "transform 160ms ease, background-color 160ms ease",
              //   "&:hover": {
              //     backgroundColor: "#f0d99f",
              //     transform: "translateY(-2px)",
              //   },
              //   "&:active": { transform: "translateY(0)" },
              //   "&:focus-visible": {
              //     outline: "3px solid #f7f0df",
              //     outlineOffset: 3,
              //   },
              //   "@media (prefers-reduced-motion: reduce)": {
              //     transition: "none",
              //   },
              // }}
              sx={{
                width: 200,
                height: 45,
                borderRadius: 3,
                backgroundColor: colors.amber[700],
                color: colors.blue[900],
                fontFamily: "ClashGrotesk",
                fontWeight: 600,
                fontSize: 18,
                alignItems: "center",
              }}
            >
              Play
            </Button>
          </Box>
        </Box>
        {/* <Box
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
        </Box> */}
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
