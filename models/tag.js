module.exports = (sequelize, DataTypes, Model) => {
  class Tag extends Model {
    async getTaggables(options) {
      const images = await this.getImages(options);
      const videos = await this.getVideos(options);
      // Concat images and videos in a single array of taggables
      return images.concat(videos);
    }
  }
  Tag.init(
    {
      name: DataTypes.STRING,
    },
    { sequelize, modelName: "tag" }
  );

  return Tag;
};
