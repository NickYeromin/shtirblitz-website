'use client';

import Image, { type StaticImageData } from 'next/image';
import { useEffect, useState, type CSSProperties } from 'react';

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
  order?: 'sequential' | 'random';
  /** Раскладка: vertical — стопка вверх, horizontal — веер */
  direction?: 'vertical' | 'horizontal';
  /** Alt-текст для лицевых сторон (по индексу faces) */
  faceAlts?: string[];
  className?: string;
}

const css = `
.cd-deck {
  --cd-card-h: calc(var(--cd-card-w) / var(--cd-ratio));
  --cd-lift: calc(var(--cd-card-h) * -0.32);
  --cd-radius: calc(var(--cd-card-w) * 0.065);
  position: relative;
  width: var(--cd-card-w);
  height: var(--cd-card-h);
  margin: calc(var(--cd-card-h) * 0.4) auto 0;
}
.cd-card {
  position: absolute;
  inset: 0;
  perspective: 1200px;
  transform-origin: var(--cd-origin, center);
  transform: translate(var(--cd-x), var(--cd-y)) rotate(var(--cd-r));
  transition:
    transform var(--cd-flip) cubic-bezier(0.4, 0, 0.2, 1),
    z-index 0s linear var(--cd-flip);
}
.cd-card.cd-active {
  z-index: 100;
  transform: translate(0, var(--cd-lift)) rotate(0deg) scale(1.025);
  transition:
    transform var(--cd-flip) cubic-bezier(0.4, 0, 0.2, 1),
    z-index 0s linear 0s;
}
.cd-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition:
    transform var(--cd-flip) cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow var(--cd-flip) ease;
  border-radius: var(--cd-radius);
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.35);
}
.cd-active .cd-inner {
  box-shadow: 0 14px 28px -8px rgb(0 0 0 / 0.35);
}
.cd-flipped .cd-inner {
  transform: rotateY(180deg);
}
.cd-side {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: var(--cd-radius);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.cd-side img {
  object-fit: cover;
  user-select: none;
  pointer-events: none;
}
.cd-face {
  transform: rotateY(180deg);
  background: #fff;
}
@media (prefers-reduced-motion: reduce) {
  .cd-card, .cd-inner { transition-duration: 0s !important; }
  .cd-card.cd-active { transform: translate(0, var(--cd-lift)) rotate(0deg); }
}
`;

export default function CardDeck({
  back,
  faces,
  cardCount,
  cardWidth = 220,
  aspectRatio = 2 / 3,
  flipDurationMs = 700,
  holdMs = 2200,
  pauseMs = 300,
  order = 'sequential',
  direction = 'vertical',
  faceAlts,
  className,
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
      if (order === 'random') {
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

  const width = typeof cardWidth === 'number' ? `${cardWidth}px` : cardWidth;

  const deckStyle = {
    '--cd-card-w': width,
    '--cd-ratio': aspectRatio,
    '--cd-flip': `${flipDurationMs}ms`,
    '--cd-origin': direction === 'horizontal' ? 'center bottom' : 'center',
  } as CSSProperties;

  return (
    <>
      <style>{css}</style>
      <div className={`cd-deck ${className ?? ''}`} style={deckStyle}>
        {Array.from({ length: count }, (_, i) => {
          const faceIndex = i % faces.length;
          // детерминированный «разброс» — без Math.random, чтобы не было hydration mismatch
          const scatter = (((i * 53) % 5) - 2) * 1.4;
          // Веер симметричен; общий размах ограничен 48° при любом числе карт.
          const fanAngle = count > 1 ? (i / (count - 1) - 0.5) * 48 : 0;
          const rot = direction === 'horizontal'
            ? fanAngle
            : (((i * 37) % 7) - 3) * 0.7;
          const offset = i * 1.6;
          const x = direction === 'horizontal' ? 0 : scatter;
          const y = direction === 'horizontal' ? 0 : -offset;

          const cardStyle = {
            '--cd-x': `${x}px`,
            '--cd-y': `${y}px`,
            '--cd-r': `${rot}deg`,
          } as CSSProperties;

          return (
            <div
              key={i}
              className={`cd-card ${active === i ? 'cd-active' : ''} ${active === i && flipped ? 'cd-flipped' : ''}`}
              style={cardStyle}
            >
              <div className="cd-inner">
                <div className="cd-side cd-back">
                  <Image
                    src={back}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 50vw, 260px"
                    draggable={false}
                  />
                </div>
                <div className="cd-side cd-face">
                  <Image
                    src={faces[faceIndex]}
                    alt={faceAlts?.[faceIndex] ?? ''}
                    fill
                    sizes="(max-width: 640px) 50vw, 260px"
                    loading="eager"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
