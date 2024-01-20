// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBJdEtaZ__5lUwzfnH2qbamPZObLq00gkY',
  authDomain: 'devgenius-auth.firebaseapp.com',
  projectId: 'devgenius-auth',
  storageBucket: 'devgenius-auth.appspot.com',
  messagingSenderId: '56913032629',
  appId: '1:56913032629:web:f024f23d070611df8f55fc',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
