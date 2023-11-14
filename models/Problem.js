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
  }
})

problemsSchema.plugin(uniqueValidator)

const Problem=mongoose.model("Problem",problemsSchema)
module.exports=Problem