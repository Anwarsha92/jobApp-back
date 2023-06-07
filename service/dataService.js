
const jwt=require("jsonwebtoken")
const db = require("./db")



register = (uname, mob, psw) => {
   return db.User.findOne({ mobileNum: mob }).then(user => {
        if (user) {
            return {
                status: false,
                message: "User already present",
                statusCode: 404
            }
        }
        else {
            newUser = new db.User(
                {
                    username: uname,
                    mobileNum: mob,
                    password: psw,
                    applicationStatus:"none"
                }
            )
            newUser.save()

            return{
                status:true,
                message:"Successfully registered",
                statusCode:200
            }
        }
    })
}

login=(mob,psw)=>{
   return db.User.findOne({mobileNum:mob,password:psw}).then(user=>{
        if(user){

            currentMob=user.mobileNum
            currentUser=user.username

            const token=jwt.sign({mob},"tokenkey")

            return{
                status:true,
                message:"Successfully login",
                statusCode:200,
                currentMob,
                currentUser,
                token
            }
        }
        else{
            return{
                status:false,
                message:"Incorrect account number or password or user not registered",
                statusCode:404

            }
        }
    })
}

submit=(cname,quali,mob,email,expe,appfor)=>{
    return db.User.findOne({mobileNum:mob}).then(user=>{
        if(user){

            if(user.application.length == 0){

                user.application.push({cname,qualification:quali,mobileNum:mob,email,experience:expe,appliedfor:appfor})

                user.save()
        
            return{
                status:true,
                message:`You are successfully applied for ${appfor}. Your application under varification. Confirmation will be inform soon`,
                application:user.application,
                statusCode:200
            }


        }
        else{
            return{
                status:false,
                message:"Sorry !!! you can apply only once",
                statusCode:404
            }
        }
        }
        else{
            return{
                status:false,
                message:"Please enter your registered mobile number",
                statusCode:404
            }
        }
       
    })
}

adlogin=(uname,psw)=>{
    return db.Admin.findOne({username:uname,password:psw}).then(user=>{
        if(user){


            currentAdmin=user.username
            return{
                status:true,
                message:"Successfully login",
                statusCode:200,
                currentAdmin
            }
        }
        else{
            return{
                status:false,
                message:"Unauthorized login",
                statusCode:404
            }
        }
    })
}

getApplications=()=>{
  return  db.User.find({}).then(user=>{
    if(user){
        return{
            status:true,
            application:user.map(n1=>n1["application"]).flat(),
            statusCode:200
        }
    }
  })
    
  }

  accept=(mob)=>{
    return db.User.findOne({mobileNum:mob}).then(user=>{
        if(user){

            user.applicationStatus="Accepted"

            user.save()

            return{
                status:true,
                message:"Success",
                statusCode:200
            }

        }
    })
  }


  reject=(mob)=>{
    return db.User.findOne({mobileNum:mob}).then(user=>{
        if(user){

            user.applicationStatus="Rejected"

            user.save()

            return{
                status:true,
                message:"Success",
                statusCode:200
            }

        }
    })
  }





  notification=(mob)=>{
    return db.User.findOne({mobileNum:mob}).then(user=>{
        if(user){
            if(user.applicationStatus == "Accepted"){
                return{
                    status:true,
                    message:`Congratz You have been selected for the job you are applied the position of ${user.application[0].appliedfor}. Interview date will be inform soon...`,
                    statusCode:200
                }
            }
            else if(user.applicationStatus == "Rejected"){

                return{
                    status:true,
                    message:`We regret to inform you that your application for ${user.application[0].appliedfor} has been rejected, either Slot is full or You haven't met the conditions given.`,
                    statusCode:200
                }

            }
            else{

                return{
                    status:true,
                    message:`Currently you have no notifications`,
                    statusCode:200
                }

            }
        }
    })
  }



  delAcc=(mob)=>{
    return db.User.deleteOne({mobileNum:mob}).then(user=>{
      if(user){
        return{
          status:true,
          message:"Account deleted",
          statusCode:200
        }
      }
      else{
        return{
          status:false,
          message:"Invalid mobile number",
          statusCode:400
        }
      }
    })
  }



module.exports={
    register,login,submit,adlogin,getApplications,accept,notification,reject,delAcc
}