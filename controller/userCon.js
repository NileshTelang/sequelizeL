var db = require("../models");
const { QueryTypes, DataTypes } = require("sequelize");

const User = db.user;
const Contact = db.contacts;
const Education = db.educations;
const Customer = db.customer;
const Profile = db.profile;
const User_Profile = db.userProfile;

var addUser = async (req, res) => {
  const jane = await User.create({ firstName: "Nova" });
  // Jane exists in the database now!
  console.log(jane instanceof User); // true
  console.log(jane.name); // "Jane"

  console.log(jane.toJSON()); // This is good!\
  res.status(200).json(jane.toJSON());

  // jane.destroy();
};

var getUsers = async (req, res) => {
  const data = await User.findAll({});
  res.status(200).json({ data: data });
};

var getUser = async (req, res) => {
  const data = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ data: data });
};

var postUsers = async (req, res) => {
  let postData = req.body;
  if (postData.length > 1) {
    var data = await User.create(postData);
  } else {
    var data = await User.create(postData);
  }
  res.status(200).json({ data: data });
};

var deleteUser = async (req, res) => {
  const data = await User.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ data: data });
};

var patchUser = async (req, res) => {
  var updatedData = req.body;
  const data = await User.update(updatedData, {
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ data: data });
};

var finders = async (req, res) => {
  const [user, created] = await User.findOrCreate({
    where: { firstName: "Krishn" },
    defaults: {
      lastName: "Technical Lead JavaScript",
    },
  });

  res.status(200).json({ data: user, created: created });
};

var getSetVirtual = async (req, res) => {
  const data = await User.findAll({});

  res.status(200).json({ data: data });
};

var validateUser = async (req, res) => {
  var data = {};
  var msg = {};

  try {
    data = await User.create({
      firstName: "abhishek",
      lastName: "Unde",
    });
  } catch (e) {
    let m;
    e.errors.forEach((err) => {
      switch (err.validatorKey) {
        case "not_unique":
          m = "Fax u bro u already exist";
          break;
        case "isLowercase":
          m = "Chote akshar daal love day";
          break;
      }
      msg[err.path] = m;
    });
  }

  res.status(200).json({ data: data, message: msg });
};

var rawQueries = async (req, res) => {
  //database queries (sql)
  const users = await db.sequelize.query("SELECT * FROM `users`", {
    type: QueryTypes.SELECT,
  });
  res.status(200).json({ data: users });
};

var oneToOne = async (req, res) => {
  //database queries (sql)
  // var data = await User.create({firstName : "bite",lastName : "frost"});
  // if(data && data.id){
  //     await Contact.create({phoneNumber:143,address:"abc",user_id : data.id})
  // }

  var data = await User.findAll({
    attributes: ["firstName", "lastName"],
    include: [
      {
        model: Contact,
        as: "otherDetails",
        attributes: ["phoneNumber", "address"],
      },
    ],
  });
  res.status(200).json({ data: data });
};

var oneToMany = async (req, res) => {
  // await Contact.create({phoneNumber:143,address:"abc",user_id : 1});

  var data = await User.findAll({
    attributes: ["firstName", "lastName"],
    include: [
      {
        model: Contact,
        as: "otherDetails",
        attributes: ["phoneNumber", "address"],
      },
    ],
  });
  res.status(200).json({ data: data });
};

var manyToMany = async (req, res) => {
  // var data = await User.create({firstName : "frost",lastName : "bite"});
  // if(data && data.id){
  //     await Contact.create({phoneNumber:431,address:"abc"})
  // };
  var data = await User.findAll({
    attributes: ["firstName", "lastName"],
    include: [
      {
        model: Contact,
        attributes: ["phoneNumber", "address"],
      },
    ],
  });

  res.status(200).json({ data: data });
};

var paranoid = async (req, res) => {
  // var data = await User.create({firstName : "bite",lastName : "frost"});

  // var data = await User.destroy({
  //     where : {
  //         id:2
  //     }
  // })

  // var data = await  User.restore({
  //     where :{
  //         id:2
  //     }
  // });

  var data = await User.findAll({
    paranoid: false,
  });

  res.status(200).json({ data: data });
};

var loadingUser = async (req, res) => {
  // var data = await User.create({firstName : "nova",lastName : "bite"});
  // if(data && data.id){
  //    await Contact.create({phoneNumber:431,address:"xuz",UserId:data.id})
  // };

  //eagerLoading
  var data = await User.findAll({
    attributes: ["firstName", "lastName"],
    include: [
      {
        model: Contact,
        attributes: ["phoneNumber", "address"],
      },
    ],
  });

  //lazyLoading
  // var data = await User.findOne({
  //     where : {
  //         id : 2
  //     }
  // })

  // var contactData = data.getContacts(); lazy loading err

  res.status(200).json({ data: data });
};

var eagerLoading = async (req, res) => {
  var data = User.findAll({
    include: {
      model: Contact,
      required: true,
      right: true, // no use unless it's outer join i.e. required : false
      include: {
        model: Education,
        required: false,
        right: true,
      },
    },
  });

  res.status(200).json({ data: data });
};

var creator = async (req, res) => {
  // await Contact.bulkCreate([{
  //     phoneNumber : 123,
  //     address : "abc",
  //     users : {
  //         firstName : "hey",
  //         lastName : "Nova"
  //     }
  // },{
  //     phoneNumber : 456,
  //     address : "def",
  //     users : {
  //         firstName : "hey",
  //         lastName : "kt"
  //     }
  // },{
  //     phoneNumber : 789,
  //     address : "xyz",
  //     users : {
  //         firstName : "hey",
  //         lastName : "atero"
  //     }
  // }],{
  //     include : [db.Creator]
  // })

  var data = await User.findAll({
    attributes: ["firstName", "lastName"],
    include: [
      {
        model: Contact,
        attributes: ["phoneNumber", "address"],
      },
    ],
  });

  res.status(200).json({ data: data });
};

var mnAdvanced = async (req, res) => {
  //   const result = await Customer.create(
  //     {
  //       username: "King",
  //       points: 1000,
  //       profiles: [
  //         {
  //           name: "Queen",
  //           User_Profile: {
  //             selfGranted: false,
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       include: Profile,
  //     }
  //   );

  // const result = await Customer.findOne({
  //   where: { username: "King" },
  //   include: Profile,
  // });

  const result = await Customer.findAll({
    include: {
      model: User_Profile,
      include: { model: Profile },
    },
  });

  res.status(200).json({ data: result });
};

var manyToManyToMany = async (req, res) => {
  await db.player.bulkCreate([
    { username: "s0me0ne" },
    { username: "empty" },
    { username: "greenhead" },
    { username: "not_spock" },
    { username: "bowl_of_petunias" },
  ]);
  await db.game.bulkCreate([
    { name: "The Big Clash" },
    { name: "Winter Showdown" },
    { name: "Summer Beatdown" },
  ]);
  await db.team.bulkCreate([
    { name: "The Martians" },
    { name: "The Earthlings" },
    { name: "The Plutonians" },
  ]);

  await db.gameTeam.bulkCreate([
    { GameId: 1, TeamId: 1 }, // this GameTeam will get id 1
    { GameId: 1, TeamId: 2 }, // this GameTeam will get id 2
    { GameId: 2, TeamId: 1 }, // this GameTeam will get id 3
    { GameId: 2, TeamId: 3 }, // this GameTeam will get id 4
    { GameId: 3, TeamId: 2 }, // this GameTeam will get id 5
    { GameId: 3, TeamId: 3 }, // this GameTeam will get id 6
  ]);

  await db.playerGameTeam.bulkCreate([
    // In 'Winter Showdown' (i.e. GameTeamIds 3 and 4):
    { PlayerId: 1, GameTeamId: 3 }, // s0me0ne played for The Martians
    { PlayerId: 3, GameTeamId: 3 }, // greenhead played for The Martians
    { PlayerId: 4, GameTeamId: 4 }, // not_spock played for The Plutonians
    { PlayerId: 5, GameTeamId: 4 }, // bowl_of_petunias played for The Plutonians
  ]);

  const result = await db.game.findOne({
    where: {
      name: "Winter Showdown",
    },
    include: {
      model: db.gameTeam,
      include: [
        {
          model: db.player,
          through: { attributes: [] }, // Hide unwanted `PlayerGameTeam` nested object from results
        },
        db.team,
      ],
    },
  });

  res.status(200).json({ data: result });
};

const scopes = async (req, res) => {
  db.game.addScope("whereGame", {
    where: {
      name: "Winter Showdown",
    },
  });

  db.game.addScope("include", {
    include: {
      model: db.gameTeam,
      include: [
        {
          model: db.player,
          through: { attributes: [] }, // Hide unwanted `PlayerGameTeam` nested object from results
        },
        db.team,
      ],
    },
  });

  const result = await db.game.scope(["whereGame", "include"]).findOne({});

  res.status(200).json({ data: result });
};

var transactionUser = async (req, res) => {
  const t = await db.sequelize.transaction();

  var data = await User.create({ firstName: "nova", lastName: "bite" });

  if (data && data.id) {
    try {
      await Contact.create({ phoneNumber: 431, address: "xuz", UserId: null });
      await t.commit();
    } catch (error) {
      await t.rollback();
      await User.destroy({
        where: {
          id: data.id,
        },
      });
    }
  }

  res.status(200).json({ data: data });
};

var hooks = async (req, res) => {
  var data = await User.create({
    firstName: "nils",
    lastName: "zoro",
  });

  res.status(200).json({ data: data });
};

var queryInterface = async (req, res) => {
  const queryInterface = db.sequelize.getQueryInterface();

  queryInterface.createTable("Person", {
    name: DataTypes.STRING,
    isBetaMember: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });

  // queryInterface.addColumn('Person', 'petName', { type: DataTypes.STRING });

  // queryInterface.addColumn('Person', 'foo', { type: DataTypes.STRING });

  queryInterface.changeColumn("Person", "foo", {
    type: DataTypes.FLOAT,
    defaultValue: 3.14,
    allowNull: false,
  });

  queryInterface.removeColumn("Person", "petName", {
    /* query options */
  });

  res.status(200).json({ data: "Zoro" });
};

var subQuery = async (req, res) => {
  async function makePostWithReactions(content, reactionTypes) {
    const post = await db.post.create({ content });
    await db.reaction.bulkCreate(
      reactionTypes.map((type) => ({ type, postId: post.id }))
    );
    return post;
  }

  await makePostWithReactions("Hello World", [
    "Like",
    "Angry",
    "Laugh",
    "Like",
    "Like",
    "Angry",
    "Sad",
    "Like",
  ]);
  await makePostWithReactions("My Second Post", [
    "Laugh",
    "Laugh",
    "Like",
    "Laugh",
  ]);

  const data = await db.post.findAll({
    attributes: {
      include: [
        [
          db.sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM reactions AS reaction
                    WHERE
                        reaction.postId = post.id
                        AND
                        reaction.type = "Laugh"
                )`),
          "laughReactionsCount",
        ],
      ],
    },
    order: [[db.sequelize.literal("laughReactionsCount"), "DESC"]],
  });
  res.status(200).json({ data: data });
};

var Image = db.image;
var Video = db.video;
var Comment = db.comment;
var polyotm = async (req, res) => {
  var imageData = await Image.create({
    title: "First Image",
    url: "first_url",
  });
  var videoData = await Video.create({
    title: "First Video",
    text: "My First Video",
  });

  if (imageData && imageData.id) {
    await Comment.create({
      title: "First Comment For Image",
      commentableId: imageData.id,
      commentableType: "image",
    });
    await Comment.create({
      title: "Second Comment For Image",
      commentableId: imageData.id,
      commentableType: "image",
    });
  }

  if (videoData && videoData.id) {
    await Comment.create({
      title: "First Comment For Video",
      commentableId: videoData.id,
      commentableType: "video",
    });
  }

  var imageData = await Image.findAll({
    include: [
      {
        model: Comment,
      },
    ],
  });

  var videoData = await Video.findAll({
    include: [
      {
        model: Comment,
      },
    ],
  });

  res.status(200).json({ data: [imageData, videoData] });
};

var Tag = db.tag;
var Tag_Taggable = db.tagTaggable;
var polymtm = async (req, res) => {
  var imageData = await Image.create({
    title: "First Image",
    url: "first_url",
  });
  var videoData = await Video.create({
    title: "First Video",
    text: "My First Video",
  });
  var tagData = await Tag.create({
    name: "Roronoa",
  });

  if (tagData && tagData.id && imageData && imageData.id) {
    await Tag_Taggable.create({
      tagId: tagData.id,
      taggableId: imageData.id,
      taggableType: "image",
    });
  }

  if (tagData && tagData.id && videoData && videoData.id) {
    await Tag_Taggable.create({
      tagId: tagData.id,
      taggableId: videoData.id,
      taggableType: "video",
    });
  }

  var imageData = await Image.findAll({
    include: [
      {
        model: Tag,
      },
    ],
  });

  var videoData = await Video.findAll({
    include: [
      {
        model: Tag,
      },
    ],
  });

  var tagData = await Tag.findAll({
    include: [Image, Video],
  });

  res.status(200).json({ data: tagData });
};

module.exports = {
  addUser,
  getUsers,
  getUser,
  postUsers,
  deleteUser,
  patchUser,
  finders,
  getSetVirtual,
  validateUser,
  rawQueries,
  oneToOne,
  oneToMany,
  manyToMany,
  paranoid,
  loadingUser,
  eagerLoading,
  creator,
  mnAdvanced,
  manyToManyToMany,
  scopes,
  transactionUser,
  hooks,
  queryInterface,
  subQuery,
  polyotm,
  polymtm,
};
