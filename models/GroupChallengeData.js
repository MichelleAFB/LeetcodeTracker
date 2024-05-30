const { Timestamp } = require("bson")
const mongoose=require("mongoose")

const groupChallengeDataSchema= new mongoose.Schema({
    challengeId:{
        type:Number,
        unique:true
    },
    contestants:{
      type:Array
    },
    startDate:{
      type:Date,
      required:true
    },
    endDate:{
      type:Date,
      required:true
    },
    createdBy:{
      type:String,
     
    },
    streaks:{
      type:Array
    },
    problemCounter:{
      type:Object
    }
    
})

const GroupChallengeData=mongoose.model("groupChallengeData",groupChallengeDataSchema)
module.exports=GroupChallengeData