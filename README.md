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

## Base de datos: Firebase Firestore

La tabla de posiciones se guarda en **Firebase Firestore**, así que el
ranking es el mismo sin importar desde qué computador o celular juegue cada
persona, y se actualiza en tiempo real en todas las pantallas abiertas.

### Configurarlo (una sola vez)

1. Ve a [console.firebase.google.com](https://console.firebase.google.com) e
   inicia sesión con una cuenta de Google.
2. Crea un proyecto nuevo (puedes desactivar Google Analytics, no se usa aquí).
3. En el menú lateral entra a **Compilación → Firestore Database** y haz clic
   en **Crear base de datos**. Elige **modo de producción** y la región más
   cercana.
4. Una vez creada, ve a la pestaña **Reglas** y reemplaza el contenido por el
   del archivo [`firestore.rules`](./firestore.rules) de este repositorio.
   Publica los cambios.
5. Vuelve a **Configuración del proyecto** (ícono de engranaje) → pestaña
   **General** → sección **Tus apps** → haz clic en el ícono `</>` para
   registrar una app web. No necesitas Firebase Hosting.
6. Copia el objeto `firebaseConfig` que te muestra y pégalo en
   [`firebase-config.js`](./firebase-config.js), reemplazando los valores de
   ejemplo.
7. Sube el cambio a GitHub (`git add -A && git commit -m "Config Firebase" && git push`).

Listo: mientras el archivo `firebase-config.js` tenga tus claves reales, la
tabla de posiciones funcionará igual desde cualquier dispositivo.

### Nota de seguridad

Las claves en `firebase-config.js` son públicas por diseño en cualquier app
web de Firebase (no son secretas como una contraseña); lo que realmente
protege los datos son las reglas de `firestore.rules`, que aquí solo
permiten **crear** puntajes válidos (nombre no vacío y puntaje entre 0 y 5),
y bloquean editar o borrar puntajes desde el navegador.

## Cómo usarla

Abre `index.html` directamente en el navegador, o publícala con GitHub Pages
(Settings → Pages → Deploy from branch → `main` → `/root`). Necesitas haber
configurado Firebase primero (ver arriba) para que el puntaje se guarde.

## Archivos

- `index.html` — estructura de la página.
- `style.css` — estilos visuales.
- `questions.js` — banco de las 20 preguntas con sus opciones y respuesta correcta.
- `script.js` — lógica del juego, la ruleta, el puntaje y la conexión con Firestore.
- `firebase-config.js` — claves de conexión a tu proyecto de Firebase (debes reemplazarlas).
- `firestore.rules` — reglas de seguridad que debes pegar en la consola de Firebase.
