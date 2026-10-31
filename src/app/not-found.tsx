"use client";

import Image from "next/image";
import NextLink from "next/link";
import { House } from "lucide-react";
import { Box, Button, colors, Link, Typography } from "@mui/material";
import type { PointerEvent } from "react";

export default function NotFound() {
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
    event.currentTarget.style.setProperty(
      "--background-rotate-x",
      `${-y * 2}deg`,
    );
    event.currentTarget.style.setProperty(
      "--background-rotate-y",
      `${x * 2}deg`,
    );
  };

  const resetBackground = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.removeProperty("--background-x");
    event.currentTarget.style.removeProperty("--background-y");
    event.currentTarget.style.removeProperty("--background-rotate-x");
    event.currentTarget.style.removeProperty("--background-rotate-y");
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
        overflow: "hidden",
        display: "grid",
        minHeight: "100dvh",
        px: "20px",
        py: "32px",
        placeItems: "center",
        color: "#f7f0df",
        backgroundColor: "#0d2345",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: "-32px",
          zIndex: 0,
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
          zIndex: 0,
          pointerEvents: "none",
          backgroundColor: "rgba(0, 0, 0, 0.25)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          width: "100%",
          maxWidth: "720px",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Link
          component={NextLink}
          href="/"
          underline="none"
          sx={{
            color: colors.amber[800],
            fontFamily: "ClashDisplay, sans-serif",
            fontSize: "28px",
            fontWeight: 700,
            letterSpacing: "-0.045em",
            "&:focus-visible": {
              outline: "3px solid #f7f0df",
              outlineOffset: "5px",
            },
          }}
        >
          Shtirblitz
        </Link>
        <Box
          component={Image}
          src="/not-found.png"
          alt="404 — Not found"
          width={1536}
          height={1024}
          sizes="(max-width: 768px) 100vw, 720px"
          priority
          sx={{
            display: "block",
            width: "100%",
            height: "auto",
            my: "24px",
            borderRadius: "24px",
          }}
        />
        <Typography
          component="h1"
          sx={{
            m: 0,
            fontFamily: "ClashDisplay, sans-serif",
            fontSize: "clamp(26px, 5vw, 40px)",
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          Страница не найдена
        </Typography>
        <Typography
          sx={{
            maxWidth: "440px",
            mt: "16px",
            mb: "28px",
            color: "#c9d3e1",
            fontFamily: "ClashGrotesk, sans-serif",
            fontSize: "16px",
            lineHeight: 1.6,
          }}
        >
          Похоже, этот адрес выбыл из игры. Вернитесь на главную, чтобы сделать
          следующий ход.
        </Typography>
        <Button
          component={NextLink}
          href="/"
          variant="contained"
          disableElevation
          startIcon={<House size={20} aria-hidden="true" />}
          sx={{
            minHeight: "48px",
            px: "28px",
            py: "12px",
            border: "1px solid rgba(255, 255, 255, 0.48)",
            borderRadius: "8px",
            color: "#172b40",
            backgroundColor: "#e5c785",
            fontFamily: "ClashGrotesk, sans-serif",
            fontSize: "16px",
            fontWeight: 600,
            textTransform: "none",
            transition: "background-color 160ms ease",
            "&:hover": { backgroundColor: "#f0d99f" },
            "&:focus-visible": {
              outline: "3px solid #f7f0df",
              outlineOffset: "5px",
            },
            "@media (prefers-reduced-motion: reduce)": { transition: "none" },
          }}
        >
          На главную
        </Button>
      </Box>
    </Box>
  );
}
