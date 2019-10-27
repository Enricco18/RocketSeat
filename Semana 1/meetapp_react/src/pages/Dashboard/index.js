import React from 'react';

import { Container } from './styles';

export default function Dashboard() {
    return (
        <Container>
            <div>
                <h1>Meus Meetups</h1>
                <button class="novo">Novo MeetUp</button>
            </div>
            <ul>
                <li>
                    <h4>Amar meu namorado</h4>
                    <div>
                        18:30 <button>Edit</button>{' '}
                    </div>
                </li>
            </ul>
        </Container>
    );
}
