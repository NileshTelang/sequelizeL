module.exports = (sequelize, DataTypes, Model) => {
    class Image extends Model {}
    Image.init(
      {
        title: DataTypes.STRING,
        url: DataTypes.STRING,
      },
      { sequelize, modelName: "image" }
    );
  
    return Image;
  };
  