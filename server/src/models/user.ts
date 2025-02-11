import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

// interface to define the components of a user.
interface UserAttributes {
    id: number;
    username: string;
    password: string;
}

// sets id as optional
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public password!: string;
  savedRecipes: any;

    // hashes the password prior to database storage for security.
    public async hashPassword(password: string) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(password, saltRounds);
    }
}

// function to create the profiles table
export function UserGenerator(sequelize: Sequelize): typeof User {
    User.init(
        {
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
        },
        {
            tableName: 'profiles',
            sequelize,
            hooks: {
                beforeCreate: async (user: User) => {
                    await user.hashPassword(user.password);
                },
            }
        }
    );

    return User;
}