# Shtirblitz

Next.js App Router, React и TypeScript. Интерфейс — MUI, иконки — `lucide-react`.

## Запуск

```bash
npm ci
npm run dev
```

Сайт доступен по адресу http://localhost:3000.

## Стандарт компонентов

Все стили описываются внутри компонентов через MUI `sx`, анимации — через MUI `keyframes`. Отдельных CSS-файлов нет. Общие шрифты и базовые стили находятся в `src/components/AppProviders.tsx` через `ThemeProvider` и `CssBaseline`.

Правила для дальнейшей разработки: [AGENTS.md](./AGENTS.md).

## Проверки

```bash
npm run lint
npx tsc --noEmit
npm run build
```
