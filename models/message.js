const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Message = sequelize.define("Message", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  text: { type: DataTypes.STRING, allowNull: false },
});

Message.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Message, { foreignKey: "userId" });

module.exports = Message;
