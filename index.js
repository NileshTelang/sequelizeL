require("./models");
const userCon = require("./controller/userCon")

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());


app.get("/",async (req,res)=>{
    res.send("Hello Nova !");
})

app.get("/add",userCon.addUser);
app.get("/users",userCon.getUsers);
app.post("/users",userCon.postUsers);
app.get("/users/:id",userCon.getUser);
app.delete("/users/:id",userCon.deleteUser);
app.patch("/users/:id",userCon.patchUser);
app.get("/finders",userCon.finders);
app.get("/get-set-virtual",userCon.getSetVirtual);
app.get("/validate",userCon.validateUser);

app.listen(4131,()=>{
    console.log("Server up at : http://localhost:4131")
})