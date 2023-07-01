const mongoose=require("mongoose")

const StreakGroupSchema= new mongoose.Schema({

  days:[

  ]
})

const StreakGroup=mongoose.model("StreakGroup",StreakGroupSchema)
module.exports=StreakGroup