const { Timestamp } = require("bson")
const mongoose=require("mongoose")

const challengeSchema= new mongoose.Schema({
  userId:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required:true,
  },
  startDate:{
    type:Date,
    required:true
  },
  endDate:{
    type:Date,
    required:true
  },
  no_questions:{
    type:Number,
    required:true,
  },
  success:{
    type:Boolean,
    default:true
  },
  current:{
    type:Boolean,
    default:false
  },
  length:{
    type:Number
  }
})

const Challenge=mongoose.model("challenge",challengeSchema)
module.exports=Challenge