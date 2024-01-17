import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const initialState = {
  user: {},
  isAuthenticated: false,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'login':
      return {
        ...state,
        user: {
          username: payload.username,
          email: payload.email,
        },
        isAuthenticated: true,
      };

    case 'logout':
      return initialState;

    default:
      throw new Error('Action Unknown');
  }
};

const AuthProvider = ({ children }) => {
  const [
    {
      user: { email, username },
      isAuthenticated,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const login = (username, email, password) => {
    // if (username && email && password) {
    //   dispatch({ type: 'login', payload: { username, email, password } });
    // }
    if (username) {
      dispatch({ type: 'login', payload: { username, email, password } });
    }
  };

  const logout = () => {
    dispatch({ type: 'logout' });
  };
  return (
    <AuthContext.Provider
      value={{ username, email, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('AuthContext was used outside AAuthProvider');
  return context;
};

export { AuthProvider, useAuth };
