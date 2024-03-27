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
  },
  min_questions:{
    type:Number,
    default:1
  }
})

const StreakGroup=mongoose.model("StreakGroup",StreakGroupSchema)
module.exports=StreakGroup