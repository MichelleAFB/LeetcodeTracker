var currD=calcTime("Dallas","+5.0")
var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
"Aug","Sep","Oct","Nov","Dec"];
var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]

var today=new Date(currD)
axios.get("https://leetcodetracker.onrender.com/checkProblem/"+req.body.userId+"/"+req.body.problem.title).then(async(response)=>{
  if(response.data.already){
    currD=currD.toString().substring(0,15)
var currD=new Date()


var dayDate=new Date(today)

dayDate=new Date(dayDate)
dayDate=dayDate.setDate(today.getDate()-1)
var newdate=new Date(dayDate)
newdate=newdate.toString().substring(0,15)
console.log("\n\nnewdate:"+newdate)
console.log("\n\n"+currD)
currD=req.body.day



const streakGPrev=await StreakGroup.find({"days":{$in:[newdate]}})
//Find StreakGroup
const streakGToday=await StreakGroup.find({"days":{$in:[currD]}})
console.log("prev group")
console.log(streakGPrev)
console.log("currentgroup")
console.log(streakGToday)
console.log("hello")


const streakToday=await Streak.find({$and:[{"day":currD}]})
const streakYesterday=await Streak.find({$and:[{"day":newdate}]})
console.log("yesterday:"+newdate)
console.log(streakGPrev)
if(streakToday.length==0){
if(streakYesterday.length==0){
//create new streak, add it to streak group
const newGroup=new StreakGroup({
  userId:req.body.userId,
  days:[currD]
})
const save=await newGroup.save()
const newStreak=new Streak({
  day:currD,
  userId:req.body.userId,
  group:save.id,
  problems:[req.body.problem]
})
console.log(newStreak)
const savedStreak=await newStreak.save()
res.json({success:true,added:true,group:save,streak:savedStreak})
}if(streakYesterday.length>0){
console.log(streakGPrev)
const updateStreakGroup=await StreakGroup.updateOne({"_id":streakGPrev[0].id},
{$push:{"days":currD}})
console.log(updateStreakGroup)
const newStreak=new Streak({
  day:currD,
  userId:req.body.userId,
  group:streakGPrev[0].id,
  problems:[req.body.problem]
})
console.log(newStreak)
const savedStreak=await newStreak.save()
res.json({success:true,added:true,updatedGroup:updateStreakGroup,streak:savedStreak})
}

var checkToday=new Date()
checkToday=checkToday.toString().substring(0,15)
checkToday=checkToday.split(" ")




//TODO:VALIDATE YESTERDAY IS YESTERDAY




}if(streakToday.length>0){
//check if streak group exist, if not create new streak group and add
console.log("streak exist")
/**const saved=await Streak.updateOne({"day":req.body.day,"userId":req.body.userId},
    {
      $push:{"problems":req.body.problem}
    }) */
    console.log("\n\n\n\n"+ currD+"\n\n\n")
const uId=req.body.userId
const t=req.body.problem.title
var cDate=calcTime("Dallas","+5.0")

cDate=cDate.toString().substring(0,15)
console.log("cDate:"+cDate.toString())
const streakFind=await Streak.find({$and:[{"day":cDate},{"userId":req.body.userId}
]})
console.log("streak find")
console.log(streakFind)


var already=false
streakFind.map((s)=>{
console.log(s)
s.problems.map((p)=>{
  var  t=req.body.problem.title
 var title=t.replace(/\s/g,"").toUpperCase()
 var ptitle=p.title.replace(/\s/g,"").toUpperCase()
 console.log(title+" "+ptitle)
 if(title==ptitle){
  console.log("DOUBLE")
  try{
    res.json({success:true,message:"Problem "+req.body.problem.title+" has already been done today"})

  }catch(err){

  }
 }
})

})
setTimeout(async()=>{
console.log("ALREADY IN STREAK?"+already)
if(already==false){
  
  const saved=await Streak.updateOne({"day":currD,"userId":req.body.userId},
  {
    $push:{"problems":req.body.problem}
  }) 
 try{
   res.json({success:true,added:true,saved:saved})
 }catch(err){
  console.log("already sent req")
 }

}else{
  try{
    res.json({success:true,message:"Problem "+req.body.problem.title+" has already been done today"})

  }catch(err){
    console.log("already sent req")

  }
}
},5000)
  


}
  }else{
    res.json({success:true,message:"Problem "+req.body.problem.title+" has already been done today"})

  }
  
})




