const { Sequelize, DataTypes, Model, QueryTypes } = require("sequelize");

const sequelize = new Sequelize("sequelize", "root", "Trisha@41", {
  host: "localhost",
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};
// db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user")(sequelize, DataTypes, Model);
db.contacts = require("./contact")(sequelize, DataTypes);
db.profile = require("./profile")(sequelize, DataTypes);
db.customer = require("./customer")(sequelize, DataTypes);
db.educations = require("./education")(sequelize, DataTypes);
db.userContacts = require("./userContacts")(
  sequelize,
  DataTypes,
  db.user,
  db.contacts
);
db.userProfile = require("./userProfile")(
  sequelize,
  DataTypes,
  db.customer,
  db.profile
);
db.image = require("./image")(sequelize, DataTypes, Model);
db.video = require("./video")(sequelize, DataTypes, Model);
db.comment = require("./comments")(sequelize, DataTypes, Model);
db.tag = require("./tag")(sequelize, DataTypes, Model);
db.tagTaggable = require("./tagTaggable")(sequelize, DataTypes, Model);



// db.user.hasOne(db.contacts,{ foreignKey: 'user_id',as:'otherDetails'}); //userId => no need of foreinKey declaration
// db.contacts.belongsTo(db.user);

// db.user.hasMany(db.contacts); //userId => no need of foreinKey declaration
// db.contacts.belongsTo(db.user);

//Creatig with association
db.user.hasMany(db.contacts); //userId => no need of foreinKey declaration
db.Creator = db.contacts.belongsTo(db.user, {
  foreignKey: "UserId",
  as: "users",
});

db.contacts.hasMany(db.educations);
db.educations.belongsTo(db.contacts);

//Advanced M : N (many to many)
// db.customer.belongsToMany(db.profile, { through: db.userProfile , uniqueKey: 'my_custom_unique'});
// db.profile.belongsToMany(db.customer, { through: db.userProfile });

// (or one to many )
db.customer.hasMany(db.userProfile);
db.userProfile.belongsTo(db.customer);

db.profile.hasMany(db.userProfile);
db.userProfile.belongsTo(db.profile);

// db.user.belongsToMany(db.contacts,{through :db.userContacts});
// db.contacts.belongsToMany(db.user,{through :db.userContacts});

//manytomanytomany relationship
db.player = sequelize.define("Player", { username: DataTypes.STRING });
db.team = sequelize.define("Team", { name: DataTypes.STRING });
db.game = sequelize.define("Game", { name: DataTypes.STRING });

db.gameTeam = sequelize.define("GameTeam", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});
db.team.belongsToMany(db.game, { through: db.gameTeam });
db.game.belongsToMany(db.team, { through: db.gameTeam });
db.gameTeam.belongsTo(db.game);
db.gameTeam.belongsTo(db.team);
db.game.hasMany(db.gameTeam);
db.team.hasMany(db.gameTeam);

// We apply a Super Many-to-Many relationship between db.player and GameTeam
db.playerGameTeam = sequelize.define("PlayerGameTeam", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});
db.player.belongsToMany(db.gameTeam, { through: db.playerGameTeam });
db.gameTeam.belongsToMany(db.player, { through: db.playerGameTeam });
db.playerGameTeam.belongsTo(db.player);
db.playerGameTeam.belongsTo(db.gameTeam);
db.player.hasMany(db.playerGameTeam);
db.gameTeam.hasMany(db.playerGameTeam);


//subQ

db.post = sequelize.define('post', {
  content: DataTypes.STRING
}, { timestamps: false });

db.reaction = sequelize.define('reaction', {
  type: DataTypes.STRING
}, { timestamps: false });

db.post.hasMany(db.reaction);
db.reaction.belongsTo(db.post);

//polymorphic association
var Image = db.image;
var Video = db.video;
var Comment = db.comment;


//1 . onetomany
Image.hasMany(Comment, {
  foreignKey: 'commentableId',
  constraints: false,
  scope: {
    commentableType: 'image'
  }
});
Comment.belongsTo(Image, { foreignKey: 'commentableId', constraints: false });

Video.hasMany(Comment, {
  foreignKey: 'commentableId',
  constraints: false,
  scope: {
    commentableType: 'video'
  }
});
Comment.belongsTo(Video, { foreignKey: 'commentableId', constraints: false });


//2 . manytomany
var Tag = db.tag;
var Tag_Taggable = db.tagTaggable;

Image.belongsToMany(Tag, {
  through: {
    model: Tag_Taggable,
    unique: false,
    scope: {
      taggableType: 'image'
    }
  },
  foreignKey: 'taggableId',
  constraints: false
});
Tag.belongsToMany(Image, {
  through: {
    model: Tag_Taggable,
    unique: false
  },
  foreignKey: 'tagId',
  constraints: false
});

Video.belongsToMany(Tag, {
  through: {
    model: Tag_Taggable,
    unique: false,
    scope: {
      taggableType: 'video'
    }
  },
  foreignKey: 'taggableId',
  constraints: false,
});
Tag.belongsToMany(Video, {
  through: {
    model: Tag_Taggable,
    unique: false
  },
  foreignKey: 'tagId',
  constraints: false,
});



db.sequelize.sync({ force: true });
module.exports = db;
