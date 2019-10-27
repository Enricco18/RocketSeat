import styled from 'styled-components';
import { darken } from 'polished';
export const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(#241f47, #8c83c9);
`;

export const Content = styled.div`
    text-align: center;

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

    &::placeholder {
        color: rgba(255, 255, 255, 0.7);
    }
    img {
        margin-bottom: 20px;
    }

    button {
        height: 44px;
        background: #3b9eff;
        font-weight: bold;
        border: 0;
        border-radius: 4px;
        padding: 0 10px;
        color: #fff;
        margin: 5px 0 0;
    }
    button:hover {
        background: ${darken(0.03, '#3b9eff')};
    }

    a {
        opacity: 0.8;
        color: #fff;
        margin-top: 15px;
        max-width: 320px;
    }
    a:hover {
        opacity: 1;
    }
    span {
        margin: 0 0 5px;
        opacity: 0.8;
    }
`;
