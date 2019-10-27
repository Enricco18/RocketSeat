import React from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import { signInReq } from '~/store/modules/auth/actions';
import logo from '~/assets/headerlogo.svg';

// import { Container } from './styles';

const schema = Yup.object().shape({
    email: Yup.string()
        .required('O email é obrigatório')
        .email('Digite um email válido'),
    password: Yup.string()
        .min(6)
        .required('A senha é obrigatória')
});

export default function SignIn() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);

    function handleSubmit({ email, password }) {
        dispatch(signInReq(email, password));
    }
    return (
        <>
            <img src={logo} alt="MeetApp" class="logo" />

            <Form schema={schema} onSubmit={handleSubmit}>
                <Input
                    name="email"
                    type="text"
                    placeholder="Digite seu email"
                />
                <Input
                    name="password"
                    type="password"
                    placeholder="Digite sua senha"
                />
                <button type="submit">
                    {loading ? 'Carregando...' : 'Acessar!'}
                </button>
                <Link to="/signup">Crie sua conta.</Link>
            </Form>
        </>
    );
}
