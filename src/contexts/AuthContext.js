import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { auth } from '../services/firebase';
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'register':
      return {
        ...state,
        user: payload.user,
      };

    case 'login':
      return {
        ...state,
        user: payload.user,
        isAuthenticated: true,
      };

    case 'logout':
      return initialState;

    default:
      throw new Error('Action Unknown');
  }
};

const AuthProvider = ({ children }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState(null);
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    // listener for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: 'login', payload: { user } });
      } else {
        dispatch({ type: 'logout' });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleShowPassword = () => {
    setShowPassword((s) => !s);
  };

  const register = async (email, password, username) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(response.user, { displayName: username });
      dispatch({ type: 'register', payload: { user: response.user } });
      return response;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const sendVerificationEmail = async (user) => {
    try {
      await sendEmailVerification(user);
    } catch (error) {
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const user = response.user;

      const displayName = user.displayName;
      setUsername(displayName);

      if (user.emailVerified) {
        dispatch({ type: 'login', payload: { user } });
      } else {
        throw new Error(
          'Email not verified. Please verify your email before logging in.'
        );
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      dispatch({ type: 'logout' });
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  const checkUserExists = async (email) => {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      return methods.length > 0;
    } catch (error) {
      return false;
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        username,
        isAuthenticated,
        register,
        login,
        logout,
        sendVerificationEmail,
        showPassword,
        handleShowPassword,
        checkUserExists,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('AuthContext was used outside AuthProvider');
  return context;
};

export { AuthProvider, useAuth };
