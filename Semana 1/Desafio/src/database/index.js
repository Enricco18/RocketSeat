import Sequelize from 'sequelize';

import dbconfig from '../config/database';

const models = [];
class Database {
    constructor() {
        this.init();
    }
    init() {
        this.connection = new Sequelize(dbconfig);
    }
}
