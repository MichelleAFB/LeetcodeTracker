const mongoose=require("mongoose")
const uniqueValidator=require("mongoose-unique-validator")
const problemPageSchema=new mongoose.Schema({
  

  page:{
    type:Number,
    required:true,
    unique:true
  }
})

problemPageSchema.plugin(uniqueValidator)

const ProblemPage=mongoose.model("ProblemPage",problemPageSchema)
module.exports=ProblemPage