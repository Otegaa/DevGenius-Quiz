import { collection, doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

// Function to create a new user document
export const createUserDocument = async (db, name, userId, userData) => {
  try {
    const usersRef = collection(db, name);

    await setDoc(doc(usersRef, userId), {
      userData,
    });

    console.log('User document created successfully');
  } catch (error) {
    console.error('Error creating user document:', error);
    throw error;
  }
};

export const fetchHighScore = async (db, language) => {
  try {
    const doc = await collection(db, 'highScores').doc(language).get();
    if (doc.exists) {
      return doc.data().score;
    } else {
      // Document doesn't exist, return 0 or any default value
      return 0;
    }
  } catch (error) {
    console.error('Error fetching high score:', error);
    throw error;
  }
};

export const useHighScores = (db, language) => {
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const unsubscribe = collection(db, 'highScores')
      .doc(language)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setHighScore(doc.data().score);
        }
      });

    return () => unsubscribe();
  }, [language, db]);

  return highScore;
};
