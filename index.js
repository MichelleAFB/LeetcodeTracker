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

const StreakGroup=require("./models/StreakGroup")


 



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



app.get("/",(req,res)=>{
  res.json("Welcome to the Leetcode Api")
})
/************************************************************************* */

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
app.post("/add-to-streak",async(req,res)=>{
  var months= ["Jan","Feb","Mar","Apr","May","Jun","Jul",
  "Aug","Sep","Oct","Nov","Dec"];
  var monthnum=["01","02","03","04","05","06","07","08","09","10","11","12"]
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




  const streak=await Streak.find({$and:[{"day":req.body.day}]})
  console.log(streak)
  if(streak.length>0){
    const str=streak[0]
    const arr=str.problems
  
   
   
      const saved=await Streak.updateOne({"day":req.body.day},
      {
        $push:{"problems":req.body.problem}
      })
      

      res.json({success:true,saved:saved})
   

  }else{
 
   const group=await StreakGroup.find({})

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
          group:r.id
        })
        const saved=await newstreak.save()
        res.json({success:true,streak:streak,group:r})
        found=true
      }
    })

    setTimeout(async()=>{
      if(found==false){
        const streakgroup=new StreakGroup({
          days:[req.body.day]
        })
        const saved=await streakgroup.save()
        const str=new Streak({
          day:req.body.day,
          problems:[req.body.problem],
          group:saved.id
        })
        const saved1=await str.save()
        res.json({success:true,streak:saved1,group:saved})
      }
    },800)

 

   }else{

    const streakgroup=new StreakGroup({
      days:[req.body.day]
    })
    console.log("here")
    const saved= await streakgroup.save()

   const newstreak=new Streak({
    day:req.body.day,
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
}else{
  var curr=new Date()
  curr=curr.toString().substring(0,15)
  var date=curr.split(" ")
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



  const streak=await Streak.find({$and:[{"day":curr}]})
  console.log(streak)
  if(streak.length>0){
    const str=streak[0]
    const arr=str.problems
  
   
   
      const saved=await Streak.updateOne({"day":curr},
      {
        $push:{"problems":req.body.problem}
      })
      

      res.json({success:true,saved:saved})
   

  }else{
 
   const group=await StreakGroup.find({})

   if(group.length>0){
    var found=false
    group.map(async(r)=>{
      const arr=r.days
      console.log(arr)
      console.log("finding:"+newdate)
      console.log(arr.includes(newdate) && found==false)

      if(arr.includes(newdate) && !arr.includes(curr)&& found==false){
        console.log("STREAK GROUP EXISTS")
        const update=await StreakGroup.updateOne({"_id":r.id},
        {$push:{"days":curr}})
       
        console.log(update)
        const newstreak=new Streak({
          day:curr,
          problems:[req.body.problem],
          group:r.id
        })
        const saved=await newstreak.save()
        res.json({success:true,streak:streak,group:r})
        found=true
      }
    })

    setTimeout(async()=>{
      if(found==false){
        const streakgroup=new StreakGroup({
          days:[curr]
        })
        const saved=await streakgroup.save()
        const str=new Streak({
          day:curr,
          problems:[req.body.problem],
          group:saved.id
        })
        const saved1=await str.save()
        res.json({success:true,streak:saved1,group:saved})
      }
    },800)

 

   }else{
console.log("CREATING STREAK GROUP")
    const streakgroup=new StreakGroup({
      days:[curr]
    })
    console.log("here")
    const saved= await streakgroup.save()

   const newstreak=new Streak({
    day:curr,
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
  
})

app.get("/sort-streaks",async(req,res)=>{
  const groups=await StreakGroup.find({})
 
  const streaksArr=[]
  groups.map(async(g)=>{
    const arr=[]
    const streaks=await Streak.find({$and:[{"group":g.id}]})
    streaks.map((s)=>{
      
      arr.push({day:s.day,problems:s.problems})
    })
    streaksArr.push(arr)
    if(streaksArr.length==groups.length){
      res.json({streaks:streaksArr})
    }
  })
})

app.get("/current-streak",async(req,res)=>{
  const strek=[]
  var streaks=await StreakGroup.find({})
  var curr=new Date()
  curr=curr.toString().substring(0,15)
  streaks.map((s)=>{
     const days=s.days
     console.log(s.days)
    if(days.includes(curr)){
      
      days.map(async(st)=>{
        var str=await Streak.find({$and:[{"day":st}]})
        str=str[0]
        strek.push({day:str.day,problems:str.problems})
      })
    }
  })

  setTimeout(()=>{
    res.json({success:true,streaks:strek})
  },500)
})


app.post("/create-streak/",async(req,res)=>{
  var currDate=new Date()
  currDate=currDate.toString().substring(0,15)
  const find=await Streak.find({$and:[{"day":currDate}]})
  console.log(find.length)
  if(req.body.day==null){
  if(find.length==0){
  const streak=new Streak({
    day:currDate,
    problems:[req.body.problem]
  })
  console.log(currDate)

  const saved=await streak.save()
  console.log(saved)
  const newStreak=await Streak.find({$and:[{"day":currDate}]})
  res.json({success:true,streak:newStreak,updated:saved});
}else{
  res.json("streak already exist")
}
}else{
  const day=await Streak.find({$and:[{"day":req.body.day}]})
  if(day.length==0){
    const streak=new Streak({
      day:req.body.day,
      problems:[req.body.problem]
    })
  
  
    const saved=await streak.save()
    console.log(saved)
    const newStreak=await Streak.find({$and:[{"day":req.body.day}]})
    res.json({success:true,streak:newStreak,updated:saved});

}else{
  res.json("streak already exist")
}
}
})

app.get("/streak-group",(req,res)=>{

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

