var db = require("../models");
const { QueryTypes } = require("sequelize");

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

var manyToManyToMany = async (req,res)=>{

    
    res.status(200).json({ data: result });
}

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
  manyToManyToMany
};
