'use strict';
const bcrypt = require('bcrypt');

module.exports = {
    up: QueryInterface => {
        return QueryInterface.bulkInsert(
            'students',
            [
                {
                    name: 'Administrador',
                    email: 'admin@gympoint.com',
                    age: 25,
                    password_hash: bcrypt.hashSync('123456', 8),
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ],
            {}
        );
    },

    down: () => {}
};
