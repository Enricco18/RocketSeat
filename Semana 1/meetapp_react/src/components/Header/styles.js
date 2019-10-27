import styled from 'styled-components';

export const Container = styled.div`
    background: #1b1735;
    padding: 0 30px;
`;

export const Content = styled.div`
    height: 64px;
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    aling-items: center;
    justify-content: space-between;

    nav {
        display: flex;
        align-items: center;
        a {
            img {
                margin-right: 20px;
                padding-rigt: 20px;
                border-left: 1px solid #1b1735;
            }
        }
    }

    aside {
        display: flex;
        align-items: center;
    }
`;

export const Profile = styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;
    padding-left: 20px;
    border-left: 1px solid #1b1735;
    div {
        text-align: right;
        margin-right: 10px;

        strong {
            display: block;
            color: #eee;
        }
        a {
            display: block;
            color: #eee;
            opacity: 0.8;
            margin-top: 2px;
            font-size: 12px;
        }
    }

    button {
        width: 80px;
        display: block;
        height: 44px;
        background: red;
        font-weight: bold;
        border: 0;
        border-radius: 4px;
        color: #fff;
    }
`;
