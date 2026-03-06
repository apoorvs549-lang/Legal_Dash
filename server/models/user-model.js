import { DataTypes } from 'sequelize';
import sequelize from '../config/db-connection.js';
import bcrypt from 'bcrypt';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'lawyer', 'client'),
        allowNull: false,
        defaultValue: 'client',
    },
}, {
    tableName: 'users',
    timestamps: true,
    hooks: {
        beforeCreate: async (user) => {
            user.password = await bcrypt.hash(user.password, 10);
        },
    },
});

/**
 * Compare a plain-text password against the stored hash.
 */
User.prototype.validatePassword = async function (plainPassword) {
    return bcrypt.compare(plainPassword, this.password);
};

export default User;
