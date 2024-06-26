const { Timestamp } = require("bson")
const mongoose=require("mongoose")

const groupChallengeDataSchema= new mongoose.Schema({
    challengeId:{
        type:Number,
        unique:true
    },
    title:{
      type:String
    },
    contestants:{
      type:Array
    },
    startDay:{
      type:String
    },
    endDay:{
      type:String
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
    },ranks:{
      type:Array
    }
    
})

const GroupChallengeData=mongoose.model("groupChallengeData",groupChallengeDataSchema)
module.exports=GroupChallengeData