
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "customers",
    {
      username: DataTypes.STRING,
      points: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  );

  return Customer;
};
