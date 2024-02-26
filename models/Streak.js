const mongoose=require("mongoose")

const StreakSchema= new mongoose.Schema({
  day:{
    type:String,
    required:true,
    unique:false

  },
  problems:[
    
  ],
  group:{
    type:String,
    required:false
  },
  userId:{
    type:String,
    required:true
  }
})

const Streak=mongoose.model("Streak",StreakSchema)
module.exports=Streak