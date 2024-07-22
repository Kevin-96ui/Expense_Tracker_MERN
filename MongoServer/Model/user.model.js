const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username:{
            type:"String",
        },
        email:{
            type:"String",
            required:true,
        },
        password:{
            type:"String",
            required:true,
        }
    },
    {
        timestamps:true,
    }
)

const user = mongoose.model("user",userSchema);
module.exports=user;