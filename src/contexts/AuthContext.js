import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
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

  const register = async (email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch({ type: 'register', payload: { user: response.user } });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const sendVerificationEmail = async (user) => {
    try {
      await sendEmailVerification(user);
    } catch (error) {
      console.error('Error sending verification email:', error.message);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: 'login', payload: { user: response.user } });
    } catch (error) {
      console.error('Login error:', error.message);
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

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        register,
        login,
        logout,
        sendVerificationEmail,
        showPassword,
        handleShowPassword,
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
