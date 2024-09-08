import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/db';

class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        password: {
            type: new DataTypes.STRING(128),
            allowNull: false
        },

    },
    {
        tableName: 'users',
        sequelize,
    
    }
);

User.prototype.toJSON = function () {
    const userObj = this.get();
    delete userObj.password;
    return userObj;
};

export default User;