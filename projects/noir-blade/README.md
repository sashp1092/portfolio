# Noir & Blade — демо-лендинг барбершопа

Vite + React (JavaScript) + Tailwind CSS v4. Тёмный премиум, акцент — золото, шрифты Playfair Display + Inter.

## Запуск
```bash
npm install
npm run dev     # http://localhost:5173
npm run build
```

## Под нового клиента
- Тексты, контакты, услуги, команда, отзыв — `src/data.js`.
- Цвета и шрифты — `@theme` в `src/index.css`.
- Фото — `public/img/` (WebP, ширина до 1400 px).
- Демо: форма только показывает «Спасибо». На сайте клиента — отправка в Telegram через серверный обработчик.
- Отзыв и цифры в `stats` — демо-примеры. У клиента — только настоящие данные.
