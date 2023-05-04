import { useLocation } from 'react-router-dom';

function Game() {
  const location = useLocation();

  return (

    <div>{location.state.categoryId}</div>
  );
}

export default Game;
