// Banco de preguntas — Ingeniería en Sistemas y dilemas éticos
// Cada pregunta vale 0.25 puntos. 20 preguntas x 0.25 = 5.0 puntos.
//
// type: "mc"          -> pregunta de opción múltiple normal.
// type: "fill_blank"  -> el texto trae "____" donde va la palabra/frase que falta;
//                        las 4 opciones son posibles palabras para llenar ese espacio.
// audio: true         -> muestra un botón para escuchar la pregunta en voz alta.
const QUESTIONS = [
  {
    type: "mc",
    audio: true,
    text: "¿Cuál es el objetivo principal del artículo?",
    options: [
      "Explicar cómo desarrollar aplicaciones web.",
      "Reflexionar sobre la importancia de la ética en la actividad informática y tecnológica.",
      "Analizar únicamente los delitos informáticos.",
      "Explicar la historia de Internet."
    ],
    correctIndex: 1
  },
  {
    type: "fill_blank",
    audio: true,
    text: "El artículo fue publicado en la revista ____.",
    options: [
      "Revista Colombiana de Tecnología",
      "Revista Dilemas Contemporáneos: Educación, Política y Valores",
      "Revista Latinoamericana de Informática",
      "Revista Internacional de Ingeniería"
    ],
    correctIndex: 1
  },
  {
    type: "fill_blank",
    audio: true,
    text: "El artículo fue publicado en el año ____.",
    options: ["2015", "2016", "2018", "2020"],
    correctIndex: 2
  },
  {
    type: "fill_blank",
    audio: true,
    text: "____ se presenta como uno de los principales medios de transformación de la sociedad.",
    options: ["Internet", "La televisión", "La radio", "La telefonía tradicional"],
    correctIndex: 0
  },
  {
    type: "mc",
    audio: false,
    text: "¿Cuál de las siguientes áreas ha sido transformada por las TIC?",
    options: [
      "Únicamente la educación.",
      "Únicamente el comercio.",
      "La banca, el comercio, el trabajo, la educación, la medicina, entre otras.",
      "Ninguna de las anteriores."
    ],
    correctIndex: 2
  },
  {
    type: "mc",
    audio: false,
    text: "¿Qué problemas pueden surgir debido al uso incorrecto de las TIC?",
    options: [
      "Invasión de la privacidad y violación de derechos de autor.",
      "Únicamente problemas económicos.",
      "Solamente problemas de comunicación.",
      "Ninguno, porque la tecnología es neutral."
    ],
    correctIndex: 0
  },
  {
    type: "fill_blank",
    audio: true,
    text: "La ____ es una disciplina que analiza los problemas éticos creados, transformados o agravados por la tecnología informática.",
    options: ["Ética Informática", "Ingeniería de Sistemas", "Ciencia de Datos", "Ciberseguridad"],
    correctIndex: 0
  },
  {
    type: "mc",
    audio: false,
    text: "¿Cuál es una de las preocupaciones relacionadas con la información?",
    options: [
      "Que sea demasiado fácil de imprimir.",
      "La falta de confidencialidad y la invasión de la privacidad.",
      "Que tenga diferentes formatos.",
      "Que sea almacenada digitalmente."
    ],
    correctIndex: 1
  },
  {
    type: "fill_blank",
    audio: true,
    text: "Los cuatro conceptos éticos fundamentales son intimidad, exactitud, ____ y accesibilidad.",
    options: ["propiedad intelectual", "seguridad informática", "velocidad de procesamiento", "eficiencia energética"],
    correctIndex: 0
  },
  {
    type: "fill_blank",
    audio: true,
    text: "Además de la responsabilidad técnica, el ingeniero de sistemas tiene responsabilidad ____.",
    options: ["comercial", "política", "social", "financiera"],
    correctIndex: 2
  },
  {
    type: "mc",
    audio: false,
    text: "¿Por qué no es suficiente que un programa informático simplemente funcione?",
    options: [
      "Porque debe considerar también la seguridad, privacidad, exactitud de la información y su impacto social.",
      "Porque todos los programas deben ser gratuitos.",
      "Porque debe funcionar sin Internet.",
      "Porque debe utilizar inteligencia artificial."
    ],
    correctIndex: 0
  },
  {
    type: "mc",
    audio: false,
    text: "¿Cuál de los siguientes es un dilema ético relacionado con Internet?",
    options: ["La privacidad de las personas.", "El tamaño de los computadores.", "La velocidad del procesador.", "La duración de una batería."],
    correctIndex: 0
  },
  {
    type: "fill_blank",
    audio: true,
    text: "Un problema relacionado con la propiedad intelectual del software es la ____ y reproducción ilegal de programas.",
    options: ["piratería", "falta de electricidad", "velocidad de descarga", "tamaño de los archivos"],
    correctIndex: 0
  },
  {
    type: "mc",
    audio: false,
    text: "¿Qué problema ético puede surgir cuando los sistemas informáticos toman decisiones?",
    options: [
      "Determinar quién asume la responsabilidad cuando una decisión automatizada causa consecuencias negativas.",
      "Determinar qué color utilizar en la interfaz.",
      "Determinar el lenguaje de programación.",
      "Determinar el tamaño del monitor."
    ],
    correctIndex: 0
  },
  {
    type: "mc",
    audio: true,
    text: "¿Qué puede ocurrir cuando existe anonimato en Internet?",
    options: [
      "Desaparecen todos los problemas éticos.",
      "Pueden producirse contenidos agresivos y problemas relacionados con el respeto interpersonal.",
      "Se elimina la privacidad.",
      "Aumenta automáticamente la seguridad."
    ],
    correctIndex: 1
  },
  {
    type: "mc",
    audio: false,
    text: "¿Qué debe respetar el profesional de ingeniería de sistemas respecto a la información?",
    options: ["El secreto profesional y la confidencialidad.", "Solamente la velocidad de procesamiento.", "Únicamente los intereses económicos.", "Ninguna norma."],
    correctIndex: 0
  },
  {
    type: "mc",
    audio: false,
    text: "¿Qué significa la responsabilidad técnica del ingeniero de sistemas?",
    options: [
      "Considerar únicamente las consecuencias económicas del software.",
      "El enfoque profesional utilizado para resolver problemas técnicos.",
      "Evitar utilizar nuevas tecnologías.",
      "Delegar todas las decisiones a los usuarios."
    ],
    correctIndex: 1
  },
  {
    type: "mc",
    audio: false,
    text: "¿Qué significa responsabilidad social en el desarrollo de software?",
    options: [
      "Considerar el impacto de los productos informáticos sobre la sociedad.",
      "Desarrollar programas exclusivamente para empresas.",
      "Reducir el tamaño de los programas.",
      "Utilizar únicamente software comercial."
    ],
    correctIndex: 0
  },
  {
    type: "mc",
    audio: false,
    text: "Según las conclusiones, ¿por qué es importante incorporar la ética en la formación de los profesionales informáticos?",
    options: [
      "Porque permite complementar la preparación técnica con criterios para afrontar problemas éticos y sociales.",
      "Porque reemplaza completamente los conocimientos técnicos.",
      "Porque elimina la necesidad de aprender programación.",
      "Porque evita que se utilice Internet."
    ],
    correctIndex: 0
  },
  {
    type: "mc",
    audio: true,
    text: "¿Cuál resume mejor la idea principal del artículo?",
    options: [
      "La tecnología debe desarrollarse sin restricciones.",
      "La preparación técnica es lo único importante para un ingeniero de sistemas.",
      "La informática y las TIC deben utilizarse de manera responsable, respetando los derechos, la privacidad y la dignidad humana.",
      "Los sistemas informáticos deben tomar todas las decisiones por las personas."
    ],
    correctIndex: 2
  }
];
