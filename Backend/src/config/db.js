const mongoose=require("mongoose")
require("dotenv").config
const Connect= mongoose.connect("mongodb+srv://anandwaghmare:anandrw@cluster0.iijcmzr.mongodb.net/UserInfo?retryWrites=true&w=majority")
 
module.exports={Connect}