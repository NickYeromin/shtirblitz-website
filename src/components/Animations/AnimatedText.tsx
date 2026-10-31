"use client";

import { Box, type SxProps, type Theme } from "@mui/material";
import { keyframes } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import { useEffect, useState } from "react";

const appear = keyframes`
  from { opacity: 0; transform: translateY(100%); }
  to { opacity: 1; transform: translateY(0); }
`;

const disappear = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-100%); }
`;

const textSx = {
  gridArea: "1 / 1",
  alignSelf: "center",
  whiteSpace: "pre-wrap",
  overflowWrap: "anywhere",
} as const;

export interface AnimatedTextProps {
  texts: string[];
  /** Время показа каждой надписи, мс. */
  holdMs?: number;
  /** Длительность появления и ухода, мс. */
  durationMs?: number;
  sx?: SxProps<Theme>;
}

export default function AnimatedText({
  texts,
  holdMs = 2200,
  durationMs = 500,
  sx = [],
}: AnimatedTextProps) {
  const [step, setStep] = useState({ index: 0, leaving: false });
  const duration = Math.max(0, durationMs);
  const hold = Math.max(0, holdMs);
  const index = texts.length ? step.index % texts.length : 0;

  useEffect(() => {
    if (texts.length < 2) return;

    const timer = setTimeout(() => {
      setStep(previous => previous.leaving
        ? { index: (previous.index + 1) % texts.length, leaving: false }
        : { ...previous, leaving: true });
    }, step.leaving ? duration : duration + hold);

    return () => clearTimeout(timer);
  }, [step, texts.length, duration, hold]);

  if (texts.length === 0) return null;

  return (
    <Box
      component="span"
      sx={[
        {
          display: "inline-grid",
          overflow: "hidden",
          verticalAlign: "middle",
          textAlign: "center",
          lineHeight: 1.4,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {/* Все варианты задают размер, чтобы страница не прыгала при смене текста. */}
      {texts.map((text, i) => (
        <Box
          component="span"
          key={i}
          sx={{ ...textSx, visibility: "hidden" }}
          aria-hidden="true"
        >
          {text}
        </Box>
      ))}
      <Box
        component="span"
        key={index}
        sx={{
          ...textSx,
          animation: step.leaving
            ? `${disappear} ${duration}ms cubic-bezier(0.4, 0, 1, 1) both`
            : `${appear} ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) both`,
          '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        }}
        aria-hidden="true"
      >
        {texts[index]}
      </Box>
      <Box component="span" sx={visuallyHidden}>{texts.join('. ')}</Box>
    </Box>
  );
}
