

const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/jobApplication",{useNewUrlParser:true})


const User=mongoose.model("User",
{
    username:String,
    mobileNum:Number,
    password:String,
    applicationStatus:String,
    application:[]
})


const Admin=mongoose.model("Admin",
{
    username:String,
    password:String
})

const Application=mongoose.model("Application",
{
    cname:String,
    qualification:String,
    phoneNum:Number,
    email:String,
    experience:String,
    appliedFor:String
})

module.exports={
    User,Application,Admin
}