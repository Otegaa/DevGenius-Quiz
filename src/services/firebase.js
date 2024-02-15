import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBJdEtaZ__5lUwzfnH2qbamPZObLq00gkY',
  authDomain: 'devgenius-auth.firebaseapp.com',
  projectId: 'devgenius-auth',
  storageBucket: 'devgenius-auth.appspot.com',
  messagingSenderId: '56913032629',
  appId: '1:56913032629:web:f024f23d070611df8f55fc',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
