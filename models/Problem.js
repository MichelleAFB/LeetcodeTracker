const mongoose=require("mongoose")
const uniqueValidator=require("mongoose-unique-validator")
const problemsSchema=new mongoose.Schema({
  userId:{
    type:String,
    
  },

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
  difficulty:{
    type:String,
    require:true
  },
  prompt:{
    type:String,
    required:false,
  },
  firebaseId:{
    type:String,
    required:false
  }
})

problemsSchema.plugin(uniqueValidator)

const Problem=mongoose.model("Problem",problemsSchema)
module.exports={Problem}