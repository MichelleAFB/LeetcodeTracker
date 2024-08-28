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
const { log, group } = require("console");
const morgan = require('morgan');
const Challenge = require("./models/Challenge");

const { $Size } = require("sift");
const ProblemTopicTag = require("./models/ProblemTopicTags");
const ProblemPage = require("./models/LeetcodeProblemPages");
const cluster=require("cluster");
const { URL, parse } = require('url');

const { Number } = require("core-js");
/*
require('console-stamp')(console, { 
  format: ':date(yyyy/mm/dd HH:MM:ss.l)' 
} );
*/
function assignId (req, res, next) {
  const id = 16
  req.id = id 
  next()
}

'use strict';

const path = require('path');

['debug', 'log', 'warn', 'error'].forEach((methodName) => {
    const originalLoggingMethod = console[methodName];
    console[methodName] = (firstArgument, ...otherArguments) => {
        const originalPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = (_, stack) => stack;
        const callee = new Error().stack[1];
        Error.prepareStackTrace = originalPrepareStackTrace;
        const relativeFileName = path.relative(process.cwd(), callee.getFileName());
        const prefix = `${relativeFileName}:${callee.getLineNumber()}:`;
        if (typeof firstArgument === 'string') {
            originalLoggingMethod(prefix + ' ' + firstArgument, ...otherArguments);
        } else {
            originalLoggingMethod(prefix, firstArgument, ...otherArguments);
        }
    };
});

// Tests:
console.log('%s %d', 'hi', 42);
console.log({ a: 'foo', b: 'bar'});
/*
MFORMAT
  var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
                "Aug","Sep","Oct","Nov","Dec"];
                var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]
                new Date(failDate[3],monthnum[months.indexOf(failDate[1])-1],failDate[2])

*/
/*
GOOD ENDPOINT:

/fix-bad: corrects streaks for groupchallengedata objects
/alt-loser: loser ranking endpoint. another version of /grade-challenges/:challengeId, for a different usecase


*/


 
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
/*
const webserver = express()
 .use((req, res) =>
   res.send("hi")
 )
 .listen(3000, () => console.log(`Listening on ${3042}\n`))
*/
var rooms={}
 const http=require("http")
 const server=http.createServer(app)
 const {Server}=require("socket.io")
 
 const io=new Server(server,{
  cors:"http://localhost:3000",
  methods:["GET","POST"]
 })

const totalRooms=[]
const hotel=[]
 io.sockets.on("connection",async(socket)=>{
  socket.request.headers['authorization'] = socket.handshake.auth.token


  socket.on("disconnect", (reason) => {
   // socket.removeAllListeners();
    console.log(reason);
    console.log("DISCONNECTED")
    if (socket.active) {
      // temporary disconnection, the socket will automatically try to reconnect
    } else {
      // the connection was forcefully closed by the server or the client itself
      // in that case, `socket.connect()` must be manually called in order to reconnect
      console.log(reason);
    }
  });

   socket.on("NEW_USER_SESSION",(data)=>{
    //console.log(Object.keys(socket.client.conn.request),socket.client.conn.id)
   
    var done=false
   
    if(data.user!=null){
      console.log("NEW SESSION")
      console.log(data.user.firstname+ " tapped in ","\n\n")
      if(!totalRooms.includes(data.user.userId)){
        totalRooms.push(data.user.userId)
    if(data.id!=null){
    
      console.log(rooms)
      if(!Object.keys(rooms).includes(data.id)){
      console.log("DATA ID NOT NULL")
      rooms[data.id]=data.user.userId
      socket.join(data.id)
    var to=rooms[data.id]
    console.log("done",done)
    
    socket.to(data.id).emit("RECIEVED_NEW_USER",{room:data.id})
   
    done=true
    socket.on("CONFIRM_SOCKET_ROOM",(data)=>{
      Object.keys(rooms).forEach((k)=>{
        console.log("trimmimg")
        console.log(k,data)
      })
    })
   
  }
    }else{
      console.log(socket.id)
      console.log(rooms)
      if(!Object.keys(rooms).includes(socket.id)){
      console.log("DATA ID IS NULL")
      rooms[socket.id]=data.user.userId
      socket.join(socket.id)
    var to=rooms[socket.id]
    console.log("done",done)

    socket.to(socket.id).emit("RECIEVED_NEW_USER",{room:socket.id})
    done=true
    console.log("CORMING SOCKET ROOM")
    socket.on("CONFIRM_SOCKET_ROOM",(data)=>{
      console.log("CORMING SOCKET ROOM RECIEVED")
      Object.keys(rooms).forEach((k)=>{
        console.log("trimmimg")
        console.log(k,data)
      })
    })
  
  }else{
    socket.to(socket.id).emit("RECIEVED_NEW_USER",{room:socket.id})
    done=true
    socket.on("CONFIRM_SOCKET_ROOM",(data)=>{
      Object.keys(rooms).forEach((k)=>{
        console.log("trimmimg")
        console.log(k,data)
      })
    })
    

  }
    }
  }
  }else{
    console.log("DISCONNECTIMG USELESS CONNECTION",socket.id)
    socket.removeAllListeners();
    //socket.disconnect()
  }
   })
   socket.on("UPDATE_GROUP_CHALLENGE",async(data)=>{
    console.log(socket.id," STATUS:",socket.status)
   
    console.log("\n\n\nSOCKET:UPDATING GROUP CHALLENGE")
    if(data.user!=null){
      

      const user=data.user
      console.log(Object.values(rooms))
      if(Object.values(rooms).includes(user.userId)){
        console.log("FOUND")
        var sendee
        const otherId=Object.keys(rooms).map(async(k)=>{
         
          if(rooms[k]==user.userId){
            console.log("\nFOUND "+k+" user:"+rooms[k])
            sendee=k
            console.log("other socket id",sendee,user.firstname)
          
          const groupChallenge=await GroupChallengeData.find({$or:[{$and:[{"startDate":{$lte:new Date()}},{"endDate":{$gte:new Date()}},{"userId":user.userId}]},{$and:[{"startDay":new Date().toString().substring(0,15)},{"endDay":new Date().toString().substring(0,15)},{"userId":user.userId}]}]})
          const others=await  GroupChallenge.find({$or:[{$and:[{"startDate":{$lte:new Date()}},{"endDate":{$gte:new Date()}},{"userId":user.userId}]}]})
          if(groupChallenge.length>0){
          
            console.log("CHALLENGE EXIST SOCKET:"+socket.status)
            console.log("CHALLENGE EXIST:"+groupChallenge.length)
            console.log("OTHERS EXIST:"+others.length)
            var oIndex=0
            if(oIndex<others.length){
              
              var other=others[oIndex]
              function cb(){

              }
              while(oIndex<others.length){
                const o=Object.keys(rooms)
                var oo=0
                const groupChallengeData=await GroupChallengeData.findOne({"challengeId":groupChallenge.challengeId})
                Object.keys(rooms).map((kk)=>{
                  //console.log("SEARCHING",rooms[kk])
                  if(rooms[kk]==other.userId){
                    console.log("SOCKET:FOUND OTHER ")

                    socket.broadcast.emit("GROUP_CHALLENGE_UPDATED",{groupChallenge:groupChallenge,groupChallengeData:groupChallengeData,time:new Date()},(r)=>{
                      console.log(socket.id," STATUS:",socket.status)
                      console.log("\n\n------------RETURNED CALLBACK",r)
                    })
                    socket.to(sendee).emit("GROUP_CHALLENGE_UPDATED",{groupChallenge:groupChallenge,time:new Date(),sendee:sendee},(r)=>{
                      console.log(socket.id," STATUS:",socket.status)
                      console.log("\n\n------------RETURNED CALLBACK",r)
                    })
                    console.log("SUCCESS SENDING")
                  }else{
                    
                  }
                })
                oIndex++
                if(oIndex>others.length){
                  break;
                }
              }
            }
            try{
              const groupChallenge=await GroupChallengeData.findOne({$or:[{$and:[{"startDate":{$lte:new Date()}},{"endDate":{$gte:new Date()}},{"userId":user.userId}]},{$and:[{"startDay":new Date().toString().substring(0,15)},{"endDay":new Date().toString().substring(0,15)},{"userId":user.userId}]}]})
              if(groupChallenge!=null){
              const groupChallengeData=await GroupChallengeData.findOne({"challengeId":groupChallenge.challengeId})
              socket.to(sendee).emit("GROUP_CHALLENGE_UPDATED",{groupChallenge:groupChallenge,groupChallengeData:groupChallengeData,time:new Date(),sendee:sendee})

            }
            }catch(err){
              console.log(err)
            }
          }else{
            socket.to(sendee).emit("NO_GROUP_CHALLENGE")
          }
  
            return k 
          }
        })
        
      }
    }
    
  })

   /**************************************************** */
   socket.on("UPDATE_NOTIFICATIONS",(data)=>{
   
    console.log("UPDATE_NOTIFICATIONS from ",socket.id,data)
    console.log("rooms",rooms)
    if(data.user!=null){
    const user=data.user
    console.log(Object.values(rooms))
    if(Object.values(rooms).includes(user.userId)){
      console.log("FOUND")
      var sendee
      const otherId=Object.keys(rooms).map((k)=>{
       
        if(rooms[k]==user.userId){
          console.log("\nFOUND "+k+" user:"+rooms[k])
          sendee=k
          console.log("other socket id",sendee,user.firstname)
          socket.to(k).emit("NOTIFICATIONS_UPDATED",{time:new Date().toString(),message:data.message})

          return k 
        }
      })
      
    }
  }else if(data.users!=null){
    if(data.users.length>0){ 
      var sendeeOne
      data.users.map((u)=>{
        const otherIds=Object.keys(rooms).map((k)=>{
          console.log("o:",rooms[k], u.userId)
          if(rooms[k]==u.userId){
            sendeeOne=k
            socket.to(sendeeOne).emit("NOTIFICATIONS_UPDATED",{time:new Date().toString(),message:data.message})
            return k 
          }
        })
       


      })
    }
  }
   
   })
   socket.on("disconnection",(s)=>{
    console.log(socket.id," is disconnected")
   })

 }) 

 server.listen(3042,()=>{
  console.log("listening at 3042")

 })
 

app.post("/establish-room/:userId",async(req,res)=>{
  const user=req.body.user
  const otherUsers=[]
  const allChallenges=[]
  const challengeRooms={}
  if(totalRooms.includes(user.userId)){
    const groupMates=await groupChallenge.find({$and:[{"userId":{$ne:user.userId}},{"startDate":{$lte:new Date()}},{"endDate":{$gte:new Date()}}]})
    if(groupMates.length>0){
      console.log("\n\n\nACTIVE CHALLENGES WITH ROOMMATES")
      const ids=groupChallenges.map((c)=>{
        if(totalRooms.includes(c.userId)){
          if(!allChallenges.includes(c.challengeId)){
            allChallenges.push(c.challengeId)
            allChallenges[c.challengeId]={challengeId:c.challengeId,others:[c.userId]}

          }else{
            var currCha=challengesRooms.map((c)=>{

            })
          }
        }
      })
    }
  }

})

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





app.post("/checkProblem",async(req,res)=>{
 // var cDate=calcTime("Dallas","+5.0")
  //console.log(cDate.toString())
  console.log("HERE CHECK PROBLEM")
  var title=req.body.problem.title
  console.log(Object.keys(req.body.problem))
  cDate= req.body.day 
  const streak=await Streak.findOne({$and:[{"day":req.body.day},{"userId":req.body.userId}]})
  
  
 var foundProblem
  var already=false;
 if(streak!=null){
  const problem=streak.problems
streak.problems.map((p)=>{
console.log(streak.day)
 
  
 
  const problem=req.body.problem
 
  var ptitle=p.title
  //console.log("p",p)
  if(p!=null){
   
 

   if(Object.keys(problem).includes("problem")){
    console.log("HERE")
    var title=problem.problem.title.replace(/\s/g,"").toUpperCase()
    if(p.title!=null){
    if(p.title.length>0){
    var ptitle=p.problem==null?p.title.replace(/\s/g,"").toUpperCase():p.problem.title.replace(/\s/g,"").toUpperCase()
    if(title==ptitle){
      console.log("DOUBLE")
      foundProblem=p
      already=true
     }
    }
   
  }else if(!Object.keys(problem).includes("problem")){
    var title=req.body.problem.title.replace(/\s/g,"").toUpperCase()
   console.log(p)

    var ptitle=p.title.replace(/\s/g,"").toUpperCase()
    console.log(ptitle,title)
    console.log(title,"-----",ptitle)
    if(title==ptitle){
      console.log("DOUBLE",title,ptitle)
      foundProblem=p
      already=true
     }
    }


   }
  }
  

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


app.get("/generate-min-questions/:groupId",async(req,res)=>{

    const g=await StreakGroup.findOne({"_id":req.params.groupId})
    
   
      
      if(g.days.length>1){
        const days=g.days
        console.log("\n\n_____"+g.min_questions)
        var i=0
         while(i<days.length){
          const d=days[i]
            const streak=await Streak.findOne({$and:[{"day":d},{"userId":g.userId},{"group":g.id}]})
           
            if(streak!=null){
              console.log(d+" problems:"+streak.problems.length)
             // console.log(streak.group+"\n")
              const updateGroup=await StreakGroup.updateOne({"_id":g.id},{
                $set:{"min_questions":Math.min(streak.problems.length,g.min_questions),"max_questions":Math.max(streak.problems.length,g.min_questions)}
              })
              console.log(updateGroup)
              i++
            }else{
              console.log("\n\nEMPTY")
              console.log(days.indexOf(d)+ " "+d+ " "+g.userId) 
              i++
            }
         } 
      }   
})

app.get("/tommorow",async(req,res)=>{
  var tommorow=new Date()
  
  var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
"Aug","Sep","Oct","Nov","Dec"];
var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]
  //console.log(new Date(tommorow.setDate(tommorow.getDate()+1)))
  const streak=await Streak.findOne({"day":"Fri Apr 19 2024"})
  var date=streak.day.split(" ")
  var dateDate=new Date(date[3],monthnum[months.indexOf(date[1])-1],date[2])
 
  
  /**661bfcb3bf079daa6ec9a748 */

  console.log(dbmongo.streak) 

  const probs=await Problem.find({"hints":{$ne:null}})
  probs.map((p)=>{
    if(p.hints.length>0){ 
      console.log(p.hints.length)
    }
  })
 // const save=await updategroup.save()
 
  
})
setInterval(function () {
  console.log("\n\n\*************************************PINGING")
  try{
    console.log("\n\n\n-------------CALL API------")
    /*
  axios.get("https://leetcodetracker.onrender.com").then((response)=>{
    console.log(response.data,new Date().toString(),"\n\n\n")
  })
  */
}catch(err){
  console.log(err)
}
}, 800000);
app.get("/remove-dup-group",async(req,res)=>{
  const users=await User.find({})
  if(users.length>0){
    
    users.map(async(user)=>{
      const protectedGroup=[]
      const protectedStreak=[]
      const streaks=await Streak.find({"userId":user.userId})

      streaks.map(async(streak)=>{
        const other=await Streak.find({$and:[{"userId":user.userId},{"day":streak.day}]})
        if(other.length>1){
          console.log("DUP: |"+streak.day+"|"+user.userId+ " "+streak.id)
          const group=await StreakGroup.find({$and:[{"userId":user.userId},{"days":{$in:[streak.day]}},{"id":{$ne:streak.id}}]})
          if(group.length==1){

            console.log("GOOD GROUP", other.length)
            if(other.length==1){
           
              const largerStreak=streak.problems.length>=other[0].problems.length? streak:other
             
              const smallerStreak=streak.problems.length<=other[0].problems.length? streak:other
              if(smallerStreak!=null && !protectedStreak.includes(largerStreak.id)){
                protectedStreak.push(largerStreak.id)

              const updateStreak=await Streak.updateOne({"_id":largerStreak.id},{
                $set:{"group":largerGroup.id}
              })
              const deletedStreak=await Streak.deleteOne({"_id":smallerStreak.id})
              console.log("updating streak",updateStreak)

              console.log("deleting streak",deletedStreak)
            }
          }else{
            console.log("multi:",other.length)
            const largerStreak=other.reduce((a,b)=>{
              return a.problems.length>=b.problems.length? a:b
            })
            other.map((o)=>{
              console.log(o.id)
            })

            const smallerStreak=other.reduce((a,b)=>{
              return a.problems.length<=b.problems.length? a:b
            })
            if(other.length==2){
            if(largerStreak!=null && smallerStreak!=null){
              const updateStreak=await Streak.update({"id":largerStreak.id},{
                $set:{"group":group[0].id}
              })
              console.log(updateStreak)
             // const deleteSmaller=await Streak.deleteMany({$and:[{"day":streak.day},{"userId":user.userId},{"id":smallerStreak.id}]})

            }
          }
          }
            
          }else if(group.length>1){
            console.log("DUP GROUP:"+group.length)
            const largerGroup=group.reduce((a,b)=>{
              return a.days.length>b.days.length? a:b
            })
            const smallerGroup=group.reduce((a,b)=>{
              return a.days.length<b.days.length? a:b
            })
            console.log("LARGER GROUP LENGTH:"+largerGroup.days.length)
           
            console.log("SMALLER GROUP LENGTH:"+smallerGroup.days.length)
            if(!protectedGroup.includes(largerGroup._id)){
              protectedGroup.push(largerGroup._id)
              const deleteGroup=await StreakGroup.deleteOne({"_id":smallerGroup._id})
              console.log(deleteGroup)
            largerGroup.days.map(async(d)=>{
              const dStreak=await Streak.find({$and:[{"userId":user.userId},{"day":d}]})
              if(dStreak.length==2){
                console.log(d+" "+dStreak.length)
                const largerStreak=dStreak.reduce((a,b)=>{
                  return a.problems.length>=b.problems.length? a:b
                })
               
                const smallerStreak=dStreak.reduce((a,b)=>{
                  return a.problems.length<=b.problems.length? a:b
                })
                if(smallerStreak!=null && !protectedStreak.includes(largerStreak._id)){
                  protectedStreak.push(largerStreak._id)

                const updateStreak=await Streak.updateOne({"_id":largerStreak._id},{
                  $set:{"group":largerGroup._id}
                })
                const deletedStreak=await Streak.deleteOne({"_id":smallerStreak._id})
                console.log("updating streak",updateStreak)

                console.log("deleting streak",deletedStreak)
              }
                
              }else if(dStreak.length>2){
                console.log("MULTIPLE STREAKS",dStreak.length)
              }
            })
          }


          }
        }
      })
    })
  }
})
app.get("/enDay",async(req,res)=>{
  const challenges=await GroupChallengeData.find({})
  challenges.map(async(c)=>{
    console.log(c.challengeId)
    const cha=await GroupChallenge.findOne({"challengeId":c.challengeId})
    
    if(cha!=null){
    const update=await GroupChallengeData.updateOne({"challengeId":c.challengeId},{
      $set:{"title":cha.title,"startDay":c.startDate.toString().substring(0,15),"endDay":c.endDate.toString().substring(0,15)}
    })
    console.log(update)
  }
  })
})
app.post("/correct-streak",async(req,res)=>{
  var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
  "Aug","Sep","Oct","Nov","Dec"];
  var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]
  const group=await StreakGroup.findOne({$and:[{"userId":"Bq02JQzmhI3lNCKko9BW"},{"days":{$in:["Wed Apr 03 2024"]}}]})
  console.log(group.days.length)
  
 var date=group.days[0].split(" ")
   date=new Date(date[3],monthnum[months.indexOf(date[1])-1],date[2])
   console.log(date.toString())
   const o=await StreakGroup.findOne({"_id":"661bfcb3bf079daa6ec9a748"})
   console.log(o.id)
   var unbroken=true
   while(unbroken){
    const streak=await Streak.findOne({$and:[{"userId":"Bq02JQzmhI3lNCKko9BW"},{"day":date.toString().substring(0,15)}]})
    if(streak!=null){
      if(!group.days.includes(date.toString().substring(0,15))){
        console.log("MUST ADD "+date.toString())
        const updateGroup=await StreakGroup.updateOne({"_id":group.id},{
          $push:{"days":date.toString().substring(0,15)}
        })
      }
      const updateStreak=await Streak.updateOne({"_id":streak.id},{
        $set:{"group":group.id}
      })
   /* if(date.toString().substring(0,15)==group.days[0]){ 
      console.log("TRUE")
      const newGroup=new StreakGroup({
        userId:"Bq02JQzmhI3lNCKko9BW",
        days:[date.toString().substring(0,15)],
        _id:

      })
    }*/
    date.setDate(date.getDate()+1)
  }else{
    unbroken=false
  }
   }
})

function getSubstringCount(str,word){
  let count = 0, // Initialize a counter variable
  i = 0; // Initialize an index variable

// Loop until the end of the string is reached
var examples={}
while (true) {
  var newWord=word+" "+(count+1)+":"
 
 
 
  // Find the index of the next occurrence of the searchValue in the string starting from index i
  const r = str.indexOf(word, i);
  var end
  var lastExample

  if(examples!=null){
  end=i-1
  }
  if (r!=-1){
  examples[newWord]={start:r,end:-1}
  }

  // If the searchValue is found in the string
  if (r !== -1) {
    // Increment the counter by 1 and update the index to start searching from the next position
    [count, i] = [count + 1, r + 1];
  } else {
    // If the searchValue is not found, return the final count
    console.log(examples)
    Object.keys(examples).forEach((k,i)=>{
     // console.log("key:",k,"i:",i)
      try{
      var ex=Object.keys(examples)[i-1]
    
     
      examples[ex].end=examples[Object.keys(examples)[i]].start-1
      if(i ==Object.keys(examples).length-1){
        try{
        var startIndex=examples[Object.keys(examples)[i]].start
        var rest=str.substring(startIndex,str.length-1)
        var endIndex=rest.indexOf("Constraints")
       // console.log("lastIndex:",endIndex)
        examples[Object.keys(examples)[i]].end=startIndex+endIndex-1
        }catch(e){
          console.log(e,"\n\nHERE")
        }
      }
      }catch(e){
        console.log(e)
      }
    })
    console.log(examples)
    return {count:count,examples:examples};
  }
}

}
function getInputAndOutputofUseCase(str){
  var inputIndex=str.indexOf("Input")
  var outputIndex=str.indexOf("Output")
  var input=str.substring(inputIndex,outputIndex)
  var expIndex=str.indexOf("Explanation")
  var output=str.substring(outputIndex,expIndex)
  console.log("--------input",input)
  console.log("---------output",output)
  return{input:input,output:output}

  

}

app.post("/generate-use-cases",async(req,res)=>{
  const problem=req.body.problem
  var prompt=problem.prompt
  var countEx=getSubstringCount(prompt,"Example")
  var count=countEx.count
  var examples=countEx.examples
  const cases=[]

 Object.keys(examples).forEach((k)=>{
  var ex=k
  var start=examples[k].start
  var end=examples[k].end
  console.log(prompt.substring(start,end),"\n\n")
  var c=getInputAndOutputofUseCase(prompt.substring(start,end))
  cases.push({"example":k,input:c.input,output:c.output})
  if (cases.length==Object.keys(examples).length)
    {
      res.json({success:true,examples:cases})
    }
 })
  

})
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

  
    console.log(date)
    try{

    axios.post("http://localhost:3022/checkProblem",{day:date,problem:problem,userId:id}).then(async(response)=>{
     // console.log(response.data)
   
      try{
      
      var date=req.body.day
      date=date.split(" ")
     
      var dateDate=new Date(date[3],monthnum[months.indexOf(date[1])-1],date[2])
      var yesterDay=new Date(dateDate)
      var tommorow=new Date(dateDate)
      yesterDay=yesterDay.setDate(dateDate.getDate()-1)
      tommorow.setDate(dateDate.getDate()+1)
      const yesterday=new Date(yesterDay)
          console.log('1172',dateDate)
          if(dateDate instanceof Date){
      const groupChallenge=await GroupChallenge.findOne({$and:[{"userId":id},{"startDate":{$lte:dateDate}},{"endDate":{$gte:dateDate}}]})
     // console.log("CHALLENGE EXIST:",groupChallenge,"\n\n")
      const groupChallengeData=await GroupChallengeData.findOne({$and:[{$or:[{"userId":id},{"contestants":{$in:[id]}}]},{$or:[{$and:[{"startDate":{$lte:dateDate}},{"endDate":{$gte:dateDate}}]},{$or:[{"startDay":req.body.day},{"enDay":req.body.day}]}]}]})
     // console.log("MY GROUP CHALLENGE EXIST:",groupChallengeData,"\n\n")
      if(response.data.already){
        try{res.json({success:true,message:"Problem "+problem.problem.title+" has already been done today"})}
        catch(err){
          res.json({success:true,message:"Problem "+problem.title+" has already been done today"})
        }
      }else{
      
        //check if streak already exist
        var streakExist=await Streak.find({$and:[{"day":req.body.day},{"userId":id}]})
        streakExist=streakExist[0]
        var yesterdayStreak=await Streak.findOne({$and:[{"day":yesterday.toString().substring(0,15)},{"userId":req.body.userId}]})
        var tommorowStreak=await Streak.findOne({$and:[{"day":tommorow.toString().substring(0,15)},{"userId":req.body.userId}]}) //for dev purposes saving a streak
        
        if(streakExist!=null){
          const yesterdayStreakGroup=await StreakGroup.findOne({$and:[{"userId":streakExist.userId},{"days":{$in:[streakExist.day]}}]})
          if(yesterdayStreakGroup!=null){
            const updateStreakGroup=await Streak.updateOne({"id":streakExist.id},{
              $set:{"group":yesterdayStreakGroup.id}
            })
           // console.log("groupupdate",updateStreakGroup)
          }
         // console.log("STREAK TODAY EXISTS")
          //add-problem to streak
       
         if(Object.keys(req.body.problem).includes("problem")){
         // console.log(streakGroup)
          if(yesterdayStreak!=null){
            var streakGroup=await StreakGroup.findOne({$and:[{"_id":yesterdayStreak.group}]})

       //console.log("959:Trying tommorow streak")
            const updateStreak=await Streak.updateOne({$and:[{"day":req.body.day},{"userId":id}]},
            {$push:{"problems":req.body.problem.problem}})
            const updateStreakTime=await Streak.updateOne({$and:[{"day":req.body.day},{"userId":id}]},
          {$set:{"timeLastAdded":new Date()}})
            var streak=await Streak.findOne({$and:[{"day":req.body.day},{"userId":id}]})
            const updateMin=await StreakGroup.updateOne({$and:[{"days":{$in:[date]}},{"userId":id}]},
            {$set:{"max_questions":streakGroup.max_questions==null?streak.problems.length:Math.max(streakGroup.max_questions,streak.problems.length)}})
            var yesterdayGroup=await StreakGroup.findOne({$and:[{"days":{$in:[date]}},{"userId":id}]})
            var tommorowGroup=await StreakGroup.findOne({$and:[{"days":{$in:[tommorow.toString().substring(0,15)]}},{"userId":req.body.userId}]})
            /*
            if(tommorowStreak!=null && tommorowGroup!=null){
              if(tommorowStreak.group!=yesterdayGroup.id){
                console.log("972:must match: tommorow"+tommorow.toString().substring(0,15) +" yesterday:"+yesterday.toString().substring(0,15))
                tommorowGroup.days.map(async(dd)=>{
                  const reviseTommorow=await Streak.updateOne({$and:[{"userId":req.body.userId},{"day":dd}]},{
                    $set:{"group":yesterdayGroup.id}
                  })
                })
              

              }
            }*/
      
              console.log("I THINNK IM HERE: 1019")
             
              
              if(groupChallenge!=null){
                axios.get("http://localhost:3022/find-bad/"+groupChallenge.challengeId).then((response)=>{
                  res.json({success:true,updatedStreak:updateStreak,streak:streak,groupChallenge:response.data})
                })
                
              }else{
                console.log("GROUP CHALLENGE NULL")
                res.json({success:true,updatedStreak:updateStreak,streak:streak})
              }
        
          }else{
            var streakGroup=await StreakGroup.findOne({$and:[{"_id":streakExist.group}]})

            console.log("ADDING To GROUP DAYS ARRAY:1004")
            const updateStreak=await Streak.updateOne({$and:[{"day":req.body.day},{"userId":id}]},
            {$push:{"problems":req.body.problem.problem}})
            const updateStreakTime=await Streak.updateOne({$and:[{"day":req.body.day},{"userId":id}]},
          {$set:{"timeLastAdded":new Date()}})
            var streak=await Streak.findOne({$and:[{"day":req.body.day},{"userId":id}]})
            const updateMin=await StreakGroup.updateOne({$and:[{"days":{$in:[date]}},{"userId":id}]},
            {$set:{"max_questions":streakGroup.max_questions==null?streak.problems.length:Math.max(streakGroup.max_questions,streak.problems.length)}})

            var todayGroup=await StreakGroup.findOne({"id":streakExist.group})
            var tommorowGroup=await StreakGroup.findOne({$and:[{"days":{$in:[tommorow.toString().substring(0,15)]}},{"userId":req.body.userId}]})
            var nextDate=new Date(tommorow)
            nextDate.setDate(tommorow.getDate())
            console.log("1003:must match: tommorow"+tommorow.toString().substring(0,15) +" today:"+streakExist.day)
           
        if(groupChallenge!=null){
          axios.get("http://localhost:3022/find-bad/"+groupChallenge.challengeId).then((response)=>{
            res.json({success:true,updatedStreak:updateStreak,streak:streak,groupChallenge:response.data})
          })
          
        }else{
          console.log("GROUP CHALLENGE NULL")
          res.json({success:true,updatedStreak:updateStreak,streak:streak})
        }
             
        

          }
        

         }else if(!Object.keys(req.body.problem).includes("problem")){
          const updateStreak=await Streak.updateOne({$and:[{"day":req.body.day},{"userId":id}]},
          {$push:{"problems":req.body.problem}})
          const updateStreakTime=await Streak.updateOne({$and:[{"day":req.body.day},{"userId":req.body.userId}]},
          {$set:{"timeLastAdded":new Date()}})
          var streak=await Streak.findOne({$and:[{"day":req.body.day},{"userId":id}]})
          console.log("STREAK EXIST 1063")
          if(yesterdayStreak!=null){
            var streakGroup=await StreakGroup.findOne({$and:[{"days":{$in:[date]}},{"userId":req.body.userId}]})
           console.log("yesterday:"+yesterday.toString())
           /* const updateMin=await StreakGroup.updateOne({$and:[{"days":{$in:[date]}},{"userId":id}]},
            {$set:{"max_questions":streakGroup.max_questions==null?streak.problems.length:Math.max(streakGroup.max_questions,streak.problems.length)}})
            */
            /**661bfcb3bf079daa6ec9a741/ */
       console.log("1029: Trying tommorow streak")
      
            var yesterdayGroup=await StreakGroup.findOne({$and:[{"days":{$in:[date]}},{"userId":req.body.userId}]})
            var tommorowGroup=await StreakGroup.findOne({$and:[{"days":{$in:[tommorow.toString().substring(0,15)]}},{"userId":req.body.userId}]})
            var nextDate=new Date(tommorow)
            nextDate.setDate(tommorow.getDate())
      
             
              if(groupChallenge!=null){
                console.log("\n\nGROUP CHALLENGE EXISTS!!!")
                axios.get("http://localhost:3022/find-bad/"+groupChallenge.challengeId).then((response)=>{
                  
                  res.json({success:true,updatedStreak:updateStreak,streak:streak,groupChallenge:response.data})
                })
                
              }else{
                console.log("GROUP CHALLENGE NULL")
                res.json({success:true,updatedStreak:updateStreak,streak:streak})
              }
            /*if(tommorowStreak!=null && tommorowGroup!=null){
              if(tommorowStreak.group!=yesterdayStreak.group){
                console.log("972:must match: tommorow"+tommorow.toString().substring(0,15) +" yesterday:"+yesterday.toString().substring(0,15))
                tommorowGroup.days.map(async(dd)=>{
                  const reviseTommorow=await Streak.updateOne({$and:[{"userId":req.body.userId},{"day":dd}]},{
                    $set:{"group":yesterdayStreak.group}
                  })
                  if(!streakGroup.days.includes(dd)){
                    const updateStreakGroup=await StreakGroup.updateOne({"_id":yesterdayStreak.group},{
                      $push:{"days":dd}
                    })
                  }
                })
               if(tommorowGroup._id!=streakGroup._id){
                const deleteOldGroup=await StreakGroup.deleteOne({"_id":tommorowGroup._id})
                console.log("1072:deleted old Group:",deleteOldGroup)
               }
               

              }
              var found=true
              while(found){
                var str=await Streak.findOne({$and:[{"userId":req.body.userId},{"day":nextDate.toString().substring(0,15)}]})
                console.log(nextDate.toString())
                if(str!=null){
                  console.log("\n\nproblems:",str.problems.length)
                  const newgroup=await StreakGroup.findOne({"_id":yesterdayStreak.group})
                  console.log(newgroup.days)
                  const updateStreak=await Streak.updateOne({"_id":str._id},{
                    $set:{"group":yesterdayStreak.group}
                  })
                  if(!newgroup.days.includes(nextDate.toString().substring(0,15))){
                    const updateStreakGroup=await StreakGroup.updateOne({"_id":newgroup._id},{
                      $push:{"days":str.day}
                    })
                    console.log(updateStreakGroup,"\n\n")
                  }
                  
                }else{
                  found=false
                  break
                }
                nextDate.setDate(nextDate.getDate()+1)
              }
            }
            */
          //  res.json({success:true,updatedStreak:updateStreak,streak:streak})

          }else{
            var streakGroup=await StreakGroup.findOne({$and:[{"_id":streakExist.group}]})

            console.log("ADDING To GROUP DAYS ARRAY:1130")
       

            var todayGroup=await StreakGroup.findOne({"_id":streakExist.group})
            var tommorowGroup=await StreakGroup.findOne({$and:[{"days":{$in:[tommorow.toString().substring(0,15)]}},{"userId":req.body.userId}]})
            var nextDate=new Date(tommorow)
            nextDate.setDate(tommorow.getDate())
         
          
           
              if(groupChallenge!=null){
                axios.get("http://localhost:3022/find-bad/"+groupChallenge.challengeId).then((response)=>{
                  res.json({success:true,updatedStreak:updateStreak,streak:streak,groupChallenge:response.data})
                })
                
              }else{
                console.log("H+GROUP CHALLENGE NULL")
                res.json({success:true,updatedStreak:updateStreak,streak:streak})
              }
             
         
        

          }
         }
        }else{
          console.log("STREAK TODAY DOES NOT EXIST")
          console.log("tommorow:"+tommorow.toString())
          //check if streak can be added to a streak group
       
          var yesterdayStreak=await Streak.findOne({$and:[{"day":yesterday.toString().substring(0,15)},{"userId":req.body.userId}]})
          yesterdayStreak=yesterdayStreak
          //console.log(yesterdayStreak)
          var tommorowStreak=await Streak.findOne({$and:[{"userId":req.body.userId},{"day":tommorow.toString().substring(0,15)}]})
         var tommorowGroup=await StreakGroup.find({$and:[{"userId":req.body.userid},{"days":{$in:[tommorow.toString().substring(0,15)]}}]})
      
          if(yesterdayStreak!=null){
            console.log("YESTERDAY:"+yesterdayStreak.day)
            console.log("TOMMOROW:",tommorow.toString().substring(0,15))
            //create streak and add it to StreakGroup
            var streakGroup=await StreakGroup.find({$and:[{"_id":yesterdayStreak.group}]})
            streakGroup=streakGroup[0]
            if(streakGroup!=null){
              console.log("1110:STREAKGROUP EXIST")
                if(!streakGroup.days.includes(req.body.day)){
                  console.log("TODAY STREAK NOT IN STREAK GROUP")
                  //if streakGroup doesnt have day
              const updateStreakGroup=await StreakGroup.updateOne({"_id":yesterdayStreak.group},
              {$push:{"days":req.body.day}})
              console.log("ADDING To GROUP DAYS ARRAY:1203")
              const updateMin=await StreakGroup.updateOne({"_id":yesterdayStreak.group},
              {$set:{"min_questions":streakGroup.min_questions==null?1:Math.min(streakGroup.min_questions,yesterdayStreak.problems.length),"max_questions":streakGroup.max_questions==null?1:Math.max(streakGroup.max_questions,yesterdayStreak.problems.length)}})
              console.log("UPDATING STREAKGROUP:" +streakGroup._id)
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
              const updateStreakTime=await Streak.updateOne({$and:[{"day":req.body.day},{"userId":id}]},
          {$set:{"timeLastAdded":new Date()}})
          var yesterdayGroup=await StreakGroup.findOne({$and:[{"days":{$in:[date]}},{"userId":req.body.userId}]})
          var tommorowGroup=await StreakGroup.findOne({$and:[{"days":{$in:[tommorow.toString().substring(0,15)]}},{"userId":req.body.userId}]})
          var nextDate=new Date(tommorow)
          nextDate.setDate(tommorow.getDate())
          if(tommorowStreak!=null ){
            if(tommorowStreak.group!=streakGroup._id){
              var found=true
              while(found){
                var str=await Streak.findOne({$and:[{"userId":req.body.userId},{"day":nextDate.toString().substring(0,15)}]})
                console.log(nextDate.toString())
                if(str!=null){
                  console.log("\n\nproblems:",str.problems.length)
                  const newgroup=await StreakGroup.findOne({"_id":streakGroup._id})
                  console.log(newgroup.days)
                  const updateStreak=await Streak.updateOne({"_id":str._id},{
                    $set:{"group":streakGroup._id}
                  })
                  if(!newgroup.days.includes(nextDate.toString().substring(0,15))){
                    const updateStreakGroup=await StreakGroup.updateOne({"_id":newgroup._id},{
                      $push:{"days":str.day}
                    })
                    console.log(updateStreakGroup,"\n\n")
                  }
                  
                }else{
                  found=false
                  break
                }
                nextDate.setDate(nextDate.getDate()+1)
              }
            }
          }
          if(groupChallenge!=null){
            axios.get("http://localhost:3022/find-bad/"+groupChallenge.challengeId).then((response)=>{
              res.json({success:true,streak:save,updatedGroup:updateStreakGroup,groupChallenge:response.data})
            })
            
          }else{
            console.log("H+GROUP CHALLENGE NULL")

            res.json({success:true,streak:save,updatedGroup:updateStreakGroup})
          }
         
               

              
            }else if(!Object.keys(req.body.problem).includes("problem") && req.body.problem!=null){
              const newStreak=new Streak({
                day:req.body.day,
                userId:id,
                group:streakGroup._id,
                problems:[req.body.problem],
                timeLastAdded:new Date()

              })
              const updateMin=await StreakGroup.updateOne({"_id":yesterdayStreak.group},
              {$set:{"min_questions":streakGroup.min_questions==null?1:Math.min(streakGroup.min_questions,yesterdayStreak.problems.length),"max_questions":streakGroup.max_questions==null?1:Math.max(streakGroup.max_questions,yesterdayStreak.problems.length)}})


              console.log("ADDING STREAK:978 HERE")
              const save=await newStreak.save()
              const updateStreakTime=await Streak.updateOne({$and:[{"day":req.body.day},{"userId":id}]},
          {$set:{"timeLastAdded":new Date()}})
          
          var yesterdayGroup=await StreakGroup.findOne({$and:[{"days":{$in:[date]}},{"userId":req.body.userId}]})
            var tommorowGroup=await StreakGroup.findOne({$and:[{"days":{$in:[tommorow.toString().substring(0,15)]}},{"userId":req.body.userId}]})
            var nextDate=new Date(tommorow)
            nextDate.setDate(tommorow.getDate())
            console.log("HERE 1260")
            /*if(tommorowStreak!=null){
              if(tommorowStreak.group!=streakGroup._id){
                var found=true
                while(found){
                  var str=await Streak.findOne({$and:[{"userId":req.body.userId},{"day":nextDate.toString().substring(0,15)}]})
                  console.log(nextDate.toString())
                  if(str!=null){
                    console.log("\n\nproblems:",str.problems.length)
                    const newgroup=await StreakGroup.findOne({"_id":streakGroup._id})
                    console.log(newgroup.days)
                    const updateStreak=await Streak.updateOne({"_id":str._id},{
                      $set:{"group":streakGroup._id}
                    })
                    if(!newgroup.days.includes(nextDate.toString().substring(0,15))){
                      const updateStreakGroup=await StreakGroup.updateOne({"_id":newgroup._id},{
                        $push:{"days":str.day}
                      })
                      console.log(updateStreakGroup,"\n\n")
                    }
                    
                  }else{
                    found=false
                    break
                  }
                  nextDate.setDate(nextDate.getDate()+1)
                }

              }
            }
            */
             
            if(groupChallenge!=null){
              axios.get("http://localhost:3022/find-bad/"+groupChallenge.challengeId).then((response)=>{
                res.json({success:true,streak:save,updatedGroup:updateStreakGroup})              })
              
            }else{
              console.log("H+GROUP CHALLENGE NULL")

              res.json({success:true,streak:save,updatedGroup:updateStreakGroup})
            }
            

            }else{
              //res.json({success:true,streak:save,updatedGroup:updateStreakGroup})
              if(groupChallenge!=null){
                axios.get("http://localhost:3022/find-bad/"+groupChallenge.challengeId).then((response)=>{
                  res.json({success:true,streak:save,updatedGroup:updateStreakGroup,groupChallenge:response.data})              })
                
              }else{
                console.log("H+GROUP CHALLENGE NULL")

                res.json({success:true,streak:save,updatedGroup:updateStreakGroup,groupChallenge:response.data})
              }

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
                const updateStreakTime=await Streak.updateOne({$and:[{"day":req.body.day},{"userId":id}]},
          {$set:{"timeLastAdded":new Date()}})
                const updateMin=await StreakGroup.updateOne({$and:[{"days":{$in:[date]}},{"userId":id}]},
                {$set:{"min_questions":streakGroup.min_questions==null?streakExist.problems.length:Math.min(streakGroup.min_questions,streakExist.problems.length),"max_questions":streakGroup.max_questions==null?streakExist.problems.length:Math.max(streakGroup.max_questions,streakExist.problems.length)}})
      
                const updateStreakGroup=await StreakGroup.find({$and:[{"userId":req.body.userId},{"_id":streakGroup._id}]})
                var yesterdayGroup=await StreakGroup.findOne({$and:[{"days":{$in:[date]}},{"userId":req.body.userId}]})
                var tommorowGroup=await StreakGroup.findOne({$and:[{"days":{$in:[tommorow.toString().substring(0,15)]}},{"userId":req.body.userId}]})
                var nextDate=new Date(tommorow)
                nextDate.setDate(tommorow.getDate())
                if(tommorowStreak!=null ){
                  if(tommorowStreak.group!=streakGroup._id){
                    var found=true
                    while(found){
                      var str=await Streak.findOne({$and:[{"userId":req.body.userId},{"day":nextDate.toString().substring(0,15)}]})
                      console.log(nextDate.toString())
                      if(str!=null){
                        console.log("\n\nproblems:",str.problems.length)
                        const newgroup=await StreakGroup.findOne({"_id":streakGroup._id})
                        console.log(newgroup.days)
                        const updateStreak=await Streak.updateOne({"_id":str._id},{
                          $set:{"group":streakGroup._id}
                        })
                        if(!newgroup.days.includes(nextDate.toString().substring(0,15))){
                          const updateStreakGroup=await StreakGroup.updateOne({"_id":newgroup._id},{
                            $push:{"days":str.day}
                          })
                          console.log(updateStreakGroup,"\n\n")
                        }
                        
                      }else{
                        found=false
                        break
                      }
                      nextDate.setDate(nextDate.getDate()+1)
                    }
                  }
                }

                if(groupChallenge!=null){
                  axios.get("http://localhost:3022/find-bad/"+groupChallenge.challengeId).then((response)=>{
                    res.json({groupChallenge:response.data,success:true,streak:updatedStreak,updatedStreak:update,updatedGroup:updateStreakGroup})
                  })
                }else{
                  console.log("H+GROUP CHALLENGE NULL")
  
                  res.json({success:true,streak:updatedStreak,updatedStreak:update,updatedGroup:updateStreakGroup})
                }

           
              }else if(!Object.keys(req.body.problem).includes("problem") && req.body.problem!=null){
                console.log("here")
                var tStreak=await Streak.findOne({$and:[{"userId":req.body.userId},{"day":req.body.day}]})
                if(tStreak==null){
                  const newStreak=new Streak({
                    day:req.body.day,
                    userId:id,
                    group:streakGroup._id,
                    problems:[req.body.problem]
                  })
                  var added=await newStreak.save()
                     
              
                  if(groupChallenge!=null){
                    axios.get("http://localhost:3022/find-bad/"+groupChallenge.challengeId).then((response)=>{
                      res.json({success:true,streak:newStreak,groupChallenge:response.data})
                    })
                  }else{
                    console.log("H+GROUP CHALLENGE NULL")
    
                    res.json({success:true,streak:newStreak})
                  }
                
                  
                }else{
                const update=await Streak.updateOne({$and:[{"userId":req.body.userId},{"day":req.body.day}]},{
                  $push:{"problems":req.body.problem}
                })
                const updateStreakTime=await Streak.updateOne({$and:[{"day":req.body.day},{"userId":id}]},
          {$set:{"timeLastAdded":new Date()}})
                console.log(update)
                const updatedStreak=await Streak.findOne({$and:[{"userId":req.body.userId},{"day":req.body.day}]})
               
               if(updatedStreak!=null){ const updateMin=await StreakGroup.updateOne({"_id":yesterdayStreak.group},
                {$set:{"min_questions":streakGroup.min_questions==null?updatedStreak.problems.length:Math.min(streakGroup.min_questions,updatedStreak.problems.length)}})
              }
                const updateStreakGroup=await StreakGroup.find({$and:[{"userId":req.body.userId},{"_id":streakGroup._id}]})
                var yesterdayGroup=await StreakGroup.findOne({$and:[{"days":{$in:[date]}},{"userId":req.body.userId}]})
                var tommorowGroup=await StreakGroup.findOne({$and:[{"days":{$in:[tommorow.toString().substring(0,15)]}},{"userId":req.body.userId}]})
                
               /* if(tommorowStreak!=null ){
                  if(tommorowStreak.group!=streakGroup._id){
                    var found=true
                    while(found){
                      var str=await Streak.findOne({$and:[{"userId":req.body.userId},{"day":nextDate.toString().substring(0,15)}]})
                      console.log(nextDate.toString())
                      if(str!=null){
                        console.log("\n\nproblems:",str.problems.length)
                        const newgroup=await StreakGroup.findOne({"_id":streakGroup.id})
                        console.log(newgroup.days)
                        const updateStreak=await Streak.updateOne({"_id":str._id},{
                          $set:{"group":streakGroup._id}
                        })
                        if(!newgroup.days.includes(nextDate.toString().substring(0,15))){
                          const updateStreakGroup=await StreakGroup.updateOne({"_id":newgroup._id},{
                            $push:{"days":str.day}
                          })
                          console.log(updateStreakGroup,"\n\n")
                        }
                        
                      }else{
                        found=false
                        break
                      }
                      nextDate.setDate(nextDate.getDate()+1)
                    }
    
                  }
                }
                */
                if(groupChallenge!=null){
                  axios.get("http://localhost:3022/find-bad/"+groupChallenge.challengeId).then((response)=>{
                    res.json({groupChallenge:response.data,success:true,streak:updatedStreak,updatedStreak:update,updatedGroup:updateStreakGroup})
                  })
                }else{
                  console.log("H+GROUP CHALLENGE NULL")
  
                  res.json({success:true,streak:updatedStreak,updatedStreak:update,updatedGroup:updateStreakGroup})
                }
              
              }
              }
                  
            }

            }else{
            
              if(groupChallenge!=null){
                axios.get("http://localhost:3022/find-bad/"+groupChallenge.challengeId).then((response)=>{
                  res.json({success:false,message:"streakGroup does not exist",groupChallenge:response.data})
                })
              }else{
                console.log("H+GROUP CHALLENGE NULL")
                res.json({success:false,message:"streakGroup does not exist"})

               // res.json({success:true,streak:updatedStreak,updatedStreak:update,updatedGroup:updateStreakGroup})
              }
          

          
            }
          }else{
            console.log("STREAK YESTERDAY DOES NOT EXIST/ CREATING NEW STREAK GROUP")
            const newGroup= new StreakGroup({
              userId:id,
              days:[req.body.day],
              min_questions:1,
              max_questions:1

            })
            console.log("ADDING STREAK:1032")
            const addGroup=await newGroup.save()
            if(!Object.keys(req.body.problem).includes("problem")){
            const newStreak=new Streak({
              day:req.body.day,
              userId:id,
              group:addGroup._id,
              problems:[req.body.problem]
            })
            console.log("ADDING STREAK:1040")
            const addStreak=newStreak.save()

            const myGroupChallenge=await GroupChallengeData.findOne({$and:[{"startDate":{$lte:new Date()}},{"endDate":{$gte:new Date()}},{$or:[{"userId":id},{"contestants":{$in:[id]}}]}]})
              const groupChallenge=await GroupChallenge.findOne({$and:[{"startDate":{$lte:new Date()}},{"endDate":{$gte:new Date()}},{"userId":id}]})
            console.log(myGroupChallenge || groupChallenge!=null)
            if(groupChallenge!=null){
              axios.get("http://localhost:3022/find-bad/"+groupChallenge.challengeId).then((response)=>{
                res.json({success:true,streak:addStreak,updatedGroup:addGroup,groupChallenge:response.data})
              })
              
            }else{
              
              res.json({success:true,streak:newStreak,streakGroup:addGroup})
            }
           
         
          }else{
            const newStreak=new Streak({
              day:req.body.day,
              userId:id,
              group:addGroup._id,
              problems:[req.body.problem]
            })
            console.log("ADDING STREAK:1040")
            const addStreak=newStreak.save()

            const myGroupChallenge=await GroupChallengeData.findOne({$and:[{"startDate":{$lte:new Date()}},{"endDate":{$gte:new Date()}},{$or:[{"userId":id},{"contestants":{$in:[id]}}]}]})
            const groupChallenge=await GroupChallenge.findOne({$and:[{"startDate":{$lte:new Date()}},{"endDate":{$gte:new Date()}},{"userId":id}]})
            console.log(myGroupChallenge || groupChallenge!=null)
            if(groupChallenge!=null || groupChallenge!=null){
            
        
              axios.get("http://localhost:3022/find-bad/"+groupChallenge.challengeId).then((response)=>{
                res.json({success:true,streak:newStreak,streakGroup:addGroup,groupChallenge:response.data})
              })
              
            }else{
              
              res.json({success:true,streak:newStreak,streakGroup:addGroup})
            }
        
             

         
          }

          }
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
    axios.post("http://localhost:3022/checkProblem",{day:curr,problem:problem,userId:id}).then(async(response)=>{
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
          const updateStreakTime=await Streak.updateOne({$and:[{"day":req.body.day},{"userId":id}]},
          {$set:{"timeLastAdded":new Date()}})
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
                problems:[req.body.problem],
                timeLastAdded:new Date()
              })
              console.log("ADDING STREAK:1132")
              const save=await newStreak.save()
              const updateStreakTime=await Streak.updateOne({$and:[{"day":req.body.day},{"userId":id}]},
          {$set:{"timeLastAdded":new Date()}})
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
            console.log("ADDING STREAK:1157")

            const newStreak=new Streak({
              day:req.body.day,
              userId:id,
              group:addGroup._id,
              problems:[req.body.problem]
            })
           
            const addStreak=newStreak.save()
            const updateStreakTime=await Streak.updateOne({$and:[{"day":req.body.day},{"userId":id}]},
          {$set:{"timeLastAdded":new Date()}})
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

app.get("/addTrevor-problem",async(req,res)=>{
  console.log(new Date(trevorProblem.timeLastAdded).toString())
  
  axios.post("http://localhost:3022/add-to-streak/",{problem:{problem:trevorProblem.problems[0]},problem_id:trevorProblem.problems[0].id,userId:trevorProblem.userId,day:new Date(trevorProblem.timeLastAdded)}).then((response)=>{
    console.log(response.data) 
  })
})
const trevorProblem=
  {
    "_id": "66076241bc59bf961930a65a",
    "day": "Fri Mar 29 2024",
    "problems": [
        {
            "userId": "Bq02JQzmhI3lNCKko9BW",
            "dataStructure": "Array",
            "category": "Recursion",
            "prompt": "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.\n\nGiven an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.\n\n \nExample 1:\n\nInput: nums = [1,2,3,1]\nOutput: 4\nExplanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).\nTotal amount you can rob = 1 + 3 = 4.\n\n\nExample 2:\n\nInput: nums = [2,7,9,3,1]\nOutput: 12\nExplanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).\nTotal amount you can rob = 2 + 9 + 1 = 12.\n\n\n \nConstraints:\n\n\n\t1 <= nums.length <= 100\n\t0 <= nums[i] <= 400\n",
            "lastPracticed": "Thu Feb 29 2024",
            "tags": [
                "Array",
                "Dynamic Programming"
            ],
            "examples": {
                "0": "attempt",
                "date": "Thu Feb 29 2024"
            },
            "no_attempts": 0,
            "level": "Medium",
            "hints": "none",
            "link": "https://leetcode.com/problems/house-robber",
            "boilerCode": "public class Main{\n                        public static void main(String[]args){\n\n                        }\n                      }",
            "title": "House Robber",
            "topicTags": [
                "Array",
                "Dynamic Programming"
            ],
            "solution": "N/A",
            "acRate": 50.07415964770456,
            "leetcodeId": -1,
            "page": 4,
            "attempts": [
                {
                    "date": "Thu Feb 29 2024",
                    "attempt": "N/A"
                }
            ]
        }
    ],
    "group": "66076241bc59bf961930a658",
    "userId": "Bq02JQzmhI3lNCKko9BW",
    "timeLastAdded": "2024-03-30T01:43:22.287Z",
    "__v": 0
}

/***************************************CHALLENGE */
function dateWithTimeZone (timeZone, year, month, day, hour, minute, second)  {
  let date = new Date(Date.UTC(year, month, day, hour, minute, second));

  let utcDate = new Date(date.toLocaleString('en-US', { timeZone: "UTC" }));
  let tzDate = new Date(date.toLocaleString('en-US', { timeZone: timeZone }));
  let offset = utcDate.getTime() - tzDate.getTime();

  date.setTime( date.getTime() + offset );

  return date;
}


app.post("/fix-time-last",async(req,res)=>{

  const streaks=await Streak.find({timeLastAdded:{$ne:null}})
  console.log(streaks)
  const curr=new Date()
  console.log(req.body)

  /*
  streaks.map(async(s)=>{
    
    if(s.timeLastAdded!=null){
     
  const localString=(new Date( s.timeLastAdded.getTime() - curr.getTimezoneOffset()  )).toLocaleString('en',{timeZone:find(req.body.latitude,req.body.longitude)[0]})
      console.log(s.timeLastAdded.toString())

      var timezone=find(req.body.latitude,req.body.longitude)
      var ts=localString.replaceAll(/,/g,"")
      ts=ts.split(" ")
      var date=ts[0]
      var time=ts[1]
      //console.log(date)
      //console.log(time)
      time=time.split(":")
      var hour=Number(time[0])
      var mins=Number(time[1])
      var sec=Number(time[2])

      date=date.split("/")
      var month=Number(date[0])
      var day=Number(date[1])
      var year=Number(date[2])
      console.log(month,day,year)
      console.log(hour,mins,sec)

     // console.log(dateWithTimeZone(timezone,year,month-1,day,hour,mins,sec).toString())
      
      try{
      res.json(localString)
      }catch{

      }
    }
  })
  */
})
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
app.get("/set-group-challenge-current/:userId",async(req,res)=>{
  const groupChallenges=await GroupChallenge.find({"userId":req.params.userId})
  if(groupChallenges.length>0){
    groupChallenges.map((c)=>{
      console.log(c.startDate,c.endDate)
    })
  }else{
    res.json({success:true,challenges:[]})
  }

})

function findIndex(arr,e){
  console.log(arr)
  var i=0
  const index=arr.map((a)=>{
    if(a.userId==e.userId){
      return i
    }
    i++
  })
  return index.length>0?index[0]:-1
}

app.get("/createdBy",async(req,res)=>{
  const groups=await GroupChallenge.find({})

  groups.map(async(g)=>{
    console.log(g.initialPasses)
    console.log(g.passes)
    console.log(g.userId)
    const up=await GroupChallenge.updateOne({"challengeId":g.challengeId},{
      $set:{"createdBy":g.userId,"initialPasses":g.passes}
    })
    console.log(up)

  })
})

app.post("/update-group-challenge-contestant/:userId",async(req,res)=>{
  const caseString=req.body.case //CREATE_GROUP_CHALLENGE_REQUEST
  const user=req.body.user
  console.log(req.body)
  if(caseString=="CONTESTANT_GROUP_CHALLENGE_ACCEPTED"){
    const groupChallenge=req.body.groupChallenge
    const found=await GroupChallenge.findOne({$and:[{"challengeId":groupChallenge.challengeId},{"createdBy":req.body.createdBy}]})
  

      const ids=groupChallenge.selectedContestants.map((c)=>{
        return c.userId
       })
       ids.push(groupChallenge.createdBy)
      
      const curr=new Date()
    const current=new Date(groupChallenge.startDate.seconds*1000)<=curr<=new Date(groupChallenge.endDate.seconds*1000)
   console.log(current)
   console.log(groupChallenge.startDate)
      const addNewChallenge=new GroupChallenge({
        challengeId:groupChallenge.challengeId,
          userId:user.userId,
          createdBy:req.body.createdBy,
          userStats:{
            passes:groupChallenge.initialPasses,
            username:user.username,
            firstname:user.firstname,
            lastname:user.lastname,
            approved:true,
            challengeId:groupChallenge.challengeId,
            success:true
          },
          title:groupChallenge.title,
          no_questions:groupChallenge.no_questions,
          startDate:new Date(groupChallenge.startDate.seconds*1000),
          endDate:new Date(groupChallenge.endDate.seconds*1000),
          length:groupChallenge.length,
          initialPasses:groupChallenge.initialPasses,
          current: current? true:false,
          passes:ids.passes,
          success:true,
          lastUpdated:new Date(),
          usedPasses:0,
          
          allUserIds:ids  
      })
      const save=await addNewChallenge.save()
      console.log(save)
      setTimeout(async()=>{
        const update=await GroupChallenge.updateOne({"challengeId":groupChallenge.challengeId},{
          $set:{"selectedContestants":groupChallenge.contestants,"hasAccepted":true}
        })
        if(groupChallenge.allUserIds==null){
          const update=await GroupChallenge.updateOne({"challengeId":groupChallenge.challengeId},{
            $set:{"allUserIds":ids}
          })
        }
        console.log(update)
        if(update.acknowledged){
          var challenge=await GroupChallenge.findOne({"challengeId":groupChallenge.challengeId})
          
          res.json({success:true,groupChallenge:challenge})
        }
      },100)
    
  }
  if(caseString=="CONTESTANT_GROUP_CHALLENGE_REJECTED"){
    const groupChallenge=req.body.groupChallenge
    const found=await GroupChallenge.findOne({"challengeId":groupChallenge.challengeId})
    const contestants=found.selectedContestants
    var contestant=req.body.user
    var index=findIndex(contestants,contestant)
    if(index!=-1){
      const ids=groupChallenge.selectedContestants.map((c)=>{
        return c.userId
       })
      contestants[index]=contestant
      setTimeout(async()=>{
        const update=await GroupChallenge.updateOne({"challengeId":groupChallenge.challengeId},{
          $set:{"selectedContestants":contestants}
        })
        if(found.allUserIds==null){
          const update=await GroupChallenge.updateOne({"challengeId":groupChallenge.challengeId},{
            $set:{"allUserIds":ids}
          })
        }
        console.log(update)
        if(update.acknowledged){
          var challenge=await GroupChallenge.findOne({"challengeId":groupChallenge.challengeId})

          res.json({success:true,groupChallenge:challenge})
        }
      },100)
    }
  }
  if(caseString=="CREATE_GROUP_CHALLENGE_FOR_CREATOR"){
    const newChallenge=req.body.challenge

    const updateUser=await User.updateOne({"userId":user.userId},{
      $set:{
       groupChallenges:user.groupChallenges
      }
    })
    const curr=new Date()
    const current=new Date(newChallenge.startDate.seconds*1000)<=curr<=new Date(newChallenge.endDate.seconds*1000)
   console.log(current)
   const ids=newChallenge.selectedContestants.map((c)=>{
    return c.userId
   })
     const addNewChallenge=new GroupChallenge({
      challengeId:newChallenge.challengeId,
        userId:user.userId,
        userStats:{
          passes:newChallenge.initialPasses,
          username:user.username,
          firstname:user.firstname,
          lastname:user.lastname,
          approved:true,
          challengeId:newChallenge.challengeId,
          success:true
        },
        createdBy:req.body.createdBy,
        title:newChallenge.title,
        no_questions:newChallenge.no_questions,
        startDate:new Date(newChallenge.startDate),
        endDate:new Date(newChallenge.endDate),
        length:newChallenge.length,
        initialPasses:newChallenge.intialPasses,
        current: current? true:false,
        passes:newChallenge.passes,
        success:true,
        lastUpdated:new Date(),
        usedPasses:0,
        selectedContestants:newChallenge.selectedContestants,
        allUserIds:ids  
    })

    const save=await addNewChallenge.save()
    const find=await User.findOne({"userId":user.userId})
    res.json({success:true,challenge:save,user:find})
    
    
   
  }
  if(caseString=="CREATE_GROUP_CHALLENGE_REQUEST"){
    try{
    const find=await User.findOne({"userId":user.userId})
    const updateContestant=await User.updateOne({"userId":user.userId},{
      $set:{
        notifications:user.notifications,
        allNotifications:user.allNotifications,
        groupChallengeRequests:user.groupChallengeRequests,
        hasNewNotifications:true
      }
    })
    console.log(updateContestant)
    const update=await User.findOne({"userId":user.userId})
    console.log(update)
    if(update.acknowledged){
      res.json({success:true,user:user})
    }else{
      res.json({success:false,user:user})
    }
  }catch(err){
    console.log(err)
  }
   
  }

})

app.get("/get-user-group-challenges/:userId",async(req,res)=>{
  const other=await GroupChallenge.find({ allUserIds: { "$in" : [req.params.userId]} })
  const mine=await GroupChallenge.find({"userId":req.params.userId})
  const all=await GroupChallenge.find({$or:[{"userId":req.params.userId},{ allUserIds: { "$in" : [req.params.userId]} }]})
  res.json({success:true,all:all,mine:mine,others:other})

})

app.post("/add-trevor",async(req,res)=>{
  var trevor={
    "challengeId": 17946,
    "userId": "Bq02JQzmhI3lNCKko9BW",
    "success": true,
    "passes": "1",
    "initialPasses": "1",
    "username": "_trevor.am_",
    "firstname": "Trevor",
    "lastname": "Myers",
    "createdBy": "2322",
    "approved": true,
    "dateApproved":new Date(),
    "denied": false
}
  /*
  const challenge=await GroupChallenge.updateOne({"challengeId":17946},{
    $push:{"selectedContestants":trevor}
  })
  const user=await User.updateOne({"firstname":"Trevor"},{
    $push:{"groupChallengeRequests":trevor}
  })
  console.log(user,challenge)
  */

})

app.get("/notifications",async(req,res)=>{
  const d=await User.findOne({"userId":"gs0K9MxVoU8nNDnfkwem"})
  console.log(d)
  res.json(d)
})


/*
 /**
                 * CASE 1) today date within challenge range
                    *
                  
                CASE 2) today date NOT within challenge range
                    *   CASE 2)A) yesterday date within challenge date range
                              // CASE 2) A) streak yesterday exist
                                   ///CASE 2) A) A) streak GROUP with yesterday in it exists
                        *                   1) check if group.day includes challenge startDate
                                                  CASE 2)A)A)A):group.days includes startDate go on
                                                  CASE 2)A)A)B):group.days DOES NOT includes startDate 
                                                      *FAIL UPDATE
                                            2)CASE 2)A)A)A) today greater than end date and challenge status open
                                                  CASE 2)A)A)A)A) if group.days includes end
                                                      #go on
                                                  CASE 2)A)A)A)B
                                                      #fail chalenge
                                            for each day within challenge date range has sufficient number of questions,set the min no_questions

                        *           ///CASE 2) A) B) streak group with yesterday DOES NOT exists(SHOULD BE IMPOSSIBLE)
                        *      
                        *          

                              // CASE 2) B) streak yesterday DOES NOT exist
                                  #fail user 
                                  ##if all users are checked out set winner
                        *     
                          #finalize challenge winners and close status, create variable closed out for challenge
                    * 
                    *    CASE 2)B) yesterday date NOT challenge date range(challenge should be closed out IMPOSSIBLE)
                    *                
                 */





   
                          

  function findContestantIndex(arr,r){
    var index
    var i=0
    arr.map((c)=>{
      if(c.userId==r.userId){
        index=i
      }
      i++
    })
    return index!=null? index:-1
  }                        
//DECLARE Challenge closed at the end, more cost declare streak open at close
app.post("/update-group-challenge-for-user/:userId",async(req,res)=>{
  const groupChallenges=await GroupChallenge.find({"userId":req.params.userId})
  var i=0
  const allUsers=[]
  const curr=new Date()
  var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
  "Aug","Sep","Oct","Nov","Dec"];
  var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]
  var i=0
  groupChallenges.map(async(c)=>{
    var startDate=c.startDate
    var endDate=c.endDate
    var end=c.endDate
    var date=new Date(startDate)
   date= date.toString().substring(0,15)
   date=date.split(" ")
   date=new Date(date[3],monthnum[months.indexOf(date[1])-1],date[2])

    var stopDate=new Date()
   stopDate=new Date(stopDate.setDate(end.getDate()+1))

   
   console.log("DATE:"+date.toString())
   var curr=new Date()

   c.allUserIds.push(req.params.userId)  

    while(curr.toString().substring(0,15)!=date.toString().substring(0,15) && date<curr && date<stopDate && date.toString().substring(0,15)!=stopDate.toString().substring(0,15)){
      console.log("\n\n",date.toString().substring(0,15),curr.toString().substring(0,15))
      const userStreak=await Streak.findOne({$and:[{"userId":req.params.userId},{"day":date.toString().substring(0,15)}]})
      const user=await User.find({"userId":req.params.userId})
      var allStreak={}
      c.allUserIds.map(async(u)=>{
        const user=await User.findOne({"userId":u})
        const streak=await Streak.findOne({$and:[{"userId":u},{"day":date.toString().substring(0,15)}]})
         const m= findContestantIndex(c.selectedContestants,{userId:u})
        
          if(new Date().toString().substring(0,15)!=date.toString().substring(0,15) && c.selectedContestants[m]!=null  ){
          if(streak==null){

          allStreak[user.userId]={approved:user.approved,userId:user.userId,firstname:user.firstname,lastname:user.lastname,hasStreak:streak!=null? true:false, streak:streak,day:date,member:c.selectedContestants[m]!=null?c.selectedContestants[m]:null}
          
        }else if(streak.problems.length<c.no_questions){
            allStreak[user.userId]={userId:user.userId,firstname:user.firstname,lastname:user.lastname,hasStreak:streak!=null? true:false, streak:streak,day:date,member:c.selectedContestants[m]}
          }
          else{
            allStreak[user.userId]={approved:user.approved,userId:user.userId,firstname:user.firstname,lastname:user.lastname,hasStreak:streak!=null? true:false, streak:streak,day:date,member:c.selectedContestants[m]}
          
          }
        }
        
         // console.log("contestant:",allStreak[user.userId])
         console.log(Object.keys(allStreak).length,c.allUserIds.length)
      

       
        if(Object.keys(allStreak).length==c.allUserIds.length-1){
          allUsers.push({title:c.title,challengeId:c.challengeId,no_questions:c.no_questions,initial_passes:c.passes,allUserIds:c.allUserIds,title:c.title,challenge:c,users:allStreak,member:c.selectedContestants[m]!=null?c.selectedContestants[m]:null})
        }
  

      })
      
      
      date=new Date(date.setDate(date.getDate()+1))
    }
    

  })

  setTimeout(()=>{
    res.json(allUsers)
  },1000)
})




app.post("/organize-group-challenges/:userId", async(req,res)=>{
  const allFailure=[]
  
  axios.post("http://localhost:3022/update-group-challenge-for-user/"+req.params.userId).then((response)=>{
    console.log("GOT IT")
    response.data.map(async(c)=>{
      const challenge=await Challenge.findOne({"challengeId":c.challengeId})
      const failures=[]
      //console.log(Object.keys(c))
      const group=await GroupChallenge.findOne({"challengeId":c.challengeId})
      var index=0 
      
      console.log("LAST UPADTAE:",group.lastUpdated.toString().substring(0,15))
      if(group.lastUpdated==null || group.lastUpdated.toString().substring(0,15)!= new Date().toString().substring(0,15)){
        console.log(Object.keys(c.users))
        Object.keys(c.users).forEach(async(key,index)=>{
        const currUser=c.users[key]
        if(currUser.hasStreak){
          if(/*currUser.approved && */currUser.streak.problems.length<c.no_questions && new Date().toString().substring(0,15)!=currUser.day.toString().substring(0,15)){
            console.log(currUser.day.toString().substring(0,15)+":"+currUser.firstname+" FAILS  for "+c.title)
            
            failures.push(currUser)
          }else{
            
          }
        }else{
          if(/*currUser.approved &&*/ new Date().toString().substring(0,15)!=currUser.day.toString().substring(0,15)){
          console.log(currUser.day.toString().substring(0,15)+":"+currUser.firstname+" FAILS  for "+c.title)
          failures.push(currUser)
          }
        }
       
        if(index==c.allUserIds.length-1){
          console.log("failures:"+failures.length)
          if(failures.length>1){
           
            console.log("first:",firstLoser)
            
           
              while(failures.length>0){
                const firstLoser=await findFirstLoser(failures,group)

               if(firstLoser!=null){
                console.log("length:",failures.length)

                var i=0
                failures.map((f)=>{
                  if(f.userId==firstLoser.userId){
                   console.log("spliced:",failures.splice(i,1))
                  }else{
                    return f
                  }
                  i++
                }) 
                if(firstLoser.userId!=req.params.userId ){
                  const changeIndex=findContestantIndex(group.selectedContestants,firstLoser)
                  if(changeIndex!=-1){
                   group.selectedContestants[changeIndex].success=false
                    if(group.selectedContestants[changeIndex].passes==0){
                      group.selectedContestants[changeIndex].success=false
                      group.selectedContestants[changeIndex].dateFailed=new Date()
                      const update=await GroupChallenge.updateOne({"challengeId":group.challengeId},{
                        "includesFailure":true,
                        "selectedContestants":group.selectedContestants,
                        "lastUpdated":new Date()
                      })
                    }else{
                      group.selectedContestants[changeIndex].passes--
                      const update=await GroupChallenge.updateOne({"challengeId":group.challengeId},{
                        "selectedContestants":group.selectedContestants,
                        "lastUpdated":new Date()
                      })
                      
                    }
                  }
      
                }else{

                console.log("CHANGE OWNER SIZE GREATER TAHN 1")
                
                 // console.log(group.userStats)
                  var stats=group.userStats
                  if(stats.passes==0){
                    group.includesFailure=true
                    stats.success=false
                    stats.dateFailed=new Date()
                    group.userStats=stats
                    const update=await GroupChallenge.updateOne({"challengeId":group.challengeId},{
                      "includesFailure":true,
                      "userStats":stats,
                      "lastUpdated":new Date()
                    })
                  }else{
                    stats.passes--
                    group.userStats=stats 
                    const update=await GroupChallenge.updateOne({"challengeId":group.challengeId},{
                  
                      "userStats":group.userStats,
                      "lastUpdated":new Date()
                    })
                             
                  }
                }
                
         
              }else{
                console.log("EXCEPTION: failures"+failures.length)
                break;
              }
            }
              
      
          }else if(failures.length==1){
            
           
           
            
            console.log("first:",firstLoser)
           
             while(failures.length>0){
              const firstLoser=failures[0]
                if(firstLoser!=null){
              console.log("length:",failures.length)
              var i=0
              failures.map((f)=>{
                if(f.userId==firstLoser.userId){
                  console.log("spliced:",failures.splice(i,1))
                }else{
                  return f
                } 
                i++
              })
              console.log("length:",failures.length)
            if(req.params.userId!=firstLoser.userId){
            const changeIndex=findContestantIndex(group.selectedContestants,firstLoser)
            if(changeIndex!=-1){
             
  
              if(group.selectedContestants[changeIndex].passes==0){
                group.includesFailure=true

              group.selectedContestants[changeIndex].success=false
              group.selectedContestants[changeIndex].dateFailed=new Date()
              const update=await GroupChallenge.updateOne({"challengeId":group.challengeId},{
                "includesFailure":true,
                "selectedContestants":group.selectedContestants,
                "lastUpdated":new Date()
              })
              }else{
                group.selectedContestants[changeIndex].passes--
                const update=await GroupChallenge.updateOne({"challengeId":group.challengeId},{
                  "selectedContestants":group.selectedContestants,
                  "lastUpdated":new Date()
                })
  
  
              }
            }
            }else{
              console.log("CHANGE OWNER SIZE 1")
              //console.log(group.userStats)
              var stats=group.userStats
              if(stats.passes==0){
                stats.success=false
                stats.dateFailed=new Date()
                group.userStats=stats
                const update=await GroupChallenge.updateOne({"challengeId":group.challengeId},{
                  "includesFailure":true,
                  "userStats":stats,
                  "lastUpdated":new Date()
                })

              }else{
                stats.passes--
                group.userStats=stats
                const update=await GroupChallenge.updateOne({"challengeId":group.challengeId},{
                  "userStats":stats,
                  "lastUpdated":new Date()
                })
                
              }

            }
          
            }else{
              console.log("EXCEPTION: failures "+failures.length)
              break
            }
          }
          
          }
        }
        
     
        index++
       
  
      
      })
    }
      
    })
  })
  
})
function coinFlip(min, max) {
  var a=Math.floor(Math.random() * (max - min) + min);
  return a/*>1? 1:0*/
}


 async function findFirstLoser(failures,groupChallenge){
  const firstLoser=failures.reduce(async(a,b)=> {
    if(a.streak!=null && b.streak!=null){
      if(a.streak.problems.length<b.streak.problems.length){
        return a
      }else{
        return b
      }
    }else if(a.streak || b.streak==null){
      if(a==null && b.streak!=null){
        return a
      }else if(a!=null && b==null){
        return b
      }else{
        const c=new Date(b.day)
        var yester=new Date().setDate(c.getDate()-1)
        yester=new Date(yester)
        var stopDate= new Date().setDate(groupChallenge.startDate.getDate()-1)
        stopDate=new Date(stopDate)
        
        while(yester.toString().substring(0,15)!=stopDate.toString().substring(0,15)){
          const aStreak=await Streak.findOne({$and:[{"userId":a.userId},{"day":yester.toString().substring(0,15)}]})
          const bStreak=await Streak.findOne({$and:[{"userId":b.userId},{"day":yester.toString().substring(0,15)}]})
          //console.log("A:"+a.firstname+" problems:"+(aStreak!=null?aStreak.problems.length:""))
          //console.log("B:"+b.firstname+" problems:"+(bStreak!=null?bStreak.problems.length:""))

          if(aStreak!=null && bStreak!=null){
            if(aStreak.problems.length<bStreak.problems.length){
              return a
            }else if(bStreak.problems.length<aStreak.problems.length){
              return b
            }else{
              yester=new Date(yester.setDate(yester.getDate()-1))
              if(yester.toString().substring(0,15)==stopDate.toString().substring(0,15)){
                return coinFlip(0,1)==0?  a :b

              }
            }

          }else if(aStreak==null || bStreak==null){
            if(aStreak==null && bStreak!=null){
              return a
            }else if(aStreak!=null && bStreak==null){
              return b
            }else{
              yester=new Date(yester.setDate(yester.getDate()-1))
              if(yester.toString().substring(0,15)==stopDate.toString().substring(0,15)){
                return coinFlip(0,1)==0? a :b
              }else{
                return coinFlip(0,1)==0?a:b
              }
            }

          }
        }

      }
    }
  })
  return firstLoser
}
/**if s in names and s!=d.get("Name"):
						 	 	  #print(names.index(s))
						 	 	  if "XIC" in text or "XIC" in comment:
						 	 	  	  print(comment)
							 	 	  index=names.index(s)
							 	 	  data.append({"element":d.get("Name"),"usedBy":s}) 
                    
                    	 for s in str:
						 	 s=s.replace("-","_")
						 	 v=None
						 	 if s in names and s!=d.get("Name"):
						 	 	  #print(names.index(s))
						 	 	  if "XIC" in text or "XIC" in comment:
						 	 	  	  print(comment)
							 	 	  index=names.index(s)
							 	 	  data.append({"element":d.get("Name"),"usedBy":s})*/
/*
app.post("/get-current-group-challenge/:userId",async(req,res)=>{
  const all=await GroupChallenge.find({$or:[{"userId":req.params.userId},{ allUserIds: { $in : [req.params.userId]} }]})
  const other=await GroupChallenge.find({ allUserIds: { $in : [req.params.userId]} })
 console.log("challenge length:"+all.length)
  const currentChallenges=[]
  const otherChallenges=[]
  const curr=new Date()
  var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
  "Aug","Sep","Oct","Nov","Dec"];
  var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]
  var yesterday=new Date()
   yesterday=new Date(yesterday.setDate(yesterday.getDate()-1))
  if(all.length>0){
    all.map((a)=>{
      if(((new Date(a.startDate)<= curr<= new Date(a.endDate)) || a.startDate<=yesterday<=a.endDate) && a.hasAccepted){
      if(req.params.userId==a.userId){
        
          currentChallenges.push(a)
         

      }
      }
    })
  }
  if(other.length>0){
    other.map((a)=>{
      
      if((new Date(a.startDate)<= curr<= new Date(a.endDate) || a.startDate<=yesterday<=a.endDate) && a.hasAccepted){
      
        const approved=a.selectedContestants.map((s)=>{
          
          if(s.approved && req.params.userId==s.userId){

            return true
          }
        })
        if(approved.includes(true)){
          
            otherChallenges.push(a)  
        }
      
      }
    })
  }
  const totalLosersFound=[]

if(req.body.others){
  setTimeout(()=>{
  console.log("CONTESTANTS")
  currentChallenges.map((c)=>{
    const totalLosers=[]
    var lastValidDay
    c.selectedContestants.map((s)=>{
      if(s.userId!=req.params.userId && ((c.startDate <= yesterday <= c.endDate) || (c.startDate<=curr<=c.endDate) || (yesterday.toString().substring(0,15)== c.endDate.toString().substring(0,15)) || (yesterday.toString().substring(0,15)== c.startDate.toString().substring(0,15)))){
       c.selectedContestants.map((c)=>{
        console.log(c.firstname+" "+c.lastname)
       })
        c.selectedContestants.map(async(s)=>{

           const user=await User.findOne({"userId":s.userId})
           
       console.log("\n\n----------------CHALLENGE:"+c.title+"------------------"+"CONTESTANT:"+user.firstname+" "+user.lastname)
       c.selectedContestants.map((c)=>{
        console.log(c.firstname+" "+c.lastname+ c.userId)
       })
       
       console.log("yesterday:"+yesterday.toString().substring(0,15)+"| START:"+c.startDate.toString().substring(0,15)+"| END:"+c.endDate.toString().substring(0,15))
          if(s.userId!=req.params.userId){
            
            if(c.lastUpdated==null){
              c.lastUpdated=lastUpdated
            }else{
              var last=new Date(c.lastUpdated)
              if(last.toString().substring(0,15)==curr.toString().substring(0,15)){
                const group=await StreakGroup.findOne({$and:[{"userId":req.params.userId},{"days":{$in:[last.toString().substring(0,15)]}}]})
                
                //res.json
              }else{
                const yesterdayStreak=await Streak.findOne({$and:[{"day":yesterday.toString().substring(0,15)},{"userId":req.params.userId}]})
                
                if(yesterdayStreak!=null){
                  const yesterdayStreakGroup=await StreakGroup.findOne({$and:[{"userId":req.params.userId},{"days":{$in:[yesterday.toString().substring(0,15)]}}]})
                  if(yesterdayStreakGroup!=null){
                    
                      if(!yesterdayStreakGroup.days.includes(c.startDate.toString().substring(0,15)) ){
                          //update challenge//res.json
                          console.log("DOES NOT CONTAIN STARTDATE OR ENDDATE")
  
                      }
                      if(!yesterdayStreakGroup.days.includes(c.endDate.toString().substring(0,15)) && new Date().toString().substring(0,15)!= c.endDate.toString().substring(0,15) && new Date()> c.endDate){
                        //update cha;;enge res.json
                        console.log("DOES NOT CONTAIN STARTDATE OR ENDDATE")
                      }
                      for(var i=0;i<yesterdayStreakGroup.days.length;i++){
                        b=yesterdayStreakGroup.days[i]
                        if(b!=new Date().toString().substring(0,15)){
                        var day=b.split(" ")
                        day=new Date(day[3],monthnum[months.indexOf(day[1])-1],day[2])
                        const streak=await Streak.findOne({$and:[{"userId":s.userId},{"day":day.toString().substring(0,15)}]})
                        console.log("DAY:"+day.toString())

                        console.log("\n\nhere:",new Date(new Date().setDate(day.getDate()-1)))

                        if(streak!=null ){
                            console.log(streak.day)
                            console.log("\n\nhere:",new Date().setDate(day.getDate()-1))
                          //console.log("OTHERS:"+user.firstname+" "+ user.lastname +" has streak for day "+streak.day+" with "+streak.problems.length+" problems. Challenge, "+c.title.toUpperCase()+" requires "+c.no_questions+" problems")
                          if(day.toString().substring(0,15)==c.startDate.toString().substring(0,15)){
                            if(streak.problems.length<c.no_questions){
                              

                                  lastValidDay=new Date()
                                
                              lastValidDay=new Date(day.setDate(day.getDate()-1))
                              totalLosers.push({contestant:s,lastValidDay:lastValidDay,title:c.title})

                              console.log("Fail on STARTDATE: completed "+streak.problems.length+" required "+c.no_questions+ " on "+day.toString().substring(0,15)+" for CHALLENGE, "+c.title+" "+user.firstname)
                              break;

                               
                            }
                            
                                 
                          }else if(day.toString().substring(0,15)==c.endDate.toString().substring(0,15)){
                            if(streak.problems.length<c.no_questions){
                              

                                  lastValidDay=new Date()
                              lastValidDay=new Date(day.setDate(day.getDate()-1))
                              totalLosers.push({contestant:s,lastValidDay:lastValidDay,title:c.title})

                              console.log("Fail on ENDDATE: completed "+streak.problems.length+" required "+c.no_questions+ " on "+day.toString().substring(0,15)+" for CHALLENGE, "+c.title+" "+user.firstname)
                              break;

                               
                            }
                            
                           
                          }else if(c.startDate<=day<=c.endDate){
                          
                            if(streak.problems.length<c.no_questions){
                                lastValidDay=new Date()
                            lastValidDay=new Date(day.setDate(day.getDate()-1))
                            totalLosers.push({contestant:s,lastValidDay:lastValidDay,title:c.title})

                            console.log("Fail: completed "+streak.problems.length+" required "+c.no_questions+ " on "+day.toString().substring(0,15)+" for CHALLENGE, "+c.title+" "+user.firstname)
                            break;
                            }

                            
                          }
                            
                        }else{
                          console.log("Fail completed 0 required "+c.no_questions+ " on "+day.toString().substring(0,15)+" for CHALLENGE, "+c.title + " for "+user.firstname)
                          lastValidDay=new Date()
                              lastValidDay=new Date(lastValidDay.setDate(day.getDate()-1))
                          totalLosers.push({contestant:s,lastValidDay:lastValidDay,title:c.title})
                          break
                            }
                      }
                        
                        
  
                      }
  
                  }else{
                    //CASE 2) A) B) IMPOSSIBLE
                    console.log("EXCEPTION")
  
                  }
                }else if( new Date().toString().substring(0,15)==c.startDate.toString().substring(0,15)){
                 
                   console.log("NO YESTERDAY STREAK")
                }else{
                  console.log("Fail completed 0 required "+c.no_questions+ " on "+day.toString().substring(0,15)+" for CHALLENGE, "+c.title + " for "+user.firstname)
                  try{
                    var already=totalLosers.map((c)=>{
                      if(c.contestant.userId==s.userId){
                        return true
                      }
                    })
                    console.log("\n ARLEADY",already)
                    if(totalLosers.length>0 && !already.includes(true)){
                  lastValidDay=new Date()
                  lastValidDay=new Date(day.setDate(day.getDate()-1))
                  totalLosers.push({contestant:s,lastValidDay:lastValidDay,title:c.title})

                  console.log("Fail on STARTDATE: completed "+streak.problems.length+" required "+c.no_questions+ " on "+day.toString().substring(0,15)+" for CHALLENGE, "+c.title+" "+user.firstname)
                    }else{

                      lastValidDay=new Date()
                  lastValidDay=new Date(day.setDate(day.getDate()-1))
                  totalLosers.push({contestant:s,lastValidDay:lastValidDay,title:c.title})

                  console.log("Fail on STARTDATE: completed "+streak.problems.length+" required "+c.no_questions+ " on "+day.toString().substring(0,15)+" for CHALLENGE, "+c.title+" "+user.firstname)
                  
                  

                    }
                  }catch(err){
                    console.log(err)
                    
                  }
                          
                          
                }
                // last time we check was in the past
                //1.streak today exists?
                 
            
  
              }
            }
            console.log("END-----CONTESTANT:"+user.firstname +" "+user.lastname+"-----------")
  
          }
        
        })
        setTimeout(()=>{
          if(totalLosers.length){
            try{
              if(totalLosersFound.length>0){
                const already=totalLosersFund.map((t)=>{

                })
              }

            }catch{
              totalLosersFound.push({length:totalLosers.length,losers:totalLosers})

            }
          }
        },400)
      }
    
    })
    console.log("---------------------------------------------END CHALLENGE"+c.title+"----------------------")
  })
  console.log("--------------------------------------------------------CONTESTANTS OVER-----------------\n\n\n")
  setTimeout(()=>{
    console.log("ALL LOSEER",totalLosersFound)
    try{
      res.json(totalLosersFound)
    }catch(err){
      console.log(err)
    }
  },3000)
},800)



}

  if(req.body.mine){
    setTimeout(()=>{
      console.log("OWNER")


      var lastUpdated=new Date()
     
      currentChallenges.map(async(c)=>{
        if(c.userId==req.params.userId && ((c.startDate <= yesterday <= c.endDate) || (yesterday.toString().substring(80,15)== c.endDate.toString().substring(0,15)) || (yesterday.toString().substring(0,15)== c.startDate.toString().substring(0,15)))){
          const user=await User.findOne({"userId":req.params.userId})
           
       console.log("----------------CHALLENGE:"+c.title+"------------------"+"OWNER:"+user.firstname+" "+user.lastname+"\n")
       console.log("yesterday:"+yesterday.toString().substring(0,15)+" startd:"+c.startDate.toString().substring(0,15)+" end:"+c.endDate.toString().substring(0,15))
           // console.log("OWNER:"+user.firstname +" "+user.lastname)
  
            if(c.userId==req.params.userId){
              
              if(c.lastUpdated==null){
                c.lastUpdated=lastUpdated
              }else{
                var last=new Date(c.lastUpdated)
                if(last.toString().substring(0,15)==curr.toString().substring(0,15)){
                  const group=await StreakGroup.findOne({$and:[{"userId":req.params.userId},{"days":{$in:[last.toString().substring(0,15)]}}]})
                  
                  //res.json
                }else{
                  const yesterdayStreak=await Streak.findOne({$and:[{"day":yesterday.toString().substring(0,15)},{"userId":req.params.userId}]})
                  
                  if(yesterdayStreak!=null){
  
                    const yesterdayStreakGroup=await StreakGroup.findOne({$and:[{"userId":req.params.userId},{"days":{$in:[yesterday.toString().substring(0,15)]}}]})
                    if(yesterdayStreakGroup!=null){
                      
                        if(!yesterdayStreakGroup.days.includes(c.startDate.toString().substring(0,15)) ){
                            //update challenge//res.json
                            //console.log("DOES NOT CONTAIN STARTDATE OR ENDDATE")
    
                        }
                        if(!yesterdayStreakGroup.days.includes(c.endDate.toString().substring(0,15)) && new Date().toString().substring(0,15)!= c.endDate.toString().substring(0,15) && new Date()> c.endDate){
                          //update cha;;enge res.json
                          //console.log("DOES NOT CONTAIN STARTDATE OR ENDDATE")
                        }
                        yesterdayStreakGroup.days.map(async(b)=>{
                          if(b!=new Date().toString().substring(0,15)){
                          var day=b.split(" ")
                          day=new Date(day[3],monthnum[months.indexOf(day[1])-1],day[2])
                       
                          const streak=await Streak.findOne({$and:[{"userId":req.params.userId},{"day":day.toString().substring(0,15)}]})
                          if(streak!=null){
                            console.log(user.firstname+" "+ user.lastname +" has streak for day "+streak.day+" with "+streak.problems.length+" problems. Challenge, "+c.title.toUpperCase()+" requires "+c.no_questions+" problems")
                            if(day.toString().substring(0,15)==c.startDate.toString().substring(0,15)){
                              
                              if(streak.problems.length<c.no_questions){
                                console.log("Fail on STARTDATE: completed "+streak.problems.length+" required "+c.no_questions+ " on "+day.toString().substring(0,15)+" for CHALLENGE, "+c.title)
                              }
                              
                                   
                            }else if(day.toString().substring(0,15)==c.endDate.toString().substring(0,15)){
                              if(streak.problems.length<c.no_questions){
                                console.log("Fail on ENDDATE: completed "+streak.problems.length+" required "+c.no_questions+ " on "+day.toString().substring(0,15)+" for CHALLENGE, "+c.title)
                              }
                              
                             
                            }else if(c.startDate<=day<=c.endDate){
                             if(streak.problems.length<c.no_questions){
                              console.log("Fail on : completed "+streak.problems.length+" required "+c.no_questions+ " on "+day.toString().substring(0,15)+" for CHALLENGE, "+c.title)
                              }
                            }
                              
                          }else{
                            console.log("EXCEPTION:(1563) NO streak exist for day")
                          }
                        }
                          
                          
                        
                        })
                        console.log("END-------------"+c.title+"--------------------------------OWNER:"+user.firstname+" "+user.lastname+"\n")
    
                    }else{
                      //CASE 2) A) B) IMPOSSIBLE
                      console.log("EXCEPTION")
    
                    }
                  }else if( new Date().toString().substring(0,15)==c.startDate.toString().substring(0,15)){
                     
                     //do nothing
                     console.log("NO STREAK")
                  }else{
                    console.log("NO STREAK FROM YESTERDAY FAIL")
                  }
                 
                }
                //streakday=new Date(streakday[3],monthnum[months.indexOf(streakday[1])-1],streakday[2])
              }
            }
         
        }
      })
     // res.json({success:true,length:currentChallenges.length,groupChallenges:currentChallenges})
    },500)
  }
 

})
*/
app.get("/get-all-group-challenges/:userId",async(req,res)=>{
  var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
"Aug","Sep","Oct","Nov","Dec"];
var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]
  const groups=await GroupChallenge.find({$or:[{"userId":req.params.userId},{"allUserIds":{$in:[req.params.userId]}}]})
  var index=0
 const allStreaks=[]
  groups.map(async(g)=>{
    
    var startDate=new Date(g.startDate)
   
    var stopDate=new Date(g.startDate)
    stopDate.setDate(stopDate.getDate()-1)
  

  
    const streaks=[]
    var found=false
    const contestant=g.selectedContestants.map((c)=>{
      if(c.userId==req.params.userId && c.approved){
        return true
      }
    })
    const owner=g.userId==req.params.userId? true:false
     

    if(owner || contestant.includes(true)){
      var curr=new Date(g.endDate.setDate(g.endDate.getDate()))
      curr=new Date(curr)
    
       
          var i=0 
          const others=g.allUserIds.filter((f)=>{
            if(f!=req.params.userId){
              return f
            }
          })
          others.push(g.userId)
          others.filter((f)=>{
            if(f!=null){
              return f
            }
          })
         

          const user=await User.findOne({"userId":req.params.userId})
          const streakGroup=await StreakGroup.findOne({$and:[{$in:[curr.toString().substring(0,15)]},{"userId":req.params.userId}]})
         
          if(streakGroup!=null ){ 
            
            const results=await getStreaksForChallenges(g,req.params.userId,allStreaks,streaks,curr,stopDate,streakGroup.days.length-1)
            //curr=results.curr
          
            if(results!=null){
              allStreaks.concat(results.allStreaks)
              console.log("ALLSTREAKS:",results)
              console.log(results.curr instanceof Date)
              curr=results.curr
              if(curr<g.startDate){
                try{
                  res.json({length:allStreaks.length,success:true,challenges:allStreaks}) 

                }catch(err){
                  console.log(err)
                }
              }
            }
            //curr=results.curr 
            /*
            //console.log(streakGroup)
            for(var i=streakGroup.days.length-1;i>=0;i--){
              var d=streakGroup.days[i]
              var streakday=d.split(" ")
              var valid=new Date(streakday[3],monthnum[months.indexOf(streakday[1])-1],streakday[2])
              console.log(valid)
              if(valid>stopDate){
              curr=new Date(valid.toString().split(" ")[3],monthnum[months.indexOf(valid.toString().split(" ")[1])-1],valid.toString().split(" ")[2])

                const streak=await Streak.findOne({$and:[{"userId":req.params.userId},{"day":curr.toString().substring(0,15)}]})
                
              if(streak!=null){
           
               
                var already=streaks.map((s)=>{
                  if(s.day==curr.toString().substring(0,15)){
                    return true
                  }
                })
            
                if(!already.includes(true)){
                  streaks.push({day:valid,streak:streak})
                  
                  curr.setDate(curr.getDate()- 1)
                }
                if(curr<g.startDate || curr.toString().substring(0,15)==g.startDate.toString().substring(0,15)){
                  const user=await User.findOne({"userId":streak.userId})
           
                  streaks.push({day:valid,streak:streak,user:user})
                  allStreaks.push({streaks:streaks,challenge:g})
                 
                  found=true
                  curr=stopDate
                  curr.setDate(curr.getDate()- 1)
                }else{
                  curr.setDate(curr.getDate()- 1)
                }
              }else{
               
                curr.setDate(curr.getDate()- 1)
                if(curr<g.startDate || curr.toString().substring(0,15)==g.startDate.toString().substring(0,15)){
                
                  curr=stopDate
                }
              }
            
          }
            }
            */
          }else{
            curr.setDate(curr.getDate()- 1)

          }
         
    }
  
  
  })
  setTimeout(()=>{

    // res.json({length:allStreaks.length,success:true,challenges:allStreaks}) 
  },700)
})

async function getStreaksForChallenges(g,userId,allStreaks,streaks,curr,stopDate,i){
 
  var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
  "Aug","Sep","Oct","Nov","Dec"];
  var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]
  if(i>=0 ){
    if( curr>stopDate){
  const user=await User.findOne({"userId":userId})
  const streakGroup=await StreakGroup.findOne({$and:[{"days":{$in:[curr.toString().substring(0,15)]}},{"userId":userId}]})
 
  if(streakGroup!=null ){ 
    console.log("\ni:"+i)
      console.log("curr:"+curr.toString().substring(0,15))
      console.log(streakGroup.days,"\n\n")
     
      var d=streakGroup.days[i]
      if(d!=null){
    
      var streakday=d.split(" ")
      var valid=new Date(streakday[3],monthnum[months.indexOf(streakday[1])-1],streakday[2])
      console.log("valid:"+valid.toString())
      if(valid>stopDate){
     // curr=new Date(valid.toString().split(" ")[3],monthnum[months.indexOf(valid.toString().split(" ")[1])-1],valid.toString().split(" ")[2])

        const streak=await Streak.findOne({$and:[{"userId":userId},{"day":valid.toString().substring(0,15)}]})
         
      if(streak!=null){
    
       
        var already=streaks.map((s)=>{
          if(s.day==curr.toString().substring(0,15)){
            return true
          }
        })
    
        if(!already.includes(true)){
          const user=await User.findOne({"userId":streak.userId})
          streaks.push({day:valid,streak:streak,user:user})
          
          //curr.setDate(curr.getDate()- 1)
          const results=await getStreaksForChallenges(g,userId,allStreaks,streaks,curr,stopDate,i-1)

        }
        if(curr<g.startDate || curr.toString().substring(0,15)==g.startDate.toString().substring(0,15)){
          const user=await User.findOne({"userId":streak.userId})

          streaks.push({day:valid,streak:streak,user:user})

          allStreaks.push({streaks:streaks,challenge:g})
         
          found=true
         
          curr.setDate(curr.getDate()- 1)
          console.log("curr 1:"+curr)
         const results=await getStreaksForChallenges(g,userId,allStreaks,streaks,curr,stopDate,i-1)
        }else{
          curr.setDate(curr.getDate()- 1)
          console.log("curr a:"+curr)

          const results=getStreaksForChallenges(g,userId,allStreaks,streaks,curr,stopDate,i-1)
          return results
        } 
      }else{
       console.log("BEYON DATE")
        curr.setDate(curr.getDate()- 1)
        if(curr<g.startDate || curr.toString().substring(0,15)==g.startDate.toString().substring(0,15)){
        
          //curr=stopDate
          console.log("curr b:"+curr)

          const results=await getStreaksForChallenges(g,userId,allStreaks,streaks,curr,stopDate,i-1)
          return results
        }
      } 
  }else{
    const results=await getStreaksForChallenges(g,userId,allStreaks,streaks,curr,stopDate,-1)
    return  {allStreaks:allStreaks,curr:curr}
  }
}else{
  curr=new Date('0001-01-01T00:00:00Z')
  console.log("curr c:"+curr)
  const results=await getStreaksForChallenges(g,userId,allStreaks,streaks,curr,stopDate,-1)
  return results
} 
  }else{
    curr.setDate(curr.getDate()- 1)
    console.log("curr d:"+curr)
    const results=await getStreaksForChallenges(g,userId,allStreaks,streaks,curr,stopDate,-1)
    return results
  

    } 
    return {allStreaks:allStreaks,curr:curr}
  }
}else{
  console.log("RETURNING:"+i) 
  console.log(allStreaks,"\n\n")
  return {allStreaks:allStreaks,curr:curr}
}
}
app.get("/get-others-group-challenge/:userId",async(req,res)=>{
  var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
  "Aug","Sep","Oct","Nov","Dec"];
  var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]
    const groups=await GroupChallenge.find({$or:[{"userId":req.params.userId},{"allUserIds":{$in:[req.params.userId]}}]})
    var index=0
    var length
   const allStreaks=[]
   
    groups.map(async(g)=>{
      
      var startDate=new Date(g.startDate)
   
      var stopDate=new Date(g.startDate)
      stopDate.setDate(stopDate.getDate()-1)
   
      const streaks=[]
      var found=false 
      const contestant=g.selectedContestants.map((c)=>{
        if(c.userId==req.params.userId && c.approved){
          return true
        }
      })
      const owner=g.userId==req.params.userId? true:false
       
  
      if(owner || contestant.includes(true)){
        var curr=new Date(g.endDate.setDate(g.endDate.getDate()))
        curr=new Date(curr)
        console.log(curr.toString())
      while(curr>=stopDate && curr.toString().substring(0,15)!=stopDate.toString().substring(0,15) && found==false){
         
            var i=0 
            const others=g.allUserIds.filter((f)=>{
              if(f!=req.params.userId){
                return f
              }
            })
            
            others.filter((f)=>{
              if(f!=null){
                return f
              }
            }) 
            length=others.length
           // console.log(curr)
            var j=0


   

 while(j<others.length){
  const o=others[j]
    const streakGroup=await StreakGroup.findOne({$and:[{"days":{$in:[curr.toString().substring(0,15)]}},{"userId":o}]})
    
    if(streakGroup!=null ){ 
      
      var i=streakGroup.days.length-1
      const results=await getStreaksForChallenges(g,o,allStreaks,streaks,curr,stopDate,i)
     
    
      if(results!=null){
        j++
        allStreaks.concat(results.allStreaks)
        console.log("ALLSTREAKS:",allStreaks)
        curr=results.curr

        try{
          if(j>=others.length-1){
            res.json({length:allStreaks.length,challenges:allStreaks,success:true})

          }
        }catch(err){
          console.log(err)
        }
      }
     
      /*
      while(i>=0 && curr>stopDate){ 
        d=streakGroup.days[i]
        var streakday=d.split(" ")
       var valid=new Date(streakday[3],monthnum[months.indexOf(streakday[1])-1],streakday[2])
     
        if(valid>stopDate){  

          const streak=await Streak.findOne({$and:[{"userId":o},{"day":valid.toString().substring(0,15)}]})
          const user=await User.findOne({"userId":o})

       // console.log(typeof(valid),typeof(stopDate))
        if(streak!=null && valid>stopDate){
        
            streaks.push({day:valid,streak:streak,user:user})
           
          if(i==0 || valid<g.startDate || valid.toString().substring(0,15)==g.startDate.toString().substring(0,15)){
             

            allStreaks.push({streaks:streaks,challenge:g})
          
            found=true 
            console.log("BREAK\n\n")
            break
          }else{
            
          }
        }else{  
        } 
    }else{
      break
    }
   i--
      }
      */
    }else{
      curr.setDate(curr.getDate()- 1)
      j++
      //break
    }
   
  }
        }
      }
    })

     
      try{
        setTimeout(()=>{
          console.log("j:"+index)
         
          //res.json({challenges:allStreaks,success:true})
          

        },800)
       
      }catch(err){
        console.log(err)
      }
   
  

})

app.get("/fix-passes-and-ranks/:challengeId",async(req,res)=>{
  const groups=await GroupChallenge.find({})
  groups.map(async(c)=>{
    const stats=c.userStats
    stats.passes=c.passes
    stats.success=true
    const update=await GroupChallenge.updateOne({$and:[{"userId":c.userId},{"challengeId":c.challengeId}]},{
      $set:{"userStats":stats,"rank":null,status:"OPEN"}
    })
    console.log(update)
  }) 
})
app.get("/group-challenges/:userId",async(req,res)=>{
  i==0
  const challenges=await GroupChallenge.find({"userId":req.params.userId})
  const allChallenges=[]
  var i=0
  while(i<challenges.length){
    c=challenges[i]
    var j=0
 
    const all=[c]
    j=j+1
    const others=await GroupChallenge.find({$and:[{"challengeId":c.challengeId},{"userId":{$ne:req.params.userId}}]})
    if(others.length>0){

      others.map((o)=>{
        all.push(o)
        j=j+1
      })
    }
    const allStreaks=[]
    if(j==1+others.length){
      
      var startDate=c.startDate
      var stopDate=new Date()
      var endDate=new Date(c.endDate)
      var stopDate=new Date(c.endDate)
      stopDate.setDate(stopDate.getDate()+1)
      var date=new Date(c.startDate)
      var curr=new Date()
  
      //stopDate=stopDate.getDate()+1
     
      console.log(date.toString().substring(0,15) +" | curr"+curr.toString().substring(0,15) +" | stop:"+stopDate.toString().substring(0,15)) 
      const allLosers=[]
      const processed=[]
      while( date<curr && date<stopDate && date.toString().substring(0,15)!=curr.toString().substring(0,15) /*&& date.toString().substring(0,15)!=stopDate.toString().substring(0,15)*/){
        var allIndex=0
       
        while(allIndex<=all.length){  
          const a=all[allIndex] 
          if(a!=null){
        
           // console.log(date.toString().substring(0,15)+"End:"+endDate.toString().substring(0,15)+" STOP:"+stopDate.toString().substring(0,15))

          var streak=await Streak.findOne({$and:[{"userId":a.userId},{"day":date.toString().substring(0,15)}]})
          const user=await User.findOne({"userId":a.userId})
         

          if(streak!=null){ 
          
       
            if(  streak.problems.length>=c.no_questions ){
              //console.log(streak)
              const otherRanks=await GroupChallenge.findOne({$and:[{"challengeId":c.challengeId},{"userId":{$ne:user.userId}},{"rank":2}]})
              if(otherRanks!=null && date.toString().substring(0,15)!=c.startDate.toString().substring(0,15)){
                const updateWinner=await GroupChallenge.updateOne({$and:[{"challengeId":c.challengeId},{"userId":user.userId}]},{
                  $set:{"rank":1}
                })
              }else if(otherRanks!=null && date.toString().substring(0,15)==c.startDate.toString().substring(0,15)){
                const updateWinner=await GroupChallenge.updateOne({$and:[{"challengeId":c.challengeId},{"userId":user.userId}]},{
                  $set:{"rank":1, "winningDate":date}
                }) 
              }
            allStreaks.push({date:date,streak:streak,title:c.title,firstname:user.firstname,lastname:user.lastname,username:user.username,userId:user.userId,success:streak.problems.length>=c.no_questions})
            allIndex++
          }else{
         //   if(c.lastUpdated.toString().substring(0,15)!=new Date().toString().substring(0,15)){
              //allStreaks.push({date:date,streak:streak,title:c.title,firstname:user.firstname,lastname:user.lastname,username:user.username,userId:user.userId,success:streak.problems.length>=c.no_questions})
              stats=all[allIndex].userStats
              if(stats.passes==0 ){
                if(!processed.includes(user.userId)){
                console.log("FAIL:"+streak.day.toString().substring(0,15)+ " | "+streak.problems.length+" problems | "+c.title+" ("+c.no_questions+") | Id:"+c.challengeId+" | "+user.firstname+ " | STOP:"+stopDate.toString().substring(0,15) )
                  
                stats.success=false
                stats.dateFailed=date
               streak.firstname=user.firstname
               var str=streak
               str.challengeId=c.challengeId
                allLosers.push(str)
                processed.push(user.userId)

                const updateLoser=await GroupChallenge.updateOne({$and:[{"challengeId":c.challengeId},{"userId":user.userId}]},{
                      $set:{
                        "userStats":{
                          passes:0,
                          username:user.username,
                          firstname:user.firstname,
                          lastname:user.lastname,
                          approved:true,
                          challengeId:c.challengeId,
                          success:false,
                          dateFailed:date
                        },
                        "includesFailure":true,
                        "status":"CLOSED",
                        "success":false,
                        "lastUpdated":new Date()
                      }
                })
                console.log(updateLoser)
                } 
              }else{ 
                stats.passes--
                const updateLoser=await GroupChallenge.updateOne({$and:[{"challengeId":c.challengeId},{"userId":user.userId}]},{
                $set:{userStats:{
                  passes:stats.passes,
                  username:user.username,
                  firstname:user.firstname,
                  lastname:user.lastname,
                  approved:true,
                  challengeId:c.challengeId,
                  success:true,
                },
                lastUpdated:new Date()
              }
                })
                console.log(updateLoser)
              }
             // console.log("\n\n--modify for "+ user.firstname,stats)
            //  console.log(c.lastUpdated, "date:"+date.toString().substring(0,15))

              allIndex++
          //  } 
          }
          }else{
   //         if(c.lastUpdated.toString().substring(0,15)!=new Date().toString().substring(0,15)){
            stats=all[allIndex].userStats
            if(stats.passes==0){
              if( !processed.includes(user.userId)){
              console.log("FAIL:"+date.toString().substring(0,15)+ " | 0 problems | "+c.title+" ("+c.no_questions+") | Id:"+c.challengeId+" | "+user.firstname+ " | STOP:"+stopDate.toString().substring(0,15))

              
              stats.success=false
              stats.dateFailed=date
              streak={firstname:user.firstname,userId:user.userId}
              var str=streak
              str.challengeId=c.challengeId
              
              allLosers.push(str)
              processed.push(user.userId)

              const updateLoser=await GroupChallenge.updateOne({$and:[{"challengeId":c.challengeId},{"userId":user.userId}]},{
                $set:{
                  "userStats":{
                    passes:0,
                    username:user.username,
                    firstname:user.firstname,
                    lastname:user.lastname,
                    approved:true,
                    challengeId:c.challengeId,
                    success:false,
                    dateFailed:date
                  },
                  "includesFailure":true,
                  "status":"CLOSED",
                  "success":false,
                  "lastUpdated":new Date()
                }
          })
          console.log(updateLoser)
              }

            }else{
              stats.passes--
              const updateLoser=await GroupChallenge.updateOne({$and:[{"challengeId":c.challengeId},{"userId":user.userId}]},{
              $set:{userStats:{
                passes:stats.passes,
                username:user.username,
                firstname:user.firstname,
                lastname:user.lastname,
                approved:true,
                challengeId:c.challengeId,
                success:true,
              },
              lastUpdated:new Date()
            }
              })
              console.log(updateLoser)
            }
   //       }
           // console.log("\n\n--nmodify for "+ user.firstname,stats)
          //  console.log(c.lastUpdated,"date:"+date.toString().substring(0,15))
            allIndex++
          }

          //console.log("ALLINDEX:"+allIndex)
          var ranks=all.length
          if(allIndex>=all.length){
            console.log(allIndex)
            if(allLosers.length==1){
             // console.log("\n\nONE LOSER ["+user.firstname+" for challenge "+c.title)
             // console.log("rank:",ranks,allLosers[0])
              const currentRank=await GroupChallenge.findOne({$and:[{"userId":{$ne:allLosers[0].userId}},{"challengeId":c.challengeId},{"rank":{$ne:null}},{$max:"rank"}]})

               
              
              const updateLoser=await GroupChallenge.updateOne({$and:[{"challengeId":c.challengeId},{"userId":user.userId}]},{
                $set:{"rank":currentRank!=null? currentRank.rank-1:ranks}
              })
              console.log(updateLoser)
              allLosers.splice(0,1)
              
              setTimeout(()=>{
                date.setDate(date.getDate()+1)
               },10)
              
            }else if(allLosers.length>1){
              var loserIndex=0
              console.log("\n\nMULTIPLE LOSERS "+c.title+ " q:"+c.no_questions)
              //console.log(allLosers)
             
              var indexLoser=allLosers.length
              while(allLosers.length>0){

              const first=await findFirstLoser(allLosers,c)
              const currentRank=await GroupChallenge.findOne({$and:[{"userId":{$ne:first.userId}},{"challengeId":c.challengeId},{"rank":{$ne:null}},{$max:"rank"}]})
              const updateLoser=await GroupChallenge.updateOne({$and:[{"challengeId":c.challengeId},{"userId":first.userId}]},{
                $set:{"rank":currentRank!=null? currentRank.rank-1:ranks}
              })
              //console.log(updateLoser)

              console.log("----rank:"+ranks +" | user:"+ first.userId +" | challange:"+c.title+" | Id:"+c.challengeId)
              console.log("firstloser:",first)
              if(allLosers.length>0){
                var ii=0
                var spliceIndex
                allLosers.map((u)=>{
                  if(u.userId==first.userId){
                    spliceIndex=ii
                  }
                  ii++
                })
                allLosers.splice(spliceIndex,1)
                console.log("new losers length:"+allLosers.length)
                indexLoser--
                ranks--
              }
              
             
                if(indexLoser==0 || allLosers.length==0){
                setTimeout(()=>{
                  date.setDate(date.getDate()+1)
                },10)
                }
              }
          
            }
        
           

          }else{
            allIndex++
            date.setDate(date.getDate()+1)


          }

        
          }else{
           
            allIndex++
          }

         
   
        }  

      }
    }
    
 console.log("i:"+i)
  i++
  
  console.log("HERE:"+i)
setTimeout()
  if(i>=challenges.length){
    console.log("FINISHED:"+i)
    res.json({success:true,streaks:allStreaks})
  }
 
  }
 
})

async function findFirstLoser2(failures,groupChallenge,i){
  var first
  const firstLoser=failures.reduce(async(a,b)=> {
    console.log(Object.keys(a))
  console.log(a)
    console.log("\n\ni:"+i)
    console.log("\n\nb lose:"+b.date)
    console.log("\n\naloser:"+a.date)
    
     // console.log("\n\nloserb :"+b.user.username+" problems:"+(b.streak!=null? b.streak.problems.length:"0"))
      //console.log("\n\nlosera :"+a.user.username+" problems:"+(a.streak!=null? a.streak.problems.length:"0"))
    if(i==1){
      console.log(Object.keys(a))
      console.log("a LASTADDEDD----:",a.streak.timeLastAdded)
      console.log("b LASTADDEDD----:",b.streak.timeLastAdded)
      if(a.streak.timeLastAdded>=b.streak.timeLasted){
        first=a
        return first
      }else{
        first=b
        return first
      }
    }
      if(a==null || b==null){
       if(a==null && b!=null){
        first=b
        return first
       }else if(b==null && a!=null){
        first=a
        return first
       }else if(b==null && a==null){
        first=null
        return first
       }
 
    }else{
  
    if(a.streak!=null && b.streak!=null){
      console.log(a)
      if(a.streak.problems.length<b.streak.problems.length){
        first=a
        return a
      }else if(b.streak.problems.length<a.streak.problems.length){
        first=b
        return b
      }else{
        const aLastAdded=await Streak.findOne({$and:[{"userId":a.user.userId},{"days":{$in:[a.day]}}]})
        const bLastAdded=await Streak.findOne({$and:[{"userId":b.user.userId},{"days":{$in:[b.day]}}]})
        console.log("a last:",aLastAdded.timeLastAdded,aLastAdded.problems.length,aLastAdded.day)
        console.log("b last:",bLastAdded.timeLastAdded,bLastAdded.problems.length,bLastAdded.day)
        if(aLastAdded!=null && bLastAdded!=null){
            if(aLastAdded.problems.length>bLastAdded.problems.length){
              first=b
              return b
            }else if(aLastAdded.problems.length<bLastAdded.problems.length){
              first=a
              return a
            }else{
              const aa=a
              aa.streak=aLastAdded
              const bb=b
              bb.streak=bLastAdded
              const challenges=[aa,bb]
              newOne=findFirstLoser2(challenges,groupChallenge,i+1)
              if(newOne==null){
                first= aLastAdded.timeLastAdded <=bLastAdded.timeLastAdded ?b:a
                return first
              }else{
                first=newOne
              return first
            }
            }
        }else{
          if(aLastAdded==null || bLastAdded==null){
            if(aLastAdded==null && bastAdded!=null){
              first=a
              return a
            }else if(bLastAdded==null && aLastAdded!=null){
              first=b
              return b
            }else if(bLastAdded==null && aLastAdded==null){
              const aa=a
              aa.streak=aLastAdded
              const bb=b
              bb.streak=bLastAdded
              const challenges=[aa,bb]
              first=findFirstLoser2(challenges,groupChallenge,i+1)
              return first
            }
          }
        }
      }
      
    }else if(a.streak==null || b.streak==null){
     
      if(a.streak==null && b.streak!=null){ 
        console.log("CASE A A NULL")
        first=a
        return a
      }else if(a.streak!=null && b.streak==null){
        console.log("CASE A B NULL")
        first=b
        return b
      }else{
        console.log("CASE BOTH NULL")
        const c=new Date(b.date)
        var yester=new Date().setDate(c.getDate()-1)
        yester=new Date(yester)
        var stopDate= new Date().setDate(groupChallenge.startDate.getDate()-1)
        stopDate=new Date(stopDate)
        if(a.user==null && b.user!=null){
          first==a
          return a
        }else if(a.user!=null && b.user==null){
          first=b
          return b
        }else if(a.user!=null && b.user!=null){
        while(yester.toString().substring(0,15)!=stopDate.toString().substring(0,15)){
          console.log(a)
          const aStreak=await Streak.findOne({$and:[{"userId":a.user.userId},{"day":yester.toString().substring(0,15)}]})
          const bStreak=await Streak.findOne({$and:[{"userId":b.user.userId},{"day":yester.toString().substring(0,15)}]})
          //console.log("A:"+a.firstname+" problems:"+(aStreak!=null?aStreak.problems.length:""))
          //console.log("B:"+b.firstname+" problems:"+(bStreak!=null?bStreak.problems.length:""))
          console.log("IN HERE")
          if(aStreak!=null && bStreak!=null){
            if(aStreak.problems.length<bStreak.problems.length){
              first=a
              return a
            }else if(bStreak.problems.length<aStreak.problems.length){
              first=b
              return b
            }else{
              yester=new Date(yester.setDate(yester.getDate()-1))
              if(yester.toString().substring(0,15)==stopDate.toString().substring(0,15)){
                first= coinFlip(0,1)==0?  a :b
                return first

              }
            }

          }else if(aStreak==null || bStreak==null){
            console.log("CASE ONE IS NULL")
            if(aStreak==null && bStreak!=null){
              first=a
              return a
            }else if(aStreak!=null && bStreak==null){
              first=b
              return b
            }else{
              yester=new Date(yester.setDate(yester.getDate()-1))
              if(yester.toString().substring(0,15)==stopDate.toString().substring(0,15)){
                first=coinFlip(0,1)==0? a :b
                return first
              }else{
                first= coinFlip(0,1)==0?a:b
                return first
              }
            }

          }
        }
      }

      }
    }
    
  }
    
  })
  const loser=await firstLoser
 // console.log("first:",loser.user)
  return await first
}

/*import java.util.*;
public class Main{

  public static void group(String[]arr){
    Map<String,List<String>> map=new HashMap<String,List<String>>();
    for(int i=0;i<arr.length;i++){
      char[] ch=arr[i].toCharArray();
      Arrays.sort(ch);
      String str=String.valueOf(ch).toString();
     
      if(!map.containsKey(str)){
        map.put(str,new ArrayList<String>());
      }
      map.get(str).add(arr[i]);
    }
    for(String key:map.keySet()){
      System.out.println(map.get(key));
    }
  }       
         
public static void main(String[]args){
String []arr={"tan","tea","eat","nat","ate","elov","love","tac"};
group(arr);

           } 
         } */
app.post("/create-user",async(req,res)=>{
  const user=req.body.user
  //console.log(Object.keys(user))
  const found=await User.findOne({"userId":user.userId})
  Object.keys(user).forEach((e)=>{
    console.log(e)
  })
  if(found==null){
    Object.keys(user).forEach((e)=>{
      console.log(e)
    })
  }else{
    console.log(found.firstname)
  }
})
app.post("/fix-streaks-day-before",async(req,res)=>{
  const day=req.body.day
  const userId=req.body.userId
  var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
  "Aug","Sep","Oct","Nov","Dec"];
  var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]
  var today=day.split(" ")
  today=new Date(today[3],monthnum[months.indexOf(today[1])-1],today[2])
  console.log(today)
  var yesterday=new Date(today)
  yesterday.setDate(today.getDate()-1)
  var tommorow=new Date(today)
  tommorow.setDate(today.getDate()+1)
  var totalQ=0
  console.log(tommorow)
  console.log("------yesterday:",yesterday.toString().substring(0,15)," today:",today.toString().substring(0,15)," tommorow:",tommorow.toString().substring(0,15))
  const streak=await Streak.findOne({$and:[{"userId":userId},{"day":day}]})
  if(streak!=null){
  const yesterGroup=await StreakGroup.findOne({$and:[{"userId":userId},{"days":{$in:[yesterday.toString().substring(0,15)]}}]})
  const tommGroup=await StreakGroup.findOne({$and:[{"userId":userId},{"days":{$in:[tommorow.toString().substring(0,15)]}}]})
  const todayGroup=await StreakGroup.findOne({$and:[{"userId":userId},{"days":{$in:[day.toString().substring(0,15)]}}]})
  console.log("\n\nyesterday group",yesterGroup)
  var maxQ=Number.MAX_SAFE_INTEGER
  var minQ=Number.MAX_SAFE_INTEGER
  console.log("today group",todayGroup)
  console.log("tommorow group",tommGroup)
  const allGroups=[yesterGroup,todayGroup,tommGroup]
  if(yesterGroup!=null || tommGroup!=null){
    var longest=yesterGroup!=null && tommGroup!=null? tommGroup.days>=yesterGroup.days?tommGroup:yesterGroup:yesterGroup==null && tommGroup!=null?tommGroup:yesterGroup!=null && tommGroup==null?yesterGroup:0
    console.log("longest",longest)
    longest=longest==null?today:longest
    var masterGroup=allGroups.reduce((g)=>{
      if(g!=null){
        if(g.id==longest.id){
          
          return g
      }
      }
    })
    console.log("MASTERGROUP",masterGroup)
    var master
    if(yesterGroup!=null){
      if(yesterGroup.id==longest.id){
        master="YESTERDAY"
      }
    }
    if(tommGroup!=null){
      if(tommGroup.id==longest.id){
        master="TOMMOROW"
      }
    }
    if(todayGroup!=null){
      if(todayGroup.id==longest.id){
        master="TODAY"
      }
    }
   
  }
  console.log("MASTER",master,"-------------------\n\n")
  if(master=="YESTERDAY"){
    
   const days=yesterGroup.days
   var todayIndex=0
   if(todayGroup.days!=null){
   while(todayIndex<todayGroup.days.length){
    if(!days.includes(todayGroup.days[todayIndex])){
    days.push(todayGroup.days[todayIndex])
    }
    const str=await Streak.findOne({$and:[{"userId":userId},{"day":todayGroup.days[todayIndex]}]})
    var updateToday=await Streak.updateOne({$and:[{"userId":userId},{"day":todayGroup.days[todayIndex]}]},{
      $set:{"group":yesterGroup.id}
    })
    
    maxQ=maxQ==Number.MAX_SAFE_INTEGER? str.problems.length:maxQ+str.problems.length
    minQ=Math.min(minQ,str.problems.length)
    console.log("update today item: "+todayGroup.days[todayIndex]+ " group id to "+yesterGroup.id)
    
    todayIndex++
    if(todayIndex>=todayGroup.days.length){
 
      if(todayGroup.id!=yesterGroup.id){
        const deleteToday=await StreakGroup.findOne({"_id":todayGroup.id})
        console.log("\n\nDELETE THIS Today:",deleteToday)
        }
      console.log("\n processing todaygroup complete----")
      if(tommGroup!=null){
        var tommIndex=0
        var newmaxQ=Number.MAX_SAFE_INTEGER
        var newminQ=Number.MAX_SAFE_INTEGER
        while(tommIndex<tommGroup.days.length){
          if(!days.includes(tommGroup.days[tommIndex])){
          days.push(tommGroup.days[tommIndex])
          }
          const str=await Streak.findOne({$and:[{"userId":userId},{"day":tommGroup.days[tommIndex]}]})
          newmaxQ=newmaxQ==Number.MAX_SAFE_INTEGER? str.problems.length:newmaxQ+str.problems.length
          newminQ=Math.min(minQ,str.problems.length)
          var updateTomm=await Streak.updateOne({$and:[{"userId":userId},{"day":tommGroup.days[tommIndex]}]},{
            $set:{"group":yesterGroup.id}
          })
          console.log("update tommorow item: "+tommGroup.days[tommIndex]+ " group id to "+yesterGroup.id)
          tommIndex++
          if(tommIndex>=tommGroup.days.length){
         
            maxQ=Math.max(maxQ,newmaxQ)
            minQ=Math.min(newminQ,minQ)
            var newNewMaxQ=Number.MAX_SAFE_INTEGER
          
            yesterGroup.days.map(async(d)=>{
              const str=await Streak.findOne({$and:[{"userId":userId},{"day":d}]})
        
              newNewMaxQ=newNewMaxQ==Number.MAX_SAFE_INTEGER? str.problems.length:newNewMaxQ+str.problems.length
              console.log("newMax"+newNewMaxQ)
              minQ=Math.min(minQ,str.problems.length)
            })
            setTimeout(async()=>{
              
              maxQ=Math.max(maxQ,newNewMaxQ)
              await StreakGroup.updateOne({"_id":yesterGroup.id},{
                $set:{"days":days,"total_problems":maxQ,"min_questions":minQ}
              })
              const updated=await StreakGroup.findOne({"_id":yesterGroup.id})
              const allStreaks=await Streak.find({"group":yesterGroup.id})
            
                  found=false
                  res.json({success:true,group:updated,streaks:allStreaks,none:false})
  
              console.log("\n\ndays:",days)
              console.log("FINAL MAX Q:",maxQ)
              console.log("FINAL MINQ:",minQ)
            },100)
          

           
           
            if(tommGroup.id!=yesterGroup.id){
            const deleteTomm=await StreakGroup.findOne({"_id":tommGroup.id})
            console.log("\n\nDELETE THIS Tommorow:",deleteTomm)
            }
            console.log("\ntommorow complete----days:",days)
          }
        }
      }else{
        //update maxQ here
        console.log("No tommorow group---days",days)
        var newNewMaxQ=Number.MAX_SAFE_INTEGER
          
        yesterGroup.days.map(async(d)=>{
          const str=await Streak.findOne({$and:[{"userId":userId},{"day":d}]})
    
          newNewMaxQ=newNewMaxQ==Number.MAX_SAFE_INTEGER? str.problems.length:newNewMaxQ+str.problems.length
          minQ=Math.min(minQ,str.problems.length)
        })
        setTimeout(async()=>{
          //6661cf43829dbcacd6febe5a
          maxQ=Math.max(maxQ,newNewMaxQ)
          await StreakGroup.updateOne({"_id":yesterGroup.id},{
            $set:{"days":days,"total_problems":maxQ,"min_questions":minQ}
          })
          const updated=await StreakGroup.findOne({"_id":yesterGroup.id})
          const allStreaks=await Streak.find({$and:[{"group":yesterGroup.id},{"userId":userId}]})
          //res.json({success:true,group:updated,streaks:allStreaks,none:false})
            var found=true
            console.log("3966")
        
            
                res.json({success:true,group:updated,streaks:allStreaks,none:false})

          
          console.log("\n\n3992---days:",days)
          console.log("FINAL MAX Q:",maxQ)
          console.log("FINAL MINQ:",minQ)
        },100)

      }
    }
   }
  }else{
    console.log("No today group----days:",days)
  }
   
  }else if(master=="TODAY"){

  }else if(master=="TOMMOROW"){
    const group=tommGroup.id
    const preDates=[]
    if(yesterGroup!=null && tommGroup!=null){
      var yesterdayIndex=0
      while(yesterdayIndex<yesterGroup.days.length){
        if(!preDates.includes(yesterGroup.days[yesterdayIndex])){
          preDates.push(yesterGroup.days[yesterdayIndex])
          console.log("update yesterday item: "+yesterGroup.days[yesterdayIndex]+ " with group id:"+yesterGroup.id+" to new group id:"+tommGroup.id)   
        }
        const str=await Streak.findOne({$and:[{"userId":userId},{"day":yesterGroup.days[yesterdayIndex]}]})
        await Streak.updateOne({$and:[{"userId":userId},{"day":yesterGroup.days[yesterdayIndex]}]},{
          $set:{"group":tommGroup.id}
        })
        
        maxQ=maxQ==Number.MAX_SAFE_INTEGER? str.problems.length:maxQ+str.problems.length
        minQ=Math.min(minQ,str.problems.length)
        yesterdayIndex++
        
          if(yesterdayIndex>=yesterGroup.days.length){
            maxQ=Math.max(maxQ,newmaxQ)
            minQ=Math.min(newminQ,minQ)
            console.log("-----YESTER COMPLETE")
            if(todayGroup!=null){
              var todayIndex=0
              var newmaxQ=Number.MAX_SAFE_INTEGER
              var newminQ=Number.MAX_SAFE_INTEGER
              while(todayIndex<todayGroup.days.length){
                if(!preDates.includes(todayGroup.days[todayIndex])){
                  preDates.push(todayGroup.days[todayIndex])
                  console.log("update today item: "+todayGroup.days[todayIndex]+ " with group id:"+todayGroup.id+" to new group id:"+tommGroup.id)   

                }
                const str=await Streak.findOne({$and:[{"userId":userId},{"day":todayGroup.days[todayIndex]}]})
                newmaxQ=newmaxQ==Number.MAX_SAFE_INTEGER? str.problems.length:newmaxQ+str.problems.length
                newminQ=Math.min(minQ,str.problems.length)
                await Streak.updateOne({$and:[{"userId":userId},{"day":todayGroup.days[todayIndex]}]},{
                  $set:{"group":tommGroup.id}
                })
                
                todayIndex++
                if(todayIndex>=todayGroup.days.length){
                  console.log("-----TODAY COMPLETE",preDates)
                  const all=preDates  
                  tommGroup.days.map((d)=>{
                    if(!all.includes(d)){
                      all.push(d)
                    }
                  })
                  console.log("ALL",all)
                  var newNewMaxQ=Number.MAX_SAFE_INTEGER
          
                  yesterGroup.days.map(async(d)=>{
                    const str=await Streak.findOne({$and:[{"userId":userId},{"day":d}]})
              
                    newNewMaxQ=newNewMaxQ==Number.MAX_SAFE_INTEGER? str.problems.length:newNewMaxQ+str.problems.length
                    minQ=Math.min(minQ,str.problems.length)
                  })
                  setTimeout(async()=>{
                    maxQ=Math.max(maxQ,newNewMaxQ)
                    await StreakGroup.updateOne({"_id":tommGroup.id},{
                      $set:{"days":all,"total_problems":maxQ,"min_questions":minQ}
                    })
                    const updated=await StreakGroup.findOne({"_id":tommGroup.id})
                    const allStreaks=await Streak.find({$and:[{"group":tommGroup.id},{"userId":userId}]})
                    //res.json({success:true,group:updated,streaks:allStreaks,none:false})
                    var found=true
                    
                
                        res.json({success:true,group:updated,streaks:allStreaks,none:false})

                    
                    console.log("FINAL MAX Q:",maxQ)
                    console.log("FINAL MINQ:",minQ)
                  },100)
                }
              }

            }else{
              console.log("no today item, final days",preDates)
            }
          }
        
      }
    }else if(todayGroup!=null){
      console.log("CASE: NO YESTERDAY, TODAY IS NOT NULL")
      var todayIndex=0
              
              while(todayIndex<todayGroup.days.length){
                if(!preDates.includes(todayGroup.days[todayIndex])){
                  preDates.push(todayGroup.days[todayIndex])
                  console.log("update today item: "+todayGroup.days[todayIndex]+ " with group id:"+todayGroup.id+" to new group id:"+tommGroup.id)   

                }
                const str=await Streak.findOne({$and:[{"userId":userId},{"day":todayGroup.days[todayIndex]}]})
                maxQ=maxQ==Number.MAX_SAFE_INTEGER? str.problems.length:maxQ+str.problems.length
                minQ=Math.min(minQ,str.problems.length)
               // var updateTomm=await Streak.updateOne({$and:[{
                //maxQ=maxQ==Number.MAX_SAFE_INTEGER? str.problems.length:maxQ+str.problems.length
                todayIndex++
                if(todayIndex>=todayGroup.days.length){
                  console.log("-----TODAY COMPLETE",preDates)
                  const all=preDates
                  tommGroup.days.map((d)=>{
                    if(!all.includes(d)){
                      all.push(d)
                    }
                  })
                  console.log("ALL",all)
                 //k3MNBehaS1BWERZsL7q8
          //6661cfba829dbcacd6febe67
          //6661cf43829dbcacd6febe5a
                  tommGroup.days.map(async(d)=>{
                    const str=await Streak.findOne({$and:[{"userId":userId},{"day":d}]})
              
                    maxQ=maxQ==Number.MAX_SAFE_INTEGER? str.problems.length:maxQ+str.problems.length
                    minQ=Math.min(minQ,str.problems.length)
                  })
                  
                  setTimeout(async()=>{
                    console.log("FINAL MAX Q:",maxQ)
                    console.log("FINAL MINQ:",minQ)
                    await StreakGroup.updateOne({"_id":tommGroup.id},{
                      $set:{"days":all,"total_problems":maxQ,"min_questions":minQ}
                    })
                    const updated=await StreakGroup.findOne({"_id":tommGroup.id})
                    const allStreaks=await Streak.find({$and:[{"group":tommGroup.id},{"userId":userId}]})
                    //res.json({success:true,group:updated,streaks:allStreaks,none:false})
                    var found=true
                    console.log("4182")
                
                        
                        res.json({success:true,group:updated,streaks:allStreaks,none:false})

                   
                  },150)
                }
              }

    }else{
      res.json({success:true,message:"no changes neccessary"})
      }
   }
  }else{
    res.json({success:true,none:true})
  }
})


app.get("/challenge-stats/:userId",async(req,res)=>{
  const challenges=await Challenge.find({"userId":req.params.userId})
  const group=await GroupChallenge.find({"userId":req.params.userId})
  console.log(challenges.length)
  console.log(group.length)
  
})

app.get("/find-bad-all",async(req,res)=>{
  const groups=await GroupChallengeData.find({})
  const counter=groups.map((g)=>{
    return g.problemCounter
  }) 
  console.log(groups.length)
  var i=0

  
 while(i<groups.length){
 console.log(groups[i].challengeId)
 i++
  /* if(groups[i].challengeId!=null){
    console.log(groups[i].challengeId)
    axios.get("http://localhost:3022/find-bad/"+groups[i].challengeId).then(async(response)=>{
  
      console.log(groups[i].challengeId+" COMPLETE")
      i++ 
    }) 
  }else{
    console.log("EMPTY CHALLENGEID",groups[i])
    const g=await GroupChallenge.findOne({$and:[{"startDate":groups[i].startDate},{"endDate":groups[i].endDate}]})
    console.log("found",g)
    if(g!=null){
      const gg=await GroupChallengeData.find({$and:[{"startDate":groups[i].startDate},{"endDate":groups[i].endDate}]})
      if(gg.length>1){
        console.log("DOUBLE")
        const update =await GroupChallengeData.deleteOne({$and:[{"startDate":g.startDate},{"endDate":g.endDate},{"createdBy":g.createdBy}]})
      }else{ 
        console.log("ONCE")
      }
      const update =await GroupChallengeData.updateMany({$and:[{"startDate":g.startDate},{"endDate":g.endDate},{"createdBy":g.createdBy}]},{
        $set:{"challengeId":g.challengeId}
      })
      console.log(update)
    }
    i++
  } */
  }
  //res.json(counter)
})
app.get("/find-bad/:challengeId",async(req,res)=>{
  console.log("\n\nHERE !!!")
  const data=await GroupChallengeData.findOne({"challengeId":req.params.challengeId})
  var i=0
  if(data==null){
const challenges=await GroupChallenge.find({"challengeId":req.params.challengeId})
if(challenges.length>1){
  const cha=challenges[0]
  var contestants=challenges.map((c)=>{
    return c.userId
  })
  var startDate=cha.startDate
  var endDate=cha.endDate
  var groupChallengeData=new GroupChallengeData({
    challengeId:cha.challengeId,
    title:cha.title,
    contestants:contestants,
    startDay:startDate.toString().substring(0,15),
     endDay:endDate.toString().substring(0,15),
     startDate:cha.startDate,
     endDate:cha.endDate,
     createdBy:cha.createdBy,
     streaks:[],
     problemCounter:{},
     ranks:[]
  })
  const saved=await groupChallengeData.save()
  console.log("SAVED",saved)
  var startDate=cha.startDate
  var endDate=cha.endDate
  var stop=new Date(cha.endDate)
  stop.setDate(stop.getDate()+1)
  console.log(stop)
  console.log(startDate.toString().substring(0,15)+"--------------"+endDate.toString().substring(0,15))
 const streaks=[]
 var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
 "Aug","Sep","Oct","Nov","Dec"];
 var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]
 
 
  
   
      var curr=startDate
 
    const tommorow=new Date()
    var problemCounter={}
    tommorow.setDate(tommorow.getDate()+1)
    
       while(curr<stop && curr.toString().substring(0,15)!=stop.toString().substring(0,15) && curr.toString().substring(0,15)!=tommorow.toString().substring(0,15)){
        var i=0
        while(i<challenges.length){
          var userId=challenges[i].userId
         if(problemCounter[userId]==null){
          problemCounter[userId]={
            user:null,
            problems:0
          }
         }
          var u=await User.findOne({"userId":userId})
          const userData={
            userId:u.userId,
            username:u.username,
            firstname:u.firstname,
            lastname:u.lastname,
            bio:u.bio,
            profilePicUrl:u.profilePicUrl,
            challengeId:59186
       
          }
          problemCounter[userId].user=userData
          //socket.emit("UPDATE_GROUP_CHALLENGE",{user:userData,groupChallenge:saved})
          if(!Object.keys(problemCounter).includes(userData.userId)){
            problemCounter[userId].user=userData
              problemCounter[userId].problems=0
          }
                var streak=await Streak.findOne({$and:[{"userId":userId},{"day":curr.toString().substring(0,15)}]})
              if(streak!=null){
                problemCounter[userId].problems=problemCounter[userId].problems+streak.problems.length
               // console.log(problemCounter[userId])
               // console.log(curr.toString().substring(0,15)+"----"+userId+" "+streak.problems.length)
         
                var day=streak.day.split(" ")
                day=new Date(day[3],monthnum[months.indexOf(day[1])-1],day[2])
                streak.streakId=streak.id
                streaks.push({streak:streak,user:userData,date:day})
              }
              i++
              if(i>=challenges.length){
                curr.setDate(curr.getDate()+1)
                if(curr>=stop || curr.toString().substring(0,15)==stop.toString().substring(0,15) || curr.toString().substring(0,15)==tommorow.toString().substring(0,15)){
                  console.log("COMPLETE")
             
                 // console.log("problemCounter",problemCounter)
                  const update=await GroupChallengeData.updateOne({"challengeId":req.params.challengeId},{
                    $set:{"streaks":streaks,"problemCounter":problemCounter}
                 })
                 const data1=await GroupChallengeData.findOne({"challengeId":req.params.challengeId})
                 try{
             
                 res.json({groupChallengeData:data1,problemCounter:problemCounter})
                 }catch(err){

                 }
                 // console.log(streaks.length)
                }
              }
      }
       
       }

}else{
  res.json({success:true,message:"You need atleast 1 person to accept your challenge."})
}
  }else if(data!=null){
  var startDate=data.startDate
  var endDate=data.endDate
  var stop=new Date(endDate)
  stop.setDate(stop.getDate()+1)
 // console.log(stop)
  //console.log(startDate.toString().substring(0,15)+"--------------"+endDate.toString().substring(0,15))
  var problemCounter={}
  const contestants=await GroupChallenge.find({"challengeId":req.params.challengeId})
  var contest=contestants.map((c)=>{
    if(!data.contestants.includes(c.userId)){
      data.contestants.push(c.userId)
    }
    return c.userId
  })
  data.contestants.map((c)=>{
 
    problemCounter[c]={}
   
    problemCounter[c].problems=0
  })
 const streaks=[]
 var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
 "Aug","Sep","Oct","Nov","Dec"];
 var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]

 
      var curr=startDate
    console.log(data.title)
    const c=await GroupChallenge.findOne({"challengeId":req.params.challengeId})
    console.log("curr:",curr,"stop:",stop)
   
    console.log(req.params.challengeId)
 
    data.contestants=contest
    console.log(Object.keys(c))
       while(curr<stop && curr.toString().substring(0,15)!=stop.toString().substring(0,15)){
        var i=0
        while(i<data.contestants.length){
          var userId=data.contestants[i]
          var u=await User.findOne({"userId":userId})
          const userData={
            userId:u.userId,
            username:u.username,
            firstname:u.firstname,
            lastname:u.lastname,
            bio:u.bio,
            profilePicUrl:u.profilePicUrl,
            challengeId:59186
       
          }
    
          //socket.emit("UPDATE_GROUP_CHALLENGE",{user:userData,groupChallenge:c})
          problemCounter[userId].user=userData
          
                var streak=await Streak.findOne({$and:[{"userId":userId},{"day":curr.toString().substring(0,15)}]})
              
                if(streak!=null){
                console.log(curr.toString().substring(0,15)+"----"+userId+" "+streak.problems.length)
                //console.log(streak.day)
                problemCounter[userId].problems+=streak.problems.length
                var day=streak.day.split(" ")
                day=new Date(day[3],monthnum[months.indexOf(day[1])-1],day[2])
                streak.streakId=streak.id
                streaks.push({streak:streak,user:userData,date:day})
              }
              i++
              if(i>=data.contestants.length){
                curr.setDate(curr.getDate()+1)
                if(curr>=stop || curr.toString().substring(0,15)==stop.toString().substring(0,15)){
                 // console.log("COMPLETE")
                  streaks.map((s)=>{
                 
                  })
                  const update=await GroupChallengeData.updateOne({"challengeId":req.params.challengeId},{
                    $set:{"streaks":streaks,"problemCounter":problemCounter}
                 })
                 const data1=await GroupChallengeData.findOne({"challengeId":req.params.challengeId})
                 try{
                  res.json({groupChallengeData:data1, problemCounter:problemCounter})
                  }catch(err){
                   
                  }
              
                  
                }
              }
           }
       
       }
      }else{
        console.log("EXCEPTION")
      }
  
})


app.get("/group-challenges-2-fix/:userId",async(req,res)=>{
  const processedChallenges=[]
  var startTime=new Date()
  const group=await GroupChallenge.find({"userId":req.params.userId})
  const days=[]
  const users=[]
  const allCha=[]
  const streakIds=[]
  console.log(group.length)
  var complete=false
  var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
"Aug","Sep","Oct","Nov","Dec"];
var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]
  const processed=[]
  var allChallengesIndex=0
  const AllStreaks=[]
  const ch=[]
  console.log(group.length)
  while(allChallengesIndex<group.length){
    var c=group[allChallengesIndex]
    if(!processedChallenges.includes(c.challengeId)){
    processedChallenges.push(c.challengeId)
    if(new Date()<new Date(c.startDate)){
      AllStreaks.push({challenge:c});
      allChallengesIndex++;
      if(allChallengesIndex>=group.length ){
   
        var endTime=new Date() 
        var time=((endTime-startTime)/1000)
        console.log("\n\nSending 4655")
        try{
        res.json({time:time+" secs",ch:ch,challenges:AllStreaks})
        break
        }catch(err){
          console.log("ERR:4363")
        }
        
      }

    }else{
    var groupData=await GroupChallengeData.findOne({$and:[{"challengeId":c.challengeId},{"endDate":{$lte:new Date()}}]})
    if(groupData!=null){
      groupData.title=c.title
      const addTitle=await GroupChallengeData.updateOne({"challengeId":groupData.challengeId},{
        $set:{"title":c.title}
      })
    console.log(Object.keys(groupData))
    }
    //console.log(c.title)
    if(groupData==null){

    
    const challenge=c
    const all=[c]
    const others=await GroupChallenge.find({$and:[{"userId":{$ne:req.params.userId}},{"challengeId":c.challengeId}]}
    )
   // console.log("ALLINDEX:"+allChallengesIndex, "others:"+others.length)
    if(others.length>0){
    others.map((o)=>{
     
      all.push(o)
        
    })
  
    if(all.length==others.length+1){
      //console.log(c.title,all.length)

      var startDate=c.startDate
      var stopDate=new Date()
      var endDate=new Date(c.endDate)
      var stopDate=new Date(c.endDate)
      stopDate.setDate(stopDate.getDate()+1)
      var date=new Date(c.startDate)
      const todayDate=new Date(c.startDate)
      var curr=new Date()
  
      //stopDate=stopDate.getDate()+1
     
      //console.log(date.toString().substring(0,15) +" | curr"+curr.toString().substring(0,15) +" | stop:"+stopDate.toString().substring(0,15)) 
      
      const processed=[]
      const allLosers=[] 
      const streaks=[]   
      var checkEnd=new Date()
      checkEnd=new Date(checkEnd.setDate(c.endDate.getDate()-1)) 
      //console.log(date)
      //console.log("startdate:",startDate)  
      //console.log("stopDate:",stopDate) 
      var tommorow=new Date(curr)
      tommorow.setDate(tommorow.getDate()+1) 
      console.log("DATE",date)
      if(/*date.toString().substring(0,15)!=curr.toString().substring(0,15) && */complete==false){
       // console.log("HERE")  
        var problemCounter={} 
        console.log(c.title)
       /* console.log("\n\n\n\nOTHERS",others.length,"\n\n\nindex",allChallengesIndex)
        console.log("\ndate:",date.toString(),"\nstop",stopDate.toString(),"\ntommorow:",tommorow.toString())
        */
   while(/*complete==false&& date<curr*/date<stopDate  && date<tommorow/*date.toString().substring(0,15)!=curr.toString().substring(0,15) && date.toString().substring(0,15)!=stopDate.toString().substring(0,15)*/){
        var allIndex=0 
       // console.log("date not change",date.toString())   
       // console.log("IN WHILE LOOP")
        //console.log(date.toString().substring(0,15)+" | start:"+c.startDate.toString().substring(0,15)+ " | stop:"+stopDate.toString().substring(0,15)+"index:"+ allIndex)
      //console.log("here:"+new Date(checkEnd.setDate(c.endDate.getDate()-1)).toString().su bstring(0,15))
      //console.log(" date",date," currdate",new Date().toString()," stop",stopDate) 

      if(date!=null && date.toString().substring(0,15)!=stopDate.toString().substring(0,15)){
        console.log(date.toString().substring(0,15))
        const currd=new Date(date)
       
        if(date>new Date() && date.toString().substring(0,15)!=stopDate.toString().substring()/*&& date.toString().substring(0,15)!=new Date.toString().substring(0,15)*/){ 
          console.log("CHALLENGE NOT STARTING YET") 
          AllStreaks.push({challenge:challenge})  
          allChallengesIndex++
        
          if(allChallengesIndex>=group.length){
           // HEREIMAM 
           try{
            if(!res.headersSent){
            res.json({ch:ch,allStreaksLength:AllStreaks.length,challenges:AllStreaks,allLosers:allLosers})
            break 
            }else{
              try{
                res.json({ch:ch,allStreaksLength:AllStreaks.length,challenges:AllStreaks,allLosers:allLosers})

              }catch(err){
                console.log("ALREADY SENT HEADER")
              }
              break
            }

           }catch(err){
            console.log("4454",err)
           }
          }
        }
        else{
        while(allIndex<all.length && date<tommorow && date.toString().substring(0,15)!=tommorow.toString().substring(0,15)){  
          const u=all[allIndex]   
         
          const streak=await Streak.findOne({$and:[{"userId":u.userId},{"day":date.toString().substring(0,15)}]})
     
          const user=await User.findOne({"userId":u.userId})
          if(streak!=null){
            console.log(u.userId +" "+streak.problems.length+ " problems for day "+streak.day)
            //console.log("---------------"+streak.day+"---problems:"+streak.problems.length+"----"+streaks.length+"-----------------") 
          
            var day=streak.day.split(" ")
            day=new Date(day[3],monthnum[months.indexOf(day[1])-1],day[2])
           if(users.includes(user.userId) && days.includes(day.toString().substring(0,15)) && allCha.includes(c.challengeId)){
            try{
              streaks.push({streak:streak,date:day,challengeId:c.challengeId,user:user})
                }catch(err){
                  console.log(err)
                }
            }else{ 
                try{
              streaks.push({streak:streak,date:day,challengeId:c.challengeId,user:user})
                }catch(err){
                  console.log(err)
                }
              days.push(day.toString().substring(0,15))
              users.push(user.userId)
              allCha.push(c.challengeId) 
              streakIds.push(streak.id)
            }
            if(streak.problems!=null){
              if(streak.problems.length>=c.no_questions){
                if(problemCounter[user.userId]==null){
                  problemCounter[user.userId]=0;
                  problemCounter[user.userId]=problemCounter[user.userId]+streak.problems.length
                }else{
                  problemCounter[user.userId]=problemCounter[user.userId]+streak.problems.length;
  
                }
            

                allIndex++
              }else{
                if(problemCounter[user.userId]==null){
                  problemCounter[user.userId]=0;
                  problemCounter[user.userId]=problemCounter[user.userId]+streak.problems.length
                }else{
                  problemCounter[user.userId]=problemCounter[user.userId]+streak.problems.length; 
  
                }
                

                //console.log("FAIL:"+user.firstname+ " | "+date.toString().substring(0,15)+ " | 0 problems | "+c.title)
                //console.log(u.userStats.passes)
                if(!c.lastUpdated.toString().substring(0,15)==new Date().toString().substring(0,15)){
               // console.log(u.userStats)
                if(u.userStats.passes==0 && date.toString().substring(0,15)!=curr.toString().substring(0,15) && date.toString().substring(0,15)!=stopDate.toString().substring(0,15)){
                  if(!processed.includes(u.userId) && date.toString().substring(0,15)!=curr.toString().substring(0,15) && date.toString().substring(0,15)!=stopDate.toString().substring(0,15)){
                    processed.push(user.userId)
                  const str=u.userStats
                  str.success=false
                  str.dateFailed=date
                  const updateAllChanges=await GroupChallenge.updateMany({$and:[{"userId":u.userId},{"startDate":{$lte:date}},{"endDate":{$gte:date}}]},{
                    $set:{"success":false,"userStats":str,lastUpdate:date}
                  })
                 // console.log(updateAllChanges)
                  streak.firstname=user.firstname
                  allLosers.push(streak)
                }

                }else if(u.userStats.passes>0 && date.toString().substring(0,15)!=curr.toString().substring(0,15) && date.toString().substring(0,15)!=stopDate.toString().substring(0,15)){
                 
                  const str=u.userStats
                    str.passes--
                  const updateAllChanges=await GroupChallenge.updateMany({$and:[{"userId":u.userId},{"startDate":{$lte:date}},{"endDate":{$gte:date}}]},{
                    $set:{"userStats":str,lastUpdate:date}
                  })
                 // console.log(updateAllChanges)
                }
                allIndex++
              }else{
                allIndex++
              }
              
              }
            }else{
              console.log("!!!!\n\n\n\EXCEPTION:Streak has no problems\n\n")
              allIndex++
            }
          }else if(streak==null){
            //should modify all groups where this date is between their start and end date
            //console.log("FAIL:"+user.firstname+ " | "+date.toString().substring(0,15)+ " | 0 problems | "+c.title)
              if(!c.lastUpdated.toString().substring(0,15)==new Date().toString().substring(0,15)){
           // console.log(u.userStats.passes)
          
               if(u.userStats.passes==0 && date.toString().substring(0,15)!=curr.toString().substring(0,15) && date.toString().substring(0,15)!=stopDate.toString().substring(0,15)){
                   
                if(!processed.includes(u.userId) && date.toString().substring(0,15)!=curr.toString().substring(0,15) && date.toString().substring(0,15)!=stopDate.toString().substring(0,15)){ 
                      processed.push(u.userId)
                    const str=u.userStats
                    str.success=false
                    str.dateFailed=date
                    const updateAllChanges=await GroupChallenge.updateMany({$and:[{"userId":u.userId},{"startDate":{$lte:date}},{"endDate":{$gte:date}}]},{
                      $set:{"success":false,"userStats":str,lastUpdate:date}
                    })
                   // console.log(updateAllChanges) 
                  
                    allLosers.push({userId:user.userId,day:date.toString().substring(0,15)})
                 }
                  }else if (u.userStats.passes>0 && date.toString().substring(0,15)!=curr.toString().substring(0,15) && date.toString().substring(0,15)!=stopDate.toString().substring(0,15)){
                   
                    const str=u.userStats
                    str.passes--
                    const updateAllChanges=await GroupChallenge.updateMany({$and:[{"userId":u.userId},{"startDate":{$lte:date}},{"endDate":{$gte:date}}]},{
                      $set:{"userStats":str,lastUpdate:date}
                    })
                    //console.log(updateAllChanges)
                  }  
                }
            allIndex++ 
          }else{
            console.log("EXCEPTION")
            allIndex++
          }
          console.log(allIndex,"all",all.length)
         // console.log("\n\n\n"+c.title + " allINDEX:"+allIndex+ " all length "+all.length)
          //console.log(date.toString().substring(0,15)+" | start:"+c.startDate.toString().substring(0,15)+ " | stop:"+stopDate.toString().substring(0,15)+"index:"+ allIndex)
          
            
          if(allIndex>=all.length){ 
      
          
           if(date.toString().substring(0,15)==startDate.toString().substring(0,15) && new Date().toString().substring(0,15)==startDate.toString().substring(0,15)){
            console.log("\n\nTODAY IS THE START OF THE CHALLENGE")
            AllStreaks.push({challenge:challenge,streaks:streaks,problemCounter:problemCounter})
            allChallengesIndex++
          date.setDate(date.getDate()+1)
            if(allChallengesIndex>=group.length){
              if(!res.headersSent){
                try{
              res.json({time:time+" secs",challenges:AllStreaks,ch:ch})
              break
                }catch(err){
                  console.log(err)
                }
              }  
            }

           }else{
 
            console.log("\n\n4666 Bhere",date.toString().substring(0,15),"start:",c.startDate,new Date().toString().substring(0,15),"\n\n")
          console.log(allIndex," "+ all.length)
            streaks.map((s)=>{
            console.log(s.date.toString().substring(0,15)," "+s.user.userId+" ",s.streak.problems.length+" problems")
           })
              
            if(new Date().toString().substring(0,15)==date.toString().substring(0,15) && date<stopDate && date> startDate){
              console.log(date.toString().substring(0,15+"  streaks length "+streaks.length))
              console.log("\n\nSEND!!!\n\n") 
              var ind=0
              while(ind<all.length){
                const user=await User.findOne({"userId":all[ind].userId})
                
                var str=await Streak.findOne({$and:[{"userId":user.userId},{"day":curr.toString().substring(0,15)}]})
                if(str!=null){
                  problemCounter[user.userId]+=str.problems.length
                streaks.push({streak:str,date:curr,challengeId:c.challengeId,user:user}) 
                } 
                ind++
                if(ind>=all.length){
                 console.log("FINAL DAY CHECK",date)
                  AllStreaks.push({challenge:challenge,streaks:streaks,problemCounter:problemCounter})
                  date.setDate(date.getDate()+1)
                  setTimeout(()=>{
                    //console.log("4617 SENT HERE")
                    try{
                      if(!res.headersSent){
                    res.json({time:time+" secs",challenges:AllStreaks,ch:ch})
                    allIndex=1000
                      }
                    }catch(err){

                    }
                    
                  },200)
                }
              }
    
            }
            else if((date>c.endDate || date.toString().substring(0,15)==stopDate.toString().substring(0,15)) && new Date()>c.endDate){
             // console.log("PROBABLY AN OLD CHALLENGE THAT SNUCK THROUGH")
              if(allLosers.length>0){ 
               // console.log("losers length:"+allLosers.length) 
              rank=allLosers.length
            
              while(allLosers.length!=0){ 
              if(allLosers.length==1){ 
                //console.log("rank:"+ rank+ " for "+allLosers[0].userId)
                allLosers[0].rank=rank
                allL.push(allLosers[0]) 
                allLosers.splice(0,1)
                rank--
            
              }else if(allLosers.length>1){
                const first=await findFirstLoser2(allLosers,c)
                if(first!=null){
                first.rank=rank
                
                allL.push(first)
                //console.log("first:",first)
                var lIndex
                var ii 
                allLosers.map((l)=>{
                  if(l.userId==first.userId){
                    ii=lIndex
                  }
                  lIndex++
                })
                allLosers.splice(ii,1)
              }else{
                allLosers.splice(0,allLosers.length-1)
             
              }
                rank--
              
                //res.json({first:first,all:allLosers})
                //console.log("LOSERS LENGTH:"+allLosers.length)
                if(allLosers.length==0){
                  //console.log("---------BREAK ALLLOSERS EMPTIED\n\n")
                  AllStreaks.push({challenge:challenge,streaks:streaks,problemCounter:problemCounter})
                 
                  console.log("Here ALLINDEX:"+allChallengesIndex+" group:"+ group.length)
                 
                  allChallengesIndex++ 
                  ch.push(c.title)
                  if(allChallengesIndex>=group.length){ 
                    setTimeout(()=>{
                      date.setDate(date.getDate()+1)
                      console.log("SENDING AT 4044:"+ date.toString())
                      res.json({ch:ch,allStreaksLength:AllStreaks.length,challenges:AllStreaks,allLosers:allL})
                    
                      
                    },100)
                 
                   
                   
                  } 

                }
              }
            
           
            } 
          }else{
            console.log("NO LOSER")
            ch.push(c.title)
            console.log("\n\ncurrDate:"+date.toString().substring(0,15))
            console.log("endDate:"+c.endDate.toString().substring(0,15))
            console.log("startDate:"+c.startDate.toString().substring(0,15))
            ch.push(c.title)
            console.log("\n\n----------------"+c.title +" is complete")
            allChallengesIndex++
            console.log("allCHALLENGESINDEX:"+allChallengesIndex)
            AllStreaks.push({challenge:challenge,streaks:streaks,problemCounter:problemCounter})

            if(allChallengesIndex>=group.length){
              var endTime=new Date()
              var time=((endTime-startTime)/1000)
              try{
                console.log("\n\nSENDING HERE 4494")
              res.json({time:time+" secs",challenges:AllStreaks,ch:ch})
              }catch(err){

              }
            }
          }
       
            }else if( new Date().toString().substring(0,15)==date.toString().substring(0,15) && new Date()<stopDate){
              const allL=[]
             /* console.log("TODAY HERE: IN BETWEEN START AND END")
              console.log("\n\ncurrDate:"+date.toString().substring(0,15))
              console.log("endDate:"+c.endDate.toString().substring(0,15))
              console.log("startDate:"+c.startDate.toString().substring(0,15))
              console.log("\n\n----------------"+c.title +" is complete and CURRENT")
              console.log("date:",date,streaks.length)*/
              AllStreaks.push({challenge:challenge,streaks:streaks,problemCounter:problemCounter})
              date.setDate(date.getDate()+1)
              allChallengesIndex++ 
              console.log(allChallengesIndex,"group:",group.length,date)
              if(allChallengesIndex>=group.length){ 
                var endTime=new Date()
                var time=((endTime-startTime)/1000)
                console.log("4514 HERE:")
                if(!res.headersSent){
                  try{
                res.json({time:time+" secs",challenges:AllStreaks,ch:ch})
                  }catch(err){
                    console.log(err)
                  }
                }
              }
         
        }else if(new Date().toString().substring(0,15)==date.toString().substring(0,15)  ){
              //console.log("---HERE\n\n--------")
             
             // console.log("CURR:",date.toString().substring(0,15))
             // console.log("STOP:",stopDate.toString())
              var ind=0
              while(ind<all.length){
                const user=await User.findOne({"userId":all[ind].userId})
                
                var str=await Streak.findOne({$and:[{"userId":user.userId},{"day":curr.toString().substring(0,15)}]})
                if(str!=null){
                  problemCounter[user.userId]+=str.problems.length
                streaks.push({streak:str,date:curr,challengeId:c.challengeId,user:user}) 
                } 
                ind++
                if(ind>=all.length){
                  AllStreaks.push({challenge:challenge,streaks:streaks,problemCounter:problemCounter})
                  setTimeout(()=>{
                    console.log("4617 SENT HERE")
                    res.json({time:time+" secs",challenges:AllStreaks,ch:ch})
                    
                  },200)
                }
              }
            
            }else{
              //console.log("NOT END",date.toString())

              date.setDate(date.getDate()+1)
             // console.log(date) 
            }
          
         
          }
        }
        
        }
      } 
    }
      }
   
    }else{ 
      //allChallengesIndex=group.length+1 
      allChallengesIndex++
      date.setDate(date.getDate()+1)
  
      if(allChallengesIndex>=group.length){
        console.log("LIVE DATE"+allChallengesIndex +group.length)

          try{
            console.log("SENT AT 4617")
          res.json({ch:ch,allStreaksLength:AllStreaks.length,challenges:AllStreaks,allLosers:allLosers})
          
          }catch(err){
            console.log(err)
            date.setDate(date.getDate()+1)
          }
    
        
       // date.setDate(date.getDate()+1)
      }
      try{
        setTimeout(()=>{
     
        },100)
        
      }catch{

      }
      break
    }
    }
  }else{
    console.log("HERE:")
    allChallengesIndex++
    //res.json({success:true})
  }
}else{
  allChallengesIndex++
 
 console.log(Object.keys(groupData))
 const gc=await GroupChallenge.findOne({"challengeId":groupData.challengeId})
  AllStreaks.push({challenge:gc,streaks:groupData.streaks,problemCounter:groupData.problemCounter});
  ch.push(c.title)
  if(allChallengesIndex>=group.length){
   
    var endTime=new Date()
    var time=((endTime-startTime)/1000)
    console.log("\n\nSending 4655")
    res.json({time:time+" secs",ch:ch,challenges:AllStreaks})
    
  }
}
  }
}else{
  allChallengesIndex++
  if(allChallengesIndex>=group.length){ 
    setTimeout(()=>{
      date.setDate(date.getDate()+1)
      console.log("SENDING AT 4044:"+ date.toString())
      try{
        if(!res.headersSent){
      res.json({ch:ch,allStreaksLength:AllStreaks.length,challenges:AllStreaks})
        }
      }catch(err){
        console.log(err,"ALREADY SENT")
       // res.json({ch:ch,allStreaksLength:AllStreaks.length,challenges:AllStreaks,allLosers:allL})

        try{
      
        res.json({ch:ch,allStreaksLength:AllStreaks.length,challenges:AllStreaks})
          
        }catch(err){
          console.log("ALREADY SENT",err)
        }
      }
    
      
    },100)
 
   
   
  } 
}
}
  
})
//good i think
app.post("/finalize-group-challenges/:challengeId",async(req,res)=>{
  const challenges=await GroupChallenge.find({'challengeId':req.params.challengeId})
  console.log(challenges.length)
  var index=0
  var day=challenges[index].startDate
  var stopDate=challenges[index].endDate
  stopDate.setDate(stopDate.getDate()+1)
  console.log(stopDate)
  var problemCounter={}

  const allStreaks=[]
  const ALLSTREAKS=[]
  var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
    "Aug","Sep","Oct","Nov","Dec"];
    var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]
   const allLosers=[]
   const processedLosers=[]
  while(day<stopDate){
    var userIndex=0
   const streaks=[]
   const losers=[]
   console.log("-------------------DATE:",day)
    while(userIndex<challenges.length){
     
      const u=challenges[userIndex]
     
      var user=await User.findOne({"userId":u.userId})
      const userData={
        userId:user.userId,
        username:user.username,
        firstname:user.firstname,
        lastname:user.lastname,
        bio:user.bio,
        profilePicUrl:user.profilePicUrl,
        challengeId:req.params.challengeId
      }
      if(problemCounter[user.userId]==null){
        problemCounter[user.userId]={
          problems:0,
        user:userData
        }
      }
      var streak=await Streak.findOne({$and:[{"userId":u.userId},{"day":day.toString().substring(0,15)}]})
      if(streak!=null){
        var dday=streak.day.split(" ")
        dday=new Date(dday[3],monthnum[months.indexOf(dday[1])-1],dday[2])

        streaks.push({user:userData,streak:streak,date:dday})
        ALLSTREAKS.push({user:userData,streak:streak,date:dday})
        problemCounter[u.userId].problems+=streak.problems.length
        if(streak.problems.length<challenges[userIndex].no_questions){
          if(!processedLosers.includes(u.userId)){
            processedLosers.push(u.userId)
            console.log(processedLosers)
          losers.push({day:dday,user:user,streak:streak})
          }
        }
        userIndex++

      }else{
        if(!processedLosers.includes(u.userId)){
         
          processedLosers.push(u.userId)
          console.log(processedLosers)
        losers.push({day:day,user:user,streak:null})
        }
        userIndex++
      }
      if(userIndex>=challenges.length){
        if(streaks.length>0){
      
        var correctDay=streaks[0].date.toString().split(" ")
        correctDay=new Date(correctDay[3],monthnum[months.indexOf(correctDay[1])-1],correctDay[2])
        allStreaks.push({day:correctDay,streaks:streaks})
       
      }
      if(losers.length>0){
        allLosers.push({date:correctDay,losers:losers})
        }
        console.log("\n\nBREAK",correctDay)
      
          day.setDate(day.getDate()+1)
          if(day.toString().substring(0,15)==stopDate.toString().substring(0,15)){
            const updateGroupData=await GroupChallengeData.updateOne({"challengeId":req.params.challengeId},{
              $set:{"problemCounter":problemCounter,'streaks':ALLSTREAKS}
            })
            res.json({problemCounter:problemCounter,streaks:allStreaks,losers:allLosers})
          }
      
      
      }
    }
  }
})

async function getLoserFromLosers(challenge,allLosers,date){
  var loser
  var stop=new Date()
  stop.setDate(new Date(challenge.startDate).getDate()-1)
  var foundLoser=await allLosers.reduce(async(a,b)=>{
   
    var aProbs=0
    var bProbs=0
    
   console.log(Object.keys(a),Object.keys(b))
    if(a!=null && b!=null && Object.keys(a).length>0 && Object.keys(b).length>0){
      console.log("NEITHER NULL")
    if(a.streak==null && b.streak!=null){
      loser=a
      return a
      
    }else if(a.streak!=null && b.streak==null){
      loser=b
      return b
   
    }else if(a.streak==null && b.streak==null){
      loser="BOTH"
      const start=challenge.startDate 
      var earlierAdded
      if(b.day.toString().substring(0,15)==a.day.toString().substring(0,15)){
        console.log("EQUAL DAY")
        var curr=new Date(date)
        var stopDate=challenge.startDate
        stopDate.setDate(stopDate.getDate()-1)
     
       
        if(date.toString().substring(0,15)!=challenge.startDate.toString().substring(0,15)){
          console.log("INVESTIGATE")
          curr.setDate(curr.getDate()-1)
          //curr=new Date(curr)
          console.log("curr",curr)
          console.log("stopDate",stopDate)
          if(curr.toString().substring(0,15)!=stopDate.toString().substring(0,15)){
          while(curr>stopDate){
            var bstr=await Streak.findOne({$and:[{"userId":b.user.userId},{"day":curr.toString().substring(0,15)}]})
            var astr=await Streak.findOne({$and:[{"userId":a.user.userId},{"day":curr.toString().substring(0,15)}]})
          try{
            console.log("curr",curr)
            console.log("a problems:",astr.problems.length)
            console.log("b problems:",bstr.problems.length)
            earlierAdded=astr.timeLastAdded && bstr.timeLastAdded!=null? astr.timeLasted<bstr.timeLasted? a: b:astr.timeLastAdded!=null && bstr.timeLastAdded==null? a:astr.timeLastAdded==null && bstr.timeLastAdded!=null?b:astr.timeLastAdded==null && bstr.timeLastAdded==null? earlierAdded:earlierAdded
          }catch(err){


          }
            if(astr==null && bstr!=null){
            return a
            break
          }else if(bstr==null && astr!=null){
            return b
            break
          }else if(astr==null && bstr==null){
            console.log("BOTH NULL")
           // loser="BOTH"
            if(earlierAdded!=null){
              loser=earlierAdded
              return earlierAdded
            }
            //return "BOTH"
            break
          }else{
            earlierAdded=astr.timeLastAdded && bstr.timeLastAdded!=null? astr.timeLastedAdded<bstr.timeLastedAdded? a: b:astr.timeLastAdded!=null && bstr.timeLastAdded==null? a:astr.timeLastAdded==null && bstr.timeLastAdded!=null?b:astr.timeLastAdded==null && bstr.timeLastAdded==null? earlierAdded:earlierAdded
            
            aProbs+=astr.problems.length
            bProbs+=bstr.problems.length

            if(astr.problems.length<challenge.no_questions && bstr.problems.length>=challenge.no_questions){
              return a
              break
            }else  if(astr.problems.length>=challenge.no_questions && bstr.problems.length<challenge.no_questions){
              return b
              break
            }else{
              if(earlierAdded!=null){
                console.log("\n\nEARLIER")
                loser=earlierAdded
                return earlierAdded
              }
            }
          }
            curr.setDate(curr.getDate()-1)
            if(curr.toString().substring(0,15)==stopDate.toString().substring(0,15) || curr.toString().substring(0,15)==stop.toString().substring(0,15)){
              console.log("\nFIN",aProbs," b",bProbs)
              if(earlierAdded!=null){
                return earlierAdded
              }
              if(aProbs>bProbs){
                console.log("b")
                loser=b
                return b
                break
              }else if(aProbs<bProbs){
                console.log("a")
                loser=a
                return a
                break
              }else{
                console.log("GOING OFF EARLIER ADDED")
                return earlierAdded
                break
              }
            }

          }
        }else{
          console.log("\n\n CURR")
          curr=challenge.endDate
          console.log("start:",start,"end:",curr)
          aProbs=0
          bProbs=0
          while(curr>stopDate && curr>stop){
            astr=await Streak.findOne({$and:[{"userId":a.user.userId},{"day":curr.toString().substring(0,15)}]})
            bstr=await Streak.findOne({$and:[{"userId":b.user.userId},{"day":curr.toString().substring(0,15)}]})
            try{
              if(astr!=null){
              console.log("a:",astr.problems.length)
              aProbs+=astr.problems.length
              }
              if(bstr!=null){
              console.log("b:",bstr.problems.length)
              bProbs+=bstr.problems.length
              }
            
            }catch(err){

            }
            curr.setDate(curr.getDate()-1)
            if(curr.toString().substring(0,15)==curr.toString().substring(0,15) || curr.toString().substring(0,15)==stop.toString().substring(0,15)){
              if(aProbs>bProbs){
                loser=b
                return b
              }else if(aProbs<bProbs){
                loser=a
                return a
              }else{
                var coin=coinFlip()
                console.log("\n\nCOIN",coin)
                return coin==0? a:b
              }
            }

          }

      

        }
        }else{
          console.log("\n\nHERE")
      
            console.log("\nFIN",aProbs," b",bProbs)
            if(aProbs>bProbs){
              console.log("b")
              loser=b
              return b
       
            }else if(aProbs<bProbs){
              console.log("a")
              loser=a
              return a
       
            }else{
              
                console.log("\nFIN",aProbs," b",bProbs)
                if(aProbs>bProbs){
                  console.log("b")
                  loser=b
                  return b
               //   break
                }else if(aProbs<bProbs){
                  console.log("a")
                  loser=a
                  return a
                 // break
                }else{
                  console.log("\n\n CURR")
                  curr=challenge.endDate
                  console.log("start:",start,"end:",curr)
                  aProbs=0
                  bProbs=0
                  while(curr>stopDate && curr>stop){
                    astr=await Streak.findOne({$and:[{"userId":a.user.userId},{"day":curr.toString().substring(0,15)}]})
                    bstr=await Streak.findOne({$and:[{"userId":b.user.userId},{"day":curr.toString().substring(0,15)}]})
                    try{
                      if(astr!=null){
                      console.log("a:",astr.problems.length)
                      aProbs+=astr.problems.length
                      }
                      if(bstr!=null){
                      console.log("b:",bstr.problems.length)
                      bProbs+=bstr.problems.length
                      }
                    
                    }catch(err){
  
                    }
                    curr.setDate(curr.getDate()-1)
                    if(curr.toString().substring(0,15)==curr.toString().substring(0,15) || curr.toString().substring(0,15)==stop.toString().substring(0,15)){
                      if(aProbs>bProbs){
                        loser=b
                        return b
                      }else if(aProbs<bProbs){
                        loser=a
                        return a
                      }else{
                        var coin=coinFlip()
                        console.log("\n\nCOIN",coin)
                        return coin==0? a:b
                      }
                    }
  
                  }
                  //return "BOTH EQUAL PROBLEM COUNTERS"
                  //break
                }
              
            }
          

        }
      }
     // return "BOTH"
    }else {
      console.log("\n\nBOTH HAVE STREAK")
      const start=challenge.startDate
      if(b.day.toString().substring(0,15)==a.day.toString().substring(0,15)){
        console.log("EQUAL DAY")
        var curr=new Date(date)
        var stopDate=challenge.startDate
        stopDate.setDate(stopDate.getDate()-1)
      
        console.log("STOP",stop)
        if(curr<=curr || stopDate<challenge.startDate){
          console.log("\n\n\n\ERROOOR-----------") 
        }
        
        if(date.toString().substring(0,15)!=challenge.startDate.toString().substring(0,15)){
          console.log("INVESTIGATE") 
          curr.setDate(curr.getDate()-1)
          //curr=new Date(curr) 
          console.log("curr",curr)
          console.log("stopDate",stopDate)

          while(curr>stopDate && curr>stop){
            var bstr=await Streak.findOne({$and:[{"userId":b.user.userId},{"day":curr.toString().substring(0,15)}]})
            var astr=await Streak.findOne({$and:[{"userId":a.user.userId},{"day":curr.toString().substring(0,15)}]})
            earlierAdded=astr.timeLastAdded && bstr.timeLastAdded!=null? astr.timeLastedAdded<bstr.timeLastedAdded? a: b:astr.timeLastAdded!=null && bstr.timeLastAdded==null? a:astr.timeLastAdded==null && bstr.timeLastAdded!=null?b:astr.timeLastAdded==null && bstr.timeLastAdded==null? earlierAdded:earlierAdded

          try{
            console.log("curr",curr)
            console.log("a problems:",astr.problems.length)
            console.log("b problems:",bstr.problems.length)
            
          }catch(err){

          }
            if(astr==null && bstrk!=null){
            return a
            break
          }else if(bstr==null && astr!=null){
            return b
            break
          }else if(astr==null && bstr==null){
            console.log("BOTH NULL")
            loser="BOTH"
            if(earlierAdded!=null){
              return earlierAdded
            }
            break
          }else{
            if(earlierAdded!=null){
              return earlierAdded
            }
            aProbs+=astr.problems.length
            bProbs+=bstr.problems.length
            if(astr.problems.length<challenge.no_questions && bstr.problems.length>=challenge.no_questions){
              return a
              break
            }else  if(astr.problems.length>=challenge.no_questions && bstr.problems.length<challenge.no_questions){
              return b
              break
            }
          }
            curr.setDate(curr.getDate()-1)
            if(curr.toString().substring(0,15)==stopDate.toString().substring(0,15) || curr.toString().substring(0,15)==stop.toString().substring(0,15)){
              console.log("\nFIN",aProbs," b",bProbs)
              if(aProbs>bProbs){
                console.log("b")
                loser=b
                return b
                break
              }else if(aProbs<bProbs){
                console.log("a")
                loser=a
                return a
                break
              }else{
                
                curr=challenge.endDate
                console.log("start:",start,"end:",curr)
                aProbs=0
                bProbs=0
                while(curr>stopDate){
                  astr=await Streak.findOne({$and:[{"userId":a.user.userId},{"day":curr.toString().substring(0,15)}]})
                  bstr=await Streak.findOne({$and:[{"userId":b.user.userId},{"day":curr.toString().substring(0,15)}]})
                  try{
                    if(astr!=null){
                    console.log("a:",astr.problems.length)
                    aProbs+=astr.problems.length
                    }
                    if(bstr!=null){
                    console.log("b:",bstr.problems.length)
                    bProbs+=bstr.problems.length
                    }
                  
                  }catch(err){

                  }
                  curr.setDate(curr.getDate()-1)
                  if(curr.toString().substring(0,15)==curr.toString().substring(0,15)  || curr.toString().substring(0,15)==stop.toString().substring(0,15)){
                    if(aProbs>bProbs){
                      loser=b
                      return b
                    }else if(aProbs<bProbs){
                      loser=a
                      return a
                    }else{
                      var coin=coinFlip()
                      console.log("\n\nCOIN",coin)
                      return coin==0? a:b
                    }
                  }

                }
                //return "BOTH EQUAL PROBLEM COUNTERS"
                break
              }
            }
          }
        }
      }
    }
  }else if((a==null && b!=null) || ((Object.keys(a).length==0 || Object.keys(a)==null) && Object.keys(b).length>0)){
    console.log("A NULL")
    loser=b
    return b
  }else if((a!=null && b==null) || ((Object.keys(b).length==0 || Object.keys(b)==null) && Object.keys(a).length>0)){
    console.log("B NULL")
    loser=a
    return a
  }else if(Object.keys(b).length==0 && Object.keys(a).length){

  }else{
    console.log(Object.keys(a),Object.keys(b))
    console.log("\n\nWE HAVE A PROBLEM")
    if((Object.keys(a).length==0 || Object.keys(a)==null)){
      console.log("\n\nB")
      loser=b
      return b
    }else if((Object.keys(b).length==0 || Object.keys(b)==null)){
      console.log("\n\nA")
      loser=a
      return a
    }else{
      console.log("\n\n\nPROBLEMS",aProbs,bProbs)
    } 
  }
  })
  var l=await foundLoser
  var i=0

 console.log("loser",loser)
  if(loser!=null){
    allLosers.map((lo)=>{
     // console.log(lo.user.userId,"  ",l.user.userId)
      if(lo.user.userId==l.user.userId){
       
        console.log("\n\nfoundLoser")
        console.log(lo.user.userId)

        console.log("alllosers:",allLosers.length)
        allLosers.splice(i,1)
      }
      i++
    })
  }
  return {loser:loser!=null?loser:l,loser1:l,foundLoser:l,losers:allLosers}

}
function getEarliestWinner(losers,challenge){
 async function getEarliest(losers,challenge){
  var sorted={}
  var rank=losers.length
  var start=new Date(challenge.startDate)
  start.setDate(start.getDate()-1)
  const ids=losers.map((c)=>{
    return c.loser.user.userId
  })
  var end=new Date(challenge.endDate)
  end.setDate(end.getDate()+1)
  var curr=new Date(challenge.startDate)
  console.log(start)
  var times=[]
  while(curr<end){
    var index=0
   
    var ranks={}
  
  
      const sTimes=await Streak.find({$and:[{"day":curr.toString().substring(0,15)},{"userId":{$in:ids}}]})
     if(sTimes.length>0){ 
    
    
      while(sTimes.length>0){
        var currRank=sTimes.length
        var i=0
        if(sTimes.length>1){
        var lowest=sTimes.reduce((a,b)=>{
          if(a.timeLastAdded<b.timeLastAdded){
            return a
          }else{
            return b
          }
        })
        console.log("lowest",lowest.userId,"rank:",currRank)
       ranks[lowest.userId]=currRank
        currRank--
        sTimes.map((c)=>{
          
          if(c.userId==lowest.userId){
            sTimes.splice(i,1)
          }
          i++
        })
      }else{
        var lowest=sTimes[0]
        sTimes.splice(0,1)
        ranks[lowest.userId]=currRank
        console.log("lowest",lowest.userId,"rank:",currRank)
        ids.map((o)=>{
          if(!Object.keys(ranks).includes(o)){
            ranks[o]=losers.length
          }
        })
        times.push({date:curr,ranks:ranks})
        index++
        curr.setDate(curr.getDate()+1)
        console.log("\n\nCOMPLETE")
        
      }

      }

     }else{
      times[index]={date:curr}
     }   
      
   if(curr>=end){
    console.log(times)
    ids.map((i)=>{
      var total=0
      var ind=0
      times.map((t)=>{
        total+=t.ranks[i]
        
       
      })
    
        console.log(i," ave:",total/losers.length)
        sorted[i]=total/losers.length
     

    })
    return sorted
   }
   
  }
}
  var sorted=getEarliest(losers,challenge)
  
  return sorted

}
async function getMostQuestionsWinner(losers,challenge){
 
  async function getMostQuestions(losers,challenge){
    var sorted={}
  var rank=losers.length
  var start=new Date(challenge.startDate)
  start.setDate(start.getDate()-1)
  const ids=losers.map((c)=>{
    return c.loser.user.userId
  })
  var end=new Date(challenge.endDate)
  end.setDate(end.getDate()+1)
 
  
  var index=0
  var sorted={}
  while(index<losers.length){
    var user=losers[index].loser.user
    const streaks=await Streak.find({$and:[{"userId":user.userId},{$and:[{"date":{$gte:start}},{"date":{$lte:end}}]}]})
    var sIndex=0
    var total=0
    if(streaks.length>0){
      while(sIndex<streaks.length){
        total+=streaks[sIndex].problems.length
        sIndex++
        if(sIndex>=streaks.length){
          sorted[user.userId]=total
          index++
          if(index>=losers.length){
            console.log(sorted)
            return sorted
          }
        }
      }
    }else{
      sorted[user.userId]=total
    index++
    if(index>=losers.length){
      console.log(sorted)
      return sorted
    }
    }
  }
}
 var sorted=await getMostQuestions(losers,challenge)

return sorted
}
async function getConsistencyWinner(losers,challenge){
  async function getWinner(losers,challenge){
  var sorted={}
  var rank=losers.length
  var start=new Date(challenge.startDate)
  start.setDate(start.getDate()-1)
  const ids=losers.map((c)=>{
    return c.loser.user.userId
  })
  var end=new Date(challenge.endDate)
  end.setDate(end.getDate()+1)
 
  
  var index=0 
  var sorted={}
  const diff=datediff(new Date(challenge.startDate),new Date(challenge.endDate))
  console.log("DIFF",diff)
  while(index<losers.length){
    var user=losers[index].loser.user
    const streaks=await Streak.find({$and:[{"userId":user.userId},{$and:[{"date":{$gte:start}},{"date":{$lte:end}}]}]})
    if(streaks.length>0){
      sorted[user.userId]=streaks.length
    }else{
      sorted[user.userId]=0
    }
    index++
    if(index>=losers.length){
      return sorted
    }
  }
}
var sorted=getWinner(losers,challenge)
return sorted

}
function datediff(first, second) {        
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
}
app.post("/grade-by-priority",async(req,res)=>{
  var challenge=req.body.challenge
  var priority=req.body.priorities
  console.log(priority)
  
  axios.post("http://localhost:3022/finalize-group-challenges/"+challenge.challengeId).then(async(response)=>{
    console.log(response.data.losers)
    const allLosers=[]
    var singles=true
    const losers=response.data.losers
    response.data.losers.map((l)=>{
      if(l.losers.length>1){
        singles=false
      }
      l.losers.map((c)=>{
        allLosers.push({loser:c,day:l.date})
      })
    })
    console.log(allLosers.length)
    if(singles==false){
      var rank=allLosers.length
      const currLosers=response.data.losers
      while(priority.length>0){
        var p=priority.splice(0,1)[0]
        console.log("priority:",p)
        if(p.text.toUpperCase().includes("EARLIEST")){
          var l=await getEarliestWinner(allLosers,challenge)
          console.log("earliest",l)
        res.json({success:true,ranks:l})
     
        }else if(p.text.toUpperCase().includes("TOTAL # QUESTIONS")){
          var l=await getMostQuestionsWinner(allLosers,challenge)
          console.log(" Most questions",l)
        }else if(p.text.toUpperCase().includes("CONSISTENCY")){
          var l=await getConsistencyWinner(allLosers,challenge)
          console.log(" COnsistency",l)
        }
      }
      

    }else{

    }
  

  })
})
/**
 * GOOOD FOR REAL
 */
app.get("/finalize-grade-group-challenges/:challengeId",async(req,res)=>{
  axios.post("http://localhost:3022/finalize-group-challenges/"+req.params.challengeId).then(async(response)=>{
    console.log("MADE IT",Object.keys(response.data))
    console.log(response.data.losers.length)
    const allLosers=response.data.losers 
    const allRanks=[]
    const ranks={}
    console.log(allLosers)
    var index=0
    const challenge=await GroupChallenge.findOne({"challengeId":req.params.challengeId})
    var singles=true
    var losersLength=0
    allLosers.map((l)=>{
      losersLength+=l.losers.length
      if(l.losers.length>1){
        singles=false
      }
    })
  
    console.log("totalLosers:",losersLength,singles)
    if(losersLength>0){
    if(singles==false){
      console.log("NOT SINGLES")
      var rank=losersLength
     
    
        while(index<allLosers.length && rank>0){
          var losers=allLosers[index].losers
          if(losers.length>1){
          while(losers.length>1){
            console.log("index:",index,"losers",losers.length)
           var l=await  getLoserFromLosers(challenge,losers,allLosers[index].date)
           
           losers=l.losers
           if(allRanks.length==losersLength){
            const updateRanks=await GroupChallengeData.updateOne({"challengeId":req.params.challengeId},{
              $set:{"ranks":allRanks}
            })
            allRanks.map(async(c)=>{
              const updateChallenge=await GroupChallenge.updateOne({$and:[{"challengeId":req.params.challengeId},{"userId":c.user.userId}]},{
                $set:{"rank":c.rank,"status":"COMPLETE_AND_CLOSED"}
              })
              console.log(updateChallenge)
            })
            res.json({ranks:ranks,allRanks:allRanks,losers:response.data.losers})

           }
           if(l.loser!=null){
           console.log("index:",index," new losers",losers.length)
           var newLoser=l.loser
        
           console.log("rank:",rank," loser:",newLoser.user.userId)
           var userData={
            userId:newLoser.user.userId,
            firstname:newLoser.user.firstname,
            lastname:newLoser.user.lastname,
            username:newLoser.user.username,
            bio:newLoser.user.bio,
            profilePicUrl:newLoser.user.profilePicUrl
          }
           allRanks.push({rank:rank,user:userData,date:newLoser.day})
           ranks[newLoser.user.userId]=rank
           rank--
           if(losers.length==1){
            console.log("rank:",rank," loser:",losers[0].user.userId)
            ranks[losers[0].user.userId]=rank
            var userData={
              userId:losers[0].user.userId,
              firstname:losers[0].user.firstname,
              lastname:losers[0].user.lastname,
              username:losers[0].user.username,
              bio:losers[0].user.bio,
              profilePicUrl:losers[0].user.profilePicUrl
            }
            const date=allLosers[0].date
            allRanks.push({rank:rank,user:userData,date:date})
            losers=[]
            console.log(losers.length," ",losersLength)
            if(losers.length==0){
              index++
             }
           
           }
        
            if(losers.length==0 && index==allLosers.length){
              const updateRanks=await GroupChallengeData.updateOne({"challengeId":req.params.challengeId},{
                $set:{"ranks":allRanks}
              })
              allRanks.map(async(c)=>{
                const updateChallenge=await GroupChallenge.updateOne({$and:[{"challengeId":req.params.challengeId},{"userId":c.user.userId}]},{
                  $set:{"rank":c.rank,"status":"COMPLETE_AND_CLOSED"}
                })
                console.log(updateChallenge)
              })
              res.json({ranks:ranks,allRanks:allRanks,losers:response.data.losers})
             
            }
          }else{
           res.json({message:"ERROR",allRanks:allRanks})
          }

          
          }
        }else{
          if(allRanks.length ==losersLength-1){
            rank--
          }
            console.log("rank:",rank," loser:",losers[0].user.userId)
          
            ranks[losers[0].user.userId]=rank
            var userData={
              userId:losers[0].user.userId,
              firstname:losers[0].user.firstname,
              lastname:losers[0].user.lastname,
              username:losers[0].user.username,
              bio:losers[0].user.bio,
              profilePicUrl:losers[0].user.profilePicUrl
            }
            const date=allLosers[0].date
            allRanks.push({rank:rank,user:userData,date:date})
        
            losers=[]
          
            rank--
            index++
            if(losers.length==0 && index==allLosers.length){
              const updateRanks=await GroupChallengeData.updateOne({"challengeId":req.params.challengeId},{
                $set:{"ranks":allRanks}
              })
              allRanks.map(async(c)=>{
                const updateChallenge=await GroupChallenge.updateOne({$and:[{"challengeId":req.params.challengeId},{"userId":c.user.userId}]},{
                  $set:{"rank":c.rank,"status":"COMPLETE_AND_CLOSED"}
                })
                console.log(updateChallenge)
              })
              res.json({ranks:ranks,allRanks:allRanks,losers:response.data.losers})
            }
          }
      }

    }else{
      var rank=losersLength
      var losersIndex=0
    console.log("SINGLES")
      while(losersIndex<losersLength  && rank>0){
        var losers=allLosers[losersIndex].losers
        //console.log("loserLength:",losersIndex<losersLength)
        //console.log("losersLength:",losers.length, "losersIndex:",losersIndex, "rank:",rank)
        var loser=allLosers[losersIndex].losers[0]
       
        var userData={
          userId:losers[0].user.userId,
          firstname:losers[0].user.firstname,
          lastname:losers[0].user.lastname,
          username:losers[0].user.username,
          bio:losers[0].user.bio,
          profilePicUrl:losers[0].user.profilePicUrl
        }
        const date=allLosers[0].date
        allRanks.push({rank:rank,user:userData,date:date})
       
        ranks[loser.user.userId]=rank 
       
        console.log("rank:",rank,"loser:",loser.user.userId)
        rank--
        losers=[] 
        console.log(losers.length," ",losersLength," ",losersIndex)
        losersIndex++
        if(losers.length==0 && losersIndex==allLosers.length){
          const updateRanks=await GroupChallengeData.updateOne({"challengeId":req.params.challengeId},{
            $set:{"ranks":allRanks}
          })
          allRanks.map(async(c)=>{
            const updateChallenge=await GroupChallenge.updateOne({$and:[{"challengeId":req.params.challengeId},{"userId":c.user.userId}]},{
              $set:{"rank":c.rank,"status":"COMPLETE_AND_CLOSED"}
            })
            console.log(updateChallenge)
          })
          res.json({ranks:ranks,allRanks:allRanks,losers:response.data.losers})
        }
       
     
         
          
        
      }
    }
  }else{
    res.json({ranks:[],message:"no losers",losers:response.data.losers})
  }

  })
})
app.get("/group-challenges-2/:userId",async(req,res)=>{
  const group=await GroupChallenge.find({"userId":req.params.userId})
  const days=[]
  const users=[]
  const allCha=[]
  const streakIds=[]
  console.log(group.length)
  var complete=false
  var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
"Aug","Sep","Oct","Nov","Dec"];
var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]
           

  const processed=[]
  var allChallengesIndex=0
  const AllStreaks=[]
  while(allChallengesIndex<group.length){
    var c=group[allChallengesIndex]
    //console.log(c.title)
    const challenge=c
    const all=[c]
    const others=await GroupChallenge.find({$and:[{"userId":{$ne:req.params.userId}},{"challengeId":c.challengeId}]}
    )
    console.log("ALLINDEX:"+allChallengesIndex, "others:"+others.length)
    if(others.length>0){
    others.map((o)=>{
     
      all.push(o)
        
    })
  
    if(all.length==others.length+1){
      console.log(c.title,all.length)

      var startDate=c.startDate
      var stopDate=new Date()
      var endDate=new Date(c.endDate)
      var stopDate=new Date(c.endDate)
      stopDate.setDate(stopDate.getDate()+1)
      var date=new Date(c.startDate)
      var curr=new Date()
  
      //stopDate=stopDate.getDate()+1
     
      //console.log(date.toString().substring(0,15) +" | curr"+curr.toString().substring(0,15) +" | stop:"+stopDate.toString().substring(0,15)) 
      
      const processed=[]
      const allLosers=[] 
      const streaks=[]   
      var checkEnd=new Date()
      checkEnd=new Date(checkEnd.setDate(c.endDate.getDate()-1)) 
      console.log(date)
      console.log("startdate:",startDate)  
      console.log("stopDate:",stopDate) 
      var tommorow=new Date(curr)
      tommorow=tommorow.setDate(tommorow.getDate()+1)
      if(/*date.toString().substring(0,15)!=curr.toString().substring(0,15) && */complete==false){
        console.log("HERE")
        var problemCounter={}
      while(/*complete==false&& date<curr*/date<stopDate  && date<tommorow/*date.toString().substring(0,15)!=curr.toString().substring(0,15) && date.toString().substring(0,15)!=stopDate.toString().substring(0,15)*/){
        var allIndex=0
       // console.log("IN WHILE LOOP")
        //console.log(date.toString().substring(0,15)+" | start:"+c.startDate.toString().substring(0,15)+ " | stop:"+stopDate.toString().substring(0,15)+"index:"+ allIndex)
      //console.log("here:"+new Date(checkEnd.setDate(c.endDate.getDate()-1)).toString().substring(0,15))
       
        while(allIndex<all.length){ 
          const u=all[allIndex]   
         
          const streak=await Streak.findOne({$and:[{"userId":u.userId},{"day":date.toString().substring(0,15)}]})
     
          const user=await User.findOne({"userId":u.userId})
          if(streak!=null){
            //console.log(u.userId +" "+streak.problems.length+ " for day "+streak.day)
            //console.log("---------------"+streak.day+"---problems:"+streak.problems.length+"----"+streaks.length+"-----------------")
          
            var day=streak.day.split(" ")
            day=new Date(day[3],monthnum[months.indexOf(day[1])-1],day[2])
           // if(users.includes(user.userId) && days.includes(day.toString().substring(0,15)) && allCha.includes(c.challengeId)){
             // console.log("ALREADY:"+user.firstname+ " challenge:"+c.title+"---"+streak.day)
            //}else{ 
              

              streaks.push({streak:streak,date:day,challengeId:c.challengeId,user:user})
              days.push(day.toString().substring(0,15))
              users.push(user.userId)
              allCha.push(c.challengeId) 
              streakIds.push(streak.id)
            //}
            if(streak.problems!=null){
              if(streak.problems.length>=c.no_questions){
                if(problemCounter[user.userId]==null){
                  problemCounter[user.userId]=0;
                  problemCounter[user.userId]=problemCounter[user.userId]+streak.problems.length
                }else{
                  problemCounter[user.userId]=problemCounter[user.userId]+streak.problems.length;
  
                }
            

                allIndex++
              }else{
                if(problemCounter[user.userId]==null){
                  problemCounter[user.userId]=0;
                  problemCounter[user.userId]=problemCounter[user.userId]+streak.problems.length
                }else{
                  problemCounter[user.userId]=problemCounter[user.userId]+streak.problems.length;
  
                }
                

                //console.log("FAIL:"+user.firstname+ " | "+date.toString().substring(0,15)+ " | 0 problems | "+c.title)
                //console.log(u.userStats.passes)
                if(c.lastUpdated.toString().substring(0,15)==new Date().toString().substring(0,15)){
               // console.log(u.userStats)
                if(u.userStats.passes==0 && date.toString().substring(0,15)!=curr.toString().substring(0,15) && date.toString().substring(0,15)!=stopDate.toString().substring(0,15)){
                  if(!processed.includes(u.userId) && date.toString().substring(0,15)!=curr.toString().substring(0,15) && date.toString().substring(0,15)!=stopDate.toString().substring(0,15)){
                    processed.push(user.userId)
                  const str=u.userStats
                  str.success=false
                  str.dateFailed=date
                  const updateAllChanges=await GroupChallenge.updateMany({$and:[{"userId":u.userId},{"startDate":{$lte:date}},{"endDate":{$gte:date}}]},{
                    $set:{"success":false,"userStats":str,lastUpdate:date}
                  })
                 // console.log(updateAllChanges)
                  streak.firstname=user.firstname
                  allLosers.push(streak)
                }

                }else if(u.userStats.passes>0 && date.toString().substring(0,15)!=curr.toString().substring(0,15) && date.toString().substring(0,15)!=stopDate.toString().substring(0,15)){
                 
                  const str=u.userStats
                    str.passes--
                  const updateAllChanges=await GroupChallenge.updateMany({$and:[{"userId":u.userId},{"startDate":{$lte:date}},{"endDate":{$gte:date}}]},{
                    $set:{"userStats":str,lastUpdate:date}
                  })
                 // console.log(updateAllChanges)
                }
                allIndex++
              }else{
                allIndex++
              }
              
              }
            }else{
              console.log("!!!!EXCEPTION:Streak has no problems\n\n")
            }
          }else{
            //should modify all groups where this date is between their start and end date
            //console.log("FAIL:"+user.firstname+ " | "+date.toString().substring(0,15)+ " | 0 problems | "+c.title)
              if(c.lastUpdated.toString().substring(0,15)==new Date().toString().substring(0,15)){
           // console.log(u.userStats.passes)
          
               if(u.userStats.passes==0 && date.toString().substring(0,15)!=curr.toString().substring(0,15) && date.toString().substring(0,15)!=stopDate.toString().substring(0,15)){
                   
                if(!processed.includes(u.userId) && date.toString().substring(0,15)!=curr.toString().substring(0,15) && date.toString().substring(0,15)!=stopDate.toString().substring(0,15)){ 
                      processed.push(u.userId)
                    const str=u.userStats
                    str.success=false
                    str.dateFailed=date
                    const updateAllChanges=await GroupChallenge.updateMany({$and:[{"userId":u.userId},{"startDate":{$lte:date}},{"endDate":{$gte:date}}]},{
                      $set:{"success":false,"userStats":str,lastUpdate:date}
                    })
                   // console.log(updateAllChanges) 
                  
                    allLosers.push({userId:user.userId,day:date.toString().substring(0,15)})
                 }
                  }else if (u.userStats.passes>0 && date.toString().substring(0,15)!=curr.toString().substring(0,15) && date.toString().substring(0,15)!=stopDate.toString().substring(0,15)){
                   
                    const str=u.userStats
                    str.passes--
                    const updateAllChanges=await GroupChallenge.updateMany({$and:[{"userId":u.userId},{"startDate":{$lte:date}},{"endDate":{$gte:date}}]},{
                      $set:{"userStats":str,lastUpdate:date}
                    })
                    console.log(updateAllChanges)
                  }  
                }
            allIndex++ 
          }
         // console.log("\n\n\n"+c.title + " allINDEX:"+allIndex+ " all length "+all.length)
          console.log(date.toString().substring(0,15)+" | start:"+c.startDate.toString().substring(0,15)+ " | stop:"+stopDate.toString().substring(0,15)+"index:"+ allIndex)

          if(allIndex>=all.length){
            all.map((a)=>{
              if(!Object.keys(problemCounter).includes(a.userId)){
                problemCounter[a.userId]=0;
              }
            })
           // console.log("\nCHALLENGE ENDS HERE",date.toString())
           // console.log(date.toString().substring(0,15)+"\n\n")
           // console.log(c.startDate<=new Date() ) 
           // console.log(c.endDate>=new Date())
           // console.log("\n\nALLINDEX:"+allIndex+ " date:"+date.toString().substring(0,15))

            //console.log("DAY COMPLETE:"+allIndex)
            var rank=all.length
            //console.log("\n\n-----------ALLLOSERS:"+allLosers.length)
            const allL=[]
            //console.log("\n\nALLINDEX:"+allIndex)
            //console.log("END:"+c.title+ "| end:"+c.endDate.toString().substring(0,15)+  " | date:"+date.toString().substring(0,15))
           // console.log("END:--"+c.endDate.toString().substring(0,15)+"\n"+date.toString().substring(0,15)+"\n\n")
            if(date.toString().substring(0,15)==c.endDate.toString().substring(0,15) || date>c.endDate){
                    console.log("\n\nEND:"+c.title+ "| end:"+c.endDate.toString().substring(0,15)+  " | date:"+date.toString().substring(0,15))

              if(allLosers.length>0){ 
                console.log("losers length:"+allLosers.length) 
              
            
              while(allLosers.length!=0){
              if(allLosers.length==1){ 
                //console.log("rank:"+ rank+ " for "+allLosers[0].userId)
                allLosers[0].rank=rank
                allL.push(allLosers[0]) 
                allLosers.splice(0,1)
                rank--
            
              }else if(allLosers.length>1){
                const first=await findFirstLoser2(allLosers,c)
                if(first!=null){
                first.rank=rank
                
                allL.push(first)
                //console.log("first:",first)
                var lIndex
                var ii 
                allLosers.map((l)=>{
                  if(l.userId==first.userId){
                    ii=lIndex
                  }
                  lIndex++
                })
                allLosers.splice(ii,1)
              }else{
                allLosers.splice(0,allLosers.length-1)
                date.setDate(date.getDate()+1)
              }
                rank--
              
                //res.json({first:first,all:allLosers})
                //console.log("LOSERS LENGTH:"+allLosers.length)
                if(allLosers.length==0){
                  //console.log("---------BREAK ALLLOSERS EMPTIED\n\n")
                  AllStreaks.push({challenge:challenge,streaks:streaks,problemCounter:problemCounter})
                  date.setDate(date.getDate()+1)
                  console.log("Here ALLINDEX:"+allChallengesIndex+" group:"+ group.length)
                 
                  allChallengesIndex++ 
                  date.setDate(date.getDate()+1)
                  if(allChallengesIndex>=group.length){
                    setTimeout(()=>{
                      console.log("SENDING AT 4054:"+ date.toString())
                      res.json({allStreaksLength:AllStreaks.length,challenges:AllStreaks,allLosers:allL})
                      date.setDate(date.getDate()+1)
                      
                    },100)
                 
                   
                   
                  } 

                }
              }
             console.log("loser:"+allLosers.length+ " "+c.title + date.toString())
          
            } 
          }else{
            console.log("NO LOSEERS")
            console.log("4861")
            AllStreaks.push({challenge:c,streaks:streaks,problemCounter:problemCounter})
            //allChallengesIndex++  
            //date.setDate(date.getDate()+1)
            allChallengesIndex++ 
            date.setDate(date.getDate()+1)
            
            if(allChallengesIndex<group.length){
              
            console.log(date.toString().substring(0,15)+"ALLINDEX:"+allChallengesIndex+" length:"+streaks.length+ " challene:"+c.title)
         
            console.log("BREAK----NO LOSERS FOR "+c.title+" moving on to next")
            if(!res.headersSent){
              try{
          res.json({allStreaksLength:AllStreaks.length,challenges:AllStreaks,allLosers:allL})
              }catch(err){

              }
            }

            break
            }
            
            //date.setDate(date.getDate()+1)
            if(allChallengesIndex>=group.length){
              setTimeout(()=>{
                try{
                  console.log("\n\nSENDING AT 4182:"+date.toString())
                  if(!res.headersSent){
                    try{
                res.json({allStreaksLength:AllStreaks.length,challenges:AllStreaks,allLosers:allL})
                    }catch(err){

                    }
                  }
                
                }catch(err){ 
                  console.log("date:"+date.toString().substring(0,15) + " allIndex:"+allIndex)
                  console.log("3976",err)
                }
              },100)
              break
             // date.setDate(date.getDate()+1)
            }
       
          }
     }else if(date.toString().substring(0,15)==checkEnd.toString().substring(0,15) && new Date()<=stopDate){
          
      console.log("ALLINDEX:"+allChallengesIndex+"EXCEPTION CURRENT: " + c.title+"\n\n")
      date.setDate(date.getDate()+1) 
      if(date.toString().substring(0,15)==c.endDate.toString().substring(0,15)){
 
      }
      allChallengesIndex++ 
            AllStreaks.push({challenge:c,streaks:streaks,problemCounter:problemCounter})
            if(allChallengesIndex<group.length){
            console.log("ALLINDEX:"+allChallengesIndex+"EXCEPTION CURRENT: " + c.title)
           // date.setDate(date.getDate()+1)
           // allChallengesIndex++  
          
            //break
            }
          
            //date.setDate(date.getDate()+1)
            if(allChallengesIndex>=group.length){
              setTimeout(()=>{
                try{
                  console.log
                res.json({allStreaksLength:AllStreaks.length,challenges:AllStreaks,allLosers:allL})
                
                }catch(err){

                }
              },100)
              break
             // date.setDate(date.getDate()+1)
            }
            }else{ 
              console.log("LAST CASE OTHER HERE")
              console.log(date.toString())
            date.setDate(date.getDate()+1)
            console.log(date.toString())
            console.log(curr.toString())
           // AllStreaks.push({challenge:c,streaks:streaks,problemCounter:problemCounter})
            if(date.toString().substring(0,15)==curr.toString().substring(0,15) || date>new Date()){
              console.log("DATES EQUAL")
              AllStreaks.push({challenge:c,streaks:streaks,problemCounter:problemCounter})
              try{
                complete=true
                setTimeout(()=>{
                  try{
                    console.log("allChallengesindex:"+allChallengesIndex+ " group"+group.length)
                    allChallengesIndex=group.length+1 
                    console.log("\n\nSENT allChallenge:"+allChallengesIndex + " date:"+date.toString())
                
                      console.log("SENT AT  4164:"+c.title)
                    res.json({success:true,allStreaksLength:AllStreaks.length,challenges:AllStreaks,allLosers:allL})
                  
                    //date.setDate(c.endDate.getDate()+2)
                  }catch(err){
                    console.log("TRY CATCHSENT AT 4168")
                   // res.json({success:true,allStreaksLength:AllStreaks.length,challenges:AllStreaks,allLosers:allL})

                  }
   
                },100)
                

                break
                }catch(err){ 
                  console.log("ERR",err)
                }
              //in the case of currently on going challenges
            }else{
              
              if(date>=c.endDate){
                console.log("SHOULD BE COMPLETE:",c.endDate.toString()," date",date.toString())
              AllStreaks.push({challenge:c,streaks:streaks,problemCounter:problemCounter})
              try{
             
              allChallengesIndex++
              if(allChallengesIndex>=group.length){
              
              res.json({success:true,allStreaksLength:AllStreaks.length,challenges:AllStreaks,allLosers:allL})
              console.log("SENT AT 4184 "+c.title)
              console.log("ALLCHALLENGESINDEX:"+allChallengesIndex+" GROUP:"+group.length)
            }
              }catch(err){

              }
            }
            }
           // break
            console.log(date,"\n\n")
            }
           
          }
        }
      }
    }else{ 
      //allChallengesIndex=group.length+1 
      allChallengesIndex++
      date.setDate(date.getDate()+1)
  
      if(allChallengesIndex>=group.length){
        console.log("LIVE DATE"+allChallengesIndex +group.length)

          try{
            console.log("SENT AT 4208")
          res.json({allStreaksLength:AllStreaks.length,challenges:AllStreaks,allLosers:allLosers})
          
          }catch(err){
            console.log(err)
            date.setDate(date.getDate()+1)
          }
    
        
       // date.setDate(date.getDate()+1)
      }
      try{
        setTimeout(()=>{
     
        },100)
        
      }catch{

      }
      break
    }
    }
  }else{
    console.log("HERE:")
    allChallengesIndex++
    //res.json({success:true})
  }
  }
})
app.get("/group-challenges-2/:userId/:challengeId",async(req,res)=>{
  const group=await GroupChallenge.findOne({$and:[{"userId":req.params.userId},{"challengeId":req.params.challengeId}]})
  const days=[]
  const users=[]
  const allCha=[]
  const streakIds=[]
  const already=[]
  console.log(group.length)
  var complete=false
  var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
"Aug","Sep","Oct","Nov","Dec"];
var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]
  const processed=[]
  var allChallengesIndex=0
  const AllStreaks=[]

    var c=group
    //console.log(c.title)
    const challenge=c
    const all=[c]
    const others=await GroupChallenge.find({$and:[{"userId":{$ne:req.params.userId}},{"challengeId":c.challengeId}]}
    )
    console.log("ALLINDEX:"+allChallengesIndex, "others:"+others.length)
    if(others.length>0){
    others.map((o)=>{
     
      all.push(o)
        
    })
  
    if(all.length==others.length+1){
      console.log(c.title,all.length)

      var startDate=c.startDate
      var stopDate=new Date()
      var endDate=new Date(c.endDate)
      var stopDate=new Date(c.endDate)
      stopDate.setDate(stopDate.getDate()+1)
      var date=new Date(c.startDate)
      var curr=new Date()
  
      //stopDate=stopDate.getDate()+1
     
      //console.log(date.toString().substring(0,15) +" | curr"+curr.toString().substring(0,15) +" | stop:"+stopDate.toString().substring(0,15)) 
      
      const processed=[]
      const allLosers=[] 
      const streaks=[]   
      var checkEnd=new Date()
      checkEnd=new Date(checkEnd.setDate(c.endDate.getDate()-1)) 
      console.log(date)
      console.log("startdate:",startDate)  
      console.log("stopDate:",stopDate) 
      var tommorow=new Date(curr)
      tommorow=tommorow.setDate(tommorow.getDate()+1)
      if(/*date.toString().substring(0,15)!=curr.toString().substring(0,15) && */complete==false){
        console.log("HERE")
        var problemCounter={}
      while(/*complete==false&& date<curr*/date<stopDate  && date<tommorow/*date.toString().substring(0,15)!=curr.toString().substring(0,15) && date.toString().substring(0,15)!=stopDate.toString().substring(0,15)*/){
        var allIndex=0
        console.log("IN WHILE LOOP")
        //console.log(date.toString().substring(0,15)+" | start:"+c.startDate.toString().substring(0,15)+ " | stop:"+stopDate.toString().substring(0,15)+"index:"+ allIndex)
      //console.log("here:"+new Date(checkEnd.setDate(c.endDate.getDate()-1)).toString().substring(0,15))
       
        while(allIndex<all.length){ 
          const u=all[allIndex]   
         
          const streak=await Streak.findOne({$and:[{"userId":u.userId},{"day":date.toString().substring(0,15)}]})
     
          const user=await User.findOne({"userId":u.userId})
          if(streak!=null){
            console.log(u.userId +" "+streak.problems.length+ " for day "+streak.day)
            //console.log("---------------"+streak.day+"---problems:"+streak.problems.length+"----"+streaks.length+"-----------------")
          
            var day=streak.day.split(" ")
            day=new Date(day[3],monthnum[months.indexOf(day[1])-1],day[2])
           // if(users.includes(user.userId) && days.includes(day.toString().substring(0,15)) && allCha.includes(c.challengeId)){
             // console.log("ALREADY:"+user.firstname+ " challenge:"+c.title+"---"+streak.day)
            //}else{ 
              

              streaks.push({streak:streak,date:day,challengeId:c.challengeId,user:user})
              days.push(day.toString().substring(0,15))
              users.push(user.userId)
              allCha.push(c.challengeId) 
              streakIds.push(streak.id)
            //}
            if(streak.problems!=null){
              if(streak.problems.length>=c.no_questions){
                if(problemCounter[user.userId]==null){
                  problemCounter[user.userId]=0;
                  problemCounter[user.userId]=problemCounter[user.userId]+streak.problems.length
                }else{
                  problemCounter[user.userId]=problemCounter[user.userId]+streak.problems.length;
  
                }
            

                allIndex++
              }else{
                if(problemCounter[user.userId]==null){
                  problemCounter[user.userId]=0;
                  problemCounter[user.userId]=problemCounter[user.userId]+streak.problems.length
                }else{
                  problemCounter[user.userId]=problemCounter[user.userId]+streak.problems.length;
  
                }
                

                //console.log("FAIL:"+user.firstname+ " | "+date.toString().substring(0,15)+ " | 0 problems | "+c.title)
                //console.log(u.userStats.passes)
                if(c.lastUpdated.toString().substring(0,15)==new Date().toString().substring(0,15)){
               // console.log(u.userStats)
                if(u.userStats.passes==0 && date.toString().substring(0,15)!=curr.toString().substring(0,15) && date.toString().substring(0,15)!=stopDate.toString().substring(0,15)){
                  if(!processed.includes(u.userId) && date.toString().substring(0,15)!=curr.toString().substring(0,15) && date.toString().substring(0,15)!=stopDate.toString().substring(0,15)){
                    processed.push(user.userId)
                  const str=u.userStats
                  str.success=false
                  str.dateFailed=date
                  const updateAllChanges=await GroupChallenge.updateMany({$and:[{"userId":u.userId},{"startDate":{$lte:date}},{"endDate":{$gte:date}}]},{
                    $set:{"success":false,"userStats":str,lastUpdate:date}
                  })
                 // console.log(updateAllChanges)
                  streak.firstname=user.firstname
                  allLosers.push(streak)
                }

                }else if(u.userStats.passes>0 && date.toString().substring(0,15)!=curr.toString().substring(0,15) && date.toString().substring(0,15)!=stopDate.toString().substring(0,15)){
                 
                  const str=u.userStats
                    str.passes--
                  const updateAllChanges=await GroupChallenge.updateMany({$and:[{"userId":u.userId},{"startDate":{$lte:date}},{"endDate":{$gte:date}}]},{
                    $set:{"userStats":str,lastUpdate:date}
                  })
                 // console.log(updateAllChanges)
                }
                allIndex++
              }else{
                allIndex++
              }
              
              }
            }else{
              console.log("!!!!EXCEPTION:Streak has no problems\n\n")
            }
          }else{
        
              if(c.lastUpdated.toString().substring(0,15)==new Date().toString().substring(0,15)){

          
               if(u.userStats.passes==0 && date.toString().substring(0,15)!=curr.toString().substring(0,15) && date.toString().substring(0,15)!=stopDate.toString().substring(0,15)){
                   
                if(!processed.includes(u.userId) && date.toString().substring(0,15)!=curr.toString().substring(0,15) && date.toString().substring(0,15)!=stopDate.toString().substring(0,15)){ 
                      processed.push(u.userId)
                    const str=u.userStats
                    str.success=false
                    str.dateFailed=date
                    const updateAllChanges=await GroupChallenge.updateMany({$and:[{"userId":u.userId},{"startDate":{$lte:date}},{"endDate":{$gte:date}}]},{
                      $set:{"success":false,"userStats":str,lastUpdate:date}
                    })
           
                  
                    allLosers.push({userId:user.userId,day:date.toString().substring(0,15)})
                 }
                  }else if (u.userStats.passes>0 && date.toString().substring(0,15)!=curr.toString().substring(0,15) && date.toString().substring(0,15)!=stopDate.toString().substring(0,15)){
                   
                    const str=u.userStats
                    str.passes--
                    const updateAllChanges=await GroupChallenge.updateMany({$and:[{"userId":u.userId},{"startDate":{$lte:date}},{"endDate":{$gte:date}}]},{
                      $set:{"userStats":str,lastUpdate:date}
                    })
                    console.log(updateAllChanges)
                  }  
                }
            allIndex++ 
          }
      
          console.log(date.toString().substring(0,15)+" | start:"+c.startDate.toString().substring(0,15)+ " | stop:"+stopDate.toString().substring(0,15)+"index:"+ allIndex)

          if(allIndex>=all.length){
            all.map((a)=>{
              if(!Object.keys(problemCounter).includes(a.userId)){
                problemCounter[a.userId]=0;
              }
            })
         
            var rank=all.length
        
            const allL=[]

            if(date.toString().substring(0,15)==c.endDate.toString().substring(0,15) || date>c.endDate){
                    console.log("\n\nEND:"+c.title+ "| end:"+c.endDate.toString().substring(0,15)+  " | date:"+date.toString().substring(0,15))

              if(allLosers.length>0){ 
                console.log("losers length:"+allLosers.length) 
              
            
              while(allLosers.length!=0){
              if(allLosers.length==1){ 
            
                allLosers[0].rank=rank
                allL.push(allLosers[0]) 
                allLosers.splice(0,1)
                rank--
            
              }else if(allLosers.length>1){
                const first=await findFirstLoser2(allLosers,c)
                if(first!=null){
                first.rank=rank
                
                allL.push(first)
                
                var lIndex
                var ii 
                allLosers.map((l)=>{
                  if(l.userId==first.userId){
                    ii=lIndex
                  }
                  lIndex++
                })
                allLosers.splice(ii,1)
              }else{
                allLosers.splice(0,allLosers.length-1)
                date.setDate(date.getDate()+1)
              }
                rank--
              
            
                if(allLosers.length==0){
                  console.log("ADDING HERE:4535")
                  if(!already.includes(challenge.challengeId)){
                    already.push(challenge.challengeId)
                  AllStreaks.push({challenge:challenge,streaks:streaks,problemCounter:problemCounter})
                  }
                  date.setDate(date.getDate()+1)
                  console.log("Here ALLINDEX:"+allChallengesIndex+" group:"+ group.length)
                 
                
                  date.setDate(date.getDate()+1)
                  console.log("4552")
                

                }
              }
             console.log("loser:"+allLosers.length+ " "+c.title + date.toString())
          
            } 
          }else{
            console.log("NO LOSEERS")
            console.log("5286")
            if(!already.includes(challenge.challengeId)){
              console.log("ADDING HERE:4552")
              already.push(challenge.challengeId)
              console.log(date)
            AllStreaks.push({challenge:c,streaks:streaks,problemCounter:problemCounter})
            setTimeout(()=>{
              res.json({success:true,allStreaksLength:AllStreaks.length,challenges:AllStreaks,allLosers:allL})

            },400)
            }else{
              try{
              res.json({success:true,allStreaksLength:AllStreaks.length,challenges:AllStreaks,allLosers:allL})
              }catch(err){

              }
            }
            date.setDate(date.getDate()+1)
        
           
       
          }
     }else if(date.toString().substring(0,15)==checkEnd.toString().substring(0,15) && new Date()<=stopDate){
          
      console.log("ALLINDEX:"+allChallengesIndex+"EXCEPTION CURRENT: " + c.title+"\n\n")
      date.setDate(date.getDate()+1) 
      if(date.toString().substring(0,15)==c.endDate.toString().substring(0,15)){
 
      }
     
      if(!already.includes(challenge.challengeId)){
        already.push(challenge.challengeId)
            AllStreaks.push({challenge:c,streaks:streaks,problemCounter:problemCounter})
            console.log("4612")
      }
          
            }else{ 
              console.log("LAST CASE OTHER")
            date.setDate(date.getDate()+1) 
            console.log(date)
            console.log(curr)
           // AllStreaks.push({challenge:c,streaks:streaks,problemCounter:problemCounter})
            if(date.toString().substring(0,15)==curr.toString().substring(0,15) || date>new Date()){
           
              

              if(!already.includes(challenge.challengeId)){
                console.log("ADDING HERE:4602")
                already.push(challenge.challengeId)
              AllStreaks.push({challenge:c,streaks:streaks,problemCounter:problemCounter})
              }
              try{
                complete=true
                setTimeout(()=>{
                  try{
               
                    console.log("\n\nSENT allChallenge:"+allChallengesIndex + " date:"+date.toString())
                  console.log(res.headersSent)
                    while(!res.headersSent){
                    res.json({success:true,allStreaksLength:AllStreaks.length,challenges:AllStreaks,allLosers:allL})
                  }
                 
                  }catch(err){
                    console.log("SENT")
                    res.json({success:true,allStreaksLength:AllStreaks.length,challenges:AllStreaks,allLosers:allL})

                  }
   
                },100)
                

                break
                }catch(err){ 
                  console.log("ERR",err)
                }
           
            }
        
            console.log(date,"\n\n")
            }
           
          }
        }
      }
    }else{ 
     
      date.setDate(date.getDate()+1)
  
  
      try{
        setTimeout(()=>{
     
        },100)
        
      }catch{

      }
   
    }
    }
  }else{
    console.log("HERE:")
 
  }
  
})
app.get("/get-group-challenge-data/:challengeId",async(req,res)=>{
  const all=await GroupChallenge.find({$and:[{"challengeId":req.params.challengeId}]})

  const winners=await GroupChallenge.find({$and:[{"challengeId":req.params.challengeId},{success:true}]})
  const losers=await GroupChallenge.find({$and:[{"challengeId":req.params.challengeId},{success:false}]})
  const problemcounter=await GroupChallengeData.findOne({"challengeId":req.params.challengeId})
 //console.log(problemcounter)
  Object.keys(problemcounter.problemCounter).forEach(async(c)=>{
    console.log(c,problemcounter.problemCounter[c].problems)
    const update=await GroupChallenge.updateOne({$and:[{"challengeId":req.params.challengeId},{"userId":c}]},{
      $set:{"totalProblems":problemcounter.problemCounter[c].problems}
    })
  })
  const players=[]
  while(players.length<all.length && losers.length>0){
  
    const next=losers.reduce((a,b)=>{
     if(a!=null && b!=null){
      if(a.rank<b.rank){
        return b
      }else if(a.rank>b.rank){
        return a
      }
     }
    })
    players.push(next)
  

  }
  //console.log(winners)
  const problemCounter=await GroupChallengeData.findOne({"challengeId":req.params.challengeId})
  res.json({total:all.length, losersLlength:losers.length,losers:losers,winners:winners,problemCounter:problemCounter!=null?problemCounter.problemCounter:null})

})
app.get("/finalize-challenges/:userId",async(req,res)=>{
  const challenges=await GroupChallenge.find({$and:[{"userId":req.params.userId},{"createdBy":req.params.userId}]})
  console.log(challenges.length)
  challenges.map(async(c)=>{
    const allOthers=await GroupChallenge.find({$and:[{"userId":{$ne:req.params.userId}},{"challengeId":c.challengeId}]})
    const others=await GroupChallenge.find({$and:[{"userId":{$ne:req.params.userId}},{"challengeId":c.challengeId}]})
   console.log("others:"+others.length,"allOther"+allOthers.length)
    if(others.length>0){
      others.map(async(o)=>{
        console.log(o.userId,"rank:"+ o.rank)
        if(o.rank!=null){
          const updated=await GroupChallenge.updateOne({"id":o.id},{
            $set:{"status":"CLOSED"}
          })
          console.log(updated)
        }
      })

    }
    console.log("\n\n")
  })
})

app.get("/grade-group-challenges/:userId",async(req,res)=>{
  const group=await GroupChallenge.find({$or:[{"userId":req.params.userId},{"createdBy":req.params.userId}]})
  const days=[]
  const users=[]
  const allCha=[]
  const streakIds=[]
  console.log(group.length)
  var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
"Aug","Sep","Oct","Nov","Dec"];
var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]
  const processed=[]
  var allChallengesIndex=0
  const AllStreaks=[]
  while(allChallengesIndex<group.length){
    var c=group[allChallengesIndex]
    console.log("-----------------------------------------------------------"+c.title)
    const challenge=c
    const all=[c]
    const others=await GroupChallenge.find({$and:[{"userId":{$ne:req.params.userId}},{"createdBy":{$ne:req.params.userId}},{"challengeId":c.challengeId}]}
    )
    //console.log("ALLINDEX:"+allChallengesIndex)
    if(others.length>0){
    others.map((o)=>{
 
      all.push(o)
        
    })
  
    if(all.length==others.length+1){
      console.log(c.title,all.length)

      var startDate=c.startDate
      var stopDate=new Date()
      var endDate=new Date(c.endDate)
      var stopDate=new Date(c.endDate)
      stopDate.setDate(stopDate.getDate()+1)
      var date=new Date(c.startDate)
      var curr=new Date()
      const problemCounter={}
      //stopDate=stopDate.getDate()+1
     
      //console.log(date.toString().substring(0,15) +" | curr"+curr.toString().substring(0,15) +" | stop:"+stopDate.toString().substring(0,15)) 
     
      const processed=[]
      const allLosers=[] 
      const streaks=[] 
      console.log(c.title+" "+ c.startDate)
      
      while( date<curr && date<stopDate && date.toString().substring(0,15)!=curr.toString().substring(0,15) /*&& date.toString().substring(0,15)!=stopDate.toString().substring(0,15)*/){
        var allIndex=0
       
        while(allIndex<all.length){
          const u=all[allIndex]
         
          const streak=await Streak.findOne({$and:[{"userId":u.userId},{"day":date.toString().substring(0,15)}]})
          const user=await User.findOne({"userId":u.userId})
          if(streak!=null){
           // console.log("---------------"+streak.day+"---"+streak.problems.length+"----"+streaks.length+"-----------------")
         
            var day=streak.day.split(" ")
            day=new Date(day[3],monthnum[months.indexOf(day[1])-1],day[2])
            if(!users.includes(user.userId) || !days.includes(day.toString().substring(0,15)) || !allCha.includes(c.challengeId)){
              streaks.push({streak:streak,date:day,challengeId:c.challengeId,user:user})
              days.push(day.toString().substring(0,15))
              users.push(user.userId)
              allCha.push(c.challengeId)
              streakIds.push(streak.id)
             
            
            }else{
             

            }
            if(streak.problems!=null){
              if(streak.problems.length>=c.no_questions){
                if(problemCounter[user.userId]==null){
                  problemCounter[user.userId]=0;
                  problemCounter[user.userId]=streak.problems.length;
                }else{
                  problemCounter[user.userId]+=streak.problems.length;
  
                }
                allIndex++
              }else{

                if(problemCounter[user.userId]==null){
                  problemCounter[user.userId]=0;
                  problemCounter[user.userId]=streak.problems.length;
                }else{
                  problemCounter[user.userId]+=streak.problems.length;
  
                }
               
                var str=await GroupChallenge.findOne({$and:[{"userId":u.userId},{"challengeId":c.challengeId}]})

                if(str.userStats.passes==0){
                  console.log("FAIL ENTIRELY:"+user.firstname+ " | "+date.toString().substring(0,15)+ " | 0 problems | "+c.title)
                if(!processed.includes(u.userId) && c.startDate<=day<=c.endDate){
                    processed.push(u.userId)

                  str.success=false
                  str.dateFailed=day
                  str.userStats.success=false
                  str.userStats.dateFailed=day
                  const updateAllChanges=await GroupChallenge.updateMany({$and:[{"userId":u.userId},{"startDate":{$lte:date}},{"endDate":{$gte:date}}]},{
                    $set:{"success":false,"dateFailed":day,"userStats":str.userStats,lastUpdate:date}
                  })

                  streak.firstname=user.firstname
                  allLosers.push({streak:streak,date:day,day:day,challengeId:c.challengeId,user:user})
                }

                }else if(str.userStats.passes>0){
                 // console.log("DEDUDUCT:"+user.firstname+ " | "+date.toString().substring(0,15)+ " | 0 problems | "+c.title)
                  
                  str.userStats.passes--
                  const updateAllChanges=await GroupChallenge.updateMany({$and:[{"userId":u.userId},{"startDate":{$lte:date}},{"endDate":{$gte:date}}]},{
                    $set:{"userStats":str.userStats,lastUpdate:date}
                  })
                }
               
                allIndex++
              }
            }else{
              console.log("!!!!EXCEPTION:Streak has no problems\n\n")
            } 
          }else{ 
            //should modify all groups where this date is between their start and end date
            //console.log("FAIL:"+user.firstname+ " | "+date.toString().substring(0,15)+ " | 0 problems | "+c.title)
         
           // console.log(u.userStats.passes)
           var str=await GroupChallenge.findOne({$and:[{"userId":u.userId},{"challengeId":c.challengeId}]})

               if(str.userStats.passes==0){
                console.log("FAIL ENTIRELY:"+user.firstname+ " | "+date.toString().substring(0,15)+ " | 0 problems | "+c.title)

                if(!processed.includes(u.userId) && c.startDate<=date<=c.endDate){
                  processed.push(user.userId)
              
                    str.success=false
                    str.dateFailed=date
                    str.userStats.success=false
                    str.userStats.dateFailed=date
              
                    const updateAllChanges=await GroupChallenge.updateMany({$and:[{"userId":u.userId},{"startDate":{$lte:date}},{"endDate":{$gte:date}}]},{
                      $set:{"success":false,"userStats":str.userStats,"dateFailed":date,lastUpdate:date}
                    })
                  //  console.log(updateAllChanges)
                  console.log(date)
                    allLosers.push({userId:user.userId,date:date,day:date.toString().substring(0,15),user:user})
                  }
                 
                  }else if (str.userStats.passes>0){
                    //console.log("DEDUDUCT:"+user.firstname+ " | "+date.toString().substring(0,15)+ " | 0 problems | "+c.title)

                    str=str.userStats
                    str.passes--
                    const updateAllChanges=await GroupChallenge.updateMany({$and:[{"userId":u.userId},{"startDate":{$lte:date}},{"endDate":{$gte:date}}]},{
                      $set:{"userStats":str.userStats,lastUpdate:date}
                    })
                   // console.log(updateAllChanges)
                  }  
                
            allIndex++
          }
          console.log("DAY INDEX:"+allIndex+ " group length:"+all.length)
          const allL=[]
          var loserIndex=0
            if(allIndex>=all.length && date.toString().substring(0,15)==c.endDate.toString().substring(0,15) || date>c.endDate){
              if(allLosers.length>0){
                var rank=all.length
                console.log("\n\n\n\n")
                console.log("---------ALLLOSERS LENGHT:"+allLosers.length)
              
                allLosers.map((c)=>{
                  console.log(c.user.username)
                })
                if(allLosers.length==1){
                  console.log("rank:"+ rank+ " for ",allLosers[0].user.username)
                  allLosers[0].rank=rank
                  allL.push(allLosers[0])
                
                 
                  console.log("FINAL losers:",allLosers[0].user.username+ " rank:"+rank)
                  rank--
                  AllStreaks.push({challenge:challenge,streaks:streaks,allLosers:allL})

                  allLosers.splice(0,allLosers.length)
                  if(allLosers.length==0){
                    allChallengesIndex++ 
                    date.setDate(date.getDate()+1)
                  

                    if(allChallengesIndex>=group.length){
                      setTimeout(()=>{
                        res.json({allStreaksLength:AllStreaks.length,challenges:AllStreaks,allLosers:allL})
                        date.setDate(date.getDate()+1)
                      },100)
                    } 
                  }  
                
                }else if(allLosers.length==2){
                  console.log("rank:"+ rank+ " for ",allLosers[0].user.username)
                  const first=await findFirstLoser2(allLosers,c,loserIndex)
             
                  first.rank=rank
                 
                  allL.push(first)
                
                 
                  console.log("FINAL losers:",allLosers[0].user.username+ " rank:"+rank)
                  rank--
                  var otheruser=first.user.username==allLosers[0].user.username?allLosers[1]:allLosers[0]
                  otheruser.rank=rank
                  allL.push(otheruser)
                  allLosers.splice(0,allLosers.length)
                  if(allLosers.length==0){
                    allChallengesIndex++ 
                    date.setDate(date.getDate()+1)
                    AllStreaks.push({challenge:challenge,streaks:streaks,allLosers:allL,problemCounter:problemCounter})

                    if(allChallengesIndex>=group.length){
                      setTimeout(()=>{
                        res.json({allStreaksLength:AllStreaks.length,challenges:AllStreaks,allLosers:allL})
                        date.setDate(date.getDate()+1)
                      },100)
                    } 
                  }
                  

                }else{
               


              while(allLosers.length!=0){
            if(allLosers.length>1){
                const first=await findFirstLoser2(allLosers,c,loserIndex)
             
                first.rank=rank
                console.log("rank:"+ rank+ " for "+first.user.username)

                rank--
               
                var lIndex
                var ii
                allLosers.map((l)=>{
                  if(l.user.userId==first.user.userId){
                    ii=lIndex
                    console.log("FOUND LOSER")
                    first.user=l.user
                    first.date=l.date
                    first.challengeId=l.challengeId
                    first.day=l.day
                    first.streak=l.streak
                    allL.push(first)
                    
                    
                  }
                  lIndex++
                })
                allLosers.splice(ii,1)
                if(allLosers.length==1){
                  console.log("rank:"+ rank+ " for ",allLosers[0].user.username)
                  allLosers[0].rank=rank
                  allL.push(allLosers[0])
                  allLosers.splice(0,allLosers.length)
                  console.log("\n\n\n\nBREAK:"+allLosers.length)
                 
                  
                  rank--
                  if(allLosers.length==0){
                    allChallengesIndex++ 
                    date.setDate(date.getDate()+1)
                    
                    AllStreaks.push({challenge:challenge,streaks:streaks,allLosers:allL})

                    if(allChallengesIndex>=group.length){
                   
                        res.json({allStreaksLength:AllStreaks.length,challenges:AllStreaks,allLosers:allL})
                        date.setDate(date.getDate()+1)
                    
                    } 
                    break
                  }
                 
                
                
                }

              }
             // AllStreaks.push({challenge:challenge,streaks:streaks,allLosers:allL})
             /*
              date.setDate(date.getDate()+1)

             
              allChallengesIndex++ 
              date.setDate(date.getDate()+1)
              if(allChallengesIndex>=group.length){
                setTimeout(()=>{
                  res.json({allStreaksLength:AllStreaks.length,challenges:AllStreaks,allLosers:allL})
                  date.setDate(date.getDate()+1)
                },100)
              }
               */
            }
          }
          }else if(c.startDate <=new Date()<=c.endDate){
            AllStreaks.push({challenge:c,streaks:streaks,allLosers:[]})
          }else{
            console.log("BREAK")
            AllStreaks.push({challenge:c,streaks:streaks,allLosers:[]})
            allChallengesIndex++  
            date.setDate(date.getDate()+1)
            if(allChallengesIndex>=group.length){
              setTimeout(()=>{

             
                res.json({allStreaksLength:AllStreaks.length,challenges:AllStreaks,})
              },100)

           
             // date.setDate(date.getDate()+1)
            }
       
          }
            }else if((new Date(c.startDate) <=new Date() && new Date()<= new Date(c.endDate)) && allIndex>=all.length){
              
              console.log("\n\n\nCURRENT CHALLENGE EXCEPTION:"+ c.title+"\n\n\n") 
              console.log("s:",c.startDate)
              console.log(new Date())
              console.log("e:",c.endDate)
              AllStreaks.push({challenge:c,streaks:streaks,allLosers:[]})
              allChallengesIndex++  
              date.setDate(date.getDate()+1)
              if(allChallengesIndex>=group.length){
                setTimeout(()=>{
  
                try{
                  res.json({allStreaksLength:AllStreaks.length,challenges:AllStreaks,})
                }catch(err){
                  console.log(err)
                }
                },100)
  
             
               // date.setDate(date.getDate()+1)
              }
            }else{ 
            date.setDate(date.getDate()+1)
           // allChallengesIndex++  
           if(date>=c.endDate){
             allChallengesIndex++ 
           }
            }
 
        }
      }
    }
  }else{
    allChallengesIndex++ 
    //res.json({success:true})
  } 
  console.log("ALL INDEX:"+allChallengesIndex)
  if(allChallengesIndex>=group.length){
    try{      
    res.json({allStreaksLength:AllStreaks.length,challenges:AllStreaks})
    }catch(err){
      console.log("ALREADY SENT:4729")
    }


 // date.setDate(date.getDate()+1)
}
  }
}) 
app.post("/add-profile-info",async(req,res)=>{
  const userId=req.body.userId
  const bio=req.body.bio
  const profilePicUrl=req.body.profilePicUrl
  var index=0
  if(profilePicUrl!=null){
    const addProfilePic=await User.updateOne({"userId":userId},{
      $set:{"profilePicUrl":profilePicUrl}
    })
    index++
    console.log(addProfilePic)
  }
  if(bio!=null){
    const addBio=await User.updateOne({"userId":userId},{
      $set:{"bio":bio}
    })
    index++
    console.log(bio)
  }
  setTimeout(()=>{
    res.json({success:true,message:index+ " changes made to your profile."})
  },300)
})
app.get("/rank-losers/:userId",async(req,res)=>{
  axios.get("http://localhost:3022/grade-group-challenges/"+req.params.userId).then(async(response)=>{
    console.log(Object.keys(response.data))
    var index=0
    response.data.challenges.map(async(c)=>{
      const problemCounter={}
     const losers=c.allLosers
    
      if(c.allLosers!=null && c.allLosers.length>0){
        const losers=c.allLosers
     
        if(losers.length!=0){
          var i=0
          losers.map(async(l)=>{
            var loser=l
          
            console.log("\n\n"+ new Date(c.challenge.startDate).toString().substring(0,14)+"   -  "+new Date(c.challenge.endDate).toString().substring(0,14))
            console.log(c.challenge.challengeId+" | "+c.challenge.title+" | "+loser.user.firstname+" rank:"+loser.rank+" | "+loser.date + " | "+(loser.streak==null? " 0 problems ":loser.streak.problems.length+" problems"))
            const update=await GroupChallenge.updateOne({$and:[{"userId":loser.user.userId},{"challengeId":c.challenge.challengeId}]},{
              $set:{"rank":l.rank,"status":"CLOSED","success":false}
            })
            i++
          })
          if(i>=losers.length){
           /* const update=await GroupChallenge.updateOne({$and:[{"status":{$ne:"CLOSED"}},{"challengeId":c.challenge.challengeId}]},{
              $set:{"status":"CLOSED","success":true}
            })
            */
          }
      
        }
      }
      index++
      if(index>=response.data.challenges.length){
        res.json({success:true,challenges:response.data.challenges})
      }
    })
  })
})

app.get("/allTags",async(req,res)=>{
  const tags=await ProblemTopicTag.find({})
  const names=tags.map((t)=>{
    return t.name
  })
  res.json({success:true,length:tags.length,tags:names})
})

app.get("/group-challenges-2-2/:userId",async(req,res)=>{
  console.log("MADE IT TO GROUP CHALLENGE-2-2")
  var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
  "Aug","Sep","Oct","Nov","Dec"];
  var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]
  var startTime=new Date()
  axios.get("http://localhost:3022/group-challenges-2-fix/"+req.params.userId).then(async(response)=>{
    console.log("\n\n\n\nMADE IT TO CHALLENGE-2-2 AFter rquest")
    console.log(Object.keys(response.data))
    console.log("hi")
    if(response.data.challenges.length>0){
 
      const challenges=response.data.challenges
      const end=challenges.length-1
      const challenge=challenges[end].challenge
      console.log("\n\n",challenge.title)
      var complete=false
      const days=[] 
      const users=[]
      const allCha=[]
      const streakIds=[]
      
      var startDate=challenge.startDate
      var stopDate=new Date()
      var endDate=new Date(challenge.endDate)
      var stopDate=new Date(challenge.endDate)
      stopDate.setDate(stopDate.getDate()+1)
      var date=new Date(challenge.startDate)
      var curr=new Date()
      var tommorow=new Date()
      tommorow.setDate(curr.getDate()+1)
      const all=await GroupChallenge.find({"challengeId":challenge.challengeId})
      var streaks=[]
       var i=0
       var problemCounter={}
      // console.log("all length:"+all.length)
       while(i<all.length && complete==false){  
        const u=all[i]
        console.log("index",i,"all",all.length)
      
       
      
        if(date>tommorow){
        while(date<tommorow   && complete==false && date<stopDate  /*&& date.toString().substring(0,15)!=curr.toString().substring(0,15) /*&& date.toString().substring(0,15)!=stopDate.toString().substring(0,15)*/){
          var allIndex=0
          console.log("LOOOP 6150",allIndex," all",all.length)
          while(allIndex<all.length /*&& complete==false*/){
            console.log("loop:",allIndex,"all",all.length)
            const user=await User.findOne({"userId":all[allIndex].userId}) 

          //console.log("\n\n"+(all[allIndex].userId==null)+"---------------"+date.toString().substring(0,15))
            const streak=await Streak.findOne({$and:[{"day":date.toString().substring(0,15)},{"userId":all[allIndex].userId}]})
           
            if(streak!=null){

              console.log(all[allIndex].userId +" on day: "+date.toString().substring(0,15)+ " has "+streak.problems.length+ " problems")
 
              if(streakIds.includes(streak.id)){
                //console.log("ALREADY:"+user.firstname+ " challenge:"+challenge.title+"---"+streak.day)
              }else{
                var day=streak.day.split(" ")
                streakIds.push(streak.id)
                day=new Date(day[3],monthnum[months.indexOf(day[1])-1],day[2])
                if(  problemCounter[streak.userId]==null) {
                  problemCounter[streak.userId]=0 
                  problemCounter[streak.userId]+=streak.problems.length
                }else{
                  problemCounter[streak.userId]+=streak.problems.length

                }
              
                streaks.push({streak:streak,date:day,challengeId:challenge.challengeId,user:user})
                days.push(streak.day.toString().substring(0,15))
                users.push(user.userId)
                allCha.push(challenge.challengeId)
                streakIds.push(streak.id)
              }
              allIndex++
              console.log("6182",alIndex)
            }else{
            allIndex++
            console.log("6184",allIndex) 
            }
           // console.log(allIndex)
            if(allIndex>=all.length){
            
              date.setDate(date.getDate()+1)
              
             
              if(date.toString().substring(0,15)=="Wed Jun 26 2024"){
                break; 
                console.log("HERE\n\n\n\ENd")
              }
              if(date>=stopDate || date.toString().substring(0,15)==new Date().toString().substring(0,15)){
                var newIndex=0
                console.log(date)
                while(newIndex<all.length){
                  console.log("TODAY "+date.toString())
                  var com=all[newIndex]
                  const struser=await User.findOne({"userId":all[newIndex].userId})

                  const str=await Streak.findOne({$and:[{"userId":com.userId},{"day":date.toString().substring(0,15)}]})
                  if(str!=null){
                    console.log(problemCounter)
                    if(problemCounter[str.userId]==null) {
                      problemCounter[str.userId]=0
                      problemCounter[str.userId]+=str.problems.length
                    }else{
                      problemCounter[str.userId]+=str.problems.length
    
                    }
                
                    streaks.push({streak:str,date:date,challengeId:challenge.challengeId,user:struser})
                    newIndex++
                  }else{
                  newIndex++
                  }
                  if(newIndex>=all.length){
                    challenges[end].streaks=streaks
                    challenges[end].problemCounter=problemCounter
                    console.log(challenges[end].problemCounter)
                    //res.json({all:all,challenges:response.data.challenges,other:response.data,success:true})
                    i=10
                    console.log("i:"+i)
                    //console.log("i:"+i,"all length:"+all.length)
                    if(i!=0 && complete==false){
                      complete=true
                     // console.log("\n\n\nSHOPULD SEND",streaks)
                      const newStreaks=streaks.filter((s)=>{
                        console.log(s.date)
                        if(s.date.toString().substring(0,15)==new Date().toString().substring(0,15)){
                          return s
                        }
                      })
                    
                      if(newStreaks.length>0){
                      //console.log(newStreaks)
                      challenges.push({challenge:challenge,streaks:newStreaks,problemCounter:problemCounter})
                      }
                      i=10
                      console.log("i:"+i)
                      try{
                      challenges[challenges.length-1].streaks=newStreaks
                   
                      }catch(err){
                        
                        console.log(err)
                      }
                      try{
                        setTimeout(()=>{
                          const endTime=new Date()
                          res.json({pre:response.data,all:all,time:endDate.getSeconds()-startTime.getSeconds(),challenges:response.data.challenges,other:response.data,success:true})

                        },200)
                      break
                      }catch(err){
                        //break
                        console.log(err)
                        break
                      }
                    
                    }
                  }
                }
               
               
              
              }
            }
          }
       
        }  
       
        if(i>=all.length && complete==false){
          console.log("JUMP")
          console.log(date)
          complete=true
          challenges[end].streaks=streaks
          const endTime=new Date()
          res.json({pre:response.data,all:all,time:endDate.getSeconds()-startTime.getSeconds(),challenges:response.data.challenges,other:response.data,success:true})
        }
      }else if(challenge.startDate<date<stopDate){
      

        console.log("\n\nISSUE WITHDATE",challenge)
        var endDate=new Date()
        try{
        res.json({pre:response.data,all:all,time:endDate.getSeconds()-startTime.getSeconds(),challenges:response.data.challenges,other:response.data,success:true})
        }catch(err){
          console.log("alreadySet")
        }
        break
      }
      
      }

    }
  })
})
app.get("/group-challenges-2-2/:userId/:challengeId",async(req,res)=>{
  var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
  "Aug","Sep","Oct","Nov","Dec"];
  const processed=[]
  const cleanChallenges=[]
  var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]
  axios.get("http://localhost:3022/group-challenges-2/"+req.params.userId+"/"+req.params.challengeId).then(async(response)=>{
    console.log("MADE IT TO CHALLENGE-2-2")
    console.log("hi")
    if(response.data.challenges.length>0){
    
      const challenges=response.data.challenges
      console.log("\n\nHERE"+challenges.length)
      const end=challenges.length-1
      const challenge=challenges[end].challenge
     
      var complete=false
      const days=[] 
      const users=[]
      const allCha=[]
      const streakIds=[]
      
      var startDate=challenge.startDate
      var stopDate=new Date()
      var endDate=new Date(challenge.endDate)
      var stopDate=new Date(challenge.endDate)
      stopDate.setDate(stopDate.getDate()+1)
      var date=new Date(challenge.startDate)
      var curr=new Date()
      var tommorow=new Date()
      tommorow.setDate(curr.getDate()+1)
      const all=await GroupChallenge.find({"challengeId":challenge.challengeId})
      var streaks=[]
       var i=0
       var problemCounter={}
      
       while(i<all.length && complete==false){
        const u=all[i]
         
        console.log("here",u.userId)
        while( date<tommorow  && complete==false&& date<stopDate ){
          var allIndex=0

          while(allIndex<all.length ){
            const user=await User.findOne({"userId":all[allIndex].userId})

         
            const streak=await Streak.findOne({$and:[{"day":date.toString().substring(0,15)},{"userId":all[allIndex].userId}]})
           
            if(streak!=null){
              console.log("here 6308",all[allIndex].userId +" on day: "+date.toString().substring(0,15)+ " has "+streak.problems.length+ " problems")

              if(streakIds.includes(streak.id)){
              
              }else{
                var day=streak.day.split(" ")
                streakIds.push(streak.id)
                day=new Date(day[3],monthnum[months.indexOf(day[1])-1],day[2])
                if(  problemCounter[streak.userId]==null) {
                  problemCounter[streak.userId]=0
                  problemCounter[streak.userId]+=streak.problems.length
                }else{
                  problemCounter[streak.userId]+=streak.problems.length

                }
              
                streaks.push({streak:streak,date:day,challengeId:challenge.challengeId,user:user})
                days.push(streak.day.toString().substring(0,15))
                users.push(user.userId)
                allCha.push(challenge.challengeId)
                streakIds.push(streak.id)
              }
              allIndex++
            }else{ 
            allIndex++
            }
          
            if(allIndex>=all.length){
            
              date.setDate(date.getDate()+1)
             
             
              
              if(date>=stopDate || date.toString().substring(0,15)==new Date().toString().substring(0,15)){
                var newIndex=0
                console.log(date)
                while(newIndex<all.length){
                  console.log("TODAY "+date.toString())
                  var com=all[newIndex]
                  const struser=await User.findOne({"userId":all[newIndex].userId})

                  const str=await Streak.findOne({$and:[{"userId":com.userId},{"day":date.toString().substring(0,15)}]})
                  if(str!=null){
                    console.log(problemCounter)
                    if(problemCounter[str.userId]==null) {
                      problemCounter[str.userId]=0
                      problemCounter[str.userId]+=str.problems.length
                    }else{
                      problemCounter[str.userId]+=str.problems.length
     
                    }  
                
                    streaks.push({streak:str,date:date,challengeId:challenge.challengeId,user:struser})
                    newIndex++
                  }else{
                  newIndex++
                  }
                  if(newIndex>=all.length){
                    challenges[end].streaks=streaks
                    challenges[end].problemCounter=problemCounter
                    console.log(challenges[end].problemCounter)
                    
                    i=10
                    console.log("i:"+i)
                    
                    if(i!=0 && complete==false){
                      complete=true
               
                      const newStreaks=streaks.filter((s)=>{
                        console.log(s.date)
                        if(s.date.toString().substring(0,15)==new Date().toString().substring(0,15)){
                          return s
                        }
                      })
                    
                      if(newStreaks.length>0){
                  
                      if(!processed.includes(challenge.challengeId)){
                        console.log("ID:",challenge.challengeId)
                        processed.push(challenge.challengeId)
                      challenges.push({challenge:challenge,streaks:newStreaks,problemCounter:problemCounter})
                       }
                      }
                      i=10
                      console.log("i:"+i)
                      try{
                     
                   
                      }catch(err){
                        
                        console.log(err)
                      }
                      try{
                        setTimeout(()=>{
                          res.json({all:all,challenges:challenges,other:response.data,success:true})

                        },200)
                      break
                      }catch(err){
                        //break
                        console.log(err)
                        break
                      }
                    
                    }
                  }
                }
               
               
              
              } 
            }
          }
       
        }
       
        if(i>=all.length && complete==false){
          console.log("JUMP")
          console.log(date)
          complete=true
          challenges[end].streaks=streaks
          res.json({all:all,challenges:challenges,other:response.data,success:true})
        }
      
      }

    }
  })
})

app.get("/add-streak-ids",async(req,res)=>{
  const data=await GroupChallengeData.find({})
  data.map((d)=>{
    var i=0
    const streaks=[]
   d.streaks.map(async(s)=>{
    console.log(Object.keys(s))
    const streak=await Streak.findOne({$and:[{"userId":s.user.userId},{"day":new Date(s.date).toString().substring(0,15)}]})
    s.streak.streakId=streak.id
    console.log(s.streak.streakId)
    streaks.push(s)
    i++
    if(i>=d.streaks.length){
      console.log("COMPLETE")
      const updateStreaks=await GroupChallengeData.updateOne({"challengeId":d.challengeId},{
        $set:{"streaks":streaks}
      })
      console.log(updateStreaks)
    }
    })
  })
})
app.get("/create-group-challenge-data/:userId/:challengeId",async(req,res)=>{
  console.log("MADE IT T)",req.params.challengeId)
  axios.get("http://localhost:3022/group-challenges-2-2/"+req.params.userId+"/"+req.params.challengeId).then(async(response)=>{
  console.log(Object.keys(response.data))
  console.log("PAST CALL")
  const challenges=response.data.challenges
  var i=0;
  console.log(challenges.length)
  while(i<challenges.length){ 
   
    var challenge=challenges[i]
    console.log(Object.keys(challenge))
    const already=await GroupChallengeData.findOne({"challengeId":challenges[i].challenge.challengeId})
    console.log("ALREADY:",challenge.challenge.title,challenge.challenge.challengeId,already==null)
    if(already==null){
    const mod=[]
    const streaks=challenge.streaks
    var ii=0
    var modChallenge
    modStreaks=[]
    console.log(Object.keys(challenge),streaks.length)
    while(ii<streaks.length){
     // console.log(streaks)
      var streak=streaks[ii]
      console.log(streaks[ii])
      const streakId=await Streak.findOne({$and:[{"userId":streak.streak.userId},{"day":streak.streak.day}]})
      var problems=streak.streak.problems.filter((p)=>{
        return p.title 
      })
      var s={streakId:streakId.id,problems:problems,day:streak.streak.day,userId:streak.streak.userId,timeLastAdded:streak.streak.timeLastAdded}
    
      var user={userId:streak.user.userId,firstname:streak.user.firstname,lastname:streak.user.lastname,username:streak.user.username,bio:streak.user.bio,profilePicUrl:streak.user.profilePicUrl}
      var str={date:streak.date,user:user,challengeId:streak.challengeId,streak:s}
      modStreaks.push(str)
     
      
      ii++
      if(ii>=streaks.length){
        modChallenge={streaks:modStreaks,challenge:challenge.challenge,problemCounter:challenge.problemCounter}
       console.log(challenge.challenge.createdBy)
       var allUsersIds=challenge.challenge.allUserIds
       if(!allUsersIds.includes(challenge.challenge.createdBy)){
       allUsersIds.push(challenge.challenge.createdBy)
       }
       console.log(allUsersIds)
       const already=await GroupChallengeData.findOne({"challengeId":challenge.challenge.challengeId})
       console.log("already:",already==null,challenge.challenge.challengeId) 
       try{
          if(already==null){
          const newGroupData=new GroupChallengeData({
            "challengeId":challenge.challenge.challengeId,
            "title":challenge.challenge.title,
            "startDay":challenge.challenge.startDate.toString().substring(0,15),
            "endDay":challenge.challenge.endDate.toString().substring(0,15),
            "startDate":new Date(challenge.challenge.startDate),
            "endDate":new Date(challenge.challenge.endDate),
            "createdBy":challenge.challenge.createdBy,
            "contestants":allUsersIds,
            "streaks":modStreaks,
            "problemCounter":challenge.problemCounter
          })
       
          try{
          const save=await newGroupData.save()
          console.log(save)
        // res.json({success:true,data:save})
         axios.get("http://localhost:3022/find-bad/"+challenge.challenge.challengeId).then((response)=>{
          res.json({success:true,data:save,challengeData:response.data.challengeData})
         })
          i++
        
          }catch(err){
            console.log(err)
            i++
          } 
        }else{
          const update= await GroupChallengeData.updateOne({"challengeId":challenge.challenge.challengeId},{
            $set:{
              "title":challenge.challenge.title,
            "startDate":new Date(challenge.challenge.startDate),
            "endDate":new Date(challenge.challenge.endDate),
            "contestants":allUsersIds,
            "createdBy":challenge.challenge.createdBy,
            "streaks":modStreaks,
            "problemCounter":challenge.problemCounter
            }
          })
          console.log(update)
          i++
          
        }
        }catch(err){
        
       
          console.log(err)
          i++
        }
      }
    }
  }else if(already.streaks.length<challenge.streaks.length){
    console.log(already.streaks.length, "new Length:",challenge.streaks.length)
    const difference=challenge.streaks.length-already.streaks.length
    console.log(difference)
    const old=already.streaks.map((d)=>{
      return d.streak.streakId
    })
    console.log(old)
    const non=[]
    const newOnes=await challenge.streaks.map(async(d)=>{
      const str=await Streak.findOne({$and:[{"userId":d.user.userId},{"day": new Date(d.date).toString().substring(0,15)}]})
    
      if(!old.includes(str.id)){
          console.log("id:",str.id)
          non.push(d)
          return d
        }else{
          return null
        }
    })
    newOnes.filter((d)=>{
      if(d!=null){
      
        return d
      }else{
        console.log("\n\nNULL")
      }
    })
    console.log("old:",old.length,"\n\n",old)
    console.log("newLength",non.length,"\n\n\n",newOnes)
    setTimeout(()=>{
      var i=0
      console.log(non.length,"\n\n",non)
      non.map(async(d)=>{
        d.streak.streakId=d.streak.id
        const update=await GroupChallengeData.updateOne({"challengeId":req.params.challengeId},{
          $push:{"streaks":d}
        })
        i++
        if(i>=non.length){
          try{
            const data=await GroupChallengeData.findOne({"challengeId":req.params.challengeId})
           // res.json({success:true,data:data})
           axios.get("http://localhost:3022/find-bad/"+challenge.challenge.challengeId).then((response)=>{
            res.json({success:true,data:save,challengeData:response.data.challengeData})
           })
          }catch(err){
            console.log("ERR:6395")
          }
        }
        console.log(update)
      })
    },700)
    try{
      //res.json(challenge.streaks)
    }catch(err){

    }
    i++
    if(i>=challenges.length){
      const challengeData=await GroupChallengeData.findOne({"challengeId":req.params.challengeId})
      axios.get("http://localhost:3022/find-bad/"+challenge.challenge.challengeId).then((response)=>{
        res.json({success:true,data:save,challengeData:response.data.challengeData})
       })

    }
  }else{
    i++
    const challengeData=await GroupChallengeData.findOne({"challengeId":req.params.challengeId})
     axios.get("http://localhost:3022/find-bad/"+challenge.challenge.challengeId).then((response)=>{
      res.json({success:true,data:save,challengeData:response.data.challengeData})
     })
  }
  }

})
})

app.post("/get-challenge-losers/:challengeId/",async(req,res)=>{
  const challenges=await GroupChallenge.find({"challengeId":req.params.challengeId})
  var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
"Aug","Sep","Oct","Nov","Dec"];
var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]

  const losers=[]
 const allLosers=[]
 try{
  if(challenges.length>0){
    var date=new Date(challenges[0].startDate)
   const LOSERS=[]
   // date.setDate(date.getDate()+1)
    var stopDate=new Date(challenges[0].endDate)
    stopDate.setDate(stopDate.getDate()+1)
    const processedLosers=[]
    var newDate=new Date()
    while(date<stopDate){
      //console.log("\n\ndate:",date)
      const losers=[]
    newDate.setDate(date.getDate())
      var challengeIndex=0;
      while(challengeIndex<challenges.length){
        //try{
        var challenge=challenges[challengeIndex]
        var streak=await Streak.findOne({$and:[{"userId":challenge.userId},{"day":date.toString().substring(0,15)}]})
      
        if(streak!=null){
          console.log("6549",challenge.userId," has a " +streak.problems.length+ " problems for day ",streak.day.toString().substring(0,15))
          //{"day":"Fri Mar 29 2024"}
          //663c0cbd175de6f764879b7c
          //66076241bc59bf961930a658
          if(streak.problems.length<challenge.no_questions/* && date.toString().substring(0,15)!=stopDate.toString().substring(0,15)*/){
            var aday=streak.day.split(" ")
            aday=new Date(aday[3],monthnum[months.indexOf(aday[1])-1],aday[2])
           
            if(!processedLosers.includes(challenge.userId)){
              processedLosers.push(challenge.userId)
      
              LOSERS.push({date:aday.toString(),userId:challenge.userId,streak:streak})

           console.log("ADDING 6559",streak.userId)
            losers.push({challenge:challenge,date:aday.toString(),streak:streak})
            }
            challengeIndex++
            if(challengeIndex==challenges.length){ 
          
              var aday=date.toString().split(" ")
               aday=new Date(aday[3],monthnum[months.indexOf(aday[1])-1],aday[2])
              allLosers.push({date:aday.toString(),losers:losers})
              if(losers.length>0){
                var names=losers.map((l)=>{
                  return l.challenge.userId
                })
                
               
                date.setDate(date.getDate()+1)
              
      
                if(date.toString().substring(0,15)==stopDate.toString().substring(0,15)){
                  try{
                    allLosers.map((d)=>{
                    //  console.log(d.date)
                    })
                    res.json({success:true,losers:allLosers,allLosersId:processedLosers})
                  }catch(err){
    
                  }
                }
              }else{
             // console.log("HERE LOSERS"+date.toString())
              var aday=date.toString().split(" ")
              aday=new Date(aday[3],monthnum[months.indexOf(aday[1])-1],aday[2])
             //console.log("6510",date.toString())
              allLosers.push({date:aday.toString(),losers:losers})
                date.setDate(date.getDate()+1)
                if(date.toString().substring(0,15)==stopDate.toString().substring(0,15)){
                  try{
                    res.json({date:newDate,success:true,losers:allLosers,allLosersId:processedLosers})
                  }catch(err){
    
                  }
                }
    
              }
            }
          }else{
            challengeIndex++  
            if(challengeIndex==challenges.length){ 
              if(losers.length>0){
                var names=losers.map((l)=>{
                  return l.userId
                })
                //console.log("6530"+date.toString())
                console.log("6612",date.toString())
                allLosers.push({date:date.toString(),length:losers.length,losers:losers})
               
                date.setDate(date.getDate()+1)
               
      
                if(date.toString().substring(0,15)==stopDate.toString().substring(0,15)){
                  try{
                    res.json({success:true,losers:allLosers,allLosersId:processedLosers})
                  }catch(err){
    
                  }
                }
              }else{
               // console.log("6544",date.toString())
                allLosers.push({date:date.toString(),length:losers.length,losers:losers})
                date.setDate(date.getDate()+1)
               
      
                if(date.toString().substring(0,15)==stopDate.toString().substring(0,15)){
                  try{
                   
                    res.json({allDates:LOSERS,success:true,losers:allLosers,allLosersId:processedLosers})
                  }catch(err){
    
                  }
                }
    
              }
            }
          } 
        }else{
          console.log("6644",challenge.userId," has no streak for day ",date.toString().substring(0,15))

          losers.push({challenge:challenge,date:date.toString(),streak:null})
         if(!processedLosers.includes(challenge.userId) && date.toString().substring(0,15)!=stopDate.toString().substring(0,15)){
            //console.log("6562:"+ date.toString())
           
            processedLosers.push(challenge.userId)
            LOSERS.push({date:date.toString(),userId:challenge.userId})

            //console.log("6572 adding to processed "+challenge.userId+" "+ date.toString().substring(0,15))

         
         }
          challengeIndex++
          if(challengeIndex==challenges.length){ 
            if(losers.length>0){
              var names=losers.map((l)=>{
                return l.userId
              })
             // console.log(date.toString().substring(0,15)," losers:",names)
              allLosers.push({date:date.toString(),length:losers.length,losers:losers})
              date.setDate(date.getDate()+1)
             
      
              if(date.toString().substring(0,15)==stopDate.toString().substring(0,15)){
                try{
                  res.json({allDates:LOSERS,success:true,losers:allLosers,allLosersId:processedLosers})
                }catch(err){
  
                }
              }
            }else{
              allLosers.push({date:date.toString(),length:losers.length,losers:losers})
              date.setDate(date.getDate()+1)
             
      
              if(date.toString().substring(0,15)==stopDate.toString().substring(0,15)){
                try{
                  res.json({allDates:LOSERS,success:true,losers:allLosers,allLosersId:processedLosers})
                }catch(err){
  
                }
              }
              
  
            }
          }
        }
        
  
      }
  
    }
  
  
  }else{
    res.json({success:false,message:"Challenge does not exist"})
  }
}catch(err){
  console.log(err)
}
})

async function getLoser(allChallenges,indexindex,losers,rank){
  var newLosers
  var foundLoser
    if(losers.length>1){
      
    const loser=await losers.reduce((a,b)=>{
    console.log(a.challenge.userId,b.challenge.userId)
      if(a.streak==null && b.streak==null){
       
        console.log("a:",Object.keys(a),"b",Object.keys(b))
        try{
          console.log("currentRank:"+rank+ " "+a.challenge.userId+ " "+b.challenge.userId)
        }catch(err){

        }
        var found=false
        console.log("EQUAL PROBLEMS")
        return getLoserEqualProblems(allChallenges,indexindex,a,b).then((c)=>{
          foundLoser=c
          found=true
        
          return c
        })
     
      }else if(b.streak==null && a.streak!=null){
        console.log("B NULL",b.challenge.userId)
        return b
      }else if(a.streak==null && b.streak!=null){
        console.log("A NULL",a.challenge.userId)
        return a
      }else if(a.streak!=null && b.streak!=null){
        try{
        console.log("a:"+a.challenge.userId+" "+a.streak.problems.length+ " problems")
        console.log("b:"+b.challenge.userId+" "+b.streak.problems.length+ " problems")
        }catch(err){
 
        }
        if(a.streak.problems.length>b.streak.problems.length){
          return b
        }else if(a.streak.problems.length<b.streak.problems.length){
          return a
        }else{
          var found=false
          console.log("EQUAL PROBLEMS")
          return getLoserEqualProblems(allChallenges,indexindex,a,b).then((c)=>{
            foundLoser=c
            found=true
          
            return c
          })
          if(found==true){
            console.log("\n\nFOUND!!")
            return "BOTH"
          }
        
           
           
        
       
        }
      }else{
        console.log("EXCEPTION")
      }
    })

    if(loser!="BOTH"){
      //console.log("LOSER",loser)
      var index=0
      var loserIndex
      
      losers.map((l)=>{
      console.log('loser',loser)
      console.log(l)
        if(l.challenge.userId==loser.challenge.userId){
          loserIndex=index
        }
      
        index++
      })
      losers.splice(loserIndex,1)
      console.log("\nLOSER AT RANK:"+rank,loser.challenge.userId)
      return {losers:losers,loser:loser}

    }else if(loser=="BOTH"){
      console.log("BOTH CASE")
    
      console.log(losers.length)
      var i=0
      var index=0
      console.log("5918:",losers.length)
      console.log(loser)
    losers.map((l)=>{

        if(foundLoser!=null){
        if(l.challenge.userId==foundLoser.challenge.userId){
          index=i
        }
      }
        i++
      })
      console.log("index:"+index)
      losers.splice(index,1)
      console.log("newLength",losers.length) 
      return {losers:losers,loser:foundLoser} 
    }else if(losers.length==1){
      console.log("last loser:",Object.keys(losers[0]))
      return {losers:[],loser:losers[0]} 
    }else{
      return {losers:[],loser:null}
    }
 
  
  }else if(losers.length==1){
    return {losers:[],loser:losers[0]} 
  }else{
    return {losers:[],loser:null}
  }

}
async function getLoserEqualProblems(allChallenges,indexindex,a,b){
  console.log("EQUALL PROBLEM")
  if(a.streak==null &&b.streak==null){
    const challenge=await GroupChallenge.findOne({$and:[{"userId":a.challenge.userId},{"challengeId":a.challenge.challengeId}]})
    console.log("BOTH NULL:",challenge.startDate)
    var aday=challenge.startDate
    var bday=challenge.startDate
    console.log(aday)
    var lost=false
    while(lost!=true){
      
      var astreak=await Streak.findOne({$and:[{"userId":a.challenge.userId},{"day":aday.toString().substring(0,15)}]})
      var bstreak=await Streak.findOne({$and:[{"userId":b.challenge.userId},{"day":aday.toString().substring(0,15)}]})
      console.log("NULL a:"+(astreak==null)+ " b:"+(bstreak==null))
      if(astreak==null || bstreak==null){
        if(astreak==null && bstreak==null){
          console.log("BOTH NULL ",aday.toString().substring(0,15))
          aday.setDate(aday.getDate()-1)
           astreak=await Streak.findOne({$and:[{"userId":a.challenge.userId},{"day":aday.toString().substring(0,15)}]})
           bstreak=await Streak.findOne({$and:[{"userId":b.challenge.userId},{"day":aday.toString().substring(0,15)}]})
        console.log(astreak.problems.length)
        console.log(bstreak.problems.length)
        console.log("a",new Date(astreak.timeLastAdded).toString())
        console.log("b",new Date(bstreak.timeLastAdded).toString())
        if(astreak.problems.length>bstreak.problems.length){
           return b
        }else if(astreak.problems.length<bstreak.problems.length){
            return a
        }else{
          astreak.timeLastAdded <bstreak.timeLastAdded? b:a
        }
          }else if(astreak==null && bstreak!=null){
            console.log("a is null . b is not null")
        }else if(astreak!=null && bstreak==null){
          console.log("a is not null . b is  null")

        }
        lost=true
      }
      aday.setDate(aday.getDate()+1)

      
    }

  }else{
  console.log("a last"+a.streak.timeLastAdded)
  console.log("b last:"+b.streak.timeLastAdded)
  var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
"Aug","Sep","Oct","Nov","Dec"];
var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]
//aday=new Date(aday[3],monthnum[months.indexOf(aday[1])-1],aday[2])
  var aday=a.streak.day.split(" ")
  var bday=b.streak.day.split(" ")
  aday=new Date(aday[3],monthnum[months.indexOf(aday[1])-1],aday[2])
  bday=new Date(bday[3],monthnum[months.indexOf(bday[1])-1],bday[2])
  aday.setDate(aday.getDate()-1)
  bday.setDate(bday.getDate()-1)
  console.log(aday)
  console.log(bday,"\n\n")
  var stopDate=new Date(a.challenge.startDate)
  stopDate.setDate(stopDate.getDate()-1)
  console.log("Stop",stopDate)
  var aTotal=a.streak.problems.length;
  var bTotal=b.streak.problems.length
  var decided=false

  while(!decided && aday.toString().substring(0,15)!=stopDate.toString().substring(0,15) && bday.toString().substring(0,15)!=stopDate.toString().substring(0,15)){
    var aStreak=await Streak.findOne({$and:[{"userId":a.challenge.userId},{"day":aday.toString().substring(0,15)}]})
    var bStreak=await Streak.findOne({$and:[{"userId":b.challenge.userId},{"day":bday.toString().substring(0,15)}]})
    console.log(aStreak)
    console.log(bStreak)
    if(aStreak!=null && bStreak!=null){
      bTotal=bTotal+bStreak.problems.length
      aTotal=aTotal+aStreak.problems.length
        if(aStreak.problems.length>bStreak.problems.length){
          decided=true
            return b
        }else  if(aStreak.problems.length<bStreak.problems.length){
          decided=true
          return a
        }else if(aStreak.problems.length==bStreak.problems.length){
          console.log(aStreak.timeLastAdded)
          console.log(bStreak.timeLastAdded)
          aday.setDate(aday.getDate()-1)
          bday.setDate(bday.getDate()-1)
          if(aday.toString().substring(0,15)==stopDate.toString().substring(0,15)){
            if(bTotal>aTotal){
              decided=true
              return a
            }else if(bTotal<aTotal){
              decided=true
              return b
            }else{
              var flip=coinFlip(0,1)
              console.log("FLIP:"+flip)
              return flip<.5?  a:b
            }
          }
        }
    }else if(aStreak!=null && bStreak==null){
      decided=true
        return b
    }else if(aStreak==null && bStreak!=null){
      decided=true
      return a

    }else if(aStreak==null && bStreak==null){
      aday.setDate(aday.getDate()-1)
      bday.setDate(bday.getDate()-1)
      if(aday.toString().substring(0,15)==stopDate.toString().substring(0,15)){
        if(bTotal>aTotal){
          decided=true
          return a
        }else if(bTotal<aTotal){
          decided=true
          return b
        }else{
          var flip=coinFlip(0,1)
          console.log("FLIP:"+flip)
          return flip<.5?  a:b
        }
      }
     
    }
  }
}

}
app.get("/see-all-challenge-results",async(req,res)=>{
  const challenges=await GroupChallenge.find({})
  const already=[]
  console.log(challenges.length)
  challenges.map(async(c)=>{
   if(!already.includes(c.challengeId)){
     const allChallenges=await GroupChallenge.find({"challengeId":c.challengeId})
     already.push(c.challengeId)
     console.log("_________________"+c.title+"_______"+c.challengeId+"__________")
     allChallenges.map((cc)=>{
      if(c.rank!=null){
        console.log(cc.userId+":"+cc.rank)
      }else{
        console.log(cc.userId+":"+cc.success)
      }
     })
     console.log("\n\n")
   }
  })
})
// /grade-challenges/:challengeId works
app.get("/grade-all-challenges",async(req,res)=>{
 const challenges=await GroupChallenge.find({})
 const already=[]
 const sl=[]
 var total=challenges.map((c)=>{
  if(!sl.includes(c.challengeId)){
    sl.push(c.challengeId)
    return c.challengeId
  }
 })
 total=total.filter((c)=> c!=null)
 console.log(total)
 console.log(total.length)
 console.log(challenges.length)
 const updates=[]
 var index=0
 challenges.map(async(c)=>{
  if(!already.includes(c.challengeId)){
    const allChallenges=await GroupChallenge.find({"challengeId":c.challengeId})
    already.push(c.challengeId)
    console.log(c.challengeId)
    axios.post("http://localhost:3022/grade-challenges/"+c.challengeId).then((response)=>{
    updates.push(response.data)
    index++
    if(total.length<=index){
      try{
      res.json({success:true,lenth:updates.length,updates:updates})
      }catch(err){
        console.log("ERR:"+"Already sent. index"+index)
      }
    }
    })
    
  }
 })
})

//BEST FOR GRADING
function findTotalLosersLength(allLosers){
  var index=0;
  var total=0
  while(index<allLosers.length){
    var losers=allLosers[index].losers
    if(losers.length>0){
      total+=losers.length
    }
    index++
    if(index==allLosers.length){
      return total;
    }
  }
}
/*

_________________One a day_______19991__________
gs0K9MxVoU8nNDnfkwem:MongooseDocument { null }



_________________2 a Day_______17946__________
gs0K9MxVoU8nNDnfkwem:1
2322:2
Bq02JQzmhI3lNCKko9BW:3



_________________Once a day keeps unemployment away_______32988__________
2322:2
Bq02JQzmhI3lNCKko9BW:MongooseDocument { null }
gs0K9MxVoU8nNDnfkwem:MongooseDocument { null }



_________________Start of Contest_______43233__________
2322:2
gs0K9MxVoU8nNDnfkwem:1



_________________Start of Contest_______43233__________
2322:2
gs0K9MxVoU8nNDnfkwem:1



_________________2 a Day_______17946__________
gs0K9MxVoU8nNDnfkwem:1
2322:2
Bq02JQzmhI3lNCKko9BW:3



_________________Once a day keeps unemployment away_______32988__________
2322:2
Bq02JQzmhI3lNCKko9BW:MongooseDocument { null }
gs0K9MxVoU8nNDnfkwem:MongooseDocument { null }



_________________One Problem a Day_______40302__________
Bq02JQzmhI3lNCKko9BW:MongooseDocument { null }
2322:MongooseDocument { null }
2322:{}



_________________One Problem a Day_______40302__________
Bq02JQzmhI3lNCKko9BW:MongooseDocument { null }
2322:MongooseDocument { null }
2322:{}



_________________Once a day keeps unemployment away_______32988__________
2322:2
Bq02JQzmhI3lNCKko9BW:MongooseDocument { null }
gs0K9MxVoU8nNDnfkwem:MongooseDocument { null }



_________________Mid April_______51807__________
Bq02JQzmhI3lNCKko9BW:2
2322:1
gs0K9MxVoU8nNDnfkwem:3



_________________Mid April_______51807__________
Bq02JQzmhI3lNCKko9BW:2
2322:1
gs0K9MxVoU8nNDnfkwem:3



_________________Mid April_______51807__________
Bq02JQzmhI3lNCKko9BW:2
2322:1
gs0K9MxVoU8nNDnfkwem:3



_________________End of April_______59186__________
Bq02JQzmhI3lNCKko9BW:2
2322:MongooseDocument { null }
gs0K9MxVoU8nNDnfkwem:3



_________________End of April_______59186__________
Bq02JQzmhI3lNCKko9BW:2
2322:MongooseDocument { null }
gs0K9MxVoU8nNDnfkwem:3



_________________End of April_______59186__________
Bq02JQzmhI3lNCKko9BW:2
2322:MongooseDocument { null }
gs0K9MxVoU8nNDnfkwem:3



_________________Start of May_______44454__________
Bq02JQzmhI3lNCKko9BW:3
2322:MongooseDocument { null }
gs0K9MxVoU8nNDnfkwem:1
k3MNBehaS1BWERZsL7q8:2



_________________Start of May_______44454__________
Bq02JQzmhI3lNCKko9BW:3
2322:MongooseDocument { null }
gs0K9MxVoU8nNDnfkwem:1
k3MNBehaS1BWERZsL7q8:2



_________________Start of May_______44454__________
Bq02JQzmhI3lNCKko9BW:3
2322:MongooseDocument { null }
gs0K9MxVoU8nNDnfkwem:1
k3MNBehaS1BWERZsL7q8:2



_________________Start of May_______44454__________
Bq02JQzmhI3lNCKko9BW:3
2322:MongooseDocument { null }
gs0K9MxVoU8nNDnfkwem:1
k3MNBehaS1BWERZsL7q8:2



_________________One Problem a Day_______40302__________
Bq02JQzmhI3lNCKko9BW:MongooseDocument { null }
2322:MongooseDocument { null }
2322:{}



_________________2 a Day_______17946__________
gs0K9MxVoU8nNDnfkwem:1
2322:2
Bq02JQzmhI3lNCKko9BW:3

*/

function removeLoser(losers,loser){
  var i=0
losers.map((l)=>{
  if(l.challenge.userId==loser.challenge.userId){
    losers.splice(i,1)
  }
  i++
})
return losers
}
async function getLosersEmpty(allChallenges,indexindex,losers,rank,processed){
  var firstLoser
 // console.log("LENGTH:"+losers.length)
  var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
  "Aug","Sep","Oct","Nov","Dec"];
  var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]
  //console.log(Object.keys(allChallenges))

  var lo
  const l=await losers.reduce(async(a,b)=>{
   // console.log("PROMISE:",a instanceof Promise)
    if(a==null || a instanceof Promise){
  
      processed.push(b.challenge.userId)
      losers.splice(b.index,1)
      return{loser:b,losers:losers}
    }else if(b==null || b instanceof Promise){
     
      processed.push(a.challenge.userId)
      losers.splice(a.index,1)
      return{loser:a,losers:losers}
    }else{

    const startDate=new Date(a.challenge!=null?a.challenge.startDate:b.challenge.startDate)
    const endDate=new Date(a.challenge!=null?a.challenge.endDate:b.challenge.endDate)
   // console.log("\n\n",startDate.toString().substring(0,15) +" ------- "+endDate.toString().substring(0,15))
    if(processed.includes(a.challenge.userId) || processed.includes(b.challenge.userId)){
      if(processed.includes(a.challenge.userId) && !processed.includes(b.challenge.userId)){
        processed.push(b.challenge.userId)
        losers.splice(b.index,1)
        return{loser:b,losers:losers}
      }else if(!processed.includes(a.challenge.userId) && processed.includes(b.challenge.userId)){
        processed.push(a.challenge.userId)
        losers.splice(a.index,1)
        return{loser:a,losers:losers}
      }

    }else{
    try{
     // console.log("a:"+a.challenge.userId,"b:"+b.challenge.userId)
     // console.log(a.date)
    //console.log("a",Object.keys(a)) 
    //console.log("b",Object.keys(b))
    //losers.splice(0,1)
   
    if(a.streak==null || b.streak==null){
      console.log("A OR B IS NULL")
      if(a.streak==null && b.streak!=null){
      //  console.log("A STREAK IS NULL. B STREAK NOT NULL")
        losers.splice(a.index,1)
        processed.push(a.challenge.userId)
        return {losers:losers,loser:a}
      }else if(b.streak==null && a.streak!=null){
       // console.log("A STREAK NOT NULL. B STREAK IS NULL")
        losers.splice(b.index,1)
        processed.push(b.challenge.userId)

        return {losers:losers,loser:b} 
      }else{ 
       // console.log("A STREAK AND B STREAK BOTH NULL")
        var aday=a.date.toString().split(" ")  
        aday=new Date(aday[3],monthnum[months.indexOf(aday[1])-1],aday[2])
        var bday=b.date.toString().split(" ")
        bday=new Date(bday[3],monthnum[months.indexOf(bday[1])-1],bday[2])
        //console.log("aday bday:",aday.toString().substring(0,15),bday.toString().substring(0,15))
        if(aday.toString().substring(0,15)==bday.toString().substring(0,15) ){
          if(bday.toString().substring(0,15)==endDate.toString().substring(0,15)){
            //console.log("ENDDATE")
            const curr=new Date() 
            curr.setDate(aday.getDate()-1)
            var found=false
            var stop=new Date(startDate)
            stop.setDate(stop.getDate()-1)
     
           while(found==false && curr.toString().substring(0,15)!=stop.toString().substring(0,15)){
          
            const aStreak=await Streak.findOne({$and:[{"day":curr.toString().substring(0,15)},{"userId":a.challenge.userId}]})
            const bStreak=await Streak.findOne({$and:[{"day":curr.toString().substring(0,15)},{"userId":b.challenge.userId}]})
            if(aStreak!=null && bStreak!=null){
                if(aStreak.problems.length <bStreak.problems.length){
                 // console.log("aa")
                  const rem=losers.splice(a.index,1)
                
                  processed.push(a.challenge.userId)
                  return{loser:a,losers:losers,processed:processed}

                }else if(aStreak.problems.length >bStreak.problems.length){
                 // console.log("bb")
                  losers.splice(b.index,1)
                  processed.push(b.challenge.userId)
                  return{loser:b,losers:losers,processed:processed}
                }else{
                 // console.log("cc")
                  losers.splice(  a.timeLastAdded<b.timeLastAdded? b.index:a.index,1)
                  processed.push( a.timeLastAdded<b.timeLastAdded? b.challenge.userId:a.challenge.userId)
                   return a.timeLastAdded<b.timeLastAdded?  {loser:b,losers:losers,processed:processed}: {loser:a,losers:losers,processed}
                }
                curr.setDate(curr.getDate()-1)
            }else if(aStreak!=null && bStreak==null){
              losers.splice(b.index,1)
              processed.push(b.challenge.userId)
              return{loser:b,losers:losers,processed:processed}
            }else if(aStreak==null && bStreak!=null){
              losers.splice(a.index,1)
              processed.push(a.challenge.userId)
              return{loser:a,losers:losers,processed:processed}
            }
           }

          }else if(bday.toString().substring(0,15)==startDate.toString().substring(0,15)){
          //  console.log("STARTDATE")
            const curr=new Date() 
            curr.setDate(aday.getDate()+1)
            var found=false
            var stop=new Date(endDate)
            stop.setDate(stop.getDate()+1)
       
           while(found==false && curr.toString().substring(0,15)!=stop.toString().substring(0,15)){
            const aStreak=await Streak.findOne({$and:[{"day":curr.toString().substring(0,15)},{"userId":a.challenge.userId}]})
            const bStreak=await Streak.findOne({$and:[{"day":curr.toString().substring(0,15)},{"userId":b.challenge.userId}]})
            if(aStreak!=null && bStreak!=null){
              if(aStreak.problems.length <bStreak.problems.length){
                //console.log("aa")
                const rem=losers.splice(a.index,1)
              
                processed.push(a.challenge.userId)
                return{loser:a,losers:losers,processed:processed}

              }else if(aStreak.problems.length >bStreak.problems.length){
                //console.log("bb")
                losers.splice(b.index,1)
                processed.push(b.challenge.userId)
                return{loser:b,losers:losers,processed:processed}
              }else{
                //console.log("cc")
                losers.splice(  a.timeLastAdded<b.timeLastAdded? b.index:a.index,1)
                processed.push( a.timeLastAdded<b.timeLastAdded? b.challenge.userId:a.challenge.userId)
                return a.timeLastAdded<b.timeLastAdded?  {loser:b,losers:losers,processed:processed}: {loser:a,losers:losers,processed}
              }
              curr.setDate(curr.getDate()-1)
          }else if(aStreak!=null && bStreak==null){
            losers.splice(b.index,1)
            processed.push(b.challenge.userId)
            return{loser:b,losers:losers,processed:processed}
          }else if(aStreak==null && bStreak!=null){
            losers.splice(a.index,1)
            processed.push(a.challenge.userId)
            return{loser:a,losers:losers,processed:processed}
          }
          curr.setDate(curr.getDate()+1)
          }

          }else{
          const curr=new Date() 
          curr.setDate(aday.getDate()+1)
          var stop=false
          var found=false 
        
          var end=new Date()
          end.setDate(endDate.getDate()+1) 
    
          while(curr<end && curr.toString().substring(0,15)!=end.toString().substring(0,15) && found==false){
            try{
            //console.log("next:",curr.toString())
         
            const aStreak=await Streak.findOne({$and:[{"day":curr.toString().substring(0,15)},{"userId":a.challenge.userId}]})
            const bStreak=await Streak.findOne({$and:[{"day":curr.toString().substring(0,15)},{"userId":b.challenge.userId}]})
       
           
            if(aStreak!=null && bStreak!=null){
              //console.log("a problems:",aStreak.problems.length)
             // console.log("b problems:",bStreak.problems.length)   

              if(aStreak.problems.length>bStreak.problems.length){
                  found=true 
                  lo= b
                //  console.log("removed:7178")
                  losers.splice(b.index,1)
                  processed.push(b.challenge.userId)
                  return {losers:losers,loser:b,processed:processed}
                  break
              }else if(bStreak.problems.length>aStreak.problems.length){
                found=true
                lo=a
              //  console.log("removed: 7185")
                losers.splice(a.index,1)
                processed.push(a.challenge.userId)
                return {losers:losers,loser:a,processed:processed}
                break 
              }else{
              
  }
            }else if(aStreak!=null && bStreak==null){
              //console.log("A NOT NULL B NULL")
              found=true
              lo=b
             // console.log("ermove 7196")
              losers.splice(b.index,1)
              processed.push(b.challenge.userId)
                return {losers:losers,loser:b,processed:processed}
                 break;
            }else if(aStreak==null && bStreak!=null){
             // console.log("A NOT NULL B NULL")
              found=true
              lo=a
             // console.log("ermove 7196")
              losers.splice(a.index,1)
              processed.push(a.challenge.userId)
              return {losers:losers,loser:a,processed:processed}
              break;

            }else{
              console.log("\n\nBOTH NULL")
            } 
          
            if(curr>endDate){
            found=true 
              var c=coinFlip()
              if(c<1){
               // console.log("ermove 7217")
                losers.splice(a.index,1)
                processed.push(a.challenge.userId)
              }else{
               // console.log("ermove 7220")
                losers.splice(b.index,1)
                processed.push(b.challenge.userId)
              }
             lo= c<1?a:b
              return c<1?{losers:losers,loser:a,processed:processed}:{losers:losers,loser:b,processed:processed}
               break;
            }
            //console.log(curr)
              curr.setDate(curr.getDate()+1)
              if(curr>=end || found || curr.toString().substring(0,15)==end.toString().substring(0,15)){
                break 
              }
          }
          catch(err){
        
          } 
        }
        } }else{ 
        console.log("\n\nHERE:",aday,bday)
        if(aday<bday){
          //console.log("ermove 7243")
          losers.splice(b.index,1)
          processed.push(b.challenge.userId)
          return   {losers:losers,loser:b,processed:processed}
        }else{
         // console.log("ermove 7219")
          losers.splice(a.index,1)
          processed.push(a.challenge.userId)
         return  {losers:losers,loser:a,processed:processed}
        }
 
        } 
      }
    }else{
      console.log("A STREAK NOT NULL. B STREAK NOT NULL")
      if(a.streak.problems.length>b.streak.problems.length){
       // console.log(" A STREAK MORE PROBLEMS ")
        lo=b
       // console.log("ermove 7259")
        losers.splice(b.index,1)
        processed.push(b.challenge.userId)
        return {losers:losers,loser:b,processed:processed}
      }else if(a.streak.problems.length<b.streak.problems.length){
       // console.log(" B STREAK MORE PROBLEMS ")
        lo=a
       // console.log("ermove 7265")
        losers.splice(a.index,1)
        processed.push(a.challenge.userId)
        return {losers:losers,loser:a,processed:processed}
      }else{ 
        console.log("EQUAL STREAKS")
        var aday=a.date
        var bday=b.date
     
        if(!aday instanceof Date){
          aday=new Date(a.date)
          console.log(Object.keys(a),Object.keys(b))
      
        }else{
         if(aday.toString().substring(0,15)==bday.toString().substring(0,15)){
         

            console.log("ENDDATE")
            var curr=new Date(a.date) 
           
            curr.setDate(curr.getDate()-1)
            var found=false
            var stop=new Date(startDate)
            stop.setDate(stop.getDate()-1)
        
            while(found==false && curr.toString().substring(0,15)!=stop.toString().substring(0,15)){
              //console.log("next:",curr.toString())
             // console.log(curr.toString())
              var astreak=await Streak.findOne({$and:[{"day":curr.toString().substring(0,15)},{"userId":a.challenge.userId}]})
              var bstreak=await Streak.findOne({$and:[{"day":curr.toString().substring(0,15)},{"userId":b.challenge.userId}]})
              if(astreak!=null && bstreak!=null){
                if(astreak.problems.length>bstreak.problems.length){
                  losers.splice(b.index,1)
                  processed.push(b.challenge.userId)
                  return {losers:losers,loser:b,processed:processed}

                }else if(astreak.length<bstreak.length){
                  losers.splice(a.index,1)
                  processed.push(a.challenge.userId)
                  return {losers:losers,loser:a,processed:processed}
                }else{
                  if(astreak.timeLastAdded<bstreak.timeLastAdded){
                    losers.splice(b.index,1)
                    processed.push(b.challenge.userId)
                    return {losers:losers,loser:b,processed:processed}
                  }else if(astreak.timeLastAdded>bstreak.timeLastAdded){
                    losers.splice(a.index,1)
                    processed.push(a.challenge.userId)
                    return {losers:losers,loser:a,processed:processed}
                  }
                }
              }else if(astreak==null && bstreak==null){

              }else{
                if(bstreak==null && astreak!=null){
                  losers.splice(b.index,1)
                  processed.push(b.challenge.userId)
                  return {losers:losers,loser:b,processed:processed}
                }else{
                  losers.splice(a.index,1)
                  processed.push(a.challenge.userId)
                  return {losers:losers,loser:a,processed:processed}
                }
              }
              curr.setDate(curr.getDate()-1)
             }
         
          
         }else{
          console.log("DIFF DAYS")
         }
        }
       
      }
    }
    //return {losers:losers,loser:a}
    }catch(err){
      console.log(err)
    }

      } 
    }
    }
  )
  
  var i=0
    if(l==null){
      //console.log("\n\n\ncoin:",coinFlip(0,2))
      var flip=coinFlip(0,2)
      const loser=losers[flip]
      losers.splice(flip,1)
      processed.push(loser.challenge.userId)
    return{losers:losers,loser:loser,processed:processed,noRank:true}
    }else{
      return{losers:losers,loser:l.loser,processed:processed}
    }

 
  //return{losers:losers,loser:l.loser}
 /* 
  setTimeout(()=>{
    l.then((lose)=>{

    losers.map((j)=>{
     
      try{
        console.log(j.challenge.userId)
        console.log("lose:",lose)
        console.log("lo",lo)
      if(j.challenge.userId==lose.loser.challenge.userId){
        losers.splice(i,1)
        console.log(i)
        ind=0
      }
    }catch(err){
      console.log(err)
    }
      i++
    })
    try{
    console.log("loser:",lose.loser.challenge.userId)
    }catch(err){
      return {losers:losers,loser:lose.loser}
    }
 
    return {losers:losers,loser:lose.loser}
  setTimeout(()=>{
    return {losers:losers,loser:lose.loser}
  },200)
})
  },300)*/

}
function toTime(seconds) {
  if (seconds < 0) return "-" + toTime(-seconds);
  return new Date(seconds * 1000).toISOString().substr(11, 8);
}


//for fixing streak with same timeLastAdded Value
app.get("/change-date",async(req,res)=>{
  var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
  "Aug","Sep","Oct","Nov","Dec"];
  var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]
  const already=[]
  const streaks=await Streak.find({"day":"Thu Mar 28 2024"})
  var i=300
 var ind=0
 while(ind<streaks.length){
  var s=streaks[ind]

    already.push(s.day)
   

   

  
        console.log("----------------------"+s.day)
      
    
          
          var date=s.day.split(" ")
          date=new Date(date[3],monthnum[months.indexOf(date[1])-1],date[2])
          var u=date.getSeconds()+randomNumber(1000,70000)
          const v=toTime(u)
          console.log(s.userId)
          console.log("old:"+date.toString())
          date.setSeconds(u)
          console.log("new:"+date.toString()+"\n")
      const update=await Streak.updateOne({$and:[{"userId":s.userId},{"day":s.day}]},{
        $set:{"timeLastAdded": date}
      })
      const check=await Streak.findOne({$and:[{"userId":s.userId},{"day":s.day}]})
      console.log("updated:"+s.timeLastAdded.toString()+" "+check.timeLastAdded.toString())
   
   
    
      ind++
   
  }
  
})
app.get("/challengeIds/:userId",async(req,res)=>{
  const cha=await GroupChallenge.find({"userId":req.params.userId})
  const ids=cha.map((c)=>{
    return {id:c.challengeId,title:c.title}
  })
  res.json(ids)
})
app.post("/alt-loser/:challengeId",async(req,res)=>{

  const allChallenges=await GroupChallenge.find({"challengeId":req.params.challengeId})
  axios.post("http://localhost:3022/get-challenge-losers/"+req.params.challengeId).then(async(response)=>{
    if(response.data.success){
      console.log("-------------------------------------------------") 
      const challenge=await GroupChallenge.findOne({"challengeId":req.params.challengeId})
      console.log(challenge.title)
      const takenRanks=[]
      var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
"Aug","Sep","Oct","Nov","Dec"];
var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]
      try{
        //console.log(allChallenges[0].title)
        const allLosers=response.data.losers
        const ids=[]
        var processed=[]
        const allRanks=[]
        var i=0
        const loserIds=response.data.losers.map((c)=>{
         
        var  id= c.losers.map((c)=>{
        
            return c.challenge.userId==null? c.challenge.userStats.userId:c.challenge.userId
          })
          
          id.map((f)=>{
            ids.push(f)
          })
          
        })
        console.log(ids)
    
        if(allLosers.length>0){
          var index=0;
          const processedLoser=[]
         
          var lastRank
          var rankEst=false
          var rank=(lastRank==null) ? findTotalLosersLength(allLosers):lastRank
         var onlyOne=true
         const already=[]
         //res.json(response.data)
          var alllosers=[]
          
          response.data.losers.map((cc)=>{
            var i=0
            cc.losers.map((c)=>{
              
              if(c.challenge!=null){
              if(!already.includes(c.challenge.userId)){
                const f=new Date()
                f.setDate(new Date(c.date).getDate())
                var failDate=cc.date.substring(0,15).split(" ")
              failDate=failDate instanceof Date?failDate:new Date(failDate[3],monthnum[months.indexOf(failDate[1])-1],failDate[2])
              c.date=failDate
              c.index=i
              alllosers.push(c)
                already.push(c.challenge.userId)
              
                i++
              return c
              }
            }
            })
          })
        
       
          response.data.losers.map((c)=>{
            if(c.losers.length>1){
              onlyOne=false
            }
          })
          
          setTimeout(async()=>{
           // console.log(onlyOne)
           if(!onlyOne){
          // console.log(alllosers.length)
          console.log("onlyOne")
           var index=0
            while(index<allLosers.length){
              
              // console.log("losers length:",losers.length)
              var losers=allLosers[index].losers
          
              var currDate=allLosers[index].date.split(" ")
              currDate=new Date(currDate[3],monthnum[months.indexOf(currDate[1])-1],currDate[2])
              
              //console.log("currDate:",currDate.toString().substring(0,15))
           
              var indexindex=0
             
         
            
             if(losers.length>0){
             
               while(losers.length>0 ){
                
                 if(losers.length>2){
                  if(!takenRanks.includes(rank)){
                    takenRanks.push(rank)
                    //console.log(takenRanks)
                      await getLosersEmpty(allChallenges,indexindex,losers,lastRank!=null?lastRank:rank,processed).then(async(results)=>{
                        allRanks.push({rank:rank,user:results.loser.challenge.userStats,date:new Date(results.loser.date)})
                        var update=await GroupChallenge.updateOne({$and:[{"challengeId":results.loser.challenge.challengeId},{"userId":results.loser.challenge.userId}]},{
                          $set:{"rank":rank,"success":false,"dateFailed":new Date(results.loser.date)}
                         })
                        console.log("7688",update)
                        console.log("BACK IN METH: rank",rank," user:",results.loser.challenge.userId,"\n\n")
                    
                        
                      processed=results.processed
                     
                      indexindex++
                      losers=results.losers
                     }) 
                    }else{ 
                      rank--
                      takenRanks.push(rank)
                      console.log("7755")
                      await getLosersEmpty(allChallenges,indexindex,losers,lastRank!=null?lastRank:rank,processed).then(async(results)=>{
                        allRanks.push({rank:rank,user:results.loser.challenge.userStats,date:new Date(results.loser.date)})
                        var update=await GroupChallenge.updateOne({$and:[{"challengeId":results.loser.challenge.challengeId},{"userId":results.loser.challenge.userId}]},{
                          $set:{"rank":rank,"success":false,"dateFailed":results.loser.date instanceof Date?results.loser.date:new Date(results.loser.date)}
                         })
                         console.log("7704",update)
                          console.log("BACK IN METH: rank",rank," user:",results.loser.challenge.userId,"\n\n")
                        
                        processed=results.processed
                      
                       
                        indexindex++
                        losers=results.losers  
                       })
                    }
                 }else if(losers.length==2){
                  console.log("7771")
                  if(!takenRanks.includes(rank)){
                    takenRanks.push(rank)
                   
                  await getLosersEmpty(allChallenges,indexindex,losers,lastRank!=null?lastRank:rank,processed).then(async(results)=>{
                    allRanks.push({rank:rank,user:results.loser.challenge.userStats,date:new Date(results.loser.date)})
                    var update=await GroupChallenge.updateOne({$and:[{"challengeId":results.loser.challenge.challengeId},{"userId":results.loser.challenge.userId}]},{
                      $set:{"rank":rank,"success":false,"dateFailed":results.loser.date instanceof Date?results.loser.date:new Date(results.loser.date)}
                     })
                     console.log("7722",update)
                      console.log("7445 BACK IN METH: rank",rank," user:",results.loser.challenge.userId,"\n\n")
                 
                    processed=results.processed
                    losers=results.losers
            
                    
                    rank-- 
               
                     if(losers.length==1){
                    if(!takenRanks.includes(rank)){
                      takenRanks.push(rank)
                 
                      console.log("7454 BACK IN METH: rank",rank," user:",losers[0].challenge.userId,"\n\n")
                      console.log(losers[0].date instanceof Date)
                      allRanks.push({rank:rank,user:losers[0].challenge.userStats,date:new Date(losers[0].date)})
                      var update=await GroupChallenge.updateOne({$and:[{"challengeId":losers[0].challenge.challengeId},{"userId":losers[0].challenge.userId}]},{
                        $set:{"rank":rank,"success":false,"dateFailed":losers[0].date instanceof Date?losers[0].date:new Date(losers[0].date)}
                       })
                       console.log("7742",update)
                      processed.push(losers[0].challenge.userId)
                      indexindex++
                      losers=[]                     
                      index++
                      console.log("7808:index",index,"all",allLosers.length)
                    
                      if(index>=allLosers.length || index>=ids.length || processed.length==ids.length || allRanks.length==ids.length){
                        const updateCha=await GroupChallenge.updateMany({"challengeId":req.params.challengeId},{
                          $set:{"status":"COMPLETE_AND_CLOSED"}
                        })
                        const updateDate=await GroupChallengeData.updateOne({"challengeId":req.params.challengeId},{
                          $set:{"ranks":allRanks}})
                        axios.get("http://localhost:3022/find-bad/"+req.params.challengeId).then((response)=>{
                          res.json({success:true,ranks:allRanks,data:response.data})
                        })
                      }else{
                        console.log("INDEX:--SO FAR")
                        console.log("allranks.length:",allRanks.length, " ids length:",ids.length)
                        allRanks.map((r)=>{
                          console.log("rank:",r.rank," user:",r.user)
                        })
                      }
                    }else{
                      rank--
                      takenRanks.push(rank)
                      console.log("7815")
                      allRanks.push({rank:rank,user:losers[0].challenge.userStats,date:new Date(losers[0].date)})
                      processed.push(losers[0].challenge.userId)
                      var update=await GroupChallenge.updateOne({$and:[{"challengeId":losers[0].challenge.challengeId},{"userId":losers[0].challenge.userId}]},{
                        $set:{"rank":rank,"success":false,"dateFailed":losers[0].date instanceof Date?losers[0].date:new Date(losers[0].date)}
                       })
                       console.log("7751",update)
                      console.log("7461 BACK IN METH: rank",rank," user:",losers[0].challenge.userId,"\n\n")
                      indexindex++
                      losers=[]                     
                      index++
                      if(index>=allLosers.length || index>=ids.length || processed.length==ids.length){
                  
                        const updateDate=await GroupChallengeData.updateOne({"challengeId":req.params.challengeId},{
                          $set:{"ranks":allRanks}})
                        axios.get("http://localhost:3022/find-bad/"+req.params.challengeId).then((response)=>{
                          res.json({success:true,ranks:allRanks,data:response.data})
                        })
                      }
                    }
                    console.log("7837 index:",index)
                    }
                 
                   })
                  }else{
                    rank--
                    takenRanks.push(rank)
                    console.log("7839")
                    await getLosersEmpty(allChallenges,indexindex,losers,lastRank!=null?lastRank:rank,processed).then(async(results)=>{
                      processed=results.processed 
                      allRanks.push({rank:rank,user:results.loser.challenge.userStats,date:new Date(results.loser.date)})
                    var update=await GroupChallenge.updateOne({$and:[{"challengeId":results.loser.challenge.challengeId},{"userId":results.loser.challenge.userId}]},{
                      $set:{"rank":rank,"success":false,"dateFailed":new Date(results.loser.date)}
                     })
                      console.log("7473 BACK IN METH: rank",rank," user:",results.loser.challenge.userId,"\n\n")
                     
                      losers=results.losers
                  
                      
                   
                      rank-- 
                       if(losers.length==1){
                        
                        console.log("7481 BACK IN METH: rank",rank," user:",losers[0].challenge.userId,"\n\n")
                        const l=losers[0].challenge
                        allRanks.push({rank:rank,user:losers[0].challenge.userStats,date:new Date(losers[0].date)})
                      
                        if(losers[0]!=null){
                          
                      var update=await GroupChallenge.updateOne({$and:[{"challengeId":losers[0].challenge.challengeId},{"userId":losers[0].challenge.userId}]},{
                        $set:{"rank":rank,"success":false,"dateFailed":losers[0].date instanceof Date?losers[0].date:new Date(losers[0].date)}
                       })
                         console.log("7786",update)
                        processed.push(losers[0].challenge.userId)
                     
                        console.log("7872 index:",index,"allLosers:",allLosers.length,"ids",ids.length)
                       console.log(losers[0].date)
                       console.log(processed)
                        indexindex++
                        losers=[]
                   
                      }
                       index++
                      
                        console.log("7876 index:",index,"allLosers:",allLosers.length,"ids",ids.length)
                      
                        if(index>=allLosers.length || index>=ids.length || processed.length==ids.length){
                          const updateDate=await GroupChallengeData.updateOne({"challengeId":req.params.challengeId},{
                            $set:{"ranks":allRanks}})
                          console.log(allRanks)
                          axios.get("http://localhost:3022/find-bad/"+req.params.challengeId).then((response)=>{
                            try{
                            res.json({success:true,ranks:allRanks,data:response.data})
                            }catch(err){

                            }
                          })
                        }
                        
                      }
                   
                     })
                  }
                   //console.log(results.loser.userId)
                     //indexindex++
                 }else if(losers.length==1){
                  console.log("7883")
                  if(!takenRanks.includes(rank)){
                   console.log("7453 BACK IN METH: rank",rank," user:"+losers[0].challenge.userId)
                   allRanks.push({rank:rank,user:losers[0].challenge.userStats,date:new Date(losers[0].date)})
                   processed.push(losers[0].challenge.userId)
                   var failDate=losers[0].date
                   if(!failDate instanceof Date){
                    failDate=losers[0].challenge.date
                   }
                   console.log(losers[0].date)
                   var update=await GroupChallenge.updateOne({$and:[{"challengeId":losers[0].challenge.challengeId},{"userId":losers[0].challenge.userId}]},{
                     $set:{"rank":rank,"success":false,"dateFailed":failDate}
                    })
                   processed.push(losers[0].challenge.userId)
                   indexindex++
                   rank--
                   losers=[]
                   index++ 
                   if(index>=allLosers.length || index>=ids.length || processed.length==ids.length){
                    
                    const updateDate=await GroupChallengeData.updateOne({"challengeId":req.params.challengeId},{
                      $set:{"ranks":allRanks}})
                    console.log(allRanks)
                    axios.get("http://localhost:3022/find-bad/"+req.params.challengeId).then((response)=>{
                      res.json({success:true,ranks:allRanks,data:response.data})
                    })
                  }
                  }else{
                    rank--
                    takenRanks.push(rank)
                    console.log("7905",losers[0].challenge.userId)
                    if(!processed.includes(losers[0].challenge.userId)){
                    allRanks.push({rank:rank,user:losers[0].challenge.userStats,date:new Date(losers[0].date)})
                      processed.push(losers[0].challenge.userId)
                      console.log(processed)
                      var update=await GroupChallenge.updateOne({$and:[{"challengeId":losers[0].challenge.challengeId},{"userId":losers[0].challenge.userId}]},{
                        $set:{"rank":rank,"success":false,"dateFailed":losers[0].date instanceof Date?losers[0].date:new Date(losers[0].date)}
                       })
                    console.log("7453 BACK IN METH: rank",rank," user:"+losers[0].challenge.userId)
                    indexindex++
                    rank--
                    losers=[]
                      }
                    index++
                    console.log("7919 index",index)
                    if(index>=allLosers.length || index>=ids.length || processed.length==ids.length){
                      const updateDate=await GroupChallengeData.updateOne({"challengeId":req.params.challengeId},{
                        $set:{"ranks":allRanks}})
                      console.log(allRanks)
                      axios.get("http://localhost:3022/find-bad/"+req.params.challengeId).then((response)=>{
                        res.json({success:true,ranks:allRanks,data:response.data})
                      })
                    }
                  }
                   
                 }else {
                   break
                 }
               }
              }else{
                index++
              }
          
             } 
           }else{
            var index=0
            console.log("ONLY ONE 7972")
            while(index<response.data.losers.length){
              var loser=response.data.losers[index]
            
              if(loser.losers.length>0){
                console.log("7977")
                console.log("rank:"+rank+" "+loser.losers[0].challenge.userId, loser.date.toString().substring(0,15))
                console.log(ids)
                const update=await GroupChallenge.updateOne({$and:[{"challengeId":req.params.challengeId},{"userId":loser.losers[0].challenge.userId}]},{
                  $set:{"success":false,"dateFailed":loser.date instanceof Date?loser.date:new Date(loser.date),"rank":rank}
                })
                const found=await GroupChallenge.findOne({$and:[{"challengeId":req.params.challengeId},{"userId":loser.losers[0].challenge.userId}]})
                console.log("update",update,found)
                
                

                allRanks.push({rank:rank,userId:loser.losers[0].challenge.userId,dateFailed:new Date(loser.date)})
               
                rank--
              } 
              index++
              if(index>=allLosers.length || index>=ids.length || processed.length==ids.length){
                console.log(allRanks)
                const updateWinners=await GroupChallenge.updateOne({$and:[{"challengeId":req.params.challengeId},{"userId":{$nin:ids}}]},{
                  $set:{"success":true}
                })
                const updateDate=await GroupChallengeData.updateOne({"challengeId":req.params.challengeId},{
                  $set:{"ranks":allRanks}
                })
                axios.get("http://localhost:3022/find-bad/"+req.params.challengeId).then((response)=>{
                  try{
                  res.json({success:true,ranks:allRanks,data:response.data})
                  }catch(err){

                  }
                })
                
            
              }
            }
           }
  
      },100)
        }
    }catch(err){
        console.log(err)
    }
    }
  })
})
app.get("/update-ranks-in-challenge-data",async(req,res)=>{
  const challenges=await GroupChallengeData.find({})
  challenges.map(async(c)=>{
    if(c.challengeId){
    const ranks=[]
    const cha=await GroupChallenge.find({"challengeId":c.challengeId})
    var i=0
    while(i<cha.length){
      const ch=cha[i]
      ranks.push({rank:ch.rank==null?null:ch.rank,userId:ch.userId,firstname:ch.userStats.firstname,lastname:ch.userStats.lastname,username:ch.userStats.username})

      i++
      if(i>=cha.length){
        console.log(c.title," ",c.challengeId)
        console.log(ranks,"\n\n")

      }
    }
  }
  })
})
app.get("/alt-losers",async(req,res)=>{
  console.log("here")
  const challenges=await GroupChallengeData.find({})
  challenges.map((a)=>{
    if(a.challengeId!=null){
    axios.post("http://localhost:3022/alt-loser/"+a.challengeId).then((response)=>{
      console.log(response.data,"--------------------------------------------------")
    })
  }
  })
})
app.post("/grade-challenges/:challengeId",async(req,res)=>{
  console.log("HERE")
  const allChallenges=await GroupChallenge.find({"challengeId":req.params.challengeId})
  axios.post("http://localhost:3022/get-challenge-losers/"+req.params.challengeId).then(async(response)=>{
    if(response.data.success){
      const takenRanks=[]
      var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
"Aug","Sep","Oct","Nov","Dec"];
var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]
      try{
        console.log(allChallenges[0].title)
        const allLosers=response.data.losers
        const ids=[]
        var i=0
        const loserIds=response.data.losers.map((c)=>{
          
        var  id= c.losers.map((c)=>{
          
            return c.challenge.userId==null? c.challenge.userStats.userId:c.challenge.userId
          })
          console.log(id)
          id.map((f)=>{
            ids.push(f)
          })
          
        })
        console.log("IDS",ids)
      if(response.data.losers.length>0){
        const updateWinners=await GroupChallenge.updateMany({$and:[{"userId":{$nin:ids}},{"challengeId":req.params.challengeId}]},{
          $set:{"success":true}
        })
        console.log("SUCCESS",updateWinners)
        var index=0;
        const processedLoser=[]
        console.log("\n\n\n\n")
        var lastRank
        var rankEst=false
        var rank=(lastRank==null) ? findTotalLosersLength(allLosers):lastRank
        const up=await GroupChallenge.updateMany({"challengeId":44454},{
          $set:{"rank":null}
        })
        while(index<allLosers.length){
        
        
         
          var losers=allLosers[index].losers
          var indexindex=0
          if(losers.length>0){
          console.log(response.data.allLosersId)
            while(losers.length>0){
             
              if(losers.length>2){
                  var results= await getLoser(allChallenges,indexindex,losers,lastRank!=null?lastRank:rank)
                  
                  if(results!=null){
                  if(results.loser!=null){
                 
                  var losers=results.losers !=null?results.losers:losers
                    
                if(!processedLoser.includes(results.loser.challenge.userId)){
                  var failDate=results.loser.streak!=null?results.loser.streak.day.split(" "):new Date(allLosers[index].date)
                 
                  failDate=failDate instanceof Date?failDate:new Date(failDate[3],monthnum[months.indexOf(failDate[1])-1],failDate[2])
                
                 
                  console.log("CASE:"+(lastRank!=null?lastRank:rank)+results.loser.challengeId)
                   if(lastRank!=null){
                   if(takenRanks.includes(lastRank)){
                    lastRank=lastRank-1
                   const updateLoser=await GroupChallenge.updateOne({$and:[{"userId":results.loser.challenge.userId},{"challengeId":results.loser.challenge.challengeId}]},{
                     $set:{"status":"COMPLETE_AND_CLOSED","success":false,"dateFailed":(failDate instanceof Date)?failDate:allLosers[index].date,"rank":lastRank!=null?lastRank:rank}
                   })
                   takenRanks.push(lastRank)
                   console.log("CASE:LASTRANK NOT NULL/ LASTRANK  IN TAKEN")

                  }else{
                    takenRanks.push(lastRank)
                   
                    const updateLoser=await GroupChallenge.updateOne({$and:[{"userId":results.loser.challenge.userId},{"challengeId":results.loser.challenge.challengeId}]},{
                      $set:{"status":"COMPLETE_AND_CLOSED","success":false,"dateFailed":(failDate instanceof Date)?failDate:allLosers[index].date,"rank":lastRank!=null?lastRank:rank}
                    })
                    lastRank=lastRank-1
                    console.log("CASE:LASTRANK NOT NULL/ ADDED TO TAKEN")
                  }
                  }else{
                    if(takenRanks.includes(rank)){
                      rank=rank-1
                      lastRank=rank
                     const updateLoser=await GroupChallenge.updateOne({$and:[{"userId":results.loser.challenge.userId},{"challengeId":results.loser.challenge.challengeId}]},{
                       $set:{"status":"COMPLETE_AND_CLOSED","success":false,"dateFailed":(failDate instanceof Date)?failDate:allLosers[index].date,"rank":lastRank!=null?lastRank:rank}
                     })
                     takenRanks.push(lastRank)
                     console.log("CASE:LASTRANK NULL/ RANK NOT NULL")
                    }else{
                      takenRanks.push(lastRank)
                      const updateLoser=await GroupChallenge.updateOne({$and:[{"userId":results.loser.challenge.userId},{"challengeId":results.loser.challenge.challengeId}]},{
                        $set:{"status":"COMPLETE_AND_CLOSED","success":false,"dateFailed":(failDate instanceof Date)?failDate:allLosers[index].date,"rank":lastRank!=null?lastRank:rank}
                      })
                      lastRank=rank-1
                    console.log("CASE:LASTRANK NULL/ RANK NULL")
                    }
                  }
                
                   //console.log(updateLoser)
                
                  
                  if(losers.length==2){
                    var results= await getLoser(allChallenges,indexindex,losers,lastRank!=null?lastRank:rank)
                    console.log("CASE:"+(lastRank!=null?lastRank:rank)+results.loser.challengeId)
                    if(results!=null){
                    if(results.loser!=null){
                     // console.log(results.loser.userStats.username)
                    var losers=results.losers !=null?results.losers:losers
                   
                  if(!processedLoser.includes(results.loser.challenge.userId)){
                    var failDate=results.loser.streak!=null?results.loser.streak.day.split(" "):new Date(allLosers[index].date)
                   console.log("6336")

                    failDate=failDate instanceof Date?failDate:new Date(failDate[3],monthnum[months.indexOf(failDate[1])-1],failDate[2])
                  
                    console.log("\n\nrank:"+rank+" lastRank: "+lastRank+" "+results.loser.challenge.userId)
                    const anyRank=await GroupChallenge.find({"challengeId":req.params.challengeId})
                    const lowest=anyRank.reduce((a,b)=>{
                     if(a.rank!=null && b.rank!=null){
                      return a.rank>=b.rank?  b:a
                     }else if(a.rank==null && b.rank==null){
                        return rank
                     }else if(a.rank==null || b.rank==null){
                       if(a.rank==null && b.rank==null){
                         return rank
                       }else if(a.rank!=null){
                         return a.rank
                       }else{
                         return b.rank
                       }
                     }
                    })
                    console.log(lowest.rank==null)

                    lowest.rank=lowest.rank<=0 || lowest.rank==null?rank:lowest.rank
                    console.log("STORED RANK:"+(lowest.rank)+" newRank"+(lowest.rank+1))
                    if(lastRank!=null){
                      if(takenRanks.includes(lastRank)){
                       lastRank=lastRank-1
                      const updateLoser=await GroupChallenge.updateOne({$and:[{"userId":results.loser.challenge.userId},{"challengeId":results.loser.challenge.challengeId}]},{
                        $set:{"status":"COMPLETE_AND_CLOSED","success":false,"dateFailed":(failDate instanceof Date)?failDate:allLosers[index].date,"rank":lastRank!=null?lastRank:rank}
                      })
                      takenRanks.push(lastRank)
                     }else{
                       takenRanks.push(lastRank)
                      
                       const updateLoser=await GroupChallenge.updateOne({$and:[{"userId":results.loser.challenge.userId},{"challengeId":results.loser.challenge.challengeId}]},{
                         $set:{"status":"COMPLETE_AND_CLOSED","success":false,"dateFailed":(failDate instanceof Date)?failDate:allLosers[index].date,"rank":lastRank!=null?lastRank:rank}
                       })
                       lastRank=lastRank-1
                       
                     }
                     }else{
                       if(takenRanks.includes(rank)){
                         rank=rank-1
                         lastRank=rank
                        const updateLoser=await GroupChallenge.updateOne({$and:[{"userId":results.loser.challenge.userId},{"challengeId":results.loser.challenge.challengeId}]},{
                          $set:{"status":"COMPLETE_AND_CLOSED","success":false,"dateFailed":(failDate instanceof Date)?failDate:allLosers[index].date,"rank":lastRank!=null?lastRank:rank}
                        })
                        takenRanks.push(lastRank)
                       }else{
                         takenRanks.push(lastRank)
                         const updateLoser=await GroupChallenge.updateOne({$and:[{"userId":results.loser.challenge.userId},{"challengeId":results.loser.challenge.challengeId}]},{
                           $set:{"status":"COMPLETE_AND_CLOSED","success":false,"dateFailed":(failDate instanceof Date)?failDate:allLosers[index].date,"rank":lastRank!=null?lastRank:rank}
                         })
                         lastRank=rank-1
                       
                       }
                     }
                    processedLoser.push(results.loser.challenge.userId) 
                    if(losers.length==1){
                      console.log("\n\n6409 rank:"+rank+" lastRank: "+lastRank+" "+results.loser.challenge.userId)

                      if(!processedLoser.includes(losers[0].challenge.userId)){
                        console.log("5689 rank:"+lastRank +" "+losers[0].challenge.userId)

                        var failDate=losers[0].streak!=null?losers[0].streak.day.split(" "):new Date(allLosers[index].date)
                
                        failDate=failDate instanceof Date?failDate:new Date(failDate[3],monthnum[months.indexOf(failDate[1])-1],failDate[2])
                        const anyRank=await GroupChallenge.find({"challengeId":req.params.challengeId})
                        const lowest=anyRank.reduce((a,b)=>{
                         if(a.rank!=null && b.rank!=null){
                          return a.rank>=b.rank?  b:a
                         }else if(a.rank==null || b.rank==null){
                           if(a.rank==null && b.rank==null){
                             return rank
                           }else if(a.rank!=null){
                             return a.rank
                           }else{
                             return b.rank
                           }
                         }
                        })
                        console.log("STORED RANK:"+(lowest.rank)+" newRank"+(lowest.rank+1))
                        lowest.rank=lowest.rank<=0 || lowest.rank==null?rank:lowest.rank
                        const updateLoser=await GroupChallenge.updateOne({$and:[{"userId":losers[0].challenge.userId},{"challengeId":losers[0].challenge.challengeId}]},{
                           $set:{"status":"COMPLETE_AND_CLOSED","success":false,"dateFailed":(failDate instanceof Date)?failDate:allLosers[index].date,"rank":1}
                         })
                        // console.log(updateLoser)
                         lastRank=rank-1
                         console.log("new rank:"+lastRank)

                         processedLoser.push(losers[0].challenge.userId)
                        
                     
                         losers.splice(0,losers.length-1)
                         break
                       }else{
                         console.log("ALREADY:"+losers[0].challenge.userId+" rank:"+lastRank)
                       }
                       losers.splice(0,losers.length-1)
                    }
                   // console.log(processedLoser)
                  } else{
                    console.log("ALREADY:"+results.loser.challenge.userId+" rank:"+lastRank)
                  } 
                }else if(results instanceof "String"){
                  console.log("|N|N|NRESULTS",results)
                }
              }else{
                break
              }
            }
                 // console.log(processedLoser)
                 
                } else{
                  console.log("ALREADY:"+results.loser.challenge.userId+" rank:"+lastRank)
                } 
              }else if(results instanceof "String"){
                console.log("|N|N|NRESULTS",results)
              }
            }else{
              break
            }
              }else if(losers.length==2){
                //console.log("==2 COmplete")
                var results= await getLoser(allChallenges,indexindex,losers,lastRank!=null?lastRank:rank)
               
                if(results!=null){
                if(results.loser!=null){
                 console.log(("6460 rank:"+lastRank!=null?lastRank:rank)+ " ",results.loser.challenge.userId)
                var losers=results.losers !=null?results.losers:losers
               
              if(!processedLoser.includes(results.loser.challenge.userId)){
                console.log("INSIDE ONLY @")
                var failDate=results.loser.streak!=null?results.loser.streak.day.split(" "):new Date(allLosers[index].date)
             
                failDate=failDate instanceof Date?failDate:new Date(failDate[3],monthnum[months.indexOf(failDate[1])-1],failDate[2])
              
                console.log("\n\nrank:"+rank+" lastRank: "+lastRank+" "+results.loser.challenge.userId)
                const anyRank=await GroupChallenge.find({"challengeId":req.params.challengeId})
                const lowest=anyRank.reduce((a,b)=>{
                 if(a.rank!=null && b.rank!=null){
                  return a.rank>=b.rank?  b:a
                 }else if(a.rank==null || b.rank==null){
                   if(a.rank==null && b.rank==null){
                     return rank
                   }else if(a.rank!=null){
                     return a.rank
                   }else{
                     return b.rank
                   }
                 }
                })
                console.log(lowest.rank.MongooseDocument==null)

                lowest.rank=lowest.rank<=0 || lowest.rank==null?rank:lowest.rank
                console.log("STORED RANK:"+(lowest.rank)+" newRank"+(lowest.rank+1))

                 const updateLoser=await GroupChallenge.updateOne({$and:[{"userId":results.loser.challenge.userId},{"challengeId":results.loser.challenge.challengeId}]},{
                   $set:{"status":"COMPLETE_AND_CLOSED","success":false,"dateFailed":(failDate instanceof Date)?failDate:allLosers[index].date,"rank":lastRank}
                 })
                 //console.log(updateLoser)
                lastRank=rank-1
                processedLoser.push(results.loser.challenge.userId) 
                console.log("5689",lastRank)
                if(losers.length==1){
                  console.log("\n\n\nLENGTH 1 INSIDE AFTER 2, COMPLETE LENGTH 2 :"+lastRank +" length:"+losers.length)
                  if(!processedLoser.includes(losers[0].challenge.userId)){
                    var failDate=losers[0].streak!=null?losers[0].streak.day.split(" "):new Date(allLosers[index].date)
                   
 
                    failDate=failDate instanceof Date?failDate:new Date(failDate[3],monthnum[months.indexOf(failDate[1])-1],failDate[2])
 
                     console.log("6426 rank:"+lastRank+" "+losers[0].challenge.userId)
                     const anyRank=await GroupChallenge.find({"challengeId":req.params.challengeId})
                     const lowest=anyRank.reduce((a,b)=>{
                      if(a.rank!=null && b.rank!=null){
                       return a.rank>=b.rank?  b:a
                      }else if(a.rank==null || b.rank==null){
                        if(a.rank==null && b.rank==null){
                          return rank
                        }else if(a.rank!=null){
                          return a.rank
                        }else{
                          return b.rank
                        }
                      }
                     })
                     console.log(lowest.rank==null)

                     lowest.rank=lowest.rank<=0 || lowest.rank==null?rank:lowest.rank
                     console.log("STORED RANK:"+(lowest.rank)+" newRank"+(lowest.rank+1))
                     const updateLoser=await GroupChallenge.updateOne({$and:[{"userId":losers[0].challenge.userId},{"challengeId":losers[0].challenge.challengeId}]},{
                       $set:{"status":"COMPLETE_AND_CLOSED","success":false,"dateFailed":(failDate instanceof Date)?failDate:allLosers[index].date,"rank":lastRank!=null?lastRank:rank}
                     })
                    // console.log(updateLoser)
                    lastRank=rank-1
                     processedLoser.push(losers[0].challenge.userId)
                    
                 
                     losers.splice(0,losers.length-1)
                     break
                   }else{
                     console.log("ALREADY:"+losers[0].challenge.userId+" rank:"+lastRank)
                   }
                   losers.splice(0,losers.length-1)
                }
               // console.log(processedLoser)
              } else{
                console.log("ALREADY:"+results.loser.challenge.userId+" rank:"+lastRank)
              } 
            }else if(results!=null ){
              if(results instanceof String){
              console.log("|N|N|NRESULTS",results)
              }
            }
          }else{
            break
          }

              }else  if(losers.length==1){
                
                  if(!processedLoser.includes(losers[0].challenge.userId)){
                   var failDate=losers[0].streak!=null?losers[0].streak.day.split(" "):new Date(allLosers[index].date)
                  

                   failDate=failDate instanceof Date?failDate:new Date(failDate[3],monthnum[months.indexOf(failDate[1])-1],failDate[2])

                    console.log("6463 rank:"+(lastRank!=null?lastRank:rank)+" "+losers[0].challenge.userId)
                    console.log(losers[0].challenge.challengeId)
                    const anyRank=await GroupChallenge.find({"challengeId":req.params.challengeId})
                    const lowest=anyRank.reduce((a,b)=>{
                     if(a.rank!=null && b.rank!=null){
                      return a.rank>=b.rank?  b:a
                     }else if(a.rank==null || b.rank==null){
                       if(a.rank==null && b.rank==null){
                         return rank
                       }else if(a.rank!=null){
                         return a.rank
                       }else{
                         return b.rank
                       }
                     }
                    })
                    console.log(lowest.rank==null)

                    lowest.rank=lowest.rank<=0 || lowest.rank==null?rank:lowest.rank
                    console.log("STORED RANK:"+(lowest.rank)+" newRank"+(lowest.rank-1))
                    if(!takenRanks.includes(lastRank)){
                    const updateLoser=await GroupChallenge.updateOne({$and:[{"userId":losers[0].challenge.userId},{"challengeId":losers[0].challenge.challengeId}]},{
                      $set:{"status":"COMPLETE_AND_CLOSED","success":false,"dateFailed":(failDate instanceof Date)?failDate:allLosers[index].date,"rank":lastRank!=null?lastRank:rank}
                    })
                    takenRanks.push(lastRank)
                    lastRank--
                  }else{
                    lastRank=lastRank-1
                    const updateLoser=await GroupChallenge.updateOne({$and:[{"userId":losers[0].challenge.userId},{"challengeId":losers[0].challenge.challengeId}]},{
                      $set:{"status":"COMPLETE_AND_CLOSED","success":false,"dateFailed":(failDate instanceof Date)?failDate:allLosers[index].date,"rank":lastRank!=null?lastRank:rank}
                    })
                    takenRanks.push(lastRank)
                  }
                   
                    lastRank=rank-1
                    processedLoser.push(losers[0].challenge.userId)
                   
                   
                
                    break
                  }else{
                    console.log("ALREADY:"+losers[0].challenge.userId+" rank:"+lastRank)
                  }
                
               
                }
                indexindex++
            }
           
          }
          index++
          if(index==allLosers.length){
            console.log("DONE",processedLoser)
            const anyRank=await GroupChallenge.find({"challengeId":req.params.challengeId})
            const lowest=anyRank.reduce((a,b)=>{
             if(a.rank!=null && b.rank!=null){
              return a.rank>=b.rank?  b:a
             }else if(a.rank==null || b.rank==null){
               if(a.rank==null && b.rank==null){
                 return rank
               }else if(a.rank!=null){
                 return a.rank
               }else{
                 return b.rank
               }
             }
            })
            console.log(lowest.rank==null)
            console.log("STORED RANK:"+(lowest.rank)+" newRank"+(Number(lowest.rank)-1))
            lowest.rank=lowest.rank<=0 || lowest.rank==null?rank:lowest.rank
            const updateWinners=await GroupChallenge.updateMany({$and:[{"challengeId":req.params.challengeId},{"userId":{$nin:processedLoser}}]},{
              $set:{"status":"COMPLETE_AND_CLOSED","success":true}
            })
            const all=await GroupChallenge.find({"challengeId":req.params.challengeId})
            var ranks=all.map((c)=>{
              return{user:c.userId,rank:c.rank}
            })
            setTimeout(()=>{
              res.json({success:true,update:updateWinners,ranks:ranks})
            },200)
            console.log(updateWinners)
          }
        }
      }
    }catch(err){
      console.log(err)
    }

    }
  })
})


app.get("/get-min-date/:userId",async(req,res)=>{
  const group=await GroupChallenge.find({})

  group.map(async(c)=>{
  
    const mini=await GroupChallenge.findOne({$and:[{"userId":{$ne:req.params.userId}},{"challengeId":c.challengeId},{$max:"rank"},{"rank":{$ne:null}}]})

    console.log("min for "+c.title,mini)
  })
})
app.post("/sort-group-challenges/:userId",async(req,res)=>{
  const allStreaks=[]
  axios.get("http://localhost:3022/get-all-group-challenges/"+req.params.userId).then((response)=>{
    axios.get("http://localhost:3022/get-others-group-challenge/"+req.params.userId).then((response1)=>{
    var index=0
    const already=[]
    const AlreadyUser=[]
   
    var challenges=response.data.challenges
    console.log(response.data.challenges.length)
    console.log(response1.data.challenges.length)

    challenges=challenges.concat(response1.data.challenges)
    console.log("NEW"+challenges.length)
    while(index<challenges.length){
      console.log("INDEX:"+index)
      response.data.challenges.concat
    challenges.map((g)=>{
     console.log(response.data.challenges.length)
      var i=0
      const currStreaks=[]
      var startDate=new Date(g.challenge.startDate)
      var stopDate=new Date(startDate.setDate(startDate.getDate()-1))
        stopDate=new Date(stopDate.getDate()-1)
      g.streaks.map((s)=>{
        var found=already.map((f)=>{
          console.log(f.userId,f.day)
          if(f.day==s.day && f.userId==s.streak.userId){
            return true
          }
        })
       
        
        if(!found.includes(true) && g.startDate<=new Date(s.day)<=stopDate){
          console.log("\n",s.day.toString(),"         ",s.streak.userId)
            already.push({day:s.day,userId:s.streak.userId})
           
            currStreaks.push(s)
        }
        if(i==g.streaks.length-1 && currStreaks.length>0){
          allStreaks.push({challenge:g.challenge,streaks:currStreaks})
        }
        i++
      
      })
  
      index++
      if(index>=challenges.length){
        res.json({length:allStreaks.length,success:true,challenges:allStreaks})
      }
    })
  }
    setTimeout(()=>{
      console.log(index)
   
      
    },800)
  })
  })
})

app.post("/update-group-challenge-status/:userId",async(req,res)=>{
const all=await GroupChallenge.find({$or:[{"userId":req.params.userId},{ allUserIds: { "$in" : [req.params.userId]} }]})
const currentChallenges=[]
const curr=new Date()
var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
"Aug","Sep","Oct","Nov","Dec"];
var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]
if(all.length>0){
  all.map((a)=>{
    if((new Date(a.startDate)<= curr<= new Date(a.endDate)) && a.hasAccepted){
    if(req.params.userId==a.userId){
      
        currentChallenges.push(a)
       

    }else{
      const approved=a.selectedContestants.map((s)=>{
        
        if(s.approved && req.params.userId==s.userId){
          return true
        }
      })
      if(approved.includes(true)){
        console.log("EVERY OTHER CHILD")
          currentChallenges.push(a)  
      }
    }
    }
  })
}
setTimeout(()=>{

  var lastUpdated=new Date()
 
  currentChallenges.map((c)=>{
   
    const owner=c.allUserIds.map((c)=>{
      if(c==req.params.userId){
        return true
      }
    })
    if(c.userId!=req.params.userId){
    c.selectedContestants.map(async(s)=>{
      if(s.userId==req.params.userId){
        console.log("MATCH")
        if(c.lastUpdated==null){
          c.lastUpdated=lastUpdated
        }else{
          var last=new Date(c.lastUpdated)
          if(last.toString().substring(0,15)==curr.toString().substring(0,15)){
            const group=await StreakGroup.findOne({$and:[{"userId":req.params.userId},{"days":{$in:[last.toString().substring(0,15)]}}]})
            console.log("group:",group)
            //res.json
          }else{
            // last time we check was in the past
            //1.streak today exists?
              /**
               * CASE 1) today date within challenge range
                  *
                
              CASE 2) today date NOT within challenge range
                  *   CASE 2)A) yesterday date within challenge date range
                            // CASE 2) A) streak yesterday exist
                                 ///CASE 2) A) A) streak GROUP with yesterday in it exists
                      *                   for each day within challenge date range has sufficient number of questions,set the min no_questions

                      *           ///CASE 2) A) B) streak group with yesterday DOES NOT exists(SHOULD BE IMPOSSIBLE)
                      *      
                      *          

                            // CASE 2) B) streak yesterday DOES NOT exist
                                #fail user 
                                ##if all users are checked out set winner
                      *     
                        #finalize challenge winners and close status, create variable closed out for challenge
                  * 
                  *    CASE 2)B) yesterday date NOT challenge date range(challenge should be closed out IMPOSSIBLE)
                  *                
               */
          const today=new Date().toString().substring(0,15)
          const streakToday=await Streak.findOne({$and:[{"userId":req.params.userId},{"day":today}]})

          }
          //streakday=new Date(streakday[3],monthnum[months.indexOf(streakday[1])-1],streakday[2])
        }
      }
    })
  }else{
  }
  console.log("END-----------"+c.title+"----------------OWNER:"+user.firstname+" "+user.lastname+"\n\n")

  })
  res.json({success:true,length:currentChallenges.length,groupChallenges:currentChallenges})
},500)

})


app.post("/delete-challenge",async(req,res)=>{
  const challenge=req.body.challenge
  console.log(challenge)
  const found=await Challenge.findOne({$and:[{"title":challenge.title},{"userId":challenge.userId}]})
  console.log(found)
  const user=await User.findOne({"userId":challenge.userId})
 if(user!=null){
  const challenges=user.challenges
 const keep= challenges.filter((c)=>{
    if(challenge.title!=c.title){
      return c
    }
  })
  console.log(user.currentChallenge.endDate,challenge.endDate.toString())
  if(user.currentChallenge.title==challenge.title && (user.currentChallenge.endDate.toString()==challenge.endDate.toString())){
    console.log("MAtch")
    const removeCurrentChallenge=await User.updateOne({"userId":challenge.userId},{"currentChallenge":null})
  }
  
  const update=await User.updateOne({"_id":user.id},{
    "challenges":keep
  })
  const updatedUser=await User.findOne({"userId":user.userId})
  res.json({success:true,user:updatedUser})
  
 }
 

  if(found!=null){
    const deleted=await Challenge.deleteOne({"_id":found._id})
    console.log(deleted)
    try{
    if(deleted.acknowledge){
      res.json({success:true,deleted:deleted})
    }else{
      res.json({success:true,message:"No challenge existed"})
    }
  }catch(err){

  }
  }
  
})
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
 const  marDates=[]
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
    $and:[{"userId":req.params.id},{"day":{$regex:"Apr"}},{"day":{$regex:date.getFullYear().toString()}}]
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
    mayDates.push(a.day)
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

    decDates.push(a.day)
  })

  
  
  setTimeout(()=>{
    res.json({success:true,months:[{month:"January",problems:janCount,days:janDates},{month:"February",problems:febCount,days:febDates},{month:"March",problems:marCount,days:marDates},{month:"April",problems:aprCount,days:aprDates},{month:"May",problems:mayCount,days:mayDates},{month:"June",problems:junCount,days:junDates},{month:"July",problems:julCount,days:julDates},{month:"August",problems:augCount,days:augDates},{month:"September",problems:sepCount,days:sepDates},{month:"October",problems:octCount,days:octDates},{month:"November",problems:novCount,days:novDates},{month:"December",problems:decCount,days:decDates}]})

  },1000)



})

app.get("/monthCharts/:id/:year",async(req,res)=>{
  // dbmongo.streak.createIndex( { "$**": "text" } )
  const date=new Date()
  date.setFullYear(req.params.year)

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
   const marDates=[]
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
     $and:[{"userId":req.params.id},{"day":{$regex:"Apr"}},{"day":{$regex:date.getFullYear().toString()}}]
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
     mayDates.push(a.day)
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
   
     decDates.push(a.day)
   })
 
   
   
  console.log("may:",mayCount,junCount)
     res.json({success:true,months:[{month:"January",problems:janCount,days:janDates},{month:"February",problems:febCount,days:febDates},{month:"March",problems:marCount,days:marDates},{month:"April",problems:aprCount,days:aprDates},{month:"May",problems:mayCount,days:mayDates},{month:"June",problems:junCount,days:junDates},{month:"July",problems:julCount,days:julDates},{month:"August",problems:augCount,days:augDates},{month:"September",problems:sepCount,days:sepDates},{month:"October",problems:octCount,days:octDates},{month:"November",problems:novCount,days:novDates},{month:"December",problems:decCount,days:decDates}]})
 
 
 
 
 
 })
 

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
app.post("/problem-by-title",async(req,res)=>{
  const problem=await Problem.find({$or:[{"title":req.body.title},{"title":{$in:[]}}]})
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

app.post("/update-challenge",async(req,res)=>{
  const challenge=req.body.challenge
  const endDate=req.body.endDate
  const update=await Challenge.findOne({"_id":challenge._id})
  console.log(update)
  const updated=await Challenge.updateOne({"_id":challenge._id},{
    $set:{"endDate":endDate}
  })
  console.log(updated)
  if(updated.acknowledged==true){
    res.json({success:true,acknowledge:updated})
  }
})


app.post("/sort-problems",async(req,res)=>{
  const problems=req.body.problems
  
  const newProblems=[]

 console.log(problems.length-1)
 var r=problems.length-1
 console.log(r)
  const arr=await sortArr(problems,0,problems.length-1)

  setTimeout(()=>{
    console.log(arr)
    res.json({problems:arr,success:true,old:problems})
  },2000)

})

app.post("/follow-user/:followed/:follower",async(req,res)=>{
  const follower=await User.findOne({"username":req.params.follower})
  const followed=await User.findOne({"username":req.params.followed})
  console.log(follower,followed)
  if(follower!=null && followed!=null){
    if(follower.following!=null){
    const follow=await User.updateOne({"userId":follower.userId},{
      $push:{
        "following":{followedSince:new Date(),user:followed.userId,username:req.params.followed}
      }
    })
  }else{
    const follow=await User.updateOne({"userId":follower.userId},{
      $set:{
        "following":[{followedSince:new Date(),user:followed.userId,username:req.params.followed}]
      }
    })

  }
  if(followed.followers!=null){
    const addfollower=await User.updateOne({"userId":followed.userId},{
      $push:{
        "followers":{followedSince:new Date(),user:follower.userId,username:req.params.follower}
      }
    })
  }else{
    const addfollower=await User.updateOne({"userId":followed.userId},{
      $set:{
        "followers":[{followedSince:new Date(),user:follower.userId,username:req.params.follower}]
      }
    })

  }
  const returnUser=await User.findOne({"username":req.params.follower})
    res.json({success:true,user:returnUser})

    
  }
})
app.get("/username-available/:id/:username",async(req,res)=>{
  const user=await User.findOne({"username":req.params.username})
  if(user==null){
    res.json({success:true,available:true})
  }else{
    res.json({success:true,available:false})

  }

})
app.post("/set-username/:id/:username",async(req,res)=>{
  console.log("\n\nHI")
  const user=await User.findOne({"userId":req.params.id.toString()})
  const ourUser=req.body.user
  console.log(user)
  if(user!=null){
  const setUserName=await User.updateOne({"_id":user.id},{
    $set:{
      "username":req.params.username
    }
  })
  if(setUserName.acknowledged){
    const newUser=await User.findOne({"userId":req.params.id.toString()})
    res.json({success:true,user:newUser})
  }
  }else{
    console.log(ourUser)
    const added=new User({
      lastname: ourUser.lastname,
      emailVerified: false,
      online: ourUser.online,
      timezone: ourUser.timezone,
      onlock: ourUser.onlock,
      firstname:ourUser.firstname,
      lastLogin: ourUser.lastLogin,
      userId: ourUser.userId,
      password: ourUser.password,
      email: ourUser.email,
      username:req.params.username
    })
    const save=await added.save()
   if(save!=null){
    res.json({success:true,err:"User not found.Added new user.",save:save,user:save})
   }
  }
})
app.get("/sort-streaks/:userId",async(req,res)=>{
  const start=new Date()
 // console.log(req.params.userId)
  //console.log(req.body)
  var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
  "Aug","Sep","Oct","Nov","Dec"];
  var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]

  var totalCorrectLength=0
  var totalLength=0
  const groups=await StreakGroup.find({$and:[{"userId":typeof(req.params.userId)=="string"?req.params.userId:parseInt(req.params.userId)}]})
  groups.map((g)=>{
    
   totalCorrectLength=totalCorrectLength+g.days.length
  })

  const streaksArr=[]
  var gIndex=0
 /* while(gIndex<groups.length){

  }*/
  groups.map(async(g)=>{
   
    const arr=[]
    const streaks=await Streak.find({$and:[{"group":g.id},{"userId":typeof(req.params.userId)=="string"?req.params.userId:parseInt(req.params.userId)}]})
  
    streaks.map((s)=>{
      
    var date=s.day.split(" ")
  

    date=new Date(date[3],monthnum[months.indexOf(date[1])-1],date[2])
      arr.push({day:s.day,date:date,problems:s.problems})
    })
    setTimeout(()=>{
    
      totalLength=arr.length+totalLength
      if(arr.length>0){
        streaksArr.push(arr)
      }

      
    },50)
 
   
  })
  setTimeout(()=>{

    streaksArr.map((p)=>{
      if(p.length==0){
        streaksArr.splice(streaksArr.indexOf(p),1)
      }
    })
    setTimeout(()=>{
      const end=new Date()
      res.json({success:true,time:end.getSeconds()-start.getSeconds(),streaksLength:totalLength,correctStreaksLength:totalCorrectLength,streaks:streaksArr})

    })
  },1500)
})

app.get("/s",async(req,res)=>{
  const str=await Streak.find({"userId":2322})
  console.log(str)
})

app.get("/current-streak-long/:userId",async(req,res)=>{
  const strek=[]
  const start=new Date()
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
  var end=new Date()
  res.json({success:true,time:end.getMilliseconds()-start.getMilliseconds(),streaks:strek})
},1500)
  
})

app.get("/current-streak/:userId",async(req,res)=>{
  const strek=[]
 const start=new Date()

 var yest=new Date(start)
 yest.setDate(yest.getDate()-1)
 console.log(start.toString(),"\n\n\n",yest.toString())
 var streakGroup=await StreakGroup.findOne({$and:[{"userId":req.params.userId},{"days":{$in:[yest.toString().substring(0,15)]}}]})
console.log(streakGroup)
 if(streakGroup!=null){
  console.log(streakGroup.length)
  var i=0
  var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
  "Aug","Sep","Oct","Nov","Dec"];
  var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]

  
  while(i<streakGroup.days.length){
    var d=streakGroup.days[i]
    const streak=await Streak.findOne({$and:[{"userId":req.params.userId},{"day":d}]})
    if(streak!=null){
      var date=streak.day.split(" ")
  

      date=new Date(date[3],monthnum[months.indexOf(date[1])-1],date[2])
      strek.push({day:date,problems:streak.problems})
    }
    i++
    if(i>=streakGroup.days.length){
      var end=new Date()
      res.json({success:true,time:end.getMilliseconds()-start.getMilliseconds(),streaks:strek})

    }
  }
 }else{
  try{
  res.json({success:true,streaks:null,message:"no streaks yet"})
  }catch(err){
    console.log(err)
  }
}
 
 /* var streaks=await StreakGroup.find({$and:[{"userId":req.params.userId}]})
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
  */


 
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

app.get("/addAll",async(req,res)=>{
  const group=await GroupChallenge.find({})
  group.map(async(g)=>{
    const ids=g.selectedContestants.map((g)=>{
      return g.userId
    })
  
    setTimeout(async()=>{
      console.log(ids)
      const update=await GroupChallenge.updateOne({"challengeId":g.challengeId},{
        "allUserIds":ids
      })
      console.log(update)
    },1000)
   /* const update=await GroupChallenge.updateOne({"challengeId":g.challengeId},{
      "allUserIds":ids
    })
    console.log(update)*/
  })
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


app.get("/add-info-to-problem/:id",async(req,res)=>{
  const problem=await Problem.findOne({"title":req.body.title})
  console.log(problem)


  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  console.log("grabbing all httprequest from browser");
  const page = await browser.newPage();
  await page.goto(
    problem.link
  );
  page.on("response", async (response) => {
    const getData = async (response) => {
      const c = await response.text();
      return c;
    };
    if (response.url() == "https://leetcode.com/graphql/") {
      const data = await getData(response).then(async (response) => {
        const info = await JSON.parse(response).data;
        try{
         
          //console.log(info.question)
          //console.log("\n\n")
        }catch(err){
          
        }
      })
    }
  })

})

app.post("/leetcode-problem-from-url/",async(req,res)=>{
  

  const pathToExtension = require('path').join(__dirname, '2captcha-solver');
  const { executablePath } = require('puppeteer'); 

  const puppeteerExtra = require('puppeteer-extra');
const Stealth = require('puppeteer-extra-plugin-stealth');
  puppeteerExtra.use(Stealth());
  const browser = await puppeteerExtra.launch({
    headless: false,
    defaultViewport: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    // ignoreDefaultArgs: ['--disable-extensions'],
            headless:false,
            args: [
              `--disable-extensions-except=${pathToExtension}`,
              `--load-extension=${pathToExtension}`,
            ],
            executablePath: executablePath(),
            slowMo:10,
  });
  console.log("grabbing all httprequest from browser");
  const page = await browser.newPage();
  await page.goto(
    req.body.url
  );
  const key="6ae6a0104c7414ceb3bbf1bb62b534de"
      function getStringBetween(str,start,end){
        const result = str.match(new RegExp(start + "(.*)" + end));

        return result[1];
      
      }
  setTimeout(async()=>{
    try{
    await page.click("iframe")
   
    const elementHandle = await page.$('iframe');
   
    const src = await (await elementHandle.getProperty('src')).jsonValue();
    }catch(err){

    }

    //const dataKey=getStringBetween(src,"k=","&co")
   //.log(src)
  page.on("response", async (response) => {
 
    const getData = async (response) => {
      const c = await response.text();
      return c;
    };
    if (response.url() == "https://leetcode.com/graphql/") {
     setTimeout(async()=>{
         await page.click('[data-layout-path="/ts0/tb2"]')
         console.log("CLICKED")
     },2000)
      const data = await getData(response).then(async (response) => {
        const info = await JSON.parse(response).data;
        try{
         
          
          if(info.question!=null){
            try{
            var lengthR=JSON.parse(info.question.stats).acRate
            lengthR=Number(lengthR.toString().substring(0,4))
         
            var title=req.body.url.split("/")
            const updateAcRate=await Problem.updateOne({"titleSlug":title[4]},{
              $set:{"acRate":lengthR}
            })
          }catch(err){
            
          }

           
           var title=req.body.url.split("/")
            try{
              var title=req.body.url.split("/")
           const q=info.question
             if(info.question.titleSlug==title[4]){
              try{
                const updateSlug=await Problem.updateOne({"title":req.body.title},{
                  $set:{"titleSlug":info.question.titleSlug}
                })
                console.log(updateSlug)
              }catch(err){

              }
             
              try{
                if(q.isPaidOnly==false){
                const newProblem=new Problem({
                  title:q.title,
                  frontendQuestionId:q.frontendQuestionId,
                  difficulty:q.difficulty,
                  level:q.difficulty,
                  titleSlug:q.titleSlug,
                  link:req.body.url
                })
                const save=await newProblem.save()
              
              }
              }catch(err){

              }
             }
            }catch(err){
             
            }
            try{
          
            const $=cheerio.load(info.question.content)
           
            const updatePrompt=await Problem.updateOne({"titleSlug":title[4]},{
              $set:{"prompt":$("html *").text()}
            })
             console.log(JSON.parse(info.question.stats))
          
           // console.log(updateAcRate)
           
            }catch(err){

            }
            try{

            }catch(err){

            }
            if(info.question.topicTags!=null){
              console.log(info.question.topicsTags)
              const tags=info.question.topicTags.map((f)=>{
               
                return f.name
              })
              console.log(tags)
              var updateTags=await Problem.updateOne({"titleSlug":title[4]},{
                $set:{"topicTags":tags}
              })
              var updateTags=await Problem.updateOne({"titleSlug":title[4]},{
                $set:{"tags":tags}
              })
            }
          
           
           

          }
        
          //console.log("\n\n")
        }catch(err){
          
        }
      })
    }
  })

},4000)
setTimeout(async()=>{
  console.log("\n\n",req.body.url)
  const found=await Problem.findOne({"link":req.body.url})
  res.json({success:true,problem:found})
},6000)
})

app.get("/titleslugs-existing",async(req,res)=>{
  const problems=await Problem.find({})
  var i=0;

    axios.post("http://localhost:3022/leetcode-problem-from-url",{url:problems[0].link,title:problems[0].title}).then((response)=>{
      console.log(response.data)
    
    })
 
  
})
/************************************************************************************************************************************************************************************************************************************************************ */
//GOOD
app.post("/getProblemByTitle",async(req,res)=>{
  const problem=await Problem.findOne({"title":req.body.title})
  if(problem!=null){
    res.json({success:true,problem:problem})
  }else{
    res.json({success:false})
  }
})

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
//use title slug to create link
var i
  (async () => {
    const arrr=[]
    const updates=[]
    const newProblems=[]

    const allproblems=[]
    const pathToExtension = require('path').join(__dirname, '2captcha-solver');
    const { executablePath } = require('puppeteer'); 
  
    const puppeteerExtra = require('puppeteer-extra');
  const Stealth = require('puppeteer-extra-plugin-stealth');
    puppeteerExtra.use(Stealth());
    const browser = await puppeteerExtra.launch({
      headless: false,
      defaultViewport: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      // ignoreDefaultArgs: ['--disable-extensions'],
              headless:false,
              args: [
                `--disable-extensions-except=${pathToExtension}`,
                `--load-extension=${pathToExtension}`,
              ],
              executablePath: executablePath(),
              slowMo:10,
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
    const key="6ae6a0104c7414ceb3bbf1bb62b534de"
    function getStringBetween(str,start,end){
      const result = str.match(new RegExp(start + "(.*)" + end));

      return result[1];
    
    }
setTimeout(async()=>{
  try{
  await page.click("iframe")
 
  const elementHandle = await page.$('iframe');
 
  const src = await (await elementHandle.getProperty('src')).jsonValue();
  }catch(err){

  }
 
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
                 var link=base+q.titleSlug
                  console.log(q.title)
                  console.log(base+q.titleSlug)
                  const prob=await Problem.findOne({"title":q.title})
                
                 const updatelink=await Problem.updateOne({"title":q.title},{
                    $set:{"link":base+q.titleSlug}
                  })

                  console.log(updatelink,"\n\n")
                 
                  
                  if(q.paidOnly && prob!=null){
                    const del=await Problem.deleteOne({"title":q.title})
                    console.log("DELETED:",q.title,del)
                  }
                 
          if(prob!=null ){
             
            
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
                  const updateTag=await Problem.updateMany({"title":prob.title},{
                    $set:{"tags":tags,"topicTags":tags}
                  })
                  var pageNumber=page.url().toString().substring(page.url().length-2,page.url().length)
                  const updatePage=await Problem.updateMany({"title":prob.title},{
                    $set:{"page":Number(pageNumber)}
                  })
                  console.log(page.url().toString().substring(page.url().length-2,page.url().length))
                  console.log("update tags",tags,q.title,updateTag)
                  /*
                  const prob=await Problem.findOne({"title":q.title})
                  
                  if(prob!=null){
                    const updatelink=await Problem.updateMany({"title":" "+q.title},{
                      $set:{"link":link}
                    })
                    const updateTag=await Problem.updateMany({"title":" "+q.title},{
                      $set:{"topicTags":tags,"tags":tags}
                    })
                   // console.log("updating link for:",q.title,link,updatelink)
                   // console.log("updating tag for:",q.title,tags,updatelink)

                       if(q.paidOnly){
             // console.log("!!!MUST PAY:"+q.title)
              const del=await Problem.deleteOne({"title":q.title})
              console.log("deleted",q.title,del)
            }
                  //console.log("\n",prob.title," ",q.acRate," ",q.difficulty)
                 // console.log(prob.difficulty," ",q.acRate)
                 if(prob.link==null){
                 const updatelink=await Problem.updateOne({"title":" "+q.title},{
                  $set:{"link":link}
                })
                //console.log("updating link for:",q.title,updatelink)
              }
              if(prob.titleSlug==null){
                const updateSlug=await Problem.updateOne({"title":" "+q.title},{
                  $set:{"titleSlug":q.titleSlug}
                })
              // console.log("updating titleSlug for:",q.title,updateSlug)
              }
              if(prob.difficulty==null){
                const difficulty=await Problem.updateOne({"title":" "+q.title},{
                  $set:{"difficulty":prob.level!=null? prob.level:q.difficulty}
                })
               
                //console.log("updated difficulty:",difficulty, q.title," difficulty:"+q.difficulty+"\n\n")
              }
              if(prob.acRate==null){
                const acRate=await Problem.updateOne({"title":" "+q.title},{
                  $set:{"acRate": Number(q.acRate.toString().substring(0,6))}
                })
               // console.log("acRate update:",prob.title," ",acRate)
              }
                if(prob.level==null){
                const levelUpdate=await Problem.updateOne({"title":q.title},{
                  $set:{"level":q.difficulty}
                })
              // console.log("level update:",prob.title," ",levelUpdate)
              }
             /* if(prob.page==null){
                const page=await Problem.updateOne({"title":prob.title},{
                  $set:{"page":req.params.page}
                })
               //console.log("page update:",prob.title,page)
              }*/

                 if(prob.acRate==null || prob.difficulty==null || prob.level==null || prob.tags.length==0 ||prob.topicTags.length==0 || prob.frontendQuestionId==null || prob.page==null){
                /*  if(prob.page==null){
                    const page=await Problem.updateOne({"title":prob.title},{
                      $set:{"page":req.params.page}
                    })
                   // console.log("updating page for:",q.title,page)
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
                  //  console.log("difficulty update:",prob.title," ",difficulty)

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
                 //  console.log("frontendId update:",prob.title," ",frontend)


                  }
                  if(prob.page==null){
                    const page=await Problem.updateOne({"title":prob.title},{
                      $set:{"page":req.params.page}
                    })
                  //  console.log("page update:",prob.title,page)

                  }
                  if(prob.tags.length==0 || prob.topicTags.length==0){
                    tags.map(async(t)=>{
                      if(prob.topicTags.length==0){
                      const topicTag=await Problem.updateOne({"title":prob.title},{
                        $push:{"topicTags":t}
                      })
                   //   console.log("topictags update:",prob.title,topicTag)

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
                  
                }*/
                }else{
                  const prob=await Problem.findOne({"title":q.title})
                  if(q.paidOnly==false && prob==null){
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
                    link=base+q.titleSlug
                    console.log(link)
                 // console.log("CREATING NEW PROBLEM",q.title)
                  const tags=q.topicTags.map((t)=>{
                    return t.name
                  })
                  var pageNumber=page.url().toString().substring(page.url().length-2,page.url().length)
                  var  newProblem=new Problem({
                    title:q.title,
                    difficulty:q.difficulty,
                    acRate:q.acRate,
                    link:base+q.titleSlug,
                    frontendQuestionId:q.frontendQuestionId,
                    page:pageNumber,
                    titleSlug:q.titleSlug,
                    topicTags:tags,
                    tags:tags
                    
                   })
                  try {
                    const saved= await newProblem.save()
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
                    console.log(err1)
                  }
                }
                }
                  }else{
                    if(q.paidOnly==false && prob==null){
                                         console.log("\nEMPTY QUESTION:",q.title)
                                         const tags=q.topicTags.map((t)=>{
                                          return t.name})
                                        if(tags!=null){
                                       
                  
                                        tags.map(async(t)=>{
                                          const topicTag=await Problem.updateOne({"title":q.title},{
                                            $push:{"topicTags":t}
                                          })
                    
                                        
                                          const ptag=await Problem.updateOne({"title":q.title},{
                                            $push:{"tags":t}
                                          })
                    
                                         // console.log(problem.title,ptag)
                                        })
                                      }
                                         
                    var pageNumber=page.url().toString().substring(page.url().length-2,page.url().length)
                    var  newProblem=new Problem({
                      title:q.title,
                      difficulty:q.difficulty,
                      acRate:q.acRate,
                      level:q.difficulty,
                      frontendQuestionId:q.frontendQuestionId,
                      page:pageNumber,
                      link:link,
                      titleSlug:q.titleSlug,
                      topicTags:tags,
                      tags:tags,

                      
                     })
                     if(q.paidOnly==false){
                      const added=await newProblem.save()
                      console.log("success added")
                      console.log(added,"\n\n")
                     }
                    
                    try {
                     // const saved= await newProblem.save()
                     
                      //console.log(saved)
                      const tags=q.topicTags.map((t)=>{
                        return t.name})
                      if(tags!=null){
                      

                      tags.map(async(t)=>{
                        const topicTag=await Problem.updateOne({"title":newProblem.title},{
                          $push:{"topicTags":t}
                        })
  
                      
                        const ptag=await Problem.updateOne({"title":newProblem.title},{
                          $push:{"tags":t}
                        })
  
                       // console.log(problem.title,ptag)
                      })
                    }
                      //newProblems.push(saved)
                    }catch(err1){
                      console.log("not added",err1)
                    }
                  }
                  }
          
                });
              
              }
            } catch(err){
              console.log(err)
              //console.log("no problems");
            }
          }
        });
        //console.log(data)
      }
    });
  },1)
  }else{

     
    await page.goto(
      "https://leetcode.com/problemset/all/" 
    );
    setTimeout(async()=>{
      try{
      await page.click("iframe")
     
      const elementHandle = await page.$('iframe');
     
      const src = await (await elementHandle.getProperty('src')).jsonValue();
      }catch(err){
    
      }
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
                  const base = "https://leetcode.com/problems/";
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
                  var link=base+q.titleSlug
                  console.log(link)
                  const prob=await Problem.findOne({$and:[{"title":q.title}]})
            
               
                  console.log(page.url())
                  var pageNumber=page.url().toString().substring(page.url().length-2,page.url().length)
             
                  //console.log("here:",updatelink)
                  //console.log(q)
                  if(q.paidOnly==false){
                  //  console.log("MUST PAY:"+q.title)
                  }
                 
                  var tags=q.topicTags.map((t)=>{
                    return t.name
                  })
                 // const prob=await Problem.findOne({$and:[{"title":q.title}]})
                  if(prob!=null){
                    var pageNumber=page.url().toString().substring(page.url().length-2,page.url().length)
                    const updatePage=await Problem.updateMany({"title":prob.title},{
                      $set:{"page":Number(pageNumber)>0? pageNumber:1}
                    })
                    console.log("page update",updatePage)
                  const updatelink=await Problem.updateMany({"title":" "+prob.title},{
                    $set:{"link":base+q.titleSlug}
                  })
                 // console.log("updating link for:",q.title,updatelink)
                  const updateSlug=await Problem.updateOne({"title":prob.title},{
                    $set:{"titleSlug":q.titleSlug}
                  })
                  //console.log("update slug for ",q.title,updateSlug)
                  const updateTags=await Problem.updateMany({"title":+prob.title},{
                    $set:{"tags":tags,"topicTags":tags}
                  })
                 // console.log("update tags for ",q.title,tags,updateTags)
                  const difficulty=await Problem.updateMany({"title":prob.title},{
                    $set:{"difficulty":q.difficulty}
                  })
                 // console.log("difficulty update:",prob.title," ",difficulty)
                }
                var tags=q.topicTags.map((t)=>{
                  return t.name
                })
                  //console.log(tags)
                  tags.map(async(t)=>{
                    try{
                    const tag=new ProblemTopicTag({
                      name:t
                    })
                    const saveTag=await tag.save()
                   // console.log(saveTag)
                  }catch(err){

                  }
                  })
                  //const prob=await Problem.findOne({$and:[{"title":q.title}]})
                  if(prob!=null){
                    if(q.paidOnly==false){
                  //console.log("\n",prob.title," ",q.acRate," ",q.difficulty)
                 // console.log(prob.difficulty," ",q.acRate)
                /* if(prob.acRate==null || prob.difficulty==null || prob.tags.length==0 ||prob.topicTags.length==0 || prob.frontendQuestionId==null){
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
                  //  console.log("difficulty update:",prob.title," ",difficulty)

                  }
                  if(prob.frontendQuestionId==null){
                    const frontend=await Problem.updateOne({"title":prob.title},{
                      $set:{"frontendQuestionId":q.frontendQuestionId}
                    })
                  // console.log("frontendId update:",prob.title," ",frontend)

                  }
                  if(prob.tags.length==0 || prob.topicTags.length==0){
                    tags.map(async(t)=>{
                      if(prob.topicTags.length==0){
                      const topicTag=await Problem.updateOne({"title":prob.title},{
                        $push:{"topicTags":t}
                      })
                     // console.log("topictags update:",prob.title,topicTag)

                    }
                      if(prob.tags.length==0){
                      const ptag=await Problem.updateOne({"title":prob.title},{
                        $push:{"tags":t}
                      })
                     // console.log("tags update:",prob.title,ptag)

                    }
                     // console.log(problem.title,ptag)
                    }) 

                  }
                  console.log("\n\n")
                  const updateP=await Problem.find({title:prob.title})
                  updates.push(updateP)
                }
                */
                }
                  }else{
                   
                    try {
                    
                      var pageNumber=page.url().toString().substring(page.url().length-2,page.url().length)
                      if(q.paidOnly==false){
                        console.log("\nEMPTY:",q.title)
                        var tagss=q.topicTags.map((t)=>{
                          return t.name
                        })
                        var  newProblem=new Problem({
                          title:q.title,
                          difficulty:q.difficulty,
                          acRate:q.acRate,
                          level:q.difficulty,
                          frontendQuestionId:q.frontendQuestionId,
                          page:pageNumber,
                          link:link,
                          titleSlug:q.titleSlug,
                          topicTags:tagss,
                          tags:tagss
                          
                          
                         })
                      const saved= await newProblem.save()
                      console.log("success")
                      console.log(saved)
                      }else{
                        const dele=await Problem.deleteOne({"title":q.title})
                        console.log("DELETED:"+dele)
                      }
                    
                      const tags=q.topicTags.map((t)=>{
                        return t.name
                      })

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
    })
  },1);
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
/*
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
                  //const jsdom = require("jsdom");
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
*/

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
/*
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
                  //const jsdom = require("jsdom");
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
*/
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

app.get("/number",async(req,res)=>{
  const problems=await Problem.find({})
  const all=problems.filter((d)=>{
    if(d.prompt==null){
      return d
    }else if(d.prompt.length<10){
      return d
    }
  })
  res.json({length:all.length,p:all})
})
var validUrl = require('valid-url');
function parseHTML(str){
  console.log("PARSEING-----------------")
  var start=0
  var end=start;
  while(end<str.length){
    console.log(str.substring(start,1))
    if(str.substring(start,1)=='<' || str.substring(start,1)=="<"){
      
      while(str.substring(end,1)!='>'){
        end++;
        if(str.substring(end,1)=='>'){
          console.log(str.substring(start,end+1))
        }
      }
    }
    end++
    if(end>=str.length){
      return 
    }
  }
}//const jsdom=require("jsdom");
const User = require("./models/User");
const GroupChallenge = require("./models/GroupChallenge");
const GroupChallengeData = require("./models/GroupChallengeData");
const { DATE } = require("sequelize");


app.get("/create-prompts",async(req,res)=>{
  (async (r,i) => {
    const generate = async (r) => {
      const { executablePath } = require('puppeteer'); 

      const puppeteerExtra = require('puppeteer-extra');
    const Stealth = require('puppeteer-extra-plugin-stealth');
    function getStringBetween(str, start, end) {
      const result = str.match(new RegExp(start + "(.*)" + end));
    
      return result[1];
    }
    puppeteerExtra.use(Stealth());
      const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],

      });
      console.log("grabbing all httprequest from browser!!!!");
      const page = await browser.newPage();

      const getData = async (response) => {
        
        var c= await response.text();
        return c;
      }; 

      try{
      

      await page.goto(r.link)
      setTimeout(async()=>{
        try{
        await page.click("iframe")
       
        const elementHandle = await page.$('iframe');
       
        const src = await (await elementHandle.getProperty('src')).jsonValue();
        }catch(err){
    
        }
      page.on("response", async (response) => {
        
        if (response.url() == "https://leetcode.com/graphql/") {

        
          const data = await getData(response).then(async (response) => {
            try{

             
            const html=await page.content()
            //console.log(html)
              
              const $=cheerio.load(html)
             
              const para=$("div ")//[class='flexlayout__tabset_content']
              //console.log(Object.keys(para[0].attribs),para[0].attribs,"\n\n")
              if(para[0].children!=null){
               
              const c=para[0].children[0]
              //console.log("\n\n\n",c.text(),"n\n\n")
                parseHTML(c.text().toString())
                if(c.text()!=null){
               
                
             
                  try{
                 //console.log("\n\n\n",typeof(c.text()),"n\n\n")
                    var ch=c.text().replace(/<.*?>/, "")
                    ch=ch.replace(/</,"")
                    ch=ch.replace(/>/,"")
                    console.log("\n\n\n\nHETE",ch,"\n\n")
                 
                
                  }catch{
                    //console.log(err)
                  }
                }

            
            }
            }catch(err){

            }
            try{
            const info = await JSON.parse(response).data;
          

            // console.log(info)
            if (info != null) {
              const p = info.question;
              //console.log(Object.keys(p),"\n\n")

              try{
                const content = p.content;
                //console.log(content)
                if (content != null && r.prompt==null) {
                  //console.log(content)
                  //const jsdom = require("jsdom");
                  const { JSDOM } = jsdom;
                  
                  const dom = new JSDOM(
                    "<!DOCTYPE html><body id='body'>" + content + "</body>"
                  );
                 // console.log(dom.textContent())

                //console.log("content:",dom.window.document.getElementById("body").textContent);
                 const update=await Problem.updateOne({"title":r.title},{
                    $set:{"prompt":dom.window.document.getElementById("body").textContent}
                  })
                  if(update.acknowledged){
                    i++
                    console.log(",",i ," prompts created\n")
                    //console.log(update)
                    if(i==3){
                      try{
                      res.json({success:true,updated:i})
                      }catch(err){
                        console.log("caught")
                      }
                    }

                  } 

                }
              }catch(err){
              }

              try {
                if (p != null) {
                  //console.log(Object.keys(p))
                }
                try{
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
              }catch(err){

              }
              try{
                const content = p.content;
                //const jsdom = require("jsdom");
                const { JSDOM } = jsdom;
              try{
                if(content!=null){
                  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                
                  var ch=content
            
                  const dom = new JSDOM(
                    "<!DOCTYPE html><body id='body'>" + content + "</body>"
                  );

                console.log("content:",dom.window.document.getElementById("body").outerHTML);
                 // parseHTML(ch)
                 // ch=ch.replace(/<.*?>/, "")
                 // console.log("\n\n\n\n\n\n\nlenght",ch)
             
               // ch=ch.replace("<","")
               // ch=ch.replace(">","")
                 //console.log(ch)
                }
              }catch(err){
                //console.log(err)
              }
                if (content != null && r.prompt==null) {
                  //console.log(content)
                  //const jsdom = require("jsdom");
                  const { JSDOM } = jsdom;
                  
                  const dom = new JSDOM(
                    "<!DOCTYPE html><body id='body'>" + content + "</body>"
                  );
                  const pageNumber=page.url.substring(page.url().length-2,page.url().length-1)
                  console.log("\n\nPAGE",pageNumber) 
                console.log("content:",dom.window.document.getElementById("body").textContent);
                 const update=await Problem.updateOne({"title":r.title},{
                    $set:{"prompt":dom.window.document.getElementById("body").textContent}
                  })
                
                
                  i++
                  return i
                  
                  /*
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
                  */
                  
                  
             


           

                }
              }catch(err){
                //console.log(err)
              }
                const hint=p.hints

            if(hint!=null || hint.length>0 ){
                  console.log("\n\nHINT:",hint)
                  if(hint.length>0){
                    const update=await Problem.updateOne({"title":r.title},{
                      $set:{"leetcode_hints":hint}
                    })
                    console.log("\n\nhints updated:",update)
                    const str=await Streak.findOne({$and:[{"title":p.title},{"prompt":{$ne:null}}]})
                    if(str!=null){
                      try{ 
                     // page.close() 
                      }catch(err){ 

                      }   
                    } 
                  }  
                }
              } catch {
               // console.log("no problems");
              }
            }
          }catch(err){
            
          }
          });
        }
      });
    },2000)
    
    }catch(err){
      console.log("try")
    }
    };
  const results=await Problem.find({"prompt":null})
          console.log(results.length+" empty prompts")
          var i=0
          results.map((p)=>{
           
            if(p.prompt==null){
              //generate(p,i)
              //console.log(p.title)
            }
          })
         // generate(results[0]);
         //console.log(results,"\n\n")
        const number=Math.floor(randomNumber(0,results.length-4))

        //console.log(results)
        var i=0

        if(results.length>0){
          var index=0;
           index=await generate(results[number],index)
           console.log("\n\n\nindex:"+index)
           index=await generate(results[number+1],index) 
           console.log("\n\n\nindex:"+index)
         index=await generate(results[number+2],index)
           console.log("\n\n\nindex:"+index)
           index=await generate(results[number+3],index)
           console.log("\n\n\nindex:"+index)
           index=await generate(results[number+4],index)
           console.log("\n\n\nindex:"+index)
           index=await generate(results[number+5],index)
           index=await generate(results[number+6],index)
           index=await generate(results[number+7],index)
           // generate(results[number+4],i) 
           // generate(results[number+5],i) 

 
           /* setTimeout(()=>{
              try{
              res.json({success:true,updated:i})
              generate(results[number+4],i)
              generate(results[number+5],i)
               generate(results[number+6],i)
               generate(results[number+7],i)  
                console.log("caught")
              }

            },20000)*/

   
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
/*
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
*/





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
          `--disable-extensions-except=${pathToExtension}`,
          `--load-extension=${pathToExtension}`,
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

var ps = require('ps-node');
const User = require("./models/User");
*/


//GOOD
/*
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
                  //const jsdom = require("jsdom");
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
*/
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

app.post("/get-problem",async(req,res)=>{
  const problem=await Problem.find({"title":req.body.title})
  res.json({success:true,problem:problem})
})

/****************************FIXES****************** */


/*********************************************************************** */




/********************************************************************* */

app.get("/problems", async(req, res) => {
  const problems= await problemItem.find({})
  res.json({success:true,length:problems.length,problems:problems})
});






