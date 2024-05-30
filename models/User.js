const mongoose=require("mongoose")

const userSchema= new mongoose.Schema({
  userId:{
    type:String,
    unique:true
  },
  firstname:{
    type:String,
    required:true
  },
  lastname:{
    type:String,
    required:true
  },
  username:{
    type:String
  },
  bio:{
    type:String,
    required:false
  },
  profilePicUrl:{
    type:String,
    required:false
  },
  email:{
    type:String,
    required:true
  },
  emailVerified:{ 
  type:Boolean,
  default:false
  },
  hash:{
    type:String,
    
  },
  online:{
    type:Boolean,
    default:true
  },
  challenges:{
    type:Array

},emailVerified:{
  type:Boolean,
  default:false
},password:{
  type:String,
  required:true
},
notifications:{
  type:Array
},
allNotifications:{
  type:Array
},
currentGroupChallenge:{
  type:Object
},
groupChallenges:{
type:Array
},
groupChallengeRequests:{
  type:Array
},
hasNewNotifications:{
  type:Boolean,
  default:false
},
  currentChallenge:{
    type:Object,
    default:null
  },
  criticalIndex:{
    type:Object,
    
  },
  decliningIndex:{
    type:Object,
    
  },
  healthyIndex:{
    type:Object,
    default:null
  },
  subscription:{
    type:String,
    default:"free"
  },
  subscription_updated:{
    type:Date,
    default:new Date()
  },
  customer_Id:{
    type:String
  },
  subscription_Id:{
    type:String
  },
  followers:{
    type:Array,
    default:[]
  },
  following:{
    type:Array,
    default:[]
  }
  
})

const User=mongoose.model("Users",userSchema)
module.exports=User