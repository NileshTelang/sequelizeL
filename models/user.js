module.exports = (sequelize, DataTypes, Model) => {
  class User extends Model {}

  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          isAlpha: true,
          isLowercase: true,
        },
        // get() {
        //     const rawValue = this.getDataValue('firstName');
        //     return rawValue ? 'Yo boy '+rawValue.toUpperCase() : null;
        //   }
      },
      lastName: {
        type: DataTypes.STRING,
        // set(value) {
        //     this.setDataValue('lastName', value + " r .");
        //   }
      },
      // fullName: {
      //     type: DataTypes.VIRTUAL,
      //     get() {
      //       return `${this.firstName} ${this.lastName}`;
      //     },
      //     set(value) {
      //       throw new Error('Do not try to set the `fullName` value!');
      //     }
      //   }
    },
    {
      hooks: {
        beforeValidate: (user, options) => {
          user.lastName = "happy";
        },
        afterValidate: (user, options) => {
          user.firstName = "Toni";
        },
      },
      sequelize,
      modelName: "User",
      paranoid: true,
      deletedAt: "softDel",
      // timestamps:false //to use paranoid timestapms should not be False
    }
  );

  console.log(User === sequelize.models.User);

  return User;
};
