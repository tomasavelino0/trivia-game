import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Main } from './styles/main';
import Game from './pages/Game';

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
      </Routes>
    </Main>
  );
}

export default App;
