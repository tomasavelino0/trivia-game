import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Main } from './styles/main';
import Game from './pages/Game';
import Score from './pages/Score';

function App() {
  return (
    <Main>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/game"
          element={<Game />}
        />
        <Route path="/score" element={<Score />} />
      </Routes>
    </Main>
  );
}

export default App;
