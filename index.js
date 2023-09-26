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
const morgan = require('morgan');
const Challenge = require("./models/Challenge");
morgan.token('id', (req) => { //creating id token
  return req.id
})
function assignId (req, res, next) {
  const id = 16
  req.id = id
  next()
}

app.use(assignId)
app.use(morgan(':id :method :url :response-time'))
 
function calcTime(city, offset) {
   var d = new Date();
   var utc = d.getTime() - (d.getTimezoneOffset() * 60000);
   var nd = new Date(utc + (3600000*offset));
   return nd
}
//console.log(calcTime('Dallas', '+5.0'))



const port = 3022;

app.use(bodyParser.json());
app.use(express.json())
app.use(express.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true,parameterLimit:50000}));


app.post("/set-ids",async(req,res)=>{
 
  console.log(req.body.problems[0].userId)
  const streaks=await Streak.find({})


  if(streaks.length>0){
    streaks.map(async(s)=>{
      const problems=s.problems

      problems.map((p)=>{
        req.body.problems.map(async(pp)=>{
          const index=problems.indexOf(p)
          if(pp.title==p.title && p.userId==pp.userId){
            p.xid=pp.id
            const prob=p
            s.problems[index]=prob
            console.log(prob.xid)
            setTimeout(async()=>{
              const update=await Streak.updateOne({$and:[{"_id":s._id}]},{
                $set:{"problems":problems}
              }) 
              console.log(update)
            },6)
          }
        })
      })

    })
  }
})

app.post("/idss",async(req,res)=>{
  console.log(req.body.userId)
  console.log(req.body)
  const user=req.body.userId
  const problems=req.body.problems

  const probs=[]

})

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

const adminCurrentClientRouter=require("./generate/titles").generateRouter
app.use("/generate",adminCurrentClientRouter)  


app.get("/",(req,res)=>{
  res.json("Welcome to the Leetcode Api")
})
/************************************************************************* */
app.get("/ss/:id",(req,res)=>{

})

app.post("/sqltomongo",(req,res)=>{
  db.query("select * from leetcode.problems",(err,results)=>{
    if(err){
      console.log(err)
    }else{
      results.map(async(r)=>{
        const problem=new Problem({
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
  console.log(Problem)
  console.log(Streak)
  const problems=await Problem.find({$and:[{"firebaseId":null}]})
  res.json({success:true,no_problems:problems.length,problems:problems})
})
app.get("/problems",async(req,res)=>{
  const problems= await Problem.find({"prompt":{$exists:true},"difficulty":{$exists:true}})
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



app.post("/checkProblem",async(req,res)=>{
 // var cDate=calcTime("Dallas","+5.0")
  //console.log(cDate.toString())
  console.log("HERE CHECK PROBLEM")
  console.log(Object.keys(req.body))
  cDate= req.body.day 
  const streak=await Streak.find({$and:[{"day":req.body.day},{"userId":req.body.userId}]})
 var foundProblem
  var already=false;
 if(streak.length>0){
  const problem=streak[0].problems
streak.map((s)=>{
  console.log(s.day)
  s.problems.map((p)=>{

  const problem=req.body.problem
  if(p!=null){
    console.log(Object.keys(p))

   console.log(title+" "+ptitle)
   console.log(!Object.keys(problem).includes("problem"))
   if(Object.keys(problem).includes("problem")){
    var title=problem.problem.title.replace(/\s/g,"").toUpperCase()
    var ptitle=p.title.replace(/\s/g,"").toUpperCase()
    if(title==ptitle){
      console.log("DOUBLE")
      foundProblem=p
      already=true
     }
   
  }else if(!Object.keys(problem).includes("problem")){
    var title=problem.title.replace(/\s/g,"").toUpperCase()
    var ptitle=p.title.replace(/\s/g,"").toUpperCase()
    if(title==ptitle){
      console.log("DOUBLE")
      foundProblem=p
      already=true
     }


   }
  }
  })

})
 }

  setTimeout(()=>{
    if(already==true){
    res.json({success:true,already:already,streak:streak})
    }else{
      res.json({success:true,already:already,streak:streak})

    }

  },300)
})

app.get("/userId",async(req,res)=>{
  const update=await Streak.updateMany({$set:{"userId":2322}})
  res.json(update)

})

app.get("/fix",async(req,res)=>{
  const problems=req.body.problems

  const streakGPrev=await StreakGroup.find({"days":{$in:["Tue Jul 11 2023"]}})
  const s=await Streak.find({$and:[{"day":"Wed Jul 12 2023"}]})
  console.log(streakGPrev[0].id)

  if(s.length==0){
  const streak=new Streak({
    userId:2322,
    group:req.body.group,
    problems:[problems[0]],
    day:"Wed Jul 12 2023"
  })

  const saved=await streak.save()
  console.log(saved)
  }else{
    var i=0
 
  problems.map(async(p)=>{
    if(i>0){
    const update=await Streak.updateOne({"day":"Wed Jul 12 2023"},{
      $push:{"problems":p}
    })
    
  }
  i++
  })
}
})
app.get("/fix-streak",async(req,res)=>{
  const streak=await Streak.find({$and:[{"day":req.body.day}]})
  if(streak.length==0){
  const day=req.body.day
  const newStreak=new Streak({
    day:req.body.day,
    problem:req.body.problem,
    group:req.body.group,
    userId:req.body.userId
  })
  const saved=newStreak.save()
  res.json({success:true,saved:saved})
}else{
  const update=Streak.update({})
}

})
app.get("/add",(req,res)=>{
   var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
  "Aug","Sep","Oct","Nov","Dec"];
    var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]

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
 

 


 app.post("/remove-duplicates",async(req,res)=>{
  
  const streaks=await Streak.find({})
  const updated=[]
  streaks.map((s)=>{
    const problems=s.problems
    var index=0
    problems.map(async(p)=>{
      var dup=false
      var count=0
      problems.map(async(other)=>{
        if(other.title==p.title){
          count++
          index=problems.indexOf(other)

          if(count>0 && index!=problems.indexOf(p)){
           console.log("index of dup:"+index+ " p:"+problems.indexOf(p))
            dup=true
            console.log(s.day)
            console.log("DUPP:"+p.title+" "+other.title)
            const newProblems=problems.splice(index,index);
            const remove=await Streak.updateOne({"day":s.day},{$set:{"problems":newProblems}})
           updated.push({day:s.day,prevProblems:problems.length,newProblems:newProblems.length,removed:remove})
         
            console.log("\n")
            
          }
          
        }
      })
    })
  })

  setTimeout(()=>{
    res.json({success:true,updated:updated})
  },4000)

 })

app.post("/remove-from-streak",async(req,res)=>{
  console.log(req.body.userId+" "+req.body.day)
  var streak=await Streak.find({$and:[{"day":req.body.day},{"userId":req.body.userId}]})
  streak=streak[0]
  //console.log(streak.problems[0])
  var remove=false
  console.log(streak.problems.length)
  if(streak.problems.length>0){
  streak.problems.map(async(p)=>{
    console.log(p.attempts)
    if(p.lastPracticed==req.body.problem.lastPracticed && req.body.problem.title==p.title /*&& req.problem.attempts[0]==p.attempts[0]*/&& remove==false){
      console.log("MATCH")
      remove=true
      const prob= streak.problems.splice(streak.problems.indexOf(p),1)
      console.log(prob[0].title+" "+prob.length)
      const update=await Streak.updateOne({$and:[{"day":req.body.day},{"userID":req.body.userId}]},{
        $set:{"problems":prob}
      })
      try{
        res.json({success:true,updated:update})
      }catch(err){
        console.log(err)
      }
    }
  })
}else{
  res.json({success:true,message:"no problems"})
}
})
app.post("/remove-dups",async(req,res)=>{
  var user=req.body.userId;
  var day=req.body.day
  console.log(day)
  console.log(user)

  var streak=await Streak.find({$and:[{"userId":user},{"day":day}]})
  streak=streak[0];
  //console.log(streak)
  const problems=streak.problems;
  const arr=[]
  const newProblems=streak.problems
  if(problems.length>0){
  problems.map((p)=>{
    if(!arr.includes(p.title)){
      arr.push(p.title)
     // newProblems.push(p)
     // console.log(arr)
    }else{
      newProblems.splice(newProblems.indexOf(p),1);
      console.log(newProblems.length)
    }

  })
}else{
  res.json({success:true,message:"no problems yet"})
}
  setTimeout(async()=>{
      try{
        const update=await Streak.updateOne({$and:[{"userId":user},{"day":day}]},{
        $set:{"problems":newProblems}
      })
      var array=await Streak.find({$and:[{"day":day},{"userId":user}]})
      setTimeout(()=>{
        res.json({problems:array,update:update})
      },300)
    }catch(err){
      console.log(err)
    }
  },500)
})
app.get("/find-streak",async(req,res)=>{
  const streak=await Streak.find({$and:[{"userId":2322},{"day":"Fri Aug 11 2023"}]})
  res.json({streak:streak})
})
/*
app.post("/ad/d-to-streak",async(req,res)=>{
  req.body.problem.id=req.body.id
  var newProb=req.body.problem
  newProb.id=req.body.id
  
  console.log(req.body.problem.id)
    var curr=calcTime("Dallas","+5.0")
    var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
  "Aug","Sep","Oct","Nov","Dec"];
  var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]
 
    var today=new Date(curr)
    axios.get("https://leetcodetracker.onrender.com/checkProblem/",{day: (req.body.day==null) ? curr.toString().substring(0,15):req.body.day,problem:req.body.problem,user:req.body.userId}).then(async(response)=>{
    console.log(response.data)
    if(req.body.day!=null){
      if(response.data.already==false){
     var currD=new Date()
      currD=currD.toString().substring(0,15)


 var dayDate=new Date(today)

 dayDate=new Date(dayDate)
 dayDate=dayDate.setDate(today.getDate()-1)
 var newdate=new Date(dayDate)
 newdate=newdate.toString().substring(0,15)
 console.log("\n\nnewdate:"+newdate)
 //console.log("\n\n"+currD)
 currD=currD.toString().substring(0,15)
  //console.log("olddate:"+newdate)



 const streakGPrev=await StreakGroup.find({"days":{$in:[newdate]}})
//Find StreakGroup
const streakGToday=await StreakGroup.find({"days":{$in:[currD]}})
/*console.log("prev group")
console.log(streakGPrev)
console.log("currentgroup")
console.log(streakGToday)
console.log("hello")


  const streakToday=await Streak.find({$and:[{"day":currD}]})
  const streakYesterday=await Streak.find({$and:[{"day":newdate}]})
  console.log("yesterday:"+newdate)
  //console.log(streakGPrev)
  var newP=newProb
if(streakToday.length==0){
  console.log("no STREAK TODAY")
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
      problems:[newP]
    })
   // console.log(newStreak)
    const savedStreak=await newStreak.save()
    res.json({success:true,added:true,group:save,streak:savedStreak})
  }if(streakYesterday.length>0){
    //console.log(streakGPrev)
    const updateStreakGroup=await StreakGroup.updateOne({"_id":streakGPrev[0].id},
    {$push:{"days":currD}})
    console.log(updateStreakGroup)
    const newStreak=new Streak({
      day:currD,
      userId:req.body.userId,
      group:streakGPrev[0].id,
      problems:[newP]
    })
   // console.log(newStreak)
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
        }) 
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
        $push:{"problems":newP}
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
      }if(response.data.already==true){
        res.json({success:true,message:"Problem "+req.body.problem.title+" has already been done today",streak:response.data.streak})

      }
    }     
    })
 

 
  

})
*/

app.post("/add-to-streak",async(req,res)=>{
  console.log("HI")
  const id=req.body.userId
  const problem=req.body.problem
  const date=req.body.day
  console.log("HI")

  var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
"Aug","Sep","Oct","Nov","Dec"];
var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]

  

  if(date!=null){
    console.log(Object.keys(req.body.problem))
    console.log(req.body)
    axios.post("https://leetcodetracker.onrender.com/checkProblem",{day:date,problem:problem,userId:id}).then(async(response)=>{
     // console.log(response.data)
     console.log("HERE DATE")
      try{
      var date=req.body.day
      date=date.split(" ")
      var dateDate=new Date(date[3],monthnum[months.indexOf(date[1])-1],date[2])
      var yesterDay=new Date(dateDate)
      yesterDay=yesterDay.setDate(dateDate.getDate()-1)
      const yesterday=new Date(yesterDay)
      console.log("yesterday:"+yesterday.toString())

      if(response.data.already){
        res.json({success:true,message:"Problem "+problem.problem.title+" has already been done today"})
      }else{

        //check if streak already exist
        var streakExist=await Streak.find({$and:[{"day":req.body.day},{"userId":id}]})
        streakExist=streakExist[0]
        if(streakExist!=null){
          console.log("STREAK TODAY EXISTS")
          //add-problem to streak
         console.log("streakExist:"+streakExist)
         if(Object.keys(req.body.problem).includes("problem")){
          const updateStreak=await Streak.updateOne({$and:[{"day":req.body.day},{"userId":id}]},
          {$push:{"problems":req.body.problem.problem}})
          var streak=await Streak.find({$and:[{"day":req.body.day},{"userId":id}]})
          res.json({success:true,updatedStreak:updateStreak,streak:streak})

         }else if(!Object.keys(req.body.problem).includes("problem")){
          const updateStreak=await Streak.updateOne({$and:[{"day":req.body.day},{"userId":id}]},
          {$push:{"problems":req.body.problem}})
          var streak=await Streak.find({$and:[{"day":req.body.day},{"userId":id}]})
          res.json({success:true,updatedStreak:updateStreak,streak:streak})

         }
         
          

        }else{
          console.log("STREAK TODAY DOES NOT EXIST")
          //check if streak can be added to a streak group
          console.log(yesterday.toString().substring(0,15))
          console.log(typeof(req.body.userId))
          var yesterdayStreak=await Streak.find({$and:[{"day":yesterday.toString().substring(0,15)},{"userId":req.body.userId}]})
          yesterdayStreak=yesterdayStreak[0]
          console.log(yesterdayStreak)
          if(yesterdayStreak!=null){
            
            console.log("STREAK YESTERDAY EXIST")
            //create streak and add it to StreakGroup
            var streakGroup=await StreakGroup.find({$and:[{"_id":yesterdayStreak.group}]})
            streakGroup=streakGroup[0]
            if(streakGroup!=null){
              console.log("STREAKGROUP EXIST")
                if(!streakGroup.days.includes(req.body.day)){
                  console.log("TODAY STREAK NOT IN STREAK GROUP")
                  //if streakGroup doesnt have day
              const updateStreakGroup=await StreakGroup.updateOne({"_id":yesterdayStreak.group},
              {$push:{"days":req.body.day}})
              console.log("UPDATING STREAKGROUP:" +streakGroup._ID)
              console.log("CREATE NEW STREAK")
              console.log(updateStreakGroup)
              console.log("\n\n")
                if(Object.keys(req.body.problem).includes("problem")){
              const newStreak=new Streak({
                day:req.body.day,
                userId:id,
                group:streakGroup._id,
                problems:[req.body.problem.problem]
              })
              const save=await newStreak.save()
              res.json({success:true,streak:save,updatedGroup:updateStreakGroup})
            }else if(!Object.keys(req.body.problem).includes("problem") && req.body.problem!=null){
              const newStreak=new Streak({
                day:req.body.day,
                userId:id,
                group:streakGroup._id,
                problems:[req.body.problem]
              })
              const save=await newStreak.save()
              res.json({success:true,streak:save,updatedGroup:updateStreakGroup})

            }
            }else if(streakGroup.days.includes(req.body.day)){
             console.log("TODAY STREAK ALREADY IN STREAK GROUP")
                /*const newStreak=new Streak({
                day:req.body.day,
                userId:id,
                group:streakGroup._id,
                problems:[req.body.problem]
                })
               const save=await newStreak.save()
               res.json({success:true,streak:save,streakGroup:streakGroup})
               */
               if(Object.keys(req.body.problem).includes("problem")){
                
                const update=await Streak.updateOne({$and:[{"userId":req.body.userId},{"day":req.body.day}]},{
                  $push:{"problems":req.body.problem.problem}
                })
                console.log(update)
                const updatedStreak=await Streak.find({$and:[{"userId":req.body.userId},{"day":req.body.day}]})
                           const updateStreakGroup=await StreakGroup.find({$and:[{"userId":req.body.userId},{"_id":streakGroup._id}]})

                res.json({success:true,streak:updatedStreak,updatedStreak:update,updatedGroup:updateStreakGroup})
              }else if(!Object.keys(req.body.problem).includes("problem") && req.body.problem!=null){
                const update=await Streak.updateOne({$and:[{"userId":req.body.userId},{"day":req.body.day}]},{
                  $push:{"problems":req.body.problem}
                })
                console.log(update)
                const updatedStreak=await Streak.find({$and:[{"userId":req.body.userId},{"day":req.body.day}]})
                const updateStreakGroup=await StreakGroup.find({$and:[{"userId":req.body.userId},{"_id":streakGroup._id}]})
                res.json({success:true,streak:updatedStreak,updatedStreak:update,updatedGroup:updateStreakGroup})
  
              }
                  
            }

            }else{
              res.json({"success":false,message:"streakGroup does not exist"})
            }
          }else{
            console.log("STREAK YESTERDAY DOES NOT EXIST/ CREATING NEW STREAK GROUP")
            const newGroup= new StreakGroup({
              userId:id,
              days:[req.body.day]
            })
            const addGroup=await newGroup.save()
            if(!Object.keys(req.body.problem).includes("problem")){
            const newStreak=new Streak({
              day:req.body.day,
              userId:id,
              group:addGroup._id,
              problems:[req.body.problem]
            })
            const addStreak=newStreak.save()
                        res.json({success:true,streak:newStreak,streakGroup:addGroup})

          }else if(Object.keys(req.body.problem).includes("problem")){
              const newStreak=new Streak({
              day:req.body.day,
              userId:id,
              group:addGroup._id,
              problems:[req.body.problem.problem]
            })
            const addStreak=newStreak.save()
            res.json({success:true,streak:newStreak,streakGroup:addGroup})

          }
            //create new streakgroup and new streak
            
          }
        }

      }
    }catch(err){
      console.log(err)
    }
    
    })


  }else{
    var curr=new Date()
    curr=curr.toString().substring(0,15)
    axios.post("https://leetcodetracker.onrender.com/checkProblem",{day:curr,problem:problem,userId:id}).then(async(response)=>{
      try{
     // console.log(response.data)
      curr=curr.split(" ")
      
      
     
      //console.log(response.data)
      console.log("HERE NO DAY")
      
      curr=curr.split(" ")
      var dateDate=new Date(curr[3],monthnum[months.indexOf(curr[1])-1],curr[2])
      var yesterday=new Date(dateDate)
      yesterday=yesterday.setDate(dateDate.getDate()-1)
      yesterday=new Date(yesterday)
      console.log(yesterday.toString())

      if(response.data.already){
        res.json({success:true,message:"Problem "+problem.title+" has already been done today"})
      }else{

        //check if streak already exist
        var streakExist=await Streak.find({$and:[{"day":req.body.day},{"userId":id}]})
        streakExist=streakExist[0]
        if(streakExist!=null){
          //add-problem to streak
          console.log("streakExist:"+streakExist)
          const updateStreak=await Streak.updateOne({$and:[{"day":req.body.day},{"userId":id}]},
          {$push:{"problems":req.body.problem}})
          var streak=await Streak.find({$and:[{"day":req.body.day},{"userId":id}]})
          res.json({success:true,updatedStreak:updateStreak,streak:streak})

        }else{
          //check if streak can be added to a streak group
          var yesterdayStreak=await Streak.find({$and:[{"day":yesterday.toString().substring(0,15)},{"userId":id}]})
          yesterdayStreak=yesterdayStreak[0]
          if(yesterdayStreak!=null){
            
            
            //create streak and add it to StreakGroup
            var streakGroup=await StreakGroup.find({$and:[{"_id":yesterdayStreak.group}]})
            streakGroup=streakGroup[0]
            if(streakGroup!=null){
                if(!streakGroup.problems.includes(req.body.day)){
                  //if streakGroup doesnt have day
              const updateStreakGroup=await StreakGroup.updateOne({"_id":yesterdayStreak.group},
              {$push:{"days":req.body.day}})
              console.log("UPDATING STREAK:")
              console.log(updateStreakGroup)
              console.log("\n\n")
                
              const newStreak=new Streak({
                day:req.body.day,
                userId:id,
                group:streakGroup._id,
                problems:[req.body.problem]
              })
              const save=await newStreak.save()
              res.json({success:true,streak:save,updatedGroup:updateStreakGroup})
            }else if(streakGroup.problems.includes(req.body.day)){
                const newStreak=new Streak({
                day:req.body.day,
                userId:id,
                group:streakGroup._id,
                problems:[req.body.problem]
                })
               const save=await newStreak.save()
               res.json({success:true,streak:save,streakGroup:streakGroup})

            }

            }else{
              res.json({"success":false,message:"streakGroup does not exist"})
            }
          }else{
            const newGroup= new StreakGroup({
              userId:id,
              days:[req.body.day]
            })
            const addGroup=await newGroup.save()

            const newStreak=new Streak({
              day:req.body.day,
              userId:id,
              group:addGroup._id,
              problems:[req.body.problem]
            })
            const addStreak=newStreak.save()
            res.json({success:true,streak:newStreak,streakGroup:addGroup})
            //create new streakgroup and new streak
          }
        }

      }
    }catch(err){
      console.log("err")
    }

    })
  }
})
/***************************************CHALLENGE */

app.post("/create-new-challenge",async(req,res)=>{

  const challenge=req.body.challenge
  const userId=req.body.userId
  const current=req.body.current
  console.log(challenge.startDate)
  console.log(new Date((challenge.endDate.seconds*1000) + (challenge.endDate.nanoseconds/1000000)))

  
  const newChallenge=new Challenge({
    userId:userId,
    title:challenge.title,
    no_questions:challenge.no_questions,
    startDate:new Date((challenge.startDate.seconds*1000) +(challenge.startDate.nanoseconds/1000000)),
    endDate:new Date((challenge.endDate.seconds*1000) + (challenge.endDate.nanoseconds/1000000)),
    length:challenge.length,
    current: current? true:false
  })
  const saved= await newChallenge.save()
  res.json({success:true,challenge:saved})
  
})

function getDatesArray(start, end) {
  for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
      arr.push(dt.toString().substring(0,15));
  }
  return arr;
};

app.get("/challenges/:userId/:day",async(req,res)=>{
  const userId=req.params.userId
  const challenges= await Streak.find({$and:{"userId":userId}})
})

app.get("/get-current-challenge/:userId",async(req,res)=>{
  const streaks=[]
  var currentChallenge
  const challenges=await Challenge.find({$and:[{"userId":req.params.userId}]})
  var today=new Date()

  challenges.map(async(c)=>{
    const start=c.startDate
    const end=c.endDate
    const today=new Date()
    const dates=getDatesArray(start,end)
    if(dates.includes(today.toString().substring(0,15))){
      currentChallenge=c

      //find a streak that exist for today
      var streak=await Streak.find({$and:[{"userId":req.params.userId},{"day":today.toString().substring(0,15)}]})
      streak=streak[0]
      if(streak!=null){
        streaks.push(streak)
        var group=await StreakGroup.find({$and:[{"_id":streak.group},{"userId":req.params.userId}]})
        group=group[0]
        console.log(group)
        if(group!=null){
          group.days.map(async(d)=>{
            var s=await Streak.find({$and:[{"day":d},{"userId":req.params.userId}]})
            s=s[0]
            if(s!=null){
              streaks.push(s)
            }
          })
          setTimeout(()=>{
            res.json({success:true,streaksLength:streaks.length,currentChallenge:c,currentStreak:streak,streaks:streaks})
          },500)
        }
      }else{
      var yesterday=new Date()
      yesterday=new Date(yesterday.setDate(yesterday.getDate()-1))
      var yesterdayStreak=await Streak.find({$and:[{"userId":req.params.userId},{"day":yesterday.toString().substring(0,15)}]})
      console.log("yesterdayStreak",yesterdayStreak)
      yesterdayStreak=yesterdayStreak[0]
      if(yesterdayStreak!=null){
        var group=await StreakGroup.find({$and:[{"_id":yesterdayStreak.group},{"userId":req.params.userId}]})
        group=group[0]
        if(group!=null){
          group.days.map(async(d)=>{
            var s=await Streak.find({$and:[{"day":d},{"userId":req.params.userId}]})
            s=s[0]
            if(s!=null){
              streaks.push(s)
            }
          })
          setTimeout(()=>{
            res.json({success:true,streaksLength:streaks.length,currentChallenge:c,currentStreak:null,streak:streaks})
          },500)
        }
        }else{
          res.json({success:true,current})
        }
      }
      }
      

    
   /* const start=c.startDate
    const end=c.endDate
    const today=new Date()
    const dates=getDatesArray(start,end)
    
    if(dates.includes(today.toString().substring(0,15))){
      var streak=await Streak.find({$and:[{"userId":req.params.userId},{"day":today.toString().substring(0,15)}]})
      if(streak[0]!=null){
        const group=await StreakGroup.find({$and:[{"_id":streak[0].group},{"userId":req.params.userId},{"day":req.params.day==null? today.toString().substring(0,15):req.params.day}]})
        console.log(group)
        res.json({success:true, challenge:c,streak:streak[0],group:group})


      }else{
        var yesterday=new Date()
        yesterday=new Date(yesterday.setDate(yesterday.getDate()-1))
        const yesterdayStreak=await Streak.find({$and:[{"userId":req.params.userId},{"day":yesterday.toString().substring(0,15)}]})
        console.log("yesterdayStreak",yesterdayStreak)
      }
    }else{
      res.json({sucess:false,challenge:null})
    }
    */
  })

})
app.post("/try-remove",async(req,res)=>{

 // console.log(req.body)
  const id=req.body.userId
  const day=req.body.day
  const problem=req.body.problem

  var streak=await Streak.find({$and:[{"day":day},{"userId":id}]})
  streak=streak[0]
  //console.log(streak)
  if(streak!=null){
   // console.log(streak)

    const problems=streak.problems

    problems.map(async(p)=>{
      if(p.id==problem.id){
        console.log("match")
        console.log(p.id+" "+problem.id)
        const problemss=problems.splice(problems.indexOf(p),1)
        console.log(problemss.length)
        const update=await Streak.updateOne({$and:[{"userId":id},{"day":day}]},{
          $set:{"problems":problemss}
        })
        var streakUpdate=await Streak.find({$and:[{"day":day},{"userId":id}]})

        res.json({success:true,updatedStreak:update,streak:streakUpdate})
      }
    })
  }
   /* const day=req.body.day
    const userId=req.body.userId
    const problem=req.body.problem
    console.log(userId)
  var newArray
    var complete=false
    var streak= await Streak.find({$and:[{"day":day},{"userId":userId}]})
    streak=streak[0]
    if(streak!=null){
      streak.problems.map(async(p)=>{
        if(p.title==problem.title && !complete){
          console.log(p.title)
          console.log("MATCH:"+complete)
          newArray=streak.problems.splice(streak.problems.indexOf(p),1)
          console.log(newArray)
          if(streak.problems.length>1){
          const update=await Streak.updateOne({$and:[{"day":day},{"userId":userId}]},{
            $set:{"problems":newArray}
          })
          try{
            res.json({success:true,update:update})
          }catch(err){
            console.log(err)
          }
          complete=true

        }else{
           var group=await StreakGroup.find({$and:[{"_id":streak.group},{"userId":userId}]})
           group=group[0]
           if(group!=null){
              var arr=group.days.splice(group.days.indexOf(day),1)
              const updateGroup=await StreakGroup.updateOne({$and:[{"userId":userId},{"_id":streak.group}]},{
                $set:{"days":arr}
              })

              const deleteStreak=await Streak.deleteOne({$and:[{"day":day},{"userId":userId}]})
              try{
                res.json({success:true,deletedStreak:deleteStreak})
              }catch(err){
                console.log(err)
              }
           }else{
            res.json({success:false})
           }

        }
        }
      })
    }else{
      res.json({success:true,message:"NO streak"})
    }
    */

})
app.get("/problem-by-title",async(req,res)=>{
  const problem=await Problem.find({$and:[{"title":req.body.title}]})
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
 // console.log(req.params.userId)
  //console.log(req.body)
  const groups=await StreakGroup.find({$and:[{"userId":parseInt(req.params.userId)}]})

  const streaksArr=[]
  groups.map(async(g)=>{
    const arr=[]
    const streaks=await Streak.find({$and:[{"group":g.id},{"userId":parseInt(req.params.userId)}]})
   // console.log(streaks)
    streaks.map((s)=>{
      
      arr.push({day:s.day,problems:s.problems})
    })
    streaksArr.push(arr)
   
  })
  setTimeout(()=>{

    streaksArr.map((p)=>{
      if(p.length==0){
        streaksArr.splice(streaksArr.indexOf(p),1)
      }
    })
    setTimeout(()=>{
      res.json({success:true,streaks:streaksArr})

    })
  },600)
})

app.get("/s",async(req,res)=>{
  const str=await Streak.find({"userId":2322})
  console.log(str)
})

app.get("/current-streak/:userId",async(req,res)=>{
  const strek=[]
 
  var streaks=await StreakGroup.find({$and:[{"userId":req.params.userId}]})
  console.log(streaks)
  if(streaks.length>0){
  var curr=new Date()
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
 dayDate=dayDate.toString().substring(0,15)
 console.log("date:"+newdate)
 var day=new Date(dayDate)

  streaks.map((s)=>{
     const days=s.days
     //console.log(s.days)
    if(days.includes(curr) || days.includes(newdate)){
   console.log("MACTHC")
      days.map(async(st)=>{
        var str=await Streak.find({$and:[{"day":st},{"userId":req.params.userId}]})
        str=str[0]
        //console.log(str)
        strek.push({day:str.day,problems:str.problems})
        console.log(strek)
      })
    }
  })
}else{
  try{
  res.json({success:true,streaks:null,message:"no streaks yet"})
  }catch(err){
    console.log(err)
  }
}

  setTimeout(()=>{
    try{
    res.json({success:true,streaks:strek})
    }catch(err){
      console.log(err)
    }
  },1100)
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
  const problems=await Problem.find({"title":"Two Sum"});
  res.json({success:true,problems:problems,total:problems.length})
})

app.get("/get-empty-prompts",async(req,res)=>{
  const problems=await Problem.find({"prompt":{$exists:false}});
  res.json({success:true,problems:problems,total:problems.length})
})

app.get("/get-empty-difficulty",async(req,res)=>{
  const problems=await Problem.find({"difficulty":{$exists:false}});
  res.json({success:true,problems:problems,total:problems.length})
})

app.get("/problem/:title",async(req,res)=>{
  const problem=await Problem.find({$and:[{"title":req.params.title}]})
  res.json(problem)
})

app.post("/set-firebase-id/:id",async(req,res)=>{
  console.log(req.body)
  console.log(req.params)
    const update=await Problem.updateOne({"title":req.body.title},{
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

app.get("/jul",async(req,res)=>{
  const streak=await Streak.find({$and:[{"date":"Thu Jul 13 2023"}]})
  const problems=streak[0].problems
  const deleted=await Streak.deleteOne({$and:[{"day":"Thu Jul 13 2023"}]})
 console.log(deleted)
  const newStreak=new Streak({
    day:"Thu Jul 13 2023",
    group:"64a9b2dac29b36bd7ac6eff8",
    problems:problems,
    userId:2322
  })

  const saved=await newStreak.save()
  res.json({saved:saved})
})
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

                  const prob=await Problem.find({"title":q.title,"difficulty":{$exists:false}})
                  const goodProb=await Problem.find({"title":q.title,"difficulty":{$exists:true}})

                  if(prob!=null){
                    try{
                      await Problem.update({"title":prob.title},{
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
                 
                  var  problem=new Problem({
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
  const results= await Problem.find({})
   
      results.map(async(q) => {
      
        const title = q.title;
        if (title.substring(0, 1) == " ") {
          var end = title.substring(1, title.length);
          end = end.toLowerCase();
          end = end.replace(/\s/g, "-");
          end = end.replace(/{([])}/g, "");
          var link = base + end;

          const prob=await Problem.find({
            "title":title
          })
          
          try{
            const val=await Problem.update({title:prob.title},{
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

          const prob=await Problem.find({
            "title":title
          })
         
          try{
            const val=await Problem.update({title:prob.title},{
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

