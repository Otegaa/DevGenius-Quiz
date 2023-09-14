import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import QuestionsHomePage from '../Pages/QuestionsHomePage';
import FrameworksPage from '../Pages/FrameworksPage';
import Questions from './Questions';
import Error from './Error';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="languages" element={<QuestionsHomePage />} />
          <Route path="questions/:language" element={<Questions />} />
          <Route path="javascript/frameworks" element={<FrameworksPage />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
