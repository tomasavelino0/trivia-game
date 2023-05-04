import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Main } from './styles/main';
import Game from './pages/Game';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={(
          <Main>
            <Home />
          </Main>
        )}
      />
      <Route
        path="/game"
        element={(
          <Main>
            <Game />
          </Main>
)}
      />
    </Routes>
  );
}

export default App;
