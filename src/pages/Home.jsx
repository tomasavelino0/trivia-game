/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  RiArrowUpSLine as ArrowUp,
  RiArrowDownSLine as ArrowDown,
} from 'react-icons/ri';
import { Title, DropDownContainer } from '../styles/home';
import { fetchCategories } from '../services/api';

function Home() {
  const [dropDown, setDropDown] = useState(false);
  const [arrow, setArrow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState('General Knowledge');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const data = await fetchCategories();
      setCategories(data);
    }
    fetchData();
  }, []);

  const handleDropdown = () => {
    setDropDown(!dropDown);
    setArrow(!arrow);
  };

  const toPageGame = () => {
    const categoryId = categories.find((category) => category.name === selectCategory).id;
    navigate('/game', { state: { categoryId } });
  };

  return (
    <section>
      <Title>Trivia Game</Title>
      <h2>Escolha a Categoria: </h2>
      <DropDownContainer className="dropdown">
        <button
          type="button"
          className="button"
          onClick={() => handleDropdown()}
        >
          {selectCategory}
          {arrow ? <ArrowUp /> : <ArrowDown />}

        </button>
        <ul className={dropDown ? 'DropdownList' : 'DropdownList Hidden'}>
          {
          categories.map((category) => (
            <li
              onClick={(e) => setSelectCategory(e.target.innerText)}
              key={category.id}
              name={category.name}
            >
              {' '}
              {category.name}
              {' '}

            </li>
          ))
        }
        </ul>
        <div className="button-container">
          <button
            type="button"
            className="playButton"
            onClick={toPageGame}
          >
            Jogar
          </button>
        </div>
      </DropDownContainer>
    </section>
  );
}

export default Home;
