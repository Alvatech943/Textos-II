// Reemplaza estos valores con los de TU propio proyecto de Firebase.
// Los obtienes en: Firebase Console > Configuración del proyecto > Tus apps > SDK setup and configuration.
// Estas claves son públicas por diseño en apps web de Firebase; la seguridad real
// se controla con las reglas de Firestore (ver firestore.rules y el README).
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCrapEbY12dvUimc9KNV7FCTS2R08SPZUs",
  authDomain: "textos-b776e.firebaseapp.com",
  projectId: "textos-b776e",
  storageBucket: "textos-b776e.firebasestorage.app",
  messagingSenderId: "529394273381",
  appId: "1:529394273381:web:2fe444dc692038702d0a8c",
  measurementId: "G-7YNPHED92M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /leaderboard/{entryId} {
      // Cualquiera puede leer la tabla de posiciones.
      allow read: if true;

      // Solo se permite crear puntajes nuevos, con datos válidos.
      // No se permite editar ni borrar puntajes ya guardados desde el cliente.
      allow create: if request.resource.data.name is string
                    && request.resource.data.name.size() > 0
                    && request.resource.data.name.size() <= 60
                    && request.resource.data.score is number
                    && request.resource.data.score >= 0
                    && request.resource.data.score <= 5;

      allow update, delete: if false;
    }
  }
}