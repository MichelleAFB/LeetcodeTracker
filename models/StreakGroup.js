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
    
  },
  max_questions:{
    type:Number, 
  },total_problems:{
    type:Number
  }
})

const StreakGroup=mongoose.model("StreakGroup",StreakGroupSchema)
module.exports=StreakGroup