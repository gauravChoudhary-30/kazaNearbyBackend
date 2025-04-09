const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user.model'); // Adjust path if needed

const Profile = sequelize.define('Profile', {
  profile_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // same as User table name
      key: 'id'
    },
    onDelete: 'CASCADE',
    unique: true // ensures one-to-one relationship
  },
  FirstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  MiddleName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  LastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  PhoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  Occupation: {
    type: DataTypes.STRING,
    allowNull: true
  },
  WorkExperience: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'profiles'
});

// Define one-to-one relationship
User.hasOne(Profile, {
  foreignKey: 'id',
  onDelete: 'CASCADE'
});

Profile.belongsTo(User, {
  foreignKey: 'id'
});

module.exports = Profile;
