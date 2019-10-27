import React from 'react';
import * as Yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { Container, Content } from './styles';
import { updateRequest } from '~/store/modules/user/actions';

const schema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().email(),
    oldPassword: Yup.string(),
    password: Yup.string().when('oldPassword', (oldPassword, field) =>
        oldPassword
            ? field.required('Digite uma nova senha para altera-lá').min(6)
            : field
    ),
    confirmPassword: Yup.string().when('password', (password, field) =>
        password
            ? field
                  .required('Confirme sua nova senha')
                  .oneOf([Yup.ref('password')])
            : field
    )
});

export default function Perfil() {
    const dispach = useDispatch();
    const profile = useSelector(state => state.user.profile);

    function handleSubmit(data) {
        dispach(updateRequest(data));
    }

    return (
        <Container>
            <Content>
                <Form
                    schema={schema}
                    initialData={profile}
                    onSubmit={handleSubmit}
                >
                    <Input
                        type="text"
                        name="name"
                        placeholder="Nome completo"
                    ></Input>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Seu email"
                    ></Input>
                    <hr />
                    <Input
                        name="oldPassword"
                        placeholder="Sua senha atual"
                        type="password"
                    ></Input>
                    <Input
                        name="password"
                        placeholder="Nova senha"
                        type="password"
                    ></Input>
                    <Input
                        name="confirmPassword"
                        placeholder="Confirmação de senha"
                        type="password"
                    ></Input>
                    <button type="submit">Atualizar perfil!</button>
                </Form>
            </Content>
        </Container>
    );
}
