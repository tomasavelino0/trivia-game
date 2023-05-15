import styled from 'styled-components';

const GameSection = styled.section`
    width: 100%;
    height: 100%;

    .header-game {
        display: flex;
        justify-content: space-evenly;
        font-size: 1.2rem;
        padding: 1rem;
        width: 100%;
    }
    
    .questions {
        align-items: center;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    .answer-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .answer-container li {
        border: 1px solid #f2f2f2;
        list-style: none;
        border-radius: 2rem;
        padding: 0.3rem;
        margin-bottom: 0.5rem;
        width: 300px;
    }
    
    .answer-container li:hover {
        cursor: pointer;
        background-color: #000080;
    }

    .play-again {
        display: flex;
        font-size: 24px;
        justify-content: center;
        margin-top: 60px;
    }
    
    h1 {
        padding: 1rem;
        margin-top: 2rem;
        max-width: 70%;
        text-align: center;
    }
`;

export default GameSection;
