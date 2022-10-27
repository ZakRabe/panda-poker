import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyD3KQNpE8g5pQTrpZTNXAfdcpezzSs1-J8",
//   authDomain: "poker-ce5af.firebaseapp.com",
//   databaseURL: "https://poker-ce5af-default-rtdb.firebaseio.com",
//   projectId: "poker-ce5af",
//   storageBucket: "poker-ce5af.appspot.com",
//   messagingSenderId: "794142326505",
//   appId: "1:794142326505:web:a2937dcb9926259855fa78",
// };

initializeApp(firebaseConfig);
const database = getDatabase();
export default database;
