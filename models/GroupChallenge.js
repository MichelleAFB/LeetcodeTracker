const { Timestamp } = require("bson")
const mongoose=require("mongoose")

const groupChallengeSchema= new mongoose.Schema({
    challengeId:{
        type:Number
    },
    hasAccepted:{
        type:Boolean,
        default:false
    },
    allUserIds:{
        type:Array
    },
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
  },dateFailed:{
    type:Date
  },
  userStats:{
    type:Object,
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
  },
  passes:{
    type:Number,
    default:0
  },
  initialPasses:{
    type:Number,
    default:0
  },
  usedPasses:{
    type:Number,
    default:0
  },lastUpdated:{
    type:Date,
    default:new Date()
  },
  failedDays:{
    type:Number,
    default:0
  },
  selectedContestants:{
    type: Array
  },
  status:{
    type:String,
    default:"OPEN"

  },rank:{
    default:Number
  },
  lastUpdated:{
    type:Date,
    default:new Date()
  },
  includesFailure:{
    type:Boolean,
    default:false
  },
  createdBy:{
    type:String
  },
  winningDate:{
    type :Date
  },
  totalProblems:{
    type:Number
  }
})

const GroupChallenge=mongoose.model("groupchallenge",groupChallengeSchema)
module.exports=GroupChallenge