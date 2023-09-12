import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import QuestionsHomePage from './QuestionsHomePage';
import FrameworksPage from './FrameworksPage';
import Questions from './Questions';
import Error from './Error';
import SharedLayout from './SharedLayout';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="questions" element={<SharedLayout />}>
            <Route index element={<QuestionsHomePage />} />
            <Route path=":questionsName" element={<Questions />} />
            <Route path="frameworks" element={<FrameworksPage />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
