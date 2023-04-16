module.exports = (sequelize, DataTypes, Model) => {
  class Tag_Taggable extends Model {}
  Tag_Taggable.init(
    {
      id : {
        type: DataTypes.INTEGER,
        primaryKey : true ,
        autoIncrement : true 
      },
      tagId: {
        type: DataTypes.INTEGER,
      },
      taggableId: {
        type: DataTypes.INTEGER,
        references: null,
      },
      taggableType: {
        type: DataTypes.STRING,
      },
    },
    { sequelize, modelName: "tag_taggable" }
  );

  return Tag_Taggable;
};
