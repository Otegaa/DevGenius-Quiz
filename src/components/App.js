import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import QuestionsHomePage from '../pages/QuestionsHomePage';
import FinishedQuiz from 'pages/FinishedQuiz';

import Questions from './Questions';
import Error from './Error';
import Login from 'pages/Login';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="languages" element={<QuestionsHomePage />} />
          <Route path="questions/:language" element={<Questions />} />
          <Route path="score/:language" element={<FinishedQuiz />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
