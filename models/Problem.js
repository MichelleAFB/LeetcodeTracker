const mongoose=require("mongoose")
const uniqueValidator=require("mongoose-unique-validator")
const problemsSchema=new mongoose.Schema({
  

  title:{
    type:String,
    required:true,
    unique:true
  },
  problemId:{
    type:Number,
    required:false,
  },
  titleSlug:{
    type:String,
  },
  page:{
    type:Number
  },
  leetcode_hints:{
    type:Array
  },
  link:{
    type:String,
    required:false
  },
  acRate:{
    type:Number
  },
  frontendQuestionId:{
    type:String
  },
  difficulty:{
    type:String,
    require:true
  },
  tags:{
    type:Array
},
level:{
  type:String
},
examples:{
  type:Array,
  default:[]
},
  prompt:{
    type:String,
    required:false,
  },
  firebaseId:{
    type:String,
    required:false
  },
  topicTags:{
    type:Array
  },hints:{
    type:Array
  },user_times:{
    type:Object
  }
  
})

problemsSchema.plugin(uniqueValidator)

const Problem=mongoose.model("Problem",problemsSchema)
module.exports=Problem