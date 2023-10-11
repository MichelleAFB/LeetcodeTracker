const mongoose=require("mongoose")

const userSchema= new mongoose.Schema({
  userId:{
    type:String,
  },
  firstname:{
    type:String,
    required:true
  },
  lastname:{
    type:String,
    required:true
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

},
  currentChallenge:{
    type:Object,
    default:null
  },
  criticalIndex:{
    type:Object,
    default:null
  },
  decliningIndex:{
    type:Object,
    default:null
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
  }
  
})

const User=mongoose.model("Users",userSchema)
module.exports=User