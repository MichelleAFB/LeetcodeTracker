const pdfParse = require("pdf-parse");
const dotenv = require("dotenv");
const bodyParser=require("body-parser")
const express=require("express")

const app = express();
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const router = express.Router();

const passport = require("passport");
//const passportSetup = require("./config/passport");
const cors = require("cors");
const { initialize } = require("passport");
const mysql = require("mysql");
const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const fs = require("fs");
const client = require("https");
const download = require("image-downloader");
const uniqueValidator = require('mongoose-unique-validator')

const Streak=require("./models/Streak")
const Problem=require("./models/Problem")
const StreakGroup=require("./models/StreakGroup");
const { log } = require("console");


 
function calcTime(city, offset) {
   var d = new Date();
   var utc = d.getTime() - (d.getTimezoneOffset() * 60000);
   var nd = new Date(utc + (3600000*offset));
   return nd
}
console.log(calcTime('Dallas', '+5.0'))



const port = 3022;

app.use(bodyParser.json());
app.use(express.json())
app.use(express.json({limit:'75mb'}))
app.use(bodyParser.urlencoded({limit: '75mb', extended: true}));


var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.listen(3022, () => console.log("Server running ", 3022));

console.log("i")

const connectdb = async () => {
  try {
    console.log("hello");
    const conn = await mongoose.connect(
      "mongodb+srv://MAB190011:Mirchoella22@atlascluster.xdodz.mongodb.net/leetcode?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    return conn
    console.log(`MONGO DB connected: ${conn.connection.host}`);
  } catch (err) {
    //console.log(err.stack);
    // process.exit(1)
  }
};
var dbmongo
connectdb().then((conn)=>{
  //console.log(conn)
  dbmongo=conn.connection
})

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get("/",(req,res)=>{
  res.json("Welcome to the Leetcode Api")
})
/************************************************************************* */
app.get("/ss/:id",(req,res)=>{

})
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

const problemItem=mongoose.model("Problem",problemsSchema)
app.post("/sqltomongo",(req,res)=>{
  db.query("select * from leetcode.problems",(err,results)=>{
    if(err){
      console.log(err)
    }else{
      results.map(async(r)=>{
        const problem=new problemItem({
          title:r.title,
          thisId:r.id,
          problemId:r.problemId,
          firebaseId:r.firebase_id,
          link:r.link,
          prompt:r.prompt,
          difficulty:r.difficulty
        })
        try{
          const newProblem=await problem.save()
          console.log("success")
        }catch(err1){
          console.log(err1)
        }
      })
    }
  })
})
app.get("/get-all-streaks",async(req,res)=>{
  const streaks=await Streak.find({})
  const groups=await StreakGroup.find({})
  res.json({success:true,groups:groups,streaks:streaks})
})

app.get("/get-streak-group",async(req,res)=>{
  const cDate=new Date()
  var currDate=cDate.toString().substring(0,15)
  currDate=currDate.split(" ")
  
  var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
  "Aug","Sep","Oct","Nov","Dec"];
  var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]

 var ccDate=new Date(currDate[3],monthnum[months.indexOf(currDate[1])-1],currDate[2])
  var activeDate=new Date()
   activeDate=activeDate.setDate(ccDate.getDate()-1)
   const old=new Date(activeDate)
  if(req.body.day!=null){
    var date=req.body.day.split(" ")
     date=new Date(date[3],monthnum[months.indexOf(date[1])-1],date[2])
    var dayDate=new Date()
    dayDate=dayDate.setDate(date.getDate()-1)
    var day=new Date(dayDate)
    day=day.toString().substring(0,15)
    console.log("day "+day.toString().substring())
    const group=await StreakGroup.find({})
    const streaks=await Streak.find({})
    if(group.length>0){
      var found=false
      var g
     
      group.map((r)=>{
        console.log(r.days)
        const arr=r.days
        console.log("day:"+day)
        if(arr.includes(day) && found==false){
            g=r
            found=true
            console.log("found")
        }
      })

      setTimeout(()=>{
        res.json({success:true,groups:group,streaks:streaks})
      },800)

    }else{
      res.json({success:true,groups:group})
    }

  }else{
    const group=await StreakGroup.find({

    })
    const streak=await Streak.find({})
    if(group.length>0){
      var found=false
      var g
      group.map((r)=>{
        if(r.days.includes(old.toString().substring(0,15)) && found==false){
            g=r
            found=true
        }
      })

      setTimeout(()=>{
        res.json({success:true,groups:g,streaks:streak})
      },200)

    }else{
      res.json({success:true,groups:group,streaks:streaks})
    }

  }
})

app.post("/create-streak-group",async(req,res)=>{
  const cDate=new Date()
  var currDate=cDate.toString().substring(0,15)
  currDate=currDate.split(" ")
  
  var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
  "Aug","Sep","Oct","Nov","Dec"];
  var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]

 var ccDate=new Date(currDate[3],monthnum[months.indexOf(currDate[1])-1],currDate[2])
  var activeDate=new Date()
   activeDate=activeDate.setDate(ccDate.getDate()-1)
   const old=new Date(activeDate)
  
/*
   console.log(req.body)
   const groups=await StreakGroup.find({})
   if(req.body.day!=null){
   if(groups.length>0){
    groups.map((r)=>{
      const arr=r.days
      console.log(arr)
      if(r.days.includes()){

      }
      

    })
   }else{
    const streakgroup=new StreakGroup({
        days:[req.body.day]
      })
    const saved=await streakgroup.save()

    const streak=new Streak({
      day:req.body.day,
      problems:[req.body.problem],
      group:saved.id
    })

    const savedStreak=await streak.save()
    res.json({streak:streak,group:saved})

   }
  }else{
    if(groups.length>0){
      var exist=false
      var found=false
      groups.map(async(r)=>{
        const arr=r.days
        //console.log("old"+old.toString())
        //console.log(ccDate.toString().substring(0,15)+ " "+r.days)
        console.log("id:"+r.id)
        //console.log(arr.includes(old.toString().substring(0,15)))
        if(arr.includes(old.toString().substring(0,15))){
          console.log("MATCH")
          exist=true
          
          if(found==false && !arr.includes(ccDate.toString().substring(0,15))){
            const newStreak=new Streak({
              day:ccDate.toString().substring(0,15),
              problems:[req.body.problem],
              group:r.id
            })
            const saved=await newStreak.save()
         
            const update=await StreakGroup.updateOne({"_id":r.id},{
              $push:{"days":ccDate.toString().substring(0,15)}
            })
            console.log(update)
          

            found=true
          }
        }
  
      })

      setTimeout(async()=>{
        console.log("exist:"+exist)
        if(exist==false){
            const group=new StreakGroup({
              days:[ccDate.toString().substring(0,15)]
            })
            const saved=await group.save()
            const streak=new Streak({
              day:ccDate.toString().substring(0,15),
              problems:req.body.problem,
              group:saved.id
            })
            const saved2=await streak.save()

            res.json({group:group,streak:streak})

        }
      },500)
     }else{
      const group=new StreakGroup({
          days:[ccDate.toString().substring(0,15)]
      })
      const saved=await group.save()
      const streak=new Streak({
        day:ccDate.toString().substring(0,15),
        problems:req.body.problem,
        group:saved.id
      })
      const saved1=await streak.save()
      res.json({success:true,group:saved,streak:saved1})
     }
  }
  */

})

app.get("/all-groups",async(reeq,res)=>{
  const groups=await StreakGroup.find({})
  res.json({success:true,groups:groups})
})

app.get("/new-problems",async(req,res)=>{
  const problems=await problemItem.find({$and:[{"firebaseId":null}]})
  res.json({success:true,no_problems:problems.length,problems:problems})
})
app.get("/problems",async(req,res)=>{
  const problems= await problemItem.find({"prompt":{$exists:true},"difficulty":{$exists:true}})
  res.json({success:true,problems:problems,total:problems.length})
})

app.get("/remove",async(req,res)=>{
  const del=await Streak.deleteMany({})
  console.log(del)

})

app.get("/all-streaks",async(req,res)=>{
  const streakGroup=await StreakGroup.find({})
  const streak=await Streak.find({})
  res.json({streaks:streak,groups:streakGroup})

})
app.get("/streak/",async(req,res)=>{
  console.log(req.body)

  var streak=await Streak.find({$and:[{"day":req.body.day}]})
  console.log(streak)
  streak=streak[0]
  console.log(streak.problems.length)
  res.json({success:true,streak:streak})


})

app.get("/remove-streak",async(req,res)=>{
  const deleted=await Streak.deleteMany({
    
  })
  console.log(deleted)
})

app.get("/checkProblem/:userId/:title",async(req,res)=>{
  var cDate=new Date()
  cDate=cDate.toString().substring(0,15)
 
  const streak=await Streak.find({$and:[{"day":cDate},{"userId":req.params.userId}
]})



var already=false
streak.map((s)=>{
  s.problems.map((p)=>{
  
   var title=req.params.title.replace(/\s/g,"").toUpperCase()
   var ptitle=p.title.replace(/\s/g,"").toUpperCase()
   console.log(title+" "+ptitle)
   if(title==ptitle){
    console.log("DOUBLE")
    already=true
   }
  })

})

  setTimeout(()=>{
    res.json({success:true,already:already,streak:streak})

  },1000)
})

app.get("/userId",async(req,res)=>{
  const update=await Streak.updateMany({$set:{"userId":2322}})
  res.json(update)

})
/*
app.post("/add-to-streak",async(req,res)=>{
  var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
  "Aug","Sep","Oct","Nov","Dec"];
  var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]
  var curr=new Date()
  curr=curr.toString().substring(0,15)

console.log(req.body.problem.title)
console.log(curr)
console.log(req.body.userId)
console.log("\n\n")
const uId=req.body.userId
const t=req.body.problem.title
    axios.get("https://leetcodetracker.onrender.com/checkProblem/"+uId+"/"+t,{title:t,userId:uId.toString(),day:curr}).then(async(response)=>{
      console.log(response.data)
      if(response.data.already==false){

        if(req.body.day!=null){
          var date=req.body.day.split(" ")
        
        console.log(date)
        date=new Date(date[3],monthnum[months.indexOf(date[1])-1],date[2])
       var dayDate=new Date(date)
      
       dayDate=new Date(dayDate)
       dayDate=dayDate.setDate(date.getDate()-1)
       var newdate=new Date(dayDate)
       
       newdate=newdate.toString().substring(0,15)
       //dayDate=dayDate.toString().substring(0,15)
       console.log("date:"+newdate)
       var day=new Date(dayDate)
       var curr=new Date()
       curr=curr.toString().substring(0,15)

        const streak=await Streak.find({$and:[{"day":req.body.day},{"userId":req.body.userId}]})

  console.log(streak)
  if(streak.length>0){
    const str=streak[0]
    const arr=str.problems
  
   
 
    console.log(response.data)
  
        const saved=await Streak.updateOne({"day":req.body.day,"userId":req.body.userId},
        {
          $push:{"problems":req.body.problem}
        })
        res.json({success:true,saved:saved})
     
  
   
   

  }else{
 
   const group=await StreakGroup.find({$and:[{"userId":req.body.userId},{"userId":req.body.userId}]})
var already=false
   if(group.length>0){
    var found=false
    group.map(async(r)=>{
      const arr=r.days
      console.log(arr)
      console.log("finding:"+newdate+"\n\n")
      console.log(arr.includes(newdate) && found==false)

      if(arr.includes(newdate) && !arr.includes(req.body.day)&& found==false){
        console.log("found")
      
            const update=await StreakGroup.updateOne({"_id":r.id},
            {$push:{"days":req.body.day}})
           
            console.log(update)
            const newstreak=new Streak({
              day:req.body.day,
              problems:[req.body.problem],
              userId:req.body.userId,
              group:r.id
            })
            const saved=await newstreak.save()
           res.json({success:true,streak:streak,group:r})
            found=true
       
      }
    })

    setTimeout(async()=>{
      if(found==false && already==false){
        const streakgroup=new StreakGroup({
          days:[req.body.day],
          userId:req.body.userId
        })
        const saved=await streakgroup.save()
        const str=new Streak({
          day:req.body.day,
          problems:[req.body.problem],
          userId:req.body.userId,
          group:saved.id
        })
        const saved1=await str.save()
        res.json({success:true,streak:saved1,group:saved})
      }else{
        res.json({success:false,message:"problem already done today"})
      }
    },800)

 

   }else{

    const streakgroup=new StreakGroup({
      days:[req.body.day],
      userId:req.body.userId
    })
    console.log("here")
    const saved= await streakgroup.save()

   const newstreak=new Streak({
    day:req.body.day,
    problems:[req.body.problem],
    userId:req.body.userId,
    group:saved.id
   })
  
   console.log(saved)
   
   const saved1= await newstreak.save()
   console.log(saved1)
   console.log(saved)
   res.json({success:true,group:saved,streak:newstreak})


   }
  }
}else{
  var currD=new Date()
  currD=currD.toString().substring(0,15)
  var date=currD.split(" ")
  console.log(date)
  date=new Date(date[3],monthnum[months.indexOf(date[1])-1],date[2])
 var dayDate=new Date(date)

 dayDate=new Date(dayDate)
 dayDate=dayDate.setDate(date.getDate()-1)
 var newdate=new Date(dayDate)
 
 newdate=newdate.toString().substring(0,15)
 //dayDate=dayDate.toString().substring(0,15)
 console.log("date:"+newdate)
 var day=new Date(dayDate)



  const streak=await Streak.find({$and:[{"day":currD}]})
 
  const streakG=await StreakGroup.find({"days":{$in:[currD]}})
  const streakPrev=await StreakGroup.find({"days":{$in:[newdate]}})
  console.log("streakgroup")
  console.log(streakG)
  console.log(streakPrev)
  if(streak.length>0 && streakG.length>0){
    const str=streak[0]
    const arr=str.problems
  
    console.log("streak exist for "+currD)
      
    
     const saved=await Streak.updateOne({"day":currD},
      {
        $push:{"problems":req.body.problem}
      })
      res.json({success:true,saved:saved})


  }if(streak.length<1 && streakG.length>0){
    //TODO:CASE: GROUP EXIST STREAK DOESNT EXIST
    console.log("prev:"+dayDate.toString().substring(0,15))

    const newStreak=new Streak({

    })
    var currD=new Date()
    currD=currD.toString().substring(0,15)
 
    const streakG=await StreakGroup.find({"days":{$in:[currD]}})

    const group=await StreakGroup.find({"days":{$in:[currD]}})
    console.log("group")
    console.log(group)
   if(group.length>0 && group .length>0){
    //TODO:STREAK EXISTS AND GROUP EXIST
    var found=false
    var already=false
    group.map(async(r)=>{
      const arr=r.days
      console.log(arr)
      console.log("finding:"+newdate)
      console.log(arr.includes(newdate) && found==false)
      var curr=new Date()
      curr=curr.toString().substring()
      console.log("STREAK GROUP EXISTS So Now SEARCHING FOR STREAK")
      if(arr.includes(newdate) && !arr.includes(curr)&& found==false){
        console.log("STREAK FOUND IN STREAK GROUP")

        
          console.log("STREA")
          already=response.data.already
          
            const update=await StreakGroup.updateOne({"_id":r.id},
            {$push:{"days":curr}})
           
            console.log(update)
            const newstreak=new Streak({
              day:curr,
              problems:[req.body.problem],
              userId:req.body.userId,
              group:r.id
            })
            const saved=await newstreak.save()
            res.json({success:true,streak:streak,group:r})
            found=true
            
          }

        
       

    })

    setTimeout(async()=>{
      if(found==false && already==false && streak.length<1){
        console.log("streak not found in group.maybe streak group not foun")
        const streakgroup=new StreakGroup({
          userId:req.body.userId,
          days:[curr]
        })
        const saved=await streakgroup.save()
        const str=new Streak({
          day:curr+"ddd",
          userId:req.body.userId,
          problems:[req.body.problem],
          group:saved.id
        })
        const saved1=await str.save()
        
        res.json({success:true,streak:saved1,group:saved})
        
      }
    },800)

 

   }if(group.length>0 && streak.length<1){

   }
   else{
    //TODO:CASE STREAK AND GROUP DONT EXIST
console.log("CREATING STREAK GROUP")
    const streakgroup=new StreakGroup({
      days:[curr+"a"],
      userId:req.body.userId
    })
    console.log("here")
    const saved= await streakgroup.save()
    console.log("STREAK GROUP DOES NOT EXIST")
   const newstreak=new 
   Streak({
    day:curr,
    userId:req.body.userId,
    problems:[req.body.problem],
    group:saved.id
   })
  
   console.log(saved)
   
   const saved1= await newstreak.save()
   console.log(saved1)
   console.log(saved)
   res.json({success:true,group:saved,streak:newstreak})
   

   }
   
  }
}
  

      }else{
        res.json({success:false,message:"problem already completed today!"})
      }
    })

  
})
*/
app.get("/add",(req,res)=>{
  var currD=calcTime("Dallas","+5.0")
  console.log(currD)
    var today=new Date(currD)
 

 
  currD=currD.toString().substring(0,15)
  var currD=new Date()


 var dayDate=new Date(today)

 dayDate=new Date(dayDate)
 dayDate=dayDate.setDate(today.getDate()-1)
 var newdate=new Date(dayDate)
 newdate=newdate.toString().substring(0,15)
 console.log("\n\nnewdate:"+newdate)
 console.log("\n\n"+currD)
})
var currD=calcTime("Dallas","+5.0")
 
    var today=new Date(currD)
 

 
  currD=currD.toString().substring(0,15)
  var currD=new Date()


 var dayDate=new Date(today)

 dayDate=new Date(dayDate)
 dayDate=dayDate.setDate(today.getDate()-1)
 var newdate=new Date(dayDate)
 console.log(newdate.toString().substring(0,15))
app.post("/add-to-streak",async(req,res)=>{

    var currD=calcTime("Dallas","+5.0")
 
    var today=new Date(currD)
 

 
  currD=currD.toString().substring(0,15)
  var currD=new Date()


 var dayDate=new Date(today)

 dayDate=new Date(dayDate)
 dayDate=dayDate.setDate(today.getDate()-1)
 var newdate=new Date(dayDate)
 newdate=newdate.toString().substring(0,15)
 console.log("\n\nnewdate:"+newdate)
 console.log("\n\n"+currD)
 currD=currD.toString().substring(0,15)
  


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

if(streakToday.length==0){
  if(streakYesterday.length==0){
    //create new streak, add it to streak group
    const newGroup=new StreakGroup({
      userId:req.body.userId,
      days:[currD]
    })
    const save=await newGroup.save()
    console.log("no streak available,create new streak group")
    const newStreak=new Streak({
      day:currD,
      userId:req.body.userId,
      group:save.id,
      problems:[req.body.problem]
    })
    const savedStreak=await newStreak.save()
    res.json({success:true,added:true,group:save,streak:savedStreak})
  }if(streakYesterday.length>0){
    console.log(streakGPrev[0].id)
    const updateStreakGroup=await StreakGroup.updateOne({"_id":streakGPrev[0].id},
    {$push:{"days":currD}})
    console.log(updateStreakGroup)
    const newStreak=new Streak({
      day:currD,
      userId:req.body.userId,
      group:streakGPrev[0].id,
      problems:[req.body.problem]
    })
    const savedStreak=await newStreak.save()
    res.json({success:true,added:true,updatedGroup:updateStreakGroup,streak:savedStreak})
  }

  var checkToday=new Date()
  checkToday=checkToday.toString().substring(0,15)
  checkToday=checkToday.split(" ")

 
  checkToday=new Date(checkToday[3],monthnum[months.indexOf(checkToday[1])-1],checkToday[2])
 var dayDate=new Date(date)

 checkToday=new Date(checkToday)
 rn=checkToday.setDate(checkToday.getDate()-1)
 var rn=new Date(rn)
 //TODO:VALIDATE YESTERDAY IS YESTERDAY
  
   
  

}if(streakToday.length>0){
  //check if streak group exist, if not create new streak group and add
  console.log("streak exist")
  /**const saved=await Streak.updateOne({"day":req.body.day,"userId":req.body.userId},
        {
          $push:{"problems":req.body.problem}
        }) */
    const uId=req.body.userId
    const t=req.body.problem.title
    axios.get("https://leetcodetracker.onrender.com/checkProblem/"+uId+"/"+t,{title:t,userId:uId.toString(),day:currD}).then(async(response)=>{
      console.log(response.data)
      if(response.data.already==false){
        
        const saved=await Streak.updateOne({"day":currD,"userId":req.body.userId},
        {
          $push:{"problems":req.body.problem}
        }) 
        res.json({success:true,added:true,saved:saved})

      }else{
        res.json({success:true,message:"Problem "+req.body.problem.title+" has already been done today"})
      }
    })

}

})


app.get("/try",async(req,res)=>{
  var currD=new Date()
  currD=currD.toString().substring(0,15)
  const streakG=await StreakGroup.find({"days":{$in:[currD]}})
  console.log(streakG)

})
app.get("/problem-by-title",async(req,res)=>{
  const problem=await problemItem.find({$and:[{"title":req.body.title}]})
  res.json({success:true,problem:problem})
})
app.get("/userId/:id",async(req,res)=>{
  const groups=await StreakGroup.find({})
  groups.map(async(g)=>{
    const update=await StreakGroup.updateOne({"_id":g._id},{
      $set:{"userId":req.params.id}
    })
    console.log(update)
  })

  const streaks=await Streak.find({})
  streaks.map(async(s)=>{
      const update=await Streak.updateOne({"_id":s._id},{
        $set:{"userId":req.params.id}
      })
      console.log(update)
  })

})
app.get("/id",async(req,res)=>{
  const update=await Streak.updateMany({},
    {$set:{"userId":Number(req.body.userId)}})
    console.log(update)

    const update2=await StreakGroup.updateMany({},
      {$set:{"userId":Number(req.body.userId)}})
      console.log(update2)
    
})
app.get("/sort-streaks/:userId",async(req,res)=>{
  console.log(req.params.userId)
  console.log(req.body)
  const groups=await StreakGroup.find({$and:[{"userId":parseInt(req.params.userId)}]})

  const streaksArr=[]
  groups.map(async(g)=>{
    const arr=[]
    const streaks=await Streak.find({$and:[{"group":g.id},{"userId":parseInt(req.params.userId)}]})
    console.log(streaks)
    streaks.map((s)=>{
      
      arr.push({day:s.day,problems:s.problems})
    })
    streaksArr.push(arr)
   
  })
  setTimeout(()=>{
    res.json({streaks:streaksArr})
  },500)
})

app.get("/s",async(req,res)=>{
  const str=await Streak.find({"userId":2322})
  console.log(str)
})

app.get("/current-streak/:userId",async(req,res)=>{
  const strek=[]
 
  var streaks=await StreakGroup.find({$and:[{"userId":parseInt(req.params.userId)}]})
  
  var curr=calcTime('dallas',"+5.0")
  curr=curr.toString().substring(0,15)
  var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
  "Aug","Sep","Oct","Nov","Dec"];
  var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]

    var date=curr.split(" ")
  

  date=new Date(date[3],monthnum[months.indexOf(date[1])-1],date[2])
 var dayDate=new Date(date)

 dayDate=new Date(dayDate)
 dayDate=dayDate.setDate(date.getDate()-1)
 var newdate=new Date(dayDate)
 
 newdate=newdate.toString().substring(0,15)
 //dayDate=dayDate.toString().substring(0,15)
 console.log("date:"+newdate)
 var day=new Date(dayDate)

  streaks.map((s)=>{
     const days=s.days
     console.log(s.days)
    if(days.includes(curr) || days.includes(newdate)){
      
      days.map(async(st)=>{
        var str=await Streak.find({$and:[{"day":st},{"userId":parseInt(req.params.userId)}]})
        str=str[0]
        strek.push({day:str.day,problems:str.problems})
      })
    }
  })

  setTimeout(()=>{
    res.json({success:true,streaks:strek})
  },900)
})


app.post("/create-streak/:userId",async(req,res)=>{
  var currDate=new Date()
  currDate=currDate.toString().substring(0,15)
  const find=await Streak.find({$and:[{"day":currDate},{"userId":parseInt(req.params.userId)}]})
  console.log(find.length)
  if(req.body.day==null){
  if(find.length==0){
  const streak=new Streak({
    day:currDate,
    problems:[req.body.problem],
    userId:parseInt(req.params.userId)
  })
  console.log(currDate)

  const saved=await streak.save()
  console.log(saved)
  const newStreak=await Streak.find({$and:[{"day":currDate},{"userId":parseInt(req.params.userId)}]})
  res.json({success:true,streak:newStreak,updated:saved});
}else{
  res.json("streak already exist")
}
}else{
  const day=await Streak.find({$and:[{"day":req.body.day},{"userId":parseInt(req.params.userId)}]})
  if(day.length==0){
    const streak=new Streak({
      day:req.body.day,
      problems:[req.body.problem],
      userId:parseInt(req.params.userId)
    })
  
  
    const saved=await streak.save()
    console.log(saved)
    const newStreak=await Streak.find({$and:[{"day":req.body.day},{"userId":parseInt(req.params.userId)}]})
    res.json({success:true,streak:newStreak,updated:saved});

}else{
  res.json("streak already exist")
}
}
})

app.get("/streak-group",(req,res)=>{

})

app.post("/remove-problem-from-streak/:day/:title",async(req,res)=>{
  const deleted=await Streak.updateOne(
    {"day":req.params.day},
    {
      $pull:{problems:{"title":req.params.title}}
    }
  )
  res.json({success:true,deleted:deleted})
})

/***************************************************************************************************************************************************************************************************************************************************************************** */
app.get("/get-empty-links",async(req,res)=>{
  const problems=await problemItem.find({"title":"Two Sum"});
  res.json({success:true,problems:problems,total:problems.length})
})

app.get("/get-empty-prompts",async(req,res)=>{
  const problems=await problemItem.find({"prompt":{$exists:false}});
  res.json({success:true,problems:problems,total:problems.length})
})

app.get("/get-empty-difficulty",async(req,res)=>{
  const problems=await problemItem.find({"difficulty":{$exists:false}});
  res.json({success:true,problems:problems,total:problems.length})
})

app.get("/problem/:title",async(req,res)=>{
  const problem=await problemItem.find({$and:[{"title":req.params.title}]})
  res.json(problem)
})

app.post("/set-firebase-id/:id",async(req,res)=>{
  console.log(req.body)
  console.log(req.params)
    const update=await problemItem.updateOne({"title":req.body.title},{
      $set:{"firebaseId":req.params.id}
    })
    setTimeout(()=>{
      res.json({update:update,success:true})
    },500)
    console.log("update:"+update)
  
})

app.post("/set-firebase-id/",async(req,res)=>{
  console.log(req.body)
  console.log(req.params)

 axios.get("https://leetcodetracker.onrender.com/problem/"+req.body.title).then(async(response)=>{
  const p=resposne.data[0]
  console.log(p)
 res.json({success:true})
  
 })
  
 
})
/************************************************************************************************************************************************************************************************************************************************************ */
app.get("/titles/:page", (req, res) => {

 
  (async () => {
    const allproblems=[]
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    console.log("grabbing all httprequest from browser");
    const page = await browser.newPage();

    const getData = async (response) => {
      const c = await response.text();
      return c;
    };
    await page.goto(
      "https://leetcode.com/problemset/all/?page=" + req.params.page
    );
    page.on("response", async (response) => {
      if (response.url() == "https://leetcode.com/graphql/") {
        const data = await getData(response).then(async (response) => {
          const info = await JSON.parse(response).data;
          //console.log(info)
          var i=0
          if (info != null) {
            const p = info.problemsetQuestionList;
            try {
             
              const problems = p.questions;
              var count=0
              if (problems != null) {
                
                problems.map(async(q) => {

                  const prob=await problemItem.find({"title":q.title,"difficulty":{$exists:false}})
                  const goodProb=await problemItem.find({"title":q.title,"difficulty":{$exists:true}})

                  if(prob!=null){
                    try{
                      await problemItem.update({"title":prob.title},{
                        thisId:prob.thisId,
                        title:prob.title,
                        difficulty:q.difficulty,
                        link:prob.link,
                        firebaseId:prob.firebaseId,
                        prompt:prob.prompt,
                        problemId:prob.problemId

                      })
                        
                    }catch(err1){

                    }
                  }
                 
                  if (q.title != null && goodProb==null) {
                    console.log("inserting")
                   allproblems.push({title:q.title,difficulty:q.difficult})
                   i++
                   console.log("i:"+i);
                 
                  var  problem=new problemItem({
                    title:q.title,
                    difficulty:q.difficulty
                   })
                  try {
                    const saved= await problem.save()
                    console.log("success")
                    console.log(saved)
                  }catch(err1){
                    console.log(err1)
                  }

                   if(i>=problems.length){
                    res.json({success:true,problems:allProblems})
                   }
                  }
                });
              }
            } catch {
              console.log("no problems");
            }
          }
        });
        //console.log(data)
      }
    });
  
  })();
});


app.get("/create-links", async(req, res) => {
  const base = "https://heroku_29594a13b7b8a31.com/problems/";
  var i=0;
  const results= await problemItem.find({})
   
      results.map(async(q) => {
      
        const title = q.title;
        if (title.substring(0, 1) == " ") {
          var end = title.substring(1, title.length);
          end = end.toLowerCase();
          end = end.replace(/\s/g, "-");
          end = end.replace(/{([])}/g, "");
          var link = base + end;

          const prob=await problemItem.find({
            "title":title
          })
          
          try{
            const val=await problemItem.update({title:prob.title},{
              title:prob.title,
              prompt:prob.prompt,
              thisId:prob.thisId,
              difficulty:prob.difficulty,
              firebaseId:prob.firebaseId,
              problemId:prob.problemId,
              link:link
            })
            console.log("success")
            if(i>=results.length-1){
              res.json({success:true})
            }
            i++
          }catch(err1){
            res.json(err1)
          }
        }
        if (title.substring(0, 1) != " ") {
          var end = title;
          end = end.toLowerCase();
          end = end.replace(/\s/g, "-");
          end = end.replace(/{([])}/g, "");
          var link = base + end;
          console.log(link);

          const prob=await problemItem.find({
            "title":title
          })
         
          try{
            const val=await problemItem.update({title:prob.title},{
              title:prob.title,
              thisId:prob.thisId,
              prompt:prob.prompt,
              difficulty:prob.difficulty,
              firebaseId:prob.firebaseId,
              problemId:prob.problemId,
              link:link
            })
            console.log("success")
            if(i>=results.length-1){
              res.json({success:true})
            }
            i++
          }catch(err1){
            res.json(err1)
          }
        
        }
      });
    
  
});

app.get("/generate-prompts", (req, res) => {
  (async () => {
    const generate = async (r) => {
      const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: false,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      console.log("grabbing all httprequest from browser");
      const page = await browser.newPage();

      const getData = async (response) => {
        
        var c= await response.text();
        return c;
      };
      await page.goto(r.link);
      page.on("response", async (response) => {
        if (response.url() == "https://heroku_29594a13b7b8a31.com/graphql/") {
          const data = await getData(response).then(async (response) => {
            const info = await JSON.parse(response).data;
            // console.log(info)
            if (info != null) {
              const p = info.question;

              try {
                if (p != null) {
                  //console.log(Object.keys(p))
                }
                const content = p.content;
                if (content != null) {
                  console.log(content)
                  //console.log(content)
                  const jsdom = require("jsdom");
                  const { JSDOM } = jsdom;
                  
                  const dom = new JSDOM(
                    "<!DOCTYPE html><body id='body'>" + content + "</body>"
                  );

                  console.log(
                    dom.window.document.getElementById("body").textContent
                  );
                  db.query("update heroku_29594a13b7b8a31.problems set prompt=? where link=?",[dom.window.document.getElementById("body").textContent,r.link],(err,results)=>{
                    if(err){
                      console.log(err)
                    }else{
                      console.log(results)
                    }

                  })

           

                }
              } catch {
               // console.log("no problems");
              }
            }
          });
        }
      });
    };

    db.query(
      "select link from heroku_29594a13b7b8a31.problems where (link is not null) && (prompt is null) ",
      async (err, results) => {
        if (err) {
          console.log(err);
        } else {
          console.log(results.length+" empty prompts")
          console.log(results[0].link)
          generate(results[0]);
          generate(results[1])
          generate(results[2])
          //generate(results[6])
         // generate(results[1].link)
          // generate(results[2].link)
          // generate(results[3].link)



        }
      }
    );
  })();
});

app.get("/generate-problemIds", (req, res) => {
  (async () => {
    const generate = async (r) => {
      const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: false,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      console.log("grabbing all httprequest from browser");
      const page = await browser.newPage();

      const getData = async (response) => {
        
        var c= await response.text();
        return c;
      };
      await page.goto(r.link);
      page.on("response", async (response) => {
        if (response.url() == "https://heroku_29594a13b7b8a31.com/graphql/") {
          const data = await getData(response).then(async (response) => {
            const info = await JSON.parse(response).data;
            // console.log(info)
            if (info != null) {
              const p = info.question;

              try {
                if (p != null) {
                  //console.log(Object.keys(p))
                }
                const id= p.questionFrontendId;
                if (id != null) {
                  console.log(id)
                 
                  db.query("update heroku_29594a13b7b8a31.problems set problemId=? where link=?",[Number(id),r.link],(err,results)=>{
                    if(err){
                      console.log(err)
                    }else{
                      console.log(results)
                    }

                  })

           

                }
              } catch {
               // console.log("no problems");
              }
            }
          });
        }
      });
    };

    db.query(
      "select link from heroku_29594a13b7b8a31.problems where (link is not null) && (problemId is null) ",
      async (err, results) => {
        if (err) {
          console.log(err);
        } else {
          console.log(results.length+" empty prompts")
          console.log(results[0].link)
          generate(results[0]);
          generate(results[1])
          generate(results[2])
          generate(results[3])
          //generate(results[6])
         // generate(results[1].link)
          // generate(results[2].link)
          // generate(results[3].link)



        }
      }
    );
  })();
});


app.get("/get-problems",(req,res)=>{
  olddb.query("select * from leetcode.problems where prompt is not null && difficulty is not null",(err,results)=>{
    if(err){
      console.log(err)
    }else{
      res.json({success:true,problems:results})
    }
  })
})

/****************************FIXES****************** */

app.get("/removeDuplicates",(req,res)=>{
  db.query("select * from leetcode.problems",(err,results)=>{
    if(err){
      console.log(err)
    }else{
      results.map((r)=>{
        db.query("select count(*) as ourCount from leetcode.problems where title=? ",r.title,(err1,results1)=>{
          if(err){
            console.log(err)
          }else{
            const c=Object.values(JSON.parse(JSON.stringify(results1)))
            const count=c[0].ourCount
            console.log(c)
            if(count>1){
              console.log("DUPLICATE")
              db.query("select * from leetcode.problems where title=?",r.title,(err2,results2)=>{
                if(err2){
                  console.log(err2)
                }else{
                  if(results2[1]!=null){
                    const dup=results2[1]
                    db.query("delete from leetcode.problems where id=?",dup.id,(err3,results3)=>{
                      if(err3){
                        console.log(err3)
                      }else{
                       // console.log(results3)
                      }
                    })
                  }
                }
              })
            }

          }
         

        })
      })
    }
  })
})
/*********************************************************************** */
app.post("/sign-in",(req,res)=>{
  res.json({success:true,user:{firstname:"Michelle",lastname:"Badu",email:"mirchoellebadu@gmail.com",phone:"2146944538"}})
})
/********/
app.get("/restaraunts",(req,res)=>{
  const restaraunts=[]
  const prom=new Promise((resolve,reject)=>{
    db.query("select * from eatly.restaraunts",(err,results)=>{
      if(err){
        res.json({success:false,err:err})
      }else{
        console.log(results)
        results.map((r,i)=>{
          restaraunts.push({
            name:r.name,
            stars:r.stars,
            link:r.link,
            meals:null
          })
          db.query("select * from eatly.meals where restaraunt_id=?",r.id,(err1,results1)=>{
            if(err1){
              res.json({success:false,err:err1})
            }else{
              restaraunts[i].meals=results1
              console.log(i)
              if(i+1==results.length){
                resolve(restaraunts)
              }
            }
          })
        })
      }
    })
  })

  prom.then(()=>{
    res.json({sucess:true,restaraunts:restaraunts})
  })
})
app.post("/create-restaraunt",(req,res)=>{

  db.query("insert into eatly.restaraunts (name,stars,link) values (?,?,?)",[req.body.name,req.body.stars,req.body.link],(err,results)=>{
    if(err){
      console.log(err)
    }else{
      console.log(results)
      res.json({success:true,results:results})
    }
  })
})

app.post("/create-meal/:id",(req,res)=>{
  
  db.query("insert into eatly.meals (restaraunt_id,name,description,price,stars,type) values(?,?,?,?,?,?)",[req.params.id,req.body.name,req.body.description,req.body.price,req.body.stars,req.body.type],(err,results)=>{
    if(err){
      console.log(err)
    }else{
      console.log(results)
      res.json({success:true,results:results})
    }
  })
})
/********************************************************************* */

app.get("/problems", async(req, res) => {
  const problems= await problemItem.find({})
  res.json({success:true,problems:problems})
});

