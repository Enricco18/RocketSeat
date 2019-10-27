import styled from 'styled-components';
import { darken } from 'polished';
export const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Content = styled.div`
    text-align: center;
    width: 100%;
    max-width: 320px;
    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    input {
        background: rgba(0, 0, 0, 0.1);
        border: 0;
        border-radius: 4px;
        height: 40px;
        padding: 0 10px;
        color: #fff;
        margin: 0 0 10px;
    }

    input::placeholder {
        color: rgba(255, 255, 255, 0.7);
    }

    button {
        height: 44px;
        background: #ff6666;
        font-weight: bold;
        border: 0;
        border-radius: 4px;
        padding: 0 10px;
        color: #fff;
        margin: 5px 0 0;
    }
    button:hover {
        background: ${darken(0.03, '#ff6666')};
    }

    hr {
        width: 100%;
        height: 1px;
        border: 0px;
        background: rgba(255, 255, 255, 0.4);
        margin: 10px 0 20px;
    }
`;
