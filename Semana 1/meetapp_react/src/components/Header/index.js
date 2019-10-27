import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Content, Profile } from './styles';

import logo from '~/assets/headerlogo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.user.profile);

    function handleSignOut() {
        dispatch(signOut());
    }

    return (
        <Container>
            <Content>
                <nav>
                    <Link to="/dashboard">
                        <img src={logo} alt="Logo MeetApp" class="headerlogo" />
                    </Link>
                </nav>
                <aside>
                    <Profile>
                        <div>
                            <strong>{profile.name}</strong>
                            <Link to="/profile">Meu Perfil</Link>
                        </div>
                        <button onClick={handleSignOut}>SAIR</button>
                    </Profile>
                </aside>
            </Content>
        </Container>
    );
}
