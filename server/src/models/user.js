import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
export class User extends Model {
    // hashes the password prior to database storage for security.
    async hashPassword(password) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(password, saltRounds);
    }
}
// function to create the profiles table
export function UserGenerator(sequelize) {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'profiles',
        sequelize,
        hooks: {
            beforeCreate: async (user) => {
                await user.hashPassword(user.password);
            },
        }
    });
    return User;
}
