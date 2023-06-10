const express=require("express")
const { Connect } = require("./src/config/db")
const cors=require("cors")
const app=express()
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const { AuthModel } = require("./src/Models/auth")
app.use(express.json())


app.use(cors())

app.use("/signup",async(req,res)=>{
    let {username} = req.body;
    let isexist = await AuthModel.findOne({username});
    if (isexist) {
      res
        .status(201)
        .send({msg: "User Already Exist With this username Plase Login !!"});
    } else {
      const {username,  password} = req.body;
  
      bcrypt.hash(password, 4, async function (err, hashedpassword) {
        if (err) {
          res.status(201).send({msg: "Something wents wrong ", err: err});
        } else {
          try {
            let newEmployee = new AuthModel({
                             username,
              password: hashedpassword,
            });
            await newEmployee.save();
            res.status(200).send({msg: "Signup Sucessfully", data: newEmployee});
          } catch (err) {
            res
              .status(201)
              .send({msg: "something wents wrong to uploading the data", err});
          }
        }
      });
    }


})
app.use("/login",async(req,res)=>{
    const {username, password} = req.body;
    try {
      if (username && password) {
        const Checkuser = await AuthModel.findOne({username});
  
        if (!Checkuser) {
          res.status(201).send({msg: "User Not Found Please Signup!!"});
        } else {
          const hashedpassword = Checkuser.password;
          const user_id = Checkuser._id;
          bcrypt.compare(password, hashedpassword, function (err, result) {
            if (result) {
              var token = jwt.sign({user_id: user_id}, "ftyyryyr");
              res.status(200).send({token: token, user_id: user_id});
            } else {
              res.status(201).send({
                msg: "Authentication Faild please Check your Password",
                err: err,
              });
            }
          });
        }
      } else {
        res.send({msg: "Input Field Is Missing"});
      }
    } catch (err) {
      res.send({msg: "SomeThing Wents Wrong please Try Again", err});
    }
  

    
})

app.use("/",(req,res)=>{
    console.log("start")
    res.send("start")
})
app.listen(8400,async()=>{

    try{
        console.log("Server http://localhost:8400")
        await Connect
        console.log("Db Connected")
    }catch(err){
console.log(err)
    }
   
})
