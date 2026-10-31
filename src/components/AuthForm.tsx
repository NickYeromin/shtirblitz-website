"use client";

import { useState, type FormEvent, type PointerEvent } from "react";
import NextLink from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Info,
  LockKeyhole,
} from "lucide-react";
import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  colors,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

const fieldSx: SxProps<Theme> = {
  "& .MuiInputLabel-root": { color: "#b5c4d5" },
  "& .MuiInputLabel-root.Mui-focused": { color: colors.amber[300] },
  "& .MuiOutlinedInput-root": {
    color: "#f7f0df",
    borderRadius: 2,
    backgroundColor: "rgba(7, 21, 39, 0.45)",
    "& fieldset": { borderColor: "#65758a" },
    "&:hover fieldset": { borderColor: "#b5c4d5" },
    "&.Mui-focused fieldset": { borderColor: colors.amber[300] },
    "& input:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 100px #162b43 inset",
      WebkitTextFillColor: "#f7f0df",
      caretColor: "#f7f0df",
    },
  },
};

export default function AuthForm({ sx }: { sx?: SxProps<Theme> }) {
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [googleRequested, setGoogleRequested] = useState(false);
  const isSignUp = mode === "sign-up";

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGoogleRequested(false);
    const data = new FormData(event.currentTarget);
    if (isSignUp && data.get("password") !== data.get("confirmPassword")) {
      setPasswordMismatch(true);
      setSubmitted(false);
      return;
    }
    setPasswordMismatch(false);
    setSubmitted(true);
  };

  return (
    <Box
      component="main"
      lang="en"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetBackground}
      onPointerCancel={resetBackground}
      sx={[
        {
          position: "relative",
          isolation: "isolate",
          overflow: "hidden",
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          py: { xs: 4, sm: 6 },
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
          "& > *": { position: "relative", zIndex: 1 },
          "& a:focus-visible, & button:focus-visible": {
            outline: `3px solid ${colors.amber[300]}`,
            outlineOffset: 4,
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Stack spacing={1} sx={{ alignItems: "center", mb: 4 }}>
        <Typography
          sx={{
            color: colors.amber[300],
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          Bluff · Bet · Survive
        </Typography>
        <Link
          component={NextLink}
          href="/"
          underline="none"
          sx={{
            color: colors.amber[700],
            fontFamily: "ClashDisplay, sans-serif",
            fontSize: 42,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.045em",
          }}
        >
          Shtirblitz
        </Link>
      </Stack>

      <Box
        component="section"
        aria-labelledby="auth-title"
        sx={{
          width: "100%",
          maxWidth: 440,
          p: { xs: 3, sm: 5 },
          border: "1px solid rgba(229, 199, 133, 0.4)",
          borderRadius: 4,
          backgroundColor: "rgba(13, 30, 51, 0.96)",
          boxShadow: "0 24px 80px rgba(0, 0, 0, 0.28)",
        }}
      >
        <Box sx={{ display: "flex", color: colors.amber[300], mb: 2.5 }}>
          <LockKeyhole size={28} aria-hidden="true" />
        </Box>
        <Typography
          id="auth-title"
          component="h1"
          sx={{
            fontFamily: "ClashDisplay, sans-serif",
            fontSize: 32,
            fontWeight: 600,
          }}
        >
          Your next move
        </Typography>
        <Typography sx={{ color: "#b5c4d5", mt: 1, mb: 3.5, lineHeight: 1.6 }}>
          {isSignUp
            ? "Create an account to take your seat at the table."
            : "Sign in to your account to return to the table."}
        </Typography>

        <Tabs
          value={mode}
          onChange={(_, value: "sign-in" | "sign-up") => {
            setMode(value);
            setSubmitted(false);
            setPasswordMismatch(false);
            setShowPassword(false);
            setGoogleRequested(false);
          }}
          variant="fullWidth"
          aria-label="Authentication"
          sx={{
            mb: 3,
            borderBottom: "1px solid #65758a",
            "& .MuiTabs-indicator": { backgroundColor: colors.amber[300] },
            "& .MuiTab-root": {
              color: "#b5c4d5",
              textTransform: "none",
              fontSize: 16,
            },
            "& .MuiTab-root.Mui-selected": { color: colors.amber[300] },
          }}
        >
          <Tab
            disableRipple
            id="sign-in-tab"
            value="sign-in"
            label="Sign in"
            aria-controls="auth-panel"
          />
          <Tab
            disableRipple
            id="sign-up-tab"
            value="sign-up"
            label="Sign up"
            aria-controls="auth-panel"
          />
        </Tabs>

        <Stack
          key={mode}
          component="form"
          id="auth-panel"
          role="tabpanel"
          aria-labelledby={`${mode}-tab`}
          onSubmit={handleSubmit}
          onChange={() => {
            setPasswordMismatch(false);
            setSubmitted(false);
            setGoogleRequested(false);
          }}
          spacing={2.5}
        >
          {!isSignUp && (
            <Stack spacing={2.5}>
              <Button
                type="button"
                variant="outlined"
                fullWidth
                startIcon={
                  <Image
                    src="/images/google-logo.svg"
                    alt=""
                    width={20}
                    height={20}
                    aria-hidden="true"
                  />
                }
                onClick={() => {
                  // Replace this placeholder with the Google OAuth flow when available.
                  setGoogleRequested(true);
                  setSubmitted(false);
                }}
                sx={{
                  minHeight: 48,
                  borderRadius: 2,
                  borderColor: "#65758a",
                  color: "#f7f0df",
                  fontSize: 16,
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": {
                    borderColor: colors.amber[300],
                    backgroundColor: "rgba(229, 199, 133, 0.08)",
                  },
                }}
              >
                Continue with Google
              </Button>
              {googleRequested && (
                <Alert
                  severity="info"
                  icon={<Info size={22} aria-hidden="true" />}
                  sx={{
                    color: "#d6eaff",
                    backgroundColor: "#193657",
                    "& .MuiAlert-icon": { color: "#90caf9" },
                  }}
                >
                  Google sign-in is not available yet.
                </Alert>
              )}
              <Divider
                sx={{
                  color: "#b5c4d5",
                  fontSize: 13,
                  "&::before, &::after": { borderColor: "#65758a" },
                }}
              >
                or continue with email
              </Divider>
            </Stack>
          )}
          <TextField
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
            fullWidth
            sx={fieldSx}
          />
          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete={isSignUp ? "new-password" : "current-password"}
            required
            fullWidth
            sx={fieldSx}
            slotProps={{
              htmlInput: { minLength: isSignUp ? 8 : undefined },
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      type="button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      aria-pressed={showPassword}
                      onClick={() => setShowPassword((visible) => !visible)}
                      edge="end"
                      sx={{ color: "#b5c4d5" }}
                    >
                      {showPassword ? (
                        <EyeOff size={20} aria-hidden="true" />
                      ) : (
                        <Eye size={20} aria-hidden="true" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          {isSignUp && (
            <TextField
              label="Confirm password"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              fullWidth
              error={passwordMismatch}
              helperText={
                passwordMismatch
                  ? "Passwords do not match."
                  : "Use at least 8 characters for your password."
              }
              slotProps={{ htmlInput: { minLength: 8 } }}
              sx={{
                ...fieldSx,
                "& .MuiFormHelperText-root:not(.Mui-error)": {
                  color: "#b5c4d5",
                },
              }}
            />
          )}
          {submitted && (
            <Alert
              severity="info"
              icon={<Info size={22} aria-hidden="true" />}
              sx={{
                color: "#d6eaff",
                backgroundColor: "#193657",
                "& .MuiAlert-icon": { color: "#90caf9" },
              }}
            >
              {isSignUp
                ? "Sign-up is not available yet. Authentication is not connected."
                : "Sign-in is not available yet. Authentication is not connected."}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            disableElevation
            endIcon={<ArrowRight size={20} aria-hidden="true" />}
            sx={{
              minHeight: 48,
              borderRadius: 2,
              backgroundColor: colors.amber[700],
              color: colors.blue[900],
              fontSize: 16,
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            {isSignUp ? "Create account" : "Sign in"}
          </Button>
        </Stack>
      </Box>

      <Link
        component={NextLink}
        href="/"
        underline="hover"
        sx={{
          display: "inline-flex",
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          mt: 3,
          color: "#c9d3e1",
          fontSize: 14,
          lineHeight: 1,
          "& > svg": { display: "block", flexShrink: 0 },
        }}
      >
        <ArrowLeft size={16} aria-hidden="true" />
        <Box component="span" sx={{ display: "block", lineHeight: 1 }}>
          Back to home
        </Box>
      </Link>
    </Box>
  );
}
