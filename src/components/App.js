import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import QuestionsHomePage from '../pages/QuestionsHomePage';
import FrameworksPage from '../pages/FrameworksPage';
import Questions from './Questions';
import Error from './Error';
import FinishedQuiz from 'pages/FinishedQuiz';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="languages" element={<QuestionsHomePage />} />
          <Route path="questions/:language" element={<Questions />} />
          <Route path="javascript/frameworks" element={<FrameworksPage />} />
          <Route path="score/:language" element={<FinishedQuiz />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
