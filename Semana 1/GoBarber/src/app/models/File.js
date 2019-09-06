import Sequelize, { Model } from 'sequelize';

class File extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                url: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return `http://localhost:3333/files/${this.path}`;
                    }
                },
                path: Sequelize.STRING
            },
            {
                sequelize
            }
        );
        return this;
    }
}

export default File;
