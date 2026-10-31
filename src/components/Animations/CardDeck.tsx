"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { Box, type SxProps, type Theme } from "@mui/material";

type ImageSrc = string | StaticImageData;

export interface CardDeckProps {
  /** Рубашка карты (одна картинка для всей колоды) */
  back: ImageSrc;
  /** Лицевые стороны. Карта №i получает faces[i % faces.length] */
  faces: ImageSrc[];
  /** Сколько карт в колоде. По умолчанию — не меньше 8 и не меньше числа лиц */
  cardCount?: number;
  /** Ширина карты: число = px, строка = любое CSS-значение, напр. "clamp(160px, 30vw, 260px)" */
  cardWidth?: number | string;
  /** Соотношение ширина / высота. 2/3 для карт 1024×1536 */
  aspectRatio?: number;
  /** Длительность переворота, мс */
  flipDurationMs?: number;
  /** Сколько карта лежит лицом вверх после переворота, мс */
  holdMs?: number;
  /** Пауза после полного возвращения карты в стопку, мс */
  pauseMs?: number;
  /** sequential — сверху вниз по колоде, random — случайная карта */
  order?: "sequential" | "random";
  /** Раскладка: vertical — стопка вверх, horizontal — веер */
  direction?: "vertical" | "horizontal";
  /** Alt-текст для лицевых сторон (по индексу faces) */
  faceAlts?: string[];
  sx?: SxProps<Theme>;
}

export default function CardDeck({
  back,
  faces,
  cardCount,
  cardWidth = 220,
  aspectRatio = 2 / 3,
  flipDurationMs = 700,
  holdMs = 2200,
  pauseMs = 300,
  order = "sequential",
  direction = "vertical",
  faceAlts,
  sx = [],
}: CardDeckProps) {
  const count = faces.length === 0 ? 0 : Math.max(cardCount ?? 8, faces.length);
  const [active, setActive] = useState<number | null>(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (count === 0) return;

    let timer: ReturnType<typeof setTimeout>;
    // последняя карта в DOM лежит сверху колоды — начинаем с неё
    let current = count;

    const pickNext = () => {
      if (order === "random") {
        if (count === 1) return 0;
        let n = current;
        while (n === current) n = Math.floor(Math.random() * count);
        return n;
      }
      return current <= 0 ? count - 1 : current - 1;
    };

    const show = () => {
      current = pickNext();
      setActive(current);
      timer = setTimeout(reveal, flipDurationMs);
    };
    const reveal = () => {
      setFlipped(true);
      timer = setTimeout(hide, flipDurationMs + holdMs);
    };
    const hide = () => {
      setFlipped(false);
      timer = setTimeout(lower, flipDurationMs);
    };
    const lower = () => {
      setActive(null);
      timer = setTimeout(show, flipDurationMs + pauseMs);
    };

    timer = setTimeout(show, 600);
    return () => clearTimeout(timer);
  }, [count, order, flipDurationMs, holdMs, pauseMs]);

  if (count === 0) return null;

  const width = typeof cardWidth === "number" ? `${cardWidth}px` : cardWidth;

  const height = `calc(${width} / ${aspectRatio})`;
  const lift = `calc(${height} * -0.32)`;
  const radius = `calc(${width} * 0.065)`;
  const transition = `transform ${flipDurationMs}ms cubic-bezier(0.4, 0, 0.2, 1)`;
  const sideSx = {
    position: "absolute",
    inset: 0,
    overflow: "hidden",
    borderRadius: radius,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    "& img": { objectFit: "cover", userSelect: "none", pointerEvents: "none" },
  } as const;

  return (
    <Box
      sx={[
        {
          position: "relative",
          width,
          height,
          margin: `calc(${height} * 0.4) auto 0`,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {Array.from({ length: count }, (_, i) => {
        const faceIndex = i % faces.length;
        const scatter = (((i * 53) % 5) - 2) * 1.4;
        const fanAngle = count > 1 ? (i / (count - 1) - 0.5) * 48 : 0;
        const rotation = direction === "horizontal" ? fanAngle : (((i * 37) % 7) - 3) * 0.7;
        const x = direction === "horizontal" ? 0 : scatter;
        const y = direction === "horizontal" ? 0 : -i * 1.6;
        const isActive = active === i;

        return (
          <Box
            key={i}
            sx={{
              position: "absolute",
              inset: 0,
              perspective: "1200px",
              transformOrigin: direction === "horizontal" ? "center bottom" : "center",
              zIndex: isActive ? 100 : "auto",
              transform: isActive
                ? `translate(0, ${lift}) rotate(0deg) scale(1.025)`
                : `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
              transition: `${transition}, z-index 0s linear ${isActive ? 0 : flipDurationMs}ms`,
              "@media (prefers-reduced-motion: reduce)": {
                transitionDuration: "0s",
                ...(isActive && { transform: `translate(0, ${lift}) rotate(0deg)` }),
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                transformStyle: "preserve-3d",
                transform: isActive && flipped ? "rotateY(180deg)" : "none",
                transition: `${transition}, box-shadow ${flipDurationMs}ms ease`,
                borderRadius: radius,
                boxShadow: isActive
                  ? "0 14px 28px -8px rgb(0 0 0 / 0.35)"
                  : "0 1px 2px rgb(0 0 0 / 0.35)",
                "@media (prefers-reduced-motion: reduce)": { transitionDuration: "0s" },
              }}
            >
              <Box sx={sideSx}>
                <Image src={back} alt="" fill sizes="(max-width: 640px) 50vw, 260px" draggable={false} />
              </Box>
              <Box sx={{ ...sideSx, transform: "rotateY(180deg)", backgroundColor: "#fff" }}>
                <Image src={faces[faceIndex]} alt={faceAlts?.[faceIndex] ?? ""} fill sizes="(max-width: 640px) 50vw, 260px" loading="eager" draggable={false} />
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
