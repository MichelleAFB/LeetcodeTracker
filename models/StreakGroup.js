const mongoose=require("mongoose")

const StreakGroupSchema= new mongoose.Schema({
  userId:{
    type:Number,
  },
  days:[

  ]
})

const StreakGroup=mongoose.model("StreakGroup",StreakGroupSchema)
module.exports=StreakGroup