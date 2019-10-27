import React from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { signUpReq } from '~/store/modules/auth/actions';

import logo from '~/assets/headerlogo.svg';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
// import { Container } from './styles';

const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
        .required('O email é obrigatório')
        .email('Digite um email válido'),
    password: Yup.string()
        .min(6)
        .required('A senha é obrigatória')
});

export default function SignUp() {
    const dispatch = useDispatch();

    function handleSubmit({ name, email, password }) {
        dispatch(signUpReq(name, email, password));
    }

    return (
        <>
            <img src={logo} alt="MeetApp" class="logo" />
            <Form schema={schema} onSubmit={handleSubmit}>
                <Input name="name" type="text" placeholder="Digite seu nome" />
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
                <button type="submit">Cadastrar!</button>
                <Link to="/">Já tenho uma conta!</Link>
            </Form>
        </>
    );
}
