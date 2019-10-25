import Sequelize, { Model } from 'sequelize';

class Meetup extends Model {
    static init(sequelize) {
        super.init(
            {
                title: Sequelize.STRING,
                description: Sequelize.STRING,
                location: Sequelize.STRING,
                date: Sequelize.DATE
            },
            { sequelize }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id' });
        this.belongsTo(models.File, { foreignKey: 'image_id' });
        this.belongsToMany(models.User, {
            through: 'Subscription',
            as: 'users',
            foreignKey: 'meetup_id'
        });
    }
}

export default Meetup;
