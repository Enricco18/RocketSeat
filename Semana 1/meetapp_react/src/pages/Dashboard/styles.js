import styled from 'styled-components';

export const Container = styled.div`
    height: 100%;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: 72px 10px 0px 10px;
    justify-content: flex-start;
    align-items: center;
    div {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        h1 {
            color: rgba(255, 255, 255, 0.9);
        }

        .novo {
            margin-left: 10px;
            width: 80px;
            display: block;
            height: 44px;
            background: red;
            font-size: 12px;
            font-weight: bold;

            border: 0;
            border-radius: 4px;
            color: rgba(255, 255, 255, 0.8);
        }
    }
    ul {
        width: 100%;
        height: 100%;

        li {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 5px;
            margin-bottom: 5px;
            height: 44px;
            background: #2e2759;
            font-size: 12px;
            font-weight: bold;
            border: 0;
            border-radius: 4px;
            color: rgba(255, 255, 255, 0.8);

            div {
                justify-content: flex-end;
                margin: 0px;
                width: 50%;
            }
            button {
                margin-left: 5px;
                max-width: 30px;
                border: 0;
                border-radius: 4px;
                background: rgba(255, 255, 255, 0.8);
                font-weight: bold;
                color: #2e2759;
            }
        }
    }
`;
