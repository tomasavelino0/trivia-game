import styled from 'styled-components';

export const Title = styled.h1`
    font-size: 4rem;
    text-align: center;
    height: 10rem;
    `;

export const DropDownContainer = styled.div`
      align-items: center;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;

      .Hidden {
        display: none;
      }

    .DropdownList {
        width: 6px;
        height: 9px;
        background: none;
        scrollbar-width: auto;
        height: 10rem;
        list-style: none;
        overflow-y: auto;
        padding: 0;
        width: 25rem;
    }
    .button {
        appearance: none;
        background: none;
        border: none;
        color: #ff4700;
        cursor: pointer;
        font-size: 1.5rem;
        margin: 0 1.5rem 0 auto;
        padding: .2rem .2rem 0 .2rem;
        border-bottom: 1px solid #ff4700;
        margin-right: 5rem;
    }
    ul {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
    }
    li {
        cursor: pointer;
        padding: 0.5rem;
    }
    li:hover { background-color: grey }
`;
