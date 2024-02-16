const pdfParse = require("pdf-parse");
const dotenv = require("dotenv").config({path:"./config/.env"})

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

const { $Size } = require("sift");
const ProblemTopicTag = require("./models/ProblemTopicTags");
const ProblemPage = require("./models/LeetcodeProblemPages");
const cluster=require("cluster");
const { URL, parse } = require('url');

const { Number } = require("core-js");
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

const paymentRouter=require("./payment").router
app.use("/payment",paymentRouter)
const userRouter=require("./user").router
app.use("/user",userRouter)


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
app.get("/all-problems",async(req,res)=>{
  const problems= await Problem.find({})
  res.json({success:true,length:problems.length,total:problems})
})
app.get("/incomplete-problems",async(req,res)=>{
  const problems= await Problem.find({$or:[{"difficulty":{$exists:false}},{"frontendQuestionId":{$exists:false}},{"acRate":{$exists:false}}]})
  res.json({success:true,length:problems.length,total:problems})
})
app.get("/new-problems",async(req,res)=>{
  console.log(Problem)
  console.log(Streak)
  const problems=await Problem.find({$and:[{"firebaseId":null}]})
  res.json({success:true,no_problems:problems.length,problems:problems})
})
app.get("/problems",async(req,res)=>{
  const problems= await Problem.find({"prompt":{$exists:true},"difficulty":{$exists:true}})
  res.json({success:true,length:problems.length,problems:problems})
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
    axios.get("https://leetcodetracker.onrender.com//checkProblem/",{day: (req.body.day==null) ? curr.toString().substring(0,15):req.body.day,problem:req.body.problem,user:req.body.userId}).then(async(response)=>{
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

  try{

  if(date!=null){
    console.log(Object.keys(req.body.problem))
    console.log(problem)
    console.log(date)
    try{

    axios.post(" https://leetcodetracker.onrender.com/checkProblem",{day:date,problem:problem,userId:id}).then(async(response)=>{
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
  }catch(err){
    console.log(err)
  }


  }else{
    var curr=new Date()
    curr=curr.toString().substring(0,15)
    axios.post(" https://leetcodetracker.onrender.com/checkProblem",{day:curr,problem:problem,userId:id}).then(async(response)=>{
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
}catch(err){
  console.log(err)
}
})
/***************************************CHALLENGE */

app.post("/create-new-challenge",async(req,res)=>{

  const challenge=req.body.challenge
  const userId=req.body.userId
  const current=req.body.current
  console.log(challenge.startDate)
  console.log(new Date(challenge.startDate) instanceof Date)
  console.log(new Date((challenge.endDate.seconds*1000) + (challenge.endDate.nanoseconds/1000000)))

  
  try{
  const newChallenge=new Challenge({
    userId:userId,
    title:challenge.title,
    no_questions:challenge.no_questions,
    startDate:new Date(challenge.startDate),
    endDate:new Date(challenge.endDate),
    length:challenge.length,
    initialPasses:challenge.intialPasses,
    current: current? true:false,
    passes:challenge.passes,
    usedPasses:0
  })
  const saved= await newChallenge.save()
  res.json({success:true,challenge:saved})
}catch(err){
  console.log(err)
  try{
  res.json({success:false,err:err})
  }catch(err){
    console.log(err)
  }
}

  
})

function getDatesArray(start, end) {
  for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
      arr.push(dt.toString().substring(0,15));
  }
  return arr;
};


app.post("/update-challenge/:userId",async(req,res)=>{
  
  const challenge=req.body.challenge
  console.log(challenge)
  const update=await Challenge.updateOne({$and:[{"_id":challenge._id}]},{
    $set:{"title":challenge.title,"startDate":challenge.startDate,"endDate":challenge.endDate,"no_questions":challenge.no_questions,"success":challenge.success,"current":challenge.current,"length":challenge.length,"passes":challenge.passes,"usedPasses":challenge.usePasses,"initialPasses":challenge.initialPasses,"failedDays":challenge.failedDays,"lastUpdated":new Date()}
  })
  console.log

  const cha=await Challenge.find({$and:[{"_id":challenge._id}]})
  if(cha[0]==null){
  res.json({success:false})
  }else{
    res.json({success:true,updated:update,challenge:cha[0]})
  }

})

app.get("/challenges/:userId/:day",async(req,res)=>{
  const userId=req.params.userId
  const challenges= await Streak.find({$and:{"userId":userId}})

  
  challenges.map(async(c)=>{
    const start=c.startDate
    const end=c.endDate
    const today=new Date()
    const dates=getDatesArray(start,end)
    if(dates.includes(today.toString().substring(0,15))){
      currentChallenge=c
    }
  })
})


const getAllPrevStreaks=async(req,dates,streaks)=>{
  found=false
  dates.map(async(d)=>{
    var str=await Streak.find({$and:[{"userId":req.params.userId},{"day":d}]})
    str=str[0]
    if(str!=null && found==false){
      console.log("NO TODAY NOT YESTER")
      found=true
      const allStreaks=await Streak.find({$and:[{"group":str.group}]})
      allStreaks.map((s)=>{
        console.log("ALLSTREAKS FROM GROUP length",allStreaks.length)
        
        var day=s.day.split(" ")
        day=new Date(day[3],monthnum[months.indexOf(day[1])-1],day[2])
        console.log(day)
        streaks.push({streak:s,problems:s.problems,day:day,challenge_id:c._id})
      })


    }
  })
}
app.get("/get-current-challenge/:userId",async(req,res)=>{
  const streaks=[]
  var currentChallenge
  const challenges=await Challenge.find({$and:[{"userId":req.params.userId}]})
  var today=new Date()
  var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
  "Aug","Sep","Oct","Nov","Dec"];
  var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]
 var currentStreak
  var sent=false


  challenges.map(async(c)=>{
    const failedDay=[]
    const start=c.startDate
    const end=c.endDate
    const today=new Date()
   // console.log(c)
    var current=false
    const dates=getDatesArray(start,end)
    console.log(typeof(c.endDate)+" "+typeof(today))
    //console.log(new Date(c.endDate),today)
    if(new Date(c.endDate)<today && c.success){
      console.log("LESS THAN")
      dates.map(async(d)=>{
        var str=await Streak.find({$and:[{"day":d},{"userId":req.params.userId}]})
        str=str[0]
        if(str!=null){
          if(str.problems.length<c.no_questions){
            failedDay.push(str)
            //console.log("failedDays",failedDay)
          }
        }else{
          console.log("\n\nEMPTY DAY\n\n")
          failedDay.push({date:"fail"})
        }
        console.log("\n\n")
        console.log("fail:",failedDay.length)
        console.log(c)
        console.log("\n\n")
      })
      setTimeout(async()=>{
        //console.log("failed",failedDay.length)
        //console.log(Object.keys(c._doc))
        //console.log("initialPasses",c._doc.initialPasses)
        console.log("\n\n")
        console.log("fail:",failedDay.length)
        console.log(c.initialPasses)
        console.log("\n\n")
        if(failedDay.length>c.initialPasses){
          const updateFail=await Challenge.updateOne({$and:[{"_id":c._id}]},{
            $set:{"success":false}
          })

          console.log("updating fail:",updateFail)
          console.log("\n\n")
           
            
        //console.log(c)
        }
       
      },200)

      
    }
    if(dates.includes(today.toString().substring(0,15))){
      current=true
      if(c.current==false){
        const updateCurrent=await Challenge.updateOne({$and:[{"_id":c._id}]},{
          $set:{"current":true}
        })
        //console.log("update",updateCurrent)
      }
    }else if(c.current==true && !dates.includes(today.toString().substring(0,15))){
      const updateCurrent=await Challenge.updateOne({$and:[{"_id":c._id}]},{
        $set:{"current":false}
      })
      //console.log("\n\n",updateCurrent)
    }
    
    if(c!=null){
      
      var yesterday=new Date()
      yesterday=new Date(yesterday.setDate(yesterday.getDate()-1))
      
      var yesterdayStreak=await Streak.find({$and:[{"userId":req.params.userId},{"day":yesterday.toString().substring(0,15)}]})
    if(dates.includes(today.toString().substring(0,15))){
      var cha=await Challenge.find({$and:[{"_id":c._id}]})
      currentChallenge=cha[0]


      //find a streak that exist for today
      var streak=await Streak.find({$and:[{"userId":req.params.userId},{"day":today.toString().substring(0,15)}]})
      streak=streak[0]
      if(streak!=null){
        currentStreak=streak[0]
        var streakday=streak.day.split(" ")
        streakday=new Date(streakday[3],monthnum[months.indexOf(streakday[1])-1],streakday[2])

        var group=await StreakGroup.find({$and:[{"_id":streak.group},{"userId":req.params.userId}]})
        group=group[0]
       // console.log(group)
        if(group!=null){
          group.days.map(async(d)=>{
            var s=await Streak.find({$and:[{"day":d},{"userId":req.params.userId}]})
            s=s[0]
            if(s!=null){
              var day=s.day.split(" ")
              day=new Date(day[3],monthnum[months.indexOf(day[1])-1],day[2])
              if(day.toString().substring(0,15)=="Sun Oct 08 2023"){
                console.log("FOUND \n\n")
              }

              streaks.push({streak:s,problems:s.problems,day:day,challenge_id:c._id,passed:c.no_questions<=s.problems.length?true:false})
            }
          })
        }
      }else if(yesterdayStreak[0]!=null){
      if(current){
      //console.log("yesterdayStreak not null",yesterdayStreak[0].day)
      yesterdayStreak=yesterdayStreak[0]
      if(yesterdayStreak!=null){
        var group=await StreakGroup.find({$and:[{"_id":yesterdayStreak.group},{"userId":req.params.userId}]})
        group=group[0]
        if(group!=null){
          group.days.map(async(d)=>{
            var s=await Streak.find({$and:[{"day":d},{"userId":req.params.userId}]})
            s=s[0]
            if(s!=null){
              
              var day=s.day.split(" ")
              day=new Date(day[3],monthnum[months.indexOf(day[1])-1],day[2])

              streaks.push({streak:s,day:day,problems:s.problems,challenge_id:c._id,passed:c.no_questions<=s.problems.length?true:false})
            }
          })
        }
        }else{
          console.log("\n\n\n Last")
          console.log(dates)
         
        }
      }
      }else {
        var found=false
        console.log("NO FOUND")
        //console.log(dates)
        
        dates.map(async(d)=>{
          console.log("date:",d)
          if(d=="Sun Oct 08 2023"){
            console.log("found\n\n")
          }
          var str=await Streak.find({$and:[{"userId":req.params.userId},{"day":d}]})
          str=str[0]
          if(str!=null && found==false){
            console.log("NO TODAY NOT YESTER")
            found=true
            const allStreaks=await Streak.find({$and:[{"group":str.group}]})
            allStreaks.map((s)=>{
              console.log("ALLSTREAKS FROM GROUP length",allStreaks.length)
              
              var day=s.day.split(" ")
              day=new Date(day[3],monthnum[months.indexOf(day[1])-1],day[2])
              //console.log(day)
              console.log("/n/n","1403")
              console.log(str.day)
              streaks.push({streak:str,problems:str.problems,day:day,challenge_id:c._id,passed:c.no_questions<=str.problems.length?true:false})
            })
      
      
          }
        })
      }
      }else{
       // console.log("\n\nFUTURE",c)
       //console.log("HERE")
       console.log("\n\nfuture")
      console.log(dates[0])
       console.log(dates)
       console.log("\nl\n")
        dates.map(async(d)=>{
          console.log("HERE:",d)
          if(d=="Sun Oct 08 2023"){
            console.log("found\n\n")
          }
          //console.log(d)
          var streak=await Streak.find({$and:[{"day":d}]})
          streak=streak[0]
          if(streak!=null){
          var day=streak.day.split(" ")
          day=new Date(day[3],monthnum[months.indexOf(day[1])-1],day[2])
            console.log("/n/n 1428")
            console.log(streak.day)
          streaks.push({streak:streak,day:day,problems:streak.problems,challenge_id:c._id,passed:c.no_questions<=streak.problems.length?true:false})
          }


        })
        
      }
      //challengesFreah.push(c)
      

    
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
  }
  })

  setTimeout(async()=>{
    if(sent==false){
      sent=false
      const challengesAll=await Challenge.find({$and:[{"userId":req.params.userId}]})
      try{
    res.json({success:true,streaksLength:streaks.length,currentChallenge:currentChallenge,currentStreak:null,streaks:streaks,challenges:challengesAll})
      }catch(err){
        console.log(err)
      }
    }
  },1000)

})

app.get("/monthCharts/:id",async(req,res)=>{
 // dbmongo.streak.createIndex( { "$**": "text" } )
 const date=new Date()
 console.log(date.getFullYear())
  const janDates=[]
 const jan=await Streak.find({
  $and:[{"userId":req.params.id},{"day":{$regex:"Jan"}},{"day":{$regex:date.getFullYear().toString()}}]
})
var janCount=0;
  jan.map((a)=>{
  janCount+=a.problems.length
  janDates.push(a.day)
  })
  /*********** */
  const febDates=[]
  const feb=await Streak.find({
    $and:[{"userId":req.params.id},{"day":{$regex:"Feb"}},{"day":{$regex:date.getFullYear().toString()}}]
  })
  var febCount=0;
  feb.map((a)=>{
    febCount+=a.problems.length
    febDates.push(a.day)
  })

  /*********** */
  marDates=[]
  const mar=await Streak.find({
    $and:[{"userId":req.params.id},{"day":{$regex:"Mar"}},{"day":{$regex:date.getFullYear().toString()}}]
  })
  var marCount=0;
  mar.map((a)=>{
    marCount+=a.problems.length
    marDates.push(a.day)
  })

  /*********** */
  const aprDates=[]
  const apr=await Streak.find({
    $and:[{"userId":req.params.id},{"day":{$regex:"Mar"}},{"day":{$regex:date.getFullYear().toString()}}]
  })
  var aprCount=0;
  apr.map((a)=>{
    aprCount+=a.problems.length
    aprDates.push(a.day)
  })

  /*********** */
   /*********** */
   const mayDates=[]
   const may=await Streak.find({
    $and:[{"userId":req.params.id},{"day":{$regex:"May"}},{"day":{$regex:date.getFullYear().toString()}}]
  })
  var mayCount=0;
  may.map((a)=>{
    mayCount+=a.problems.length
    a.push(a.day)
  })

   /*********** */
   const junDates=[]
   const jun=await Streak.find({
    $and:[{"userId":req.params.id},{"day":{$regex:"Jun"}},{"day":{$regex:date.getFullYear().toString()}}]
  })
  var junCount=0;
  jun.map((a)=>{
    junCount+=a.problems.length
    junDates.push(a.day)
  })
   /*********** */
   const julDates=[]
   const jul=await Streak.find({
    $and:[{"userId":req.params.id},{"day":{$regex:"Jul"}},{"day":{$regex:date.getFullYear().toString()}}]
  })
  var julCount=0;
  jul.map((a)=>{
    julCount+=a.problems.length
    julDates.push(a.day)
  })

     /*********** */
  const augDates=[]
  const aug=await Streak.find({
    $and:[{"userId":req.params.id},{"day":{$regex:"Aug"}},{"day":{$regex:date.getFullYear().toString()}}]
  })
  var augCount=0;
  aug.map((a)=>{
    augCount+=a.problems.length
    augDates.push(a.day)
  })

   /*********** */
  const sepDates=[]
   const sep=await Streak.find({
    $and:[{"userId":req.params.id},{"day":{$regex:"Sep"}},{"day":{$regex:date.getFullYear().toString()}}]
  })
  var sepCount=0;
  sep.map((a)=>{
    sepCount+=a.problems.length
    sepDates.push(a.day)
  })

   /*********** */
  octDates=[]
   const oct=await Streak.find({
    $and:[{"userId":req.params.id},{"day":{$regex:"Oct"}},{"day":{$regex:date.getFullYear().toString()}}]
  })
  var octCount=0;
  oct.map((a)=>{
    octCount+=a.problems.length
    octDates.push(a.day)
  })

   /*********** */
  const novDates=[]
   const nov=await Streak.find({
    $and:[{"userId":req.params.id},{"day":{$regex:"Nov"}},{"day":{$regex:date.getFullYear().toString()}}]
  })
  var novCount=0;
  nov.map((a)=>{
    novCount+=a.problems.length
    novDates.push(a.day)
  })
  
   /*********** */
  const decDates=[]
   const dec=await Streak.find({
    $and:[{"userId":req.params.id},{"day":{$regex:"Dec"}},{"day":{$regex:date.getFullYear().toString()}}]
  })
  var decCount=0;
  dec.map((a)=>{
    decCount+=a.problems.length
    console.log("dec:"+decCount)
    decDates.push(a.day)
  })

  
  console.log(julCount,augCount,sepCount,octCount,novCount)
  setTimeout(()=>{
    res.json({success:true,months:[{month:"January",problems:janCount,days:janDates},{month:"February",problems:febCount,days:febDates},{month:"March",problems:marCount,days:marDates},{month:"April",problems:aprCount,days:aprDates},{month:"May",problems:mayCount,problems:mayDates},{month:"June",problem:junCount,days:junDates},{month:"July",problems:julCount,days:julDates},{month:"August",problems:augCount,days:augDates},{month:"September",problems:sepCount,days:sepDates},{month:"October",problems:octCount,days:octDates},{month:"November",problems:novCount,days:novDates},{month:"December",problems:decCount,days:decDates}]})

  },2000)



})


/*
app.get("/head",(req,res)=>{

  (async () => {
    try {
      let characterResponse = await axios(" https://leetcodetracker.onrender.com/problems")
      
  
      //console.log(Object.keys(characterResponse))
      return characterResponse.data
    } catch (err) {
      console.log("error",err.message)
    }
  }
  )()

  var characterResponseJson={
    films:[" https://leetcodetracker.onrender.com/"," https://leetcodetracker.onrender.com/"]
  }
  
  let films = characterResponseJson.films.map(async filmUrl => {
    try{
      console.log(filmUrl)
    let filmResponse = await axios(filmUrl)
//  let filmResponseJSON = filmResponse.json()
    return filmResponse
    }catch(err){
      console.log("error first",err.message)
    }
  })
  console.log(films)
  films.map(async(c)=>{
    const a=await c
    console.log(a.data)

  })
  res.send(films)

})
*/

app.post("/process/:userId",async(req,res)=>{
  console.log(req.body)
  const challenge=req.body.challenge
  const userId=req.params.userId
  const streaks=req.body.streaks
  
  const dates=getDatesArray(challenge.startDate,challenge.endDate)
  //console.log(dates)
  dates.map(async(d)=>{
    var streak=await Streak.find({$and:[{"day":d},{"userId":userId}]})
    streak=streak[0]
    if(streak!=null){
    streaks.push({day:streak.day})
    }
  })
  setTimeout(()=>{
    res.json({streaks:streaks})
  },600)
})

app.get("/get-current-challenge-2/:userId",async(req,res)=>{
  const streaks=[]
  const userId=req.params.userId
  console.log(typeof req.params.userId)
  const challenges=await Challenge.find({$and:[{"userId":userId}]})
//console.log("challenges",challenges)
  var currentChallenge
  if(challenges.length>0){



    challenges.map((c)=>{
      const failedDay=[]
      var today=new Date()
      const dates=getDatesArray(c.startDate,c.endDate)
      if(dates.includes(today.toString().substring(0,15))){
        currentChallenge=c
      }

      if(c.success==true && new Date(c.endDate)<today){
        console.log("check")
        dates.map(async(d)=>{
          var str=await Streak({$and:[{"day":d},{"userId":req.params.userId}]})
          str= str[0]
          if(str!=null){
            if(str.problems.length<c.no_questions){
              failedDay.push(str)
            }

          }else{
            failedDay.push({empty:true})
          }
        })
        console.log("faile",failedDay.length," passes:",c.no_questions)
        setTimeout(async()=>{
          if(failedDay.length>c.no_questions){
            const update=await Challenge.updateOne({$and:[{"_id":c._id}]},{
              $set:{"success":false}
            })
            console.log(update)
          }

        },400)
      }
      dates.map(async(d)=>{
        var streak=await Streak.find({$and:[{"day":d},{"userId":userId}]})
        streak=streak[0]
        if(streak!=null){
        streaks.push({day:streak.day,problems:streak.problems,challenge_id:c._id,streak:streak,passed:streak.problems.length>=c.no_questions? true:false})
        }

        
      })

    })
    setTimeout(()=>{
      res.json({streaks:streaks,challenges:challenges,currentChallenge:currentChallenge})
    },4000)
    
  }else{
    //res.json({})
  }

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


function sortArr(arr,l,r){

  if(l<r){
    //console.log("rr:",r)
    var b=r-l
    var m=Math.floor(l+((r-l)/2))
    console.log("m",m,"b",b)
    sortArr(arr,l,m)
    sortArr(arr,m+1,r)
    const problems=merge(l,m,r,arr)
    return problems

  }
 
}

function merge(l,m,r,arr){
  console.log("here:",l,m,r)
  var n1 =m-l+1 
  var n2=r-m
  var left=[]
  var right=[]
  var i=0;
  while(i<n1){
    left[i]=arr[i+l];
    i++
  }
  var j=0
  while(j<n2){
    right[j]=arr[j+m+1]
    j++
  }
  i=0;
  j=0
  k=l
  while(i<n1 && j<n2){
    if(new Date(left[i].last)<=new Date(right[j].last)){
      arr[k]=left[i]
      i++;
      k++;
    }else{
      arr[k]=right[j]
      k++;
      j++
    }
  }
  while(j<n2){
    arr[k]=right[j]
    k++
    j++
  }
  while(i<n1){
    arr[k]=left[i]
    k++
    i++
  }


return arr
}



app.post("/sort-problems",async(req,res)=>{
  const problems=req.body.problems
  
  const newProblems=[]
 /* problems.map((p)=>{
    
    var min = problems.reduce(function (a, b) { return new Date(a.last) <= new Date(b.last)   ? a : b; }); 
    console.log(min," ",problems.indexOf(min))
    problems.splice(problems.indexOf(min),1)
    newProblems.push(min)

  })
  while(problems.length>0){
        var min = problems.reduce(function (a, b) { return new Date(a.last) <= new Date(b.last)   ? a : b; }); 

    problems.splice(problems.indexOf(min),1)
    newProblems.push(min)
  }
  */
 console.log(problems.length-1)
 var r=problems.length-1
 console.log(r)
  const arr=await sortArr(problems,0,problems.length-1)

  setTimeout(()=>{
    console.log(arr)
    res.json({problems:arr,success:true,old:problems})
  },2000)

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

 axios.get("https://leetcodetracker.onrender.com//problem/"+req.body.title).then(async(response)=>{
  const p=resposne.data[0]
  console.log(p)
 res.json({success:true})
  
 })
  
 
})
app.post("/add-info-to-problems",(req,res)=>{
  const problems=req.body.problems
  console.log(problems)
  problems.map(async(p)=>{
    const prob=await Problem.findOne({title:p.title})
    console.log(prob)
  })
})

app.get("/topicTag",async(req,res)=>{
  const empty=await Problem.find({topicTags:{$size:0}})
 const notempty=await Problem.find({})
 const pro=notempty.map((p)=>{
  if(p.tags.length>0){
  return {tags:p.tags,topicTags:p.topicTags}
  }
 })

  res.json({length:empty.length,notempty:notempty.length-pro.length,pro:pro,empty:empty})
})

app.get("/problem-page",async(req,res)=>{
  var page=await ProblemPage.find({$orderby:"page"})
  setTimeout(()=>{
    res.json({success:true,lastPage:page[page.length-1]})
  },1000)
})
/************************************************************************************************************************************************************************************************************************************************************ */
//GOOD

app.get("/pages",async(req,res)=>{
  const pages=await Problem.find({})
  var page=2
  pages.map(async(p)=>{
    const pagee=await ProblemPage.findOne({page:p.page})
    console.log(pagee,"...",p.page)
    if(pagee==null){
      const newpage=new ProblemPage({
        page:p.page
      })
      try{
      const saved=await newpage.save()
      console.log(saved)
      page++
      }catch(err){
        console.log(err)
      }
    }
  })

})
app.get("/titles/:page", (req, res) => {

var i
  (async () => {
    const arrr=[]
    const updates=[]
    const newProblems=[]

    const allproblems=[]
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    console.log("grabbing all httprequest from browser");
    const page = await browser.newPage();

    const getData = async (response) => {
      const c = await response.text();
      return c;
    };
    if(req.params.page!=1 && req.params.page!=null){
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
            arrr.push(info)
            const p = info.problemsetQuestionList;
            try {
             
              const problems = p.questions;
              var count=0
              if (problems != null) {
                const base = "https://leetcode.com/problems/";

                problems.map(async(q) => {
                  var end = q.title //.substring(1, title.length);
                  end = end.toLowerCase();
                  end = end.replace(/\s/g, "-");
                  end = end.replace(/{([])}/g, "");
                  end = end.replace("---","-");
                  end=end.replace("()","")
                  end=end.replace("`","")
                  end=end.replace("---","-")
                  end=end.replace("(","")
                  end=end.replace(")","")
                  end=end.replace(":","")
                  link=base+end
        
                 
                  const pp=await Problem.findOne({"title":q.title})
                  if(q.paidOnly && pp!=null){
                    const del=await Problem.deleteOne({"title":q.title})
                    console.log("DELETED:",q.title,del)
                  }
          if(pp!=null ){
                
            
                  const tags=q.topicTags.map((t)=>{
                    return t.name
                  })
                  //console.log(tags)
                  tags.map(async(t)=>{
                    try{
                    const tag=new ProblemTopicTag({
                      name:t
                    })
                    const saveTag=await tag.save()
                    console.log("new tag:",saveTag)
                  }catch(err){
                   // console.log(err)
                  }
                  })
                  const prob=await Problem.findOne({"title":q.title})
                  
                  if(prob!=null){
                       if(q.paidOnly){
              console.log("MUST PAY:"+q.title)
              const del=await Problem.deleteOne({"title":q.title})
              console.log("deleted",q.title,del)
            }
                  //console.log("\n",prob.title," ",q.acRate," ",q.difficulty)
                 // console.log(prob.difficulty," ",q.acRate)
                 if(prob.acRate==null || prob.difficulty==null || prob.level==null || prob.tags.length==0 ||prob.topicTags.length==0 || prob.frontendQuestionId==null || prob.page==null){
                  if(prob.page==null){
                    const page=await Problem.updateOne({"title":prob.title},{
                      $set:{"page":req.params.page}
                    })
                    console.log("updating page for:",q.title,page)
                  }
                  if(prob.link==null){
                    const link=await Problem.updateOne({"title":prob.title},{
                      $set:{"link":link}
                    })
                    console.log("updating link for:",q.title)
                  }
                  if(prob.acRate==null){
                    const acRate=await Problem.updateOne({"title":prob.title},{
                      $set:{"acRate":q.acRate}
                    })
                    console.log("acRate update:",prob.title," ",acRate)
                  }
                  if(prob.difficulty==null){
                    const difficulty=await Problem.updateOne({"title":prob.title},{
                      $set:{"difficulty":q.difficulty}
                    })
                    console.log("difficulty update:",prob.title," ",difficulty)

                  }
                  if(prob.level==null){
                    const level=await Problem.updateOne({"title":prob.title},{
                      $set:{"level":q.difficulty}
                    })
                    console.log("level update:",prob.title," ",level)

                  }
                  if(prob.frontendQuestionId==null){
                    const frontend=await Problem.updateOne({"title":prob.title},{
                      $set:{"frontendQuestionId":q.frontendQuestionId}
                    })
                   console.log("frontendId update:",prob.title," ",frontend)


                  }
                  if(prob.page==null){
                    const page=await Problem.updateOne({"title":prob.title},{
                      $set:{"page":req.params.page}
                    })
                    console.log("page update:",prob.title,page)

                  }
                  if(prob.tags.length==0 || prob.topicTags.length==0){
                    tags.map(async(t)=>{
                      if(prob.topicTags.length==0){
                      const topicTag=await Problem.updateOne({"title":prob.title},{
                        $push:{"topicTags":t}
                      })
                      console.log("topictags update:",prob.title,topicTag)

                    }
                      if(prob.tags.length==0){
                      const ptag=await Problem.updateOne({"title":prob.title},{
                        $push:{"tags":t}
                      })
                      console.log("tags update:",prob.title,ptag)

                    }
                    
                     // console.log(problem.title,ptag)
                    }) 

                  }
                  console.log("\n\n")
                  const updateP=await Problem.find({title:prob.title})
                  updates.push(updateP)
                }
                }else{
                  console.log("CREATING NEW PROBLEM",q.title)
                  var  newProblem=new Problem({
                    title:q.title,
                    difficulty:q.difficulty,
                    acRate:q.acRate,
                    frontendQuestionId:q.frontendQuestionId,
                    page:req.params.page
                    
                   })
                  try {
                    const saved= await newProblem.save()
                    console.log("success")
                    console.log(saved)

                    tags.map(async(t)=>{
                      const topicTag=await Problem.updateOne({"title":newProblem.title},{
                        $push:{"topicTags":t}
                      })

                    
                      const ptag=await Problem.updateOne({"title":newProblem.title},{
                        $push:{"tags":t}
                      })

                     // console.log(problem.title,ptag)
                    }) 
                    newProblems.push(saved)
                  }catch(err1){
                    console.log(err1)
                  }
                }
                  }else{
                    if(q.paidOnly==false){
                                         console.log("\nEMPTY:",q.title)

                    var  newProblem=new Problem({
                      title:q.title,
                      difficulty:q.difficulty,
                      acRate:q.acRate,
                      level:q.difficulty,
                      frontendQuestionId:q.frontendQuestionId,
                      page:req.params.page,
                      link:link
                      
                     })
                     console.log(newProblem,"\n\n")
                    try {
                     // const saved= await newProblem.save()
                      console.log("success")
                      //console.log(saved)

                      tags.map(async(t)=>{
                        const topicTag=await Problem.updateOne({"title":newProblem.title},{
                          $push:{"topicTags":t}
                        })
  
                      
                        const ptag=await Problem.updateOne({"title":newProblem.title},{
                          $push:{"tags":t}
                        })
  
                       // console.log(problem.title,ptag)
                      }) 
                      newProblems.push(saved)
                    }catch(err1){
                      console.log("not added")
                    }
                  }
                  }
                 // const goodProb=await Problem.find({"title":q.title,"difficulty":{$exists:true}})

                  /*if(prob!=null){
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
                   allproblems.push({title:q.title,difficulty:q.difficulty})
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
                    res.json({success:true,problems:allProblems,arr:arrr})
                   }
                  }
                  */
                });
              
              }
            } catch {
              //console.log("no problems");
            }
          }
        });
        //console.log(data)
      }
    });
  }else{
    
    await page.goto(
      "https://leetcode.com/problemset/all/" 
    );
    page.on("response", async (response) => {
      if (response.url() == "https://leetcode.com/graphql/") {
        const data = await getData(response).then(async (response) => {
          const info = await JSON.parse(response).data;
          //console.log(info)
          var i=0
          if (info != null) {
            arrr.push(info)
            const p = info.problemsetQuestionList;
            try {
             
              const problems = p.questions;
              var count=0
              if (problems != null) {
                problems.map(async(q) => {
                  if(q.paidOnly==false){
                    console.log("MUST PAY:"+q.title)
                  }
                  const tags=q.topicTags.map((t)=>{
                    return t.name
                  })
                  //console.log(tags)
                  tags.map(async(t)=>{
                    try{
                    const tag=new ProblemTopicTag({
                      name:t
                    })
                    const saveTag=await tag.save()
                    console.log(saveTag)
                  }catch(err){

                  }
                  })
                  const prob=await Problem.findOne({$and:[{"title":q.title}]})
                  if(prob!=null){
                    if(q.paidOnly==false){
                  //console.log("\n",prob.title," ",q.acRate," ",q.difficulty)
                 // console.log(prob.difficulty," ",q.acRate)
                 if(prob.acRate==null || prob.difficulty==null || prob.tags.length==0 ||prob.topicTags.length==0 || prob.frontendQuestionId==null){
                  if(prob.acRate==null){
                    const acRate=await Problem.updateOne({"title":prob.title},{
                      $set:{"acRate":q.acRate}
                    })
                    console.log("acRate update:",prob.title," ",acRate)
                  }
                  if(prob.difficulty==null){
                    const difficulty=await Problem.updateOne({"title":prob.title},{
                      $set:{"difficulty":q.difficulty}
                    })
                    console.log("difficulty update:",prob.title," ",difficulty)

                  }
                  if(prob.frontendQuestionId==null){
                    const frontend=await Problem.updateOne({"title":prob.title},{
                      $set:{"frontendQuestionId":q.frontendQuestionId}
                    })
                   console.log("frontendId update:",prob.title," ",frontend)

                  }
                  if(prob.tags.length==0 || prob.topicTags.length==0){
                    tags.map(async(t)=>{
                      if(prob.topicTags.length==0){
                      const topicTag=await Problem.updateOne({"title":prob.title},{
                        $push:{"topicTags":t}
                      })
                      console.log("topictags update:",prob.title,topicTag)

                    }
                      if(prob.tags.length==0){
                      const ptag=await Problem.updateOne({"title":prob.title},{
                        $push:{"tags":t}
                      })
                      console.log("tags update:",prob.title,ptag)

                    }
                     // console.log(problem.title,ptag)
                    }) 

                  }
                  console.log("\n\n")
                  const updateP=await Problem.find({title:prob.title})
                  updates.push(updateP)
                }
                }
                  }else{
                    console.log("\nEMPTY:",q.title)
                    var  newProblem=new Problem({
                      title:q.title,
                      difficulty:q.difficulty,
                      acRate:q.acRate,
                      frontendQuestionId:q.frontendQuestionId
                      
                     })
                    try {
                      const saved= await newProblem.save()
                      console.log("success")
                      console.log(saved)

                      tags.map(async(t)=>{
                        const topicTag=await Problem.updateOne({"title":newProblem.title},{
                          $push:{"topicTags":t}
                        })
  
                      
                        const ptag=await Problem.updateOne({"title":newProblem.title},{
                          $push:{"tags":t}
                        })
  
                       // console.log(problem.title,ptag)
                      }) 
                      newProblems.push(saved)
                    }catch(err1){
                      console.log(err1)
                    }
                  }
                 // const goodProb=await Problem.find({"title":q.title,"difficulty":{$exists:true}})

                  /*if(prob!=null){
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
                   allproblems.push({title:q.title,difficulty:q.difficulty})
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
                    res.json({success:true,problems:allProblems,arr:arrr})
                   }
                  }
                  */
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
  }
    setTimeout(()=>{
      
      res.json({success:true,updatesLength:updates.length,newProblemsLength:newProblems.length,length:arrr.length,updates:updates,newProblems:newProblems,arr:arrr})
    },10000)
  
  })();
});
app.get("/try-url",async(req,res)=>{

  (async (page) => {
    var found=false

    const arrr=[]
    const updates=[]
    const newProblems=[]

    const allproblems=[]
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    console.log("grabbing all httprequest from browser");
    const site = await browser.newPage();

    const getData = async (response) => {
      const c = await response.text();
      return c;
    };
     site.goto(
      "https://leetcode.com/problems/two-sum" 
    ).then(()=>{
      site.on("response", async (response) => {
        console.log((response).url())
        if(response.url()==="https:leetcode.com/graphql"){
          found=true
        }
      })
    }).catch((err)=>{
      console.log("ERR:",err)
    })
    setTimeout(()=>{
      console.log("\nFOUND:",found)
    },4000)
    
  
})()
})
app.get("/generate-titles-function",async(req,res)=>{
  axios.get("https://leetcodetracker.onrender.com/problem-page").then((response)=>{
    const page=response.data.lastPage.page+1
    console.log(page)

    
  (async (page) => {
    const arrr=[]
    const updates=[]
    const newProblems=[]

    const allproblems=[]
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    console.log("grabbing all httprequest from browser");
    const site = await browser.newPage();

    const getData = async (response) => {
      const c = await response.text();
      return c;
    };
    if(req.params.page!=1 && req.params.page!=null){
    await page.goto(
      "https://leetcode.com/problemset/all/?page=" + page
    );
    site.on("response", async (response) => {
      if (response.url() == "https://leetcode.com/graphql/") {
        const data = await getData(response).then(async (response) => {
          const info = await JSON.parse(response).data;
          //console.log(info)
          var i=0
          if (info != null) {
            arrr.push(info)
            const p = info.problemsetQuestionList;
            try {
             
              const problems = p.questions;
              var count=0
              if (problems != null) {
               // res.json(problems)
         
                problems.map(async(q) => {
                  console.log(q.title)
                  const pp=await Problem.findOne({"title":q.title})
                  if(q.paidOnly && pp!=null){
                    const del=await Problem.deleteOne({"title":q.title})
                    console.log("DELETED:",q.title,del)
                  }
                  console.log(q.paidOnly)
          if(q.paidOnly==false){
                
            
                  const tags=q.topicTags.map((t)=>{
                    return t.name
                  })
                  //console.log(tags)
                  tags.map(async(t)=>{
                    try{
                    const tag=new ProblemTopicTag({
                      name:t
                    })
                    const saveTag=await tag.save()
                    console.log("new tag:",saveTag)
                  }catch(err){
                   // console.log(err)
                  }
                  })
                  const prob=await Problem.findOne({"title":q.title})
                  
                  if(prob!=null){
                       if(q.paidOnly){
              console.log("MUST PAY:"+q.title)
              const del=await Problem.deleteOne({"title":q.title})
              console.log("deleted",q.title,del)
            }
                  //console.log("\n",prob.title," ",q.acRate," ",q.difficulty)
                 // console.log(prob.difficulty," ",q.acRate)
                 if(prob.acRate==null || prob.difficulty==null || prob.tags.length==0 ||prob.topicTags.length==0 || prob.frontendQuestionId==null || prob.page==null){
                  if(prob.page==null){
                    const page=await Problem.updateOne({"title":prob.title},{
                      $set:{"page":page}
                    })
                    console.log("updating page for:",q.title,page)
                  }
                  if(prob.acRate==null){
                    const acRate=await Problem.updateOne({"title":prob.title},{
                      $set:{"acRate":q.acRate}
                    })
                    console.log("acRate update:",prob.title," ",acRate)
                  }
                  if(prob.difficulty==null){
                    const difficulty=await Problem.updateOne({"title":prob.title},{
                      $set:{"difficulty":q.difficulty}
                    })
                    console.log("difficulty update:",prob.title," ",difficulty)

                  }
                  if(prob.frontendQuestionId==null){
                    const frontend=await Problem.updateOne({"title":prob.title},{
                      $set:{"frontendQuestionId":q.frontendQuestionId}
                    })
                   console.log("frontendId update:",prob.title," ",frontend)

                  }
                  if(prob.tags.length==0 || prob.topicTags.length==0){
                    tags.map(async(t)=>{
                      if(prob.topicTags.length==0){
                      const topicTag=await Problem.updateOne({"title":prob.title},{
                        $push:{"topicTags":t}
                      })
                      console.log("topictags update:",prob.title,topicTag)

                    }
                      if(prob.tags.length==0){
                      const ptag=await Problem.updateOne({"title":prob.title},{
                        $push:{"tags":t}
                      })
                      console.log("tags update:",prob.title,ptag)

                    }
                     // console.log(problem.title,ptag)
                    }) 

                  }
                  console.log("\n\n")
                  const updateP=await Problem.find({title:prob.title})
                  updates.push(updateP)
                }
                }else{
                  console.log("CREATING NEW PROBLEM",q.title)
                  var  newProblem=new Problem({
                    title:q.title,
                    difficulty:q.difficulty,
                    acRate:q.acRate,
                    frontendQuestionId:q.frontendQuestionId,
                    page:page
                    
                   })
                  try {
                    const saved= await newProblem.save()
                    console.log("success")
                    console.log(saved)

                    tags.map(async(t)=>{
                      const topicTag=await Problem.updateOne({"title":newProblem.title},{
                        $push:{"topicTags":t}
                      })

                    
                      const ptag=await Problem.updateOne({"title":newProblem.title},{
                        $push:{"tags":t}
                      })

                     // console.log(problem.title,ptag)
                    }) 
                    newProblems.push(saved)
                  }catch(err1){
                    console.log(err1)
                  }
                }
                  }else{
                    if(q.paidOnly==false){
                                         console.log("\nEMPTY:",q.title)

                    var  newProblem=new Problem({
                      title:q.title,
                      difficulty:q.difficulty,
                      acRate:q.acRate,
                      frontendQuestionId:q.frontendQuestionId,
                      page:page
                      
                     })
                    try {
                      const saved= await newProblem.save()
                      console.log("success")
                      console.log(saved)

                      tags.map(async(t)=>{
                        const topicTag=await Problem.updateOne({"title":newProblem.title},{
                          $push:{"topicTags":t}
                        })
  
                      
                        const ptag=await Problem.updateOne({"title":newProblem.title},{
                          $push:{"tags":t}
                        })
  
                       // console.log(problem.title,ptag)
                      }) 
                      newProblems.push(saved)
                    }catch(err1){
                      console.log(err1)
                    }
                  }
                  }
       
                });

              
              
              }
            } catch {
              //console.log("no problems");
            }
          }
        });
        //console.log(data)
      }
    });
  }else{
    
    await page.goto(
      "https://leetcode.com/problemset/all/" 
    );
    page.on("response", async (response) => {
      console.log()
      if (response.url() == "https://leetcode.com/graphql/") {
        const data = await getData(response).then(async (response) => {
          const info = await JSON.parse(response).data;
          //console.log(info)
          var i=0
          if (info != null) {
            arrr.push(info)
            const p = info.problemsetQuestionList;
            try {
             
              const problems = p.questions;
              var count=0
              if (problems != null) {
                problems.map(async(q) => {
                  if(q.paidOnly==false){
                    console.log("MUST PAY:"+q.title)
                  }
                  const tags=q.topicTags.map((t)=>{
                    return t.name
                  })
                  //console.log(tags)
                  tags.map(async(t)=>{
                    try{
                    const tag=new ProblemTopicTag({
                      name:t
                    })
                    const saveTag=await tag.save()
                    console.log(saveTag)
                  }catch(err){

                  }
                  })
                  const prob=await Problem.findOne({$and:[{"title":q.title}]})
                  if(prob!=null){
                    if(q.paidOnly==false){
                  //console.log("\n",prob.title," ",q.acRate," ",q.difficulty)
                 // console.log(prob.difficulty," ",q.acRate)
                 if(prob.acRate==null || prob.difficulty==null || prob.tags.length==0 ||prob.topicTags.length==0 || prob.frontendQuestionId==null){
                  if(prob.acRate==null){
                    const acRate=await Problem.updateOne({"title":prob.title},{
                      $set:{"acRate":q.acRate}
                    })
                    console.log("acRate update:",prob.title," ",acRate)
                  }
                  if(prob.difficulty==null){
                    const difficulty=await Problem.updateOne({"title":prob.title},{
                      $set:{"difficulty":q.difficulty}
                    })
                    console.log("difficulty update:",prob.title," ",difficulty)

                  }
                  if(prob.frontendQuestionId==null){
                    const frontend=await Problem.updateOne({"title":prob.title},{
                      $set:{"frontendQuestionId":q.frontendQuestionId}
                    })
                   console.log("frontendId update:",prob.title," ",frontend)

                  }
                  if(prob.tags.length==0 || prob.topicTags.length==0){
                    tags.map(async(t)=>{
                      if(prob.topicTags.length==0){
                      const topicTag=await Problem.updateOne({"title":prob.title},{
                        $push:{"topicTags":t}
                      })
                      console.log("topictags update:",prob.title,topicTag)

                    }
                      if(prob.tags.length==0){
                      const ptag=await Problem.updateOne({"title":prob.title},{
                        $push:{"tags":t}
                      })
                      console.log("tags update:",prob.title,ptag)

                    }
                     // console.log(problem.title,ptag)
                    }) 

                  }
                  console.log("\n\n")
                  const updateP=await Problem.find({title:prob.title})
                  updates.push(updateP)
                }
                }
                  }else{
                    console.log("\nEMPTY:",q.title)
                    var  newProblem=new Problem({
                      title:q.title,
                      difficulty:q.difficulty,
                      acRate:q.acRate,
                      frontendQuestionId:q.frontendQuestionId
                      
                     })
                    try {
                      const saved= await newProblem.save()
                      console.log("success")
                      console.log(saved)

                      tags.map(async(t)=>{
                        const topicTag=await Problem.updateOne({"title":newProblem.title},{
                          $push:{"topicTags":t}
                        })
  
                      
                        const ptag=await Problem.updateOne({"title":newProblem.title},{
                          $push:{"tags":t}
                        })
  
                       // console.log(problem.title,ptag)
                      }) 
                      newProblems.push(saved)
                    }catch(err1){
                      console.log(err1)
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
  }
    setTimeout(()=>{
      axios.get("https://leetcodetracker.onrender.com/generate-links-function/"+page).then((response)=>{
        console.log(response.data)
        if(response.data.success){
            axios.get("https://leetcodetracker.onrender.com/generate-prompts-function/"+page).then((response)=>{
              console.log(response.data)
            })
        }
      })
      //res.json({success:true,updatesLength:updates.length,newProblemsLength:newProblems.length,length:arrr.length,updates:updates,newProblems:newProblems,arr:arrr})
    },1000)
  
  })();
  })
})
app.get("/generate-prompts-function/:page",async(req,res)=>{
  const page=req.params.page
  (async () => {
    const generate = async (r) => {
      var found=false
      const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: false,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      console.log("grabbing all httprequest from browser");
      const site = await browser.newPage();

      const getData = async (response) => {
        
        var c= await response.text();
        return c;
      };
      console.log(r.link)

      await site.goto(r.link);
      site.on("response", async (response) => {
        if (response.url() == "https://leetcode.com/graphql/") {
          found=true
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
                  //console.log(content)
                  const jsdom = require("jsdom");
                  const { JSDOM } = jsdom;
                  
                  const dom = new JSDOM(
                    "<!DOCTYPE html><body id='body'>" + content + "</body>"
                  );

                  console.log("content:",dom.window.document.getElementById("body").textContent);
                  const update=await Problem.updateOne({"title":r.title},{
                    $set:{"prompt":dom.window.document.getElementById("body").textContent}
                  })
                  console.log(update)
                  if(update.acknowledged){

                  }
              


           

                }
              } catch {
               // console.log("no problems");
              }
            }
          });
          setTimeout(()=>{
              console.log("FOUND:",found)
          },10000)
        }
      });
    };
    const results=await Problem.find({$and:[{"prompt":{$exists:false}},{"page":page},{"link":{$exists:true}}]})
          console.log(results.length+" empty prompts")
         // generate(results[0]);
        const number=Math.floor(Math.random()*100)

        const work=cluster.fork()
        const work1=cluster.fork()
        const work2=cluster.fork()
        const work3=cluster.fork()
        const work4=cluster.fork()
        const work5=cluster.fork()



          generate(results[number])
          generate(results[number+5])
          generate(results[number+10])
          generate(results[number+15])

          //generate(results[6])
         // generate(results[1].link)
          // generate(results[2].link)
          // generate(results[3].link)



        
  })();


    

})

app.get("/check",async(req,res)=>{
  const p=await Problem.find({"page":10})
console.log(p.length)
})
app.get("/generate-links-function/:page",async(req,res)=>{
  const base = "https://leetcode.com/problems/";
  var i=0;
  const updated=[]
  const results= await Problem.find({$and:[{"prompt":{$exists:false}},{"page":req.params.page}]})
   if(results.length>0){
      results.map(async(q) => {
      
        const title = q.title;
        if (title.substring(0, 1) != " " && q.link==null) {
          console.log("creating link for "+title)
          var end = title //.substring(1, title.length);
          end = end.toLowerCase();
          end = end.replace(/\s/g, "-");
          end = end.replace(/{([])}/g, "");
          end.replace("---","-")
          end=end.replace("`","")
          end=end.replace("()","")
          end=end.replace("`","")
          end=end.replace("---","-")
          end=end.replace("(","")
          end=end.replace(")","")
          end=end.replace(":","")


          var link = base + end;
          console.log(link,"\n")
     

          
          try{
            const  val=await Problem.updateOne({$and:[{"title":title}]},{
              $set:{"link":link}
             })
             updated.push({title:title,update:val})

           // console.log("success")
            if(i>=results.length-1){
             // res.json({success:true,updated:updated,success:true})
            }
            i++
          }catch(err1){
            res.json(err1)
          }
        }else{
          console.log("no updates for links")
        }
 
      });
    }
      setTimeout(()=>{
        res.json({success:true,updated:updated,success:true})

      },8000)
})
app.get("/fix-link",async(req,res)=>{
  console.log("HI")
  const update=await Problem.updateOne({"link":"https://leetcode.com/problems/insert-delete-getrandom-o(1)"},{
    $set:{"link":"https://leetcode.com/problems/insert-delete-getrandom-o1"}
  })
  console.log(update)
})
app.get("/parse-info/:page",(req,res)=>{
  const problems=data.data.problemsetQuestionList.questions

 /* problems.map(async(p)=>{
    console.log(p.title)
    const tags=p.topicTags.filter((f)=>{
       return f.name
     })
  console.log(tags)
    try{
      const problem=new Problem({
        title:p.title,
        difficulty:p.difficulty,
        frontendQuestionId:p.frontendQuestionList,
        tags:tags,
        acRate:p.acRate
      })
      console.log(problem)
      var update=await problem.save()
      console.log(update)

    }catch(err){
      console.log(err)

    }
  })
  */
  /*axios.get(" https://leetcodetracker.onrender.com/titles/"+req.params.toString()).then((response)=>{
    const arr=response.data.arr
    const p=arr.filter((r)=>{
     // console.log(r)
      if(Object.keys(r).includes("problemsetQuestionList")){
        return r
      }   
 })
console.log("\n\n",p) 
console.log(p[0].problemsetQuestionList.questions.length)  

console.log("\n\n")
 try{
      if(p!=null){

        if(p[0].problemsetQuestionList!=null){
    const problems=p[0].problemsetQuestionList.questions
    console.log(response.data.length)
    console.log(problems.length)
    problems.map(async(a)=>{
      console.log(a.title)
      //console.log(a.difficulty)
      //console.log(a.frontendQuestionId)
      try{
      const problem=new Problem({
      
      
        title:a.title,
        frontendQuestionId:a.frontendQuestionId,
        difficulty:a.difficulty,
        acRate:a.acRate
       })
       const update=await problem.save()
       console.log(update)
      }catch(err){
       // console.log(err)
      }
      
    })
  }
  }
  }catch(err){
    console.log(err)
  }
  })
  */
})

app.get("/create-links", async(req, res) => {
  const base = "https://leetcode.com/problems/";
  var i=0;
  const updated=[]
  const results= await Problem.find({})
   
      results.map(async(q) => {
      
        const title = q.title;
        const exists=await Problem.findOne({$and:[{title:q.title},{link:{$exists:false}}]})
        if (title.substring(0, 1) != " " && exists!=null) {
          console.log("creating link for "+title)
          var end = title //.substring(1, title.length);
          end = end.toLowerCase();
          end = end.replace(/\s/g, "-");
          end = end.replace(/{([])}/g, "");
          end = end.replace("---","-");
          end=end.replace("()","")
          end=end.replace("`","")
          end=end.replace("---","-")
          end=end.replace("(","")
          end=end.replace(")","")
          end=end.replace(":","")



        
          


          var link = base + end;
          console.log(link,"\n")
     

          
          try{
         
          const  val=await Problem.updateOne({$and:[{"title":title}]},{
            $set:{"link":link}
           })
           updated.push({title:title,update:val})
        

           // console.log("success")
            if(i>=results.length-1){
             // res.json({success:true,updated:updated,success:true})
            }
            i++
          }catch(err1){
            res.json(err1)
          }
        }else{
          console.log("no updates for links")
        }
        /*if (title.substring(0, 1) != " ") {
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
         const  val=await Problem.updateOne({$and:[{"title":title}]},{
          $set:{"link":link}
         })
            console.log("success")
            if(i>=results.length-1){
              res.json({success:true})
            }
            i++
          }catch(err1){
            res.json(err1)
          }
          
        
        }*/
      });
      setTimeout(()=>{
        res.json({success:true,length:updated.length,updated:updated,success:true})

      },8000)
    
  
});

app.get("/all-question-tags",async(req,res)=>{
  const tags=await ProblemTopicTag.find({})
  res.json({success:true,topicTags:tags})
})

app.get("/graphql",async(req,res)=>{
  const https=require('https')

  const options = {
    authority:"leetcode.com",
    scheme:"https",
    "Remote Address":"[2606:4700:20::681a:965]:443",
    "Referrer Policy":"strict-origin-when-cross-origin",
    method: 'POST',
    payload:{
      operationName:"questionContent",
      query:"\n    query questionContent($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    content\n    mysqlSchemas\n    dataSchemas\n  }\n}\n    ",
      variables:{
        titleSlug:"median-of-two-sorted-arrays"
      }


    },
    headers: {
   

      Baggage:
      "sentry-environment=production,sentry-release=98a18c23,sentry-transaction=%2Fproblems%2F%5Bslug%5D%2F%5B%5B...tab%5D%5D,sentry-public_key=2a051f9838e2450fbdd5a77eb62cc83c,sentry-trace_id=eb129694537740bc9d6d5653d5a90e92,sentry-sample_rate=0.03",
 
      "Content-Type":"application/json",
      "Cookie":
      "ajs_anonymous_id=7d5174b0-c8a5-40c1-8f6e-cf3802fa154c; gr_user_id=a8932b92-a81d-439f-8857-210ec56ea7b5; 87b5a3c3f1a55520_gr_last_sent_cs1=mirchiB; __stripe_mid=10f3ed19-a184-46dc-bd33-60df8138c9b573c8a3; _gid=GA1.2.1393882582.1699926407; 87b5a3c3f1a55520_gr_session_id=98e436e0-fc11-4e9d-9148-10a034182a64; 87b5a3c3f1a55520_gr_last_sent_sid_with_cs1=98e436e0-fc11-4e9d-9148-10a034182a64; 87b5a3c3f1a55520_gr_session_id_sent_vst=98e436e0-fc11-4e9d-9148-10a034182a64; __stripe_sid=3e730274-8dfa-4bca-bce4-15ed4febf4da4b7445; csrftoken=dmaJHldCfSGV3WbxfGJN04mZ1XQOIkXdPhvYf7B4lLPic5bJpSfE1lW3qcO7HCOm; messages=.eJyLjlaKj88qzs-Lz00tLk5MT1XSMdAxMtVRCi5NTgaKpJXm5FQqFGem56WmKGTmKSQWK-RmFiVnZDrpKcXq0ERzZH6pQkZiWSpMY35pCaV2xQIAxAROnA:1r2yJs:2CF2aQBgYNOnpBzlGNefqGULX0Dpx9gaUWMsgu4FB78; LEETCODE_SESSION=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiMzY4ODYzMyIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImFsbGF1dGguYWNjb3VudC5hdXRoX2JhY2tlbmRzLkF1dGhlbnRpY2F0aW9uQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6ImFiYmMyYzIxYmVkYjkyMzYyNmU4MjM4ODBlNGFhYmUwOTQ5Nzg4NDBiNGRlYTViZTExMzEyNjgxMjY5MTM1YTAiLCJpZCI6MzY4ODYzMywiZW1haWwiOiJtaXJjaG9lbGxlYmFkdUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Im1pcmNoaUIiLCJ1c2VyX3NsdWciOiJtaXJjaGlCIiwiYXZhdGFyIjoiaHR0cHM6Ly9zMy11cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9zMy1sYy11cGxvYWQvYXNzZXRzL2RlZmF1bHRfYXZhdGFyLmpwZyIsInJlZnJlc2hlZF9hdCI6MTY5OTk4NzE2OCwiaXAiOiIyNjAwOjE3MDA6NjM0OmIzNTA6YTljZjpmMDc3Ojk4YzY6M2M4MiIsImlkZW50aXR5IjoiZjUyOWEzMjA3M2EyMjM4OGE4MzcwYzM5ZTliOTNjODYiLCJzZXNzaW9uX2lkIjo0OTk2MDUzOSwiX3Nlc3Npb25fZXhwaXJ5IjoxMjA5NjAwfQ.H2OE-lb-NzUswJ4Xwmb6oMFdyUIdPNAj_aV_hBC3ybM; _ga=GA1.1.41775054.1696443548; _dd_s=rum=0&expire=1699989356539; 87b5a3c3f1a55520_gr_cs1=mirchiB; _ga_CDRWKZTDEX=GS1.1.1699987119.15.1.1699988456.60.0.0",
      "Origin":"https://leetcode.com",
      "Pragma": "no-cache",
      "Random-Uuid":"5334fd4b-37c9-440f-75b9-61856493b818",
      "Referer":"https://leetcode.com/problems/median-of-two-sorted-arrays/",
      "Sec-Ch-Ua":
      'Google Chrome;v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
      "Sec-Ch-Ua-Mobile":
      "?0",
      "Sec-Ch-Ua-Platform":
      "Windows",
      "Sec-Fetch-Dest":
      "empty",
      "Sec-Fetch-Mode":
      "cors",
      "Sec-Fetch-Site":
      "same-origin",
      "Sentry-Trace":
      "eb129694537740bc9d6d5653d5a90e92-8d84be6783f83041-0",
      "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
      "X-Csrftoken":
      "dmaJHldCfSGV3WbxfGJN04mZ1XQOIkXdPhvYf7B4lLPic5bJpSfE1lW3qcO7HCOm"
    },
  };
  const requ = https.get("https://leetcode.com/graphql/",
  options, (resu) => {
    console.log("here")
    let data = '';
    console.log("statusCode:",resu);
    
  
    resu.on('data', (d) => {
      console.log(data)
      data += d;
    });
    resu.on('end', () => {
      console.log(JSON.parse(data).data);
    });
  });
  
  requ.on('error', (error) => {
    console.error("ERROR:",error);
  });

})

app.post("/generate-problem-info",async(req,res)=>{
  (async () => {
    const generate = async () => {
      const r=req.body.title
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
      const link=await Problem.findOne({"title":r}).link
      await page.goto(link);
      console.log(link)
      page.on("response", async (response) => {
        if (response.url() == "https://leetcode.com/graphql/") {
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
                  //console.log(content)
                  const jsdom = require("jsdom");
                  const { JSDOM } = jsdom;
                  
                  const dom = new JSDOM(
                    "<!DOCTYPE html><body id='body'>" + content + "</body>"
                  );

                  console.log("content:",dom.window.document.getElementById("body").textContent);
                  const update=await Problem.updateOne({"title":r},{
                    $set:{"prompt":dom.window.document.getElementById("body").textContent}
                  })
                  console.log(update)
                  if(update.acknowledged){

                  }
                  /*
                  db.query("update heroku_29594a13b7b8a31.problems set prompt=? where link=?",[dom.window.document.getElementById("body").textContent,r.link],(err,results)=>{
                    if(err){
                      console.log(err)
                    }else{
                      console.log(results)
                    }

                  })
                  */


           

                }
              } catch {
               // console.log("no problems");
              }
            }
          });
        }
      });
    };
    const results=await Problem.find({$and:[{"prompt":{$exists:false}},{"link":{$exists:true}}]})
          console.log(results.length+" empty prompts")
         // generate(results[0]);
        const number=Math.floor(Math.random()*100)
          generate(results[number])
          generate(results[number+5])
          generate(results[number+10])
          generate(results[number+15])

          //generate(results[6])
         // generate(results[1].link)
          // generate(results[2].link)
          // generate(results[3].link)



        
  })();

})
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

app.get("/fix-tripe",async(req,res)=>{
  const problems=await Problem.find({})
  problems.map(async(p)=>{
    if(p.link.includes("---")){
      const revision=p.link.replace("---","-")
      const update=await Problem.updateOne({"title":p.title},{
        $set:{"link":revision}
      })
      console.log(p.link,": ",revision)
    }
    if(p.link.includes("(")){
      const revision=p.link.replace("(","")
      const update=await Problem.updateOne({"title":p.title},{
        $set:{"link":revision}
      })
      console.log(p.link,": ",revision)
    }
    if(p.link.includes(")")){
      const revision=p.link.replace(")","")
      const update=await Problem.updateOne({"title":p.title},{
        $set:{"link":revision}
      })
      console.log(p.link,"         ",revision)
    }
    //console.log("\n\n",p.link.substring(29,p.link.length-1))
    //console.log(p.link.substring(0,29))
    if(p.link.substring(29,p.link.length).includes(":")){
      const base="https://leetcode.com/problems/"
      const end=p.link.substring(29,p.link.length).replace(":","")
      const revision=base+end
      console.log("\n\n"+revision)
      const update=await Problem.updateOne({"title":p.title},{
        $set:{"link":revision}
      })
      console.log("revision",update)

    }
  
    
    
    


  })
})

var validUrl = require('valid-url');

app.get("/create-prompts",async(req,res)=>{
  (async (r,i) => {
    const generate = async (r) => {
 
      const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],

      });
      console.log("grabbing all httprequest from browser");
      const page = await browser.newPage();

      const getData = async (response) => {
        
        var c= await response.text();
        return c;
      }; 

      try{
      console.log(r.link)

      await page.goto(r.link)
      page.on("response", async (response) => {
   
        if (response.url() == "https://leetcode.com/graphql/") {

        
          const data = await getData(response).then(async (response) => {
            const info = await JSON.parse(response).data;

            // console.log(info)
            if (info != null) {
              const p = info.question;

              try {
                if (p != null) {
                  //console.log(Object.keys(p))
                }
                const hints=p.hints
                if(hints!=null){
                  if(hints.length>0){
                    console.log(hints)
                    const updateHint=await Problem.updateOne({"title":r.title},{
                      $set:{"hints":hints}
                    })
                    console.log("hints updated",updateHint)

                  }
                }
                const content = p.content;
                if (content != null && r.prompt==null) {
                  //console.log(content)
                  const jsdom = require("jsdom");
                  const { JSDOM } = jsdom;
                  
                  const dom = new JSDOM(
                    "<!DOCTYPE html><body id='body'>" + content + "</body>"
                  );

                //console.log("content:",dom.window.document.getElementById("body").textContent);
                 const update=await Problem.updateOne({"title":r.title},{
                    $set:{"prompt":dom.window.document.getElementById("body").textContent}
                  })
                  if(update.acknowledged){
                    i++
                    console.log(",",i ," prompts created\n")
                    console.log(update)
                    if(i==3){
                      try{
                      res.json({success:true,updated:i})
                      }catch(err){
                        console.log("caught")
                      }
                    }

                  } 
                  
             


           

                }
                const hint=p.hints

            if(hint!=null || hint.length>0 ){
                  console.log("\n\nHINT:",hint)
                  if(hint.length>0){
                    const update=await Problem.updateOne({"title":r.title},{
                      $set:{"leetcode_hints":hint}
                    })
                    console.log("\n\nhints updated:",update)
                  }
                }
              } catch {
               // console.log("no problems");
              }
            }
          });
        }
      });
    
    }catch(err){
      console.log("try")
    }
    };
  const results=await Problem.find({$or:[{$and:[{"link":{$exists:true}},{"prompt":{$exists:false}}]}]})
          console.log(results.length+" empty prompts")
         // generate(results[0]);
         //console.log(results,"\n\n")
        const number=Math.floor(randomNumber(0,results.length-4))

        //console.log(results)
        var i=0

        if(results.length>0){

           generate(results[number],i)
           generate(results[number+1],i)
            generate(results[number+2],i)
            generate(results[number+3],i)
            generate(results[number+4],i)
            generate(results[number+5],i)


            setTimeout(()=>{
              try{
              res.json({success:true,updated:i})
              /*generate(results[number+4],i)
              generate(results[number+5],i)
               generate(results[number+6],i)
               generate(results[number+7],i)*/
              }catch(err){
                console.log("caught")
              }

            },20000)

   
        }else{

          try{
              res.json({success:true,created:results.length,empty:true})
             
          }catch(err){
            console.log("caught")
          }
        }


          //generate(results[6])
         // generate(results[1].link)
          // generate(results[2].link)
          // generate(results[3].link)



        
  })();


    

  
})

const apiKey="6LfnTEApAAAAAJjSto6edYwxj4WOTRrnq09NIRfI"
/*
async function initiateCaptchaRequest(apiKey) {
  const formData = {
    method: 'userrecaptcha',
    //siteKey: "6LdBX8MUAAAAAAI4aZHi1C59OJizaJTvPNvWH2wz",
  
    key: apiKey,
    pageurl: "https://leetcode.com/accounts/login",
    json: 1
  };
 // console.log(formData.siteKey.length)
  const response = await request.post('http://2captcha.com/in.php', {form: formData});
  console.log("here",JSON.parse(response))
  return JSON.parse(response).request;
}

async function pollForRequestResults(key, id, retries = 30, interval = 1500, delay = 15000) {
  await timeout(delay);
  return poll({
    taskFn: requestCaptchaResults(key, id),
    interval,
    retries
  });
}
//<div id="recaptcha_signin_checkbox" class="css-1j8liaq"><div style="width: 304px; height: 78px;"><div><iframe title="reCAPTCHA" width="304" height="78" role="presentation" name="a-fs5l0bcavfcl" frameborder="0" scrolling="no" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox" src="https://www.recaptcha.net/recaptcha/enterprise/anchor?ar=1&amp;k=6LdBX8MUAAAAAAI4aZHi1C59OJizaJTvPNvWH2wz&amp;co=aHR0cHM6Ly9sZWV0Y29kZS5jb206NDQz&amp;hl=en&amp;v=u-xcq3POCWFlCr3x8_IPxgPu&amp;size=normal&amp;cb=ssg76okplm1z"></iframe></div><textarea id="g-recaptcha-response" name="g-recaptcha-response" class="g-recaptcha-response" style="width: 250px; height: 40px; border: 1px solid rgb(193, 193, 193); margin: 10px 25px; padding: 0px; resize: none; display: none;"></textarea></div></div>
function requestCaptchaResults(apiKey, requestId) {
  const url = `http://2captcha.com/res.php?key=${apiKey}&action=get&id=${requestId}&json=1`;
  return async function() {
    return new Promise(async function(resolve, reject){
      const rawResponse = await request.get(url);
      const resp = JSON.parse(rawResponse);
      if (resp.status === 0) return reject(resp.request);
      resolve(resp.request);
    });
  }
}



app.post("/add-user-execution-time",async(req,res)=>{
  const user=req.body.user
})
*/

function find(s,prefix, suffix) {
	var i = s.indexOf(prefix);
	if (i >= 0) {
		s = s.substring(i + prefix.length);
	}
	else {
		return '';
	}
	if (suffix) {
		i = s.indexOf(suffix);
		if (i >= 0) {
			s = s.substring(0, i);
		}
		else {
		  return '';
		}
	}
	return s;
};





/*
app.get("/get-solutions",async(req,res)=>{

  const { executablePath } = require('puppeteer'); 

  const puppeteerExtra = require('puppeteer-extra');
const Stealth = require('puppeteer-extra-plugin-stealth');
function getStringBetween(str, start, end) {
  const result = str.match(new RegExp(start + "(.*)" + end));

  return result[1];
}
puppeteerExtra.use(Stealth());
  (async (r) => {
    const generate = async (r) => {
      
      const pathToExtension = require('path').join(__dirname, '2captcha-solver');

      const browser = await puppeteerExtra.launch({
       // ignoreDefaultArgs: ['--disable-extensions'],
        headless:false,
        args: [
          /*`--disable-extensions-except=${pathToExtension}`,
         /* `--load-extension=${pathToExtension}`,
        ],
        executablePath: executablePath(),
        slowMo:10,

      });
      console.log("grabbing all httprequest from browser");
     // const requestId = await initiateCaptchaRequest(apiKey);
 
      const page = await browser.newPage();
      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36')

      const getData = async (response) => {
        
        var c= await response.text();
        return c;
      }; 

      try{
      console.log(r)
      var responded=false

      await page.goto(r,{'timeout': 120000})
      page.on("response", async (response) => {
       // console.log(response.url())
       if(responded==false ){
        responded=true
        setTimeout(async()=>{

        await page.type('#id_login', "mirchoellebadu@gmail.com");
        await page.type('#id_password', "Mirchoella22");
        // click and wait for navigation
       
        setTimeout(async()=>{
          await page.click('#signin_btn')

         
          const key="6ae6a0104c7414ceb3bbf1bb62b534de"
      
          setTimeout(async()=>{
            //await page.click("#recaptcha_signin_checkbox")

            const elementHandle = await page.$('iframe');
            const src = await (await elementHandle.getProperty('src')).jsonValue();
        
            const dataKey=getStringBetween(src,"k=","&co")
         
            setTimeout(()=>{
              axios.post(`https://2captcha.com/in.php?key=${key}&googlekey=${"6LfnTEApAAAAAJjSto6edYwxj4WOTRrnq09NIRfI"}&method=userrecaptcha&googlekey=${dataKey}&pageurl=${"https://leetcode.com/accounts/login"}&json=1`).then(async(response)=>{
                console.log(response.data)
                const request=response.data.request

                await page.$eval('#g-recaptcha-response', e => e.setAttribute("display", "visible"))
                setTimeout(async()=>{
                  await page.type('#g-recaptcha-response', request);

                },1000)


            })
            },2000)
          },2500)


            

        },1000)
       //
        //await page.waitForSelector('#recaptcha-signin-checkbox');
        console.log("exist")


      const f=await page.click(`[title=${src}]`)
      page.on('response',async (response)=>{
        const ess=await response
        console.log(ess)
      })

    // Get the `src` property to verify we have the iframe
       // const  src="https://www.recaptcha.net/recaptcha/enterprise/anchor?ar=1&k=6LdBX8MUAAAAAAI4aZHi1C59OJizaJTvPNvWH2wz&co=aHR0cHM6Ly9sZWV0Y29kZS5jb206NDQz&hl=en&v=u-xcq3POCWFlCr3x8_IPxgPu&size=normal&cb=5cf6wkw74iho"
        const iframe = await page.$$('iframe');
        const frame=await page.frames(iframe);
          //console.log(frame)

          frame.map((f)=>{
           // console.log("\n",f.childFrames())
            try{
              const ff=f.childFrames()
              ff.map(async(f)=>{
                const fr=await page.$(`#${f.id}`)
               // console.log(fr,"\n\n")
              })
            }catch(err){
              console.log(err)
            }
          })

          //await page.waitForNavigation()
          console.log('New Page URL:', page.url());
  
            
      }
    
      
      });
    
    }catch(err){
      console.log("try")
    }
    };
    generate("https://leetcode.com/accounts/login")
        
  })();

})
*/
var ps = require('ps-node');



//GOOD
app.get("/rate-prompts", (req, res) => {
  (async () => {
    const generate = async (r) => {
      const browser = await puppeteer.launch({
        headless: false,
        executablePath: `/path/to/Chrome`,
        defaultViewport: false,
        args: ["--lang=en-US,en", '--no-sandbox', '--disable-setuid-sandbox', '--disable-extensions']

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
                  /*db.query("update heroku_29594a13b7b8a31.problems set prompt=? where link=?",[dom.window.document.getElementById("body").textContent,r.link],(err,results)=>{
                    if(err){
                      console.log(err)
                    }else{
                      console.log(results)
                    }

                  })
                  */

           

                }
              } catch {
               // console.log("no problems");
              }
            }
          });
        }
      });
    };

const results=await Problem.find({"prompt":{$exists:false}})
          console.log(results.length+" empty prompts")
          console.log(results[0].link)
          generate(results[0]);
          generate(results[1])
          generate(results[2])
          //generate(results[6])
         // generate(results[1].link)
          // generate(results[2].link)
          // generate(results[3].link)



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
      const results=await Problem.find({"prompt":{$exists:false}})
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



        
      
  })();
});

app.get("/create-all-prompts/:page",async(req,res)=>{
  var i=1
  const get=()=>{
  axios.get("http://localhost:3022/create-prompts").then((response)=>{
    console.log("\n\n**************************FINISHED******************************************",response.data)
    if(response.data.success && response.empty==null){
      setTimeout(()=>{
        get()

      },6000)
      i++
    }
    if(response.data.success && response.data.empty==true){
      res.json({success:true,complete:true})
    }
  })
}
if(req.params.page!=null){
axios.get("http://localhost:3022/titles/"+req.params.page).then((response)=>{
  if(response.data.success){
    axios.get("http://localhost:3022/create-links").then((response)=>{
      if(response.data.success){
        get()
      }
    })
  }
})
}else{
  axios.get("http://localhost:3022/create-prompts").then((response)=>{
    console.log("\n\n**************************FINISHED******************************************",response.data)
    if(response.data.success && response.empty==null){
      setTimeout(()=>{
        get()

      },6000)
      i++
    }
    if(response.data.success && response.data.empty==true){
      res.json({success:true,complete:true})
    }
  })

}

})


app.get("/create-all-prompts/",async(req,res)=>{
  var i=1
  const get=()=>{
  axios.get("http://localhost:3022/create-prompts").then((response)=>{
    console.log("\n\n**************************FINISHED******************************************",response.data)
    if(response.data.success && response.empty==null){
      setTimeout(()=>{
        get()

      },6000)
      i++
    }
    if(response.data.success && response.data.empty==true){
      res.json({success:true,complete:true})
    }
  })
}
if(req.params.page!=null){
axios.get("http://localhost:3022/titles/"+req.params.page).then((response)=>{
  if(response.data.success){
    axios.get("http://localhost:3022/create-links").then((response)=>{
      if(response.data.success){
        get()
      }
    })
  }
})
}else{
  axios.get("http://localhost:3022/create-prompts").then((response)=>{
    console.log("\n\n**************************FINISHED******************************************",response.data)
    if(response.data.success && response.empty==null){
      setTimeout(()=>{
        get()

      },6000)
      i++
    }
    if(response.data.success && response.data.empty==true){
      res.json({success:true,complete:true})
    }
  })

}

})

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
  res.json({success:true,length:problems.length,problems:problems})
});




app.post("/add-rung",async(req,res)=>{

  const fs=require("fs")
const readline = require('readline');
const sys=require("process")
var XMLSerializerserializer = require('xmlserializer');


var str=""
const routineNames=[]
const Programs=[]
var newRoutine
const programName=req.body.program
const panel=req.body.panel
const slot=req.body.slot
const card=req.body.card
function createCard(card){
  
  if(card=="IB16"){
    return "DI16"
  }
  else if(card=="OB16"){
    return "DO16"
  }else {
    return card
  }


}
var rack=req.body.rack

const lines=fs.readFile(programName+'.xml', (err, inputD) => {
    var currLength=0
      
       // inputD.toString()
      const lines= inputD.toString().split("\n")
      const letters=inputD.toString()
      var xmldoc = require('xmldoc');
      var document = new xmldoc.XmlDocument(inputD);
    var newRoutine
      var input=document.toStringWithIndent()

      // console.log(input)
        //console.log(document.children[1].children)
        var i=0
        var position=0
        document.children[1].children.map((r)=>{
        
          try{
        
          if(r.name=="Programs"){
            const programs=r
          
            var program=r.children
            var addedChildren=false
           // console.log("---------------------PROGRAM--------------------")
           //console.log(program)
           //console.log("--------------PROGRAM CHILDREN",program)
            if(program[1].attr.Name=="RackDiagnostics"){
              var children=program[1].children
            
             // console.log("-------------------------Routine"+program[1].attr.Name+"------------------------------")
              if(children[1].children){
                var tags=children[1]
                //console.log(children)
                var routines=children[3].children
            
                routines.map((r)=>{
              
                try{
                  if(r.attr!=null){
              
                   if(r.attr.Name.toUpperCase()==panel.toUpperCase()){
                  

                  r.children[1].children.map((m)=>{
                    
                      if(m.attr!=null ){
                      
                        addedChildren=true
                          var input=createCard(card)
                          var slotNumber=slot > 9? slot:'0'+slot.toString()
                          var rackNumber=rack.toString()
                          const IO= (input=="IB16" || input=="IY8" || input =="IF81" || input=="IF8IH")?"I":"O"     
                    
                        m.children[m.children.length]={
                          name: 'Text',
                          attr: {},
                          val: '\r\n' +
                            'CPLX_'+input+'('+panel.toUpperCase()+'_S'+ slotNumber+','+panel.toUpperCase()+'_S'+slotNumber+'_Data,'+panel.toUpperCase()+'_R'+rackNumber+'S'+slotNumber+','+panel.toUpperCase()+'_R'+rackNumber+'S'+slotNumber+':'+slot+':'+  IO+','+panel.toUpperCase()+'_S'+slotNumber+'_Chan,CommonDiagnostics,'+panel.toUpperCase()+','+slot+','+rackNumber+');\r\n',
                          children: [
                            { text: '\r\n' },
                             {
                              cdata: 'CPLX_'+input+'('+panel.toUpperCase()+'_S'+slotNumber+','+panel.toUpperCase()+'_S'+slotNumber+'_Data,'+panel.toUpperCase()+'_R'+rackNumber+'S'+slotNumber+','+panel.toUpperCase()+'_R'+rackNumber+'S'+slotNumber+':'+slot+':I,'+panel.toUpperCase()+'_S'+slotNumber+'_Chan,CommonDiagnostics,'+panel.toUpperCase()+','+slot+','+rackNumber+');'      
                            },
                             { text: '\r\n' }
                          ],
                          firstChild:  { text: '\r\n' },
                          lastChild: { text: '\r\n' },
                          line: 69934,
                          column: 6,
                          position: 2983941,
                          startTagPosition: 2983936
                        }
                        m.children[m.children.length+1]={ text: '\r\n' }
                        console.log("\n\nSUCCESS")
                    
                        m.children.map((c)=>{
                          if(c.name=="Text"){
                          console.log(c,"\n\n")
                          }
                     
                          try{

                          }catch(err){

                          }
                   
                        })
                      }
                    })
                  }
                    console.log("\n\n-------END:"+r.name+"--------------")

              
                  }
                  }catch(err){
                    console.log(err)
                  }
                })

              }
            }

            }
        }catch(err){
            
          }
        })
        var controller=document.children //THIS IS WHERE THE CONTROLLER OBJECT LIVES
       
       console.log("\n\nCONTROLLER:")
       //console.log(controller)
      
       var programs=controller[1].children
       /*console.log("\n\nPROGRAMS:")
       console.log(programs)*/

       const allPrograms=programs[1].children
       var exist=allPrograms.filter((p)=>{
        if(p.name!=null){
        
          if(p.name==sys.argv[2]){
            return true
          }
        }
       })

   
       var textIndex=0
       var index=0
    allPrograms.map((p)=>{

      if(textIndex==0 && index<allPrograms.length && allPrograms[index+1]!=null){
  
        const program={name:allPrograms[index+1].attr.Name,text:allPrograms[index],routines:allPrograms[index+1]}
        Programs.push(program)
        index=index+2
        textIndex=1
      try{
       
         
         if(program.name==program){
        
          var routineIndex=3
     
          while(routineIndex<req.body.length){
             var rIndex=0

             program.routines.children[3].children.map((r)=>{
              console.log(r)
              
             var routineFound=  program.routines.children[3].children.filter((r)=>{
        
              if(r.attr!=null){
          
            }
            })
            console.log("ROUTINE FOUND:"+routineFound)

                if(r.attr!=null){
            
              }
              })
              routineIndex++
            }
          }
      
    }catch(err){

    }
      }else{
        textIndex=0
        
      }
    })
})




setTimeout(()=>{
  console.log("\n\n\n",newRoutine)
  res.json(newRoutine)

},8000)
})
