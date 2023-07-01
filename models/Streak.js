const mongoose=require("mongoose")

const StreakSchema= new mongoose.Schema({
  day:{
    type:String,
    required:true,
    unique:true
  },
  problems:[
    
  ],
  group:{
    type:String,
    required:false
  }
})

const Streak=mongoose.model("Streak",StreakSchema)
module.exports=Streak