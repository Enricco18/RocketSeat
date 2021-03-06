import Sequelize from 'sequelize';

import dbconfig from '../config/database';

import User from '../app/models/User';
import Student from '../app/models/Student';

const models = [User, Student];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(dbconfig);

        models.map(model => model.init(this.connection));
    }
}

export default new Database();
