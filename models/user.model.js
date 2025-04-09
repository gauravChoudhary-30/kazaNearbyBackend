const {DataTypes} = require('sequelize');
const sequelize = require('../db'); // Assuming db.js is in the same directory
const { encryptPassword } = require('../middlewares/auth');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
    tableName: 'users', // Optional: specify the table name if different from the model name

    hooks: {
        beforeCreate: async (user, options) => {
          user.password = await encryptPassword(user.password);
        },
        beforeUpdate: async (user, options) => {
          if (user.changed('password')) {
            user.password = await encryptPassword(user.password);
          }
        }
      }
});

module.exports = User;