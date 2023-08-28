const mongoose=require("mongoose")

const StreakGroupSchema= new mongoose.Schema({
  userId:{
    type:String,
  },
  days:[

  ],
  active:{
    type:Boolean,
    default:true
  }
})

const StreakGroup=mongoose.model("StreakGroup",StreakGroupSchema)
module.exports=StreakGroup