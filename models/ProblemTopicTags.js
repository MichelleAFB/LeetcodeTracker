const mongoose=require("mongoose")
const uniqueValidator=require("mongoose-unique-validator")
const tagSchema=new mongoose.Schema({
  

  name:{
    type:String,
    required:true,
    unique:true
  }
})

tagSchema.plugin(uniqueValidator)

const ProblemTopicTag=mongoose.model("ProblemTopicTag",tagSchema)
module.exports=ProblemTopicTag