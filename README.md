# Textos II — Ruleta de preguntas

Aplicación web (HTML, CSS y JavaScript puro, sin dependencias) que presenta
una ruleta con las 20 preguntas del artículo "Ingeniería en Sistemas y
dilemas éticos".

## Cómo funciona

- El jugador ingresa su nombre antes de comenzar.
- Cada giro de la ruleta selecciona una pregunta al azar entre las que
  quedan disponibles.
- Al responder, la pregunta desaparece de la ruleta (sin importar si la
  respuesta fue correcta o no), así que nunca se repite.
- Cada respuesta correcta suma 0.25 puntos. Las 20 preguntas correctas dan
  un puntaje máximo de 5.0.
- Al terminar las 20 preguntas, el puntaje final del jugador se guarda y se
  muestra en la tabla de posiciones, ordenada de mayor a menor puntaje.

## Cómo usarla

Solo abre `index.html` en el navegador, o publícala con GitHub Pages
(Settings → Pages → Deploy from branch → `main` → `/root`).

## Nota sobre la tabla de posiciones

Los puntajes se guardan con `localStorage` en el navegador donde se juega.
Esto significa que la tabla de posiciones es compartida entre todas las
personas que jueguen **en el mismo computador/navegador** (por ejemplo, un
salón de clase con un solo equipo), pero no se sincroniza automáticamente
entre distintos dispositivos. Si necesitas un ranking compartido entre
varios computadores o celulares al mismo tiempo, se requeriría agregar un
backend con una base de datos (por ejemplo Firebase, Supabase o un pequeño
servidor propio) para almacenar los puntajes de forma centralizada.

## Archivos

- `index.html` — estructura de la página.
- `style.css` — estilos visuales.
- `questions.js` — banco de las 20 preguntas con sus opciones y respuesta correcta.
- `script.js` — lógica del juego, la ruleta, el puntaje y la tabla de posiciones.
