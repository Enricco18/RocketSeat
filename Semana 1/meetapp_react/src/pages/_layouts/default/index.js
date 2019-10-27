import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';
import Header from '~/components/Header';

export default function defaultLayout({ children }) {
    return (
        <>
            <Header></Header>
            <Container>{children}</Container>
        </>
    );
}

defaultLayout.propTypes = {
    children: PropTypes.element.isRequired
};
