var db = require("../models");
const User = db.user;

var addUser = async (req, res) => {
    const jane = await User.create({ firstName: "Nova" });
    // Jane exists in the database now!
    console.log(jane instanceof User); // true
    console.log(jane.name); // "Jane"

    console.log(jane.toJSON()); // This is good!\
    res.status(200).json(jane.toJSON());

    // jane.destroy();
}

var getUsers = async (req, res) => {

    const data = await User.findAll({});
    res.status(200).json({ data: data });

}

var getUser = async (req, res) => {

    const data = await User.findOne({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({ data: data });

}

var postUsers = async (req, res) => {

    let postData = req.body;
    if (postData.length > 1) {
        var data = await User.create(postData);
    } else {
        var data = await User.create(postData);
    }
    res.status(200).json({ data: data });

}


var deleteUser = async (req, res) => {

    const data = await User.destroy({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({ data: data });

}

var patchUser = async (req, res) => {

    var updatedData = req.body;
    const data = await User.update(updatedData,{
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({ data: data });

}

module.exports = {
    addUser,
    getUsers,
    getUser,
    postUsers,
    deleteUser,
    patchUser
}