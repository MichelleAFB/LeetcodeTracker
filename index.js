const pdfParse = require("pdf-parse");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const express = require("express");
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
const bcrypt = require("bcrypt");
const session = require("express-session");
const db_config = require("./config/db");
const http = require("http");
const bodyParser = require("body-parser");
const jimp = require("jimp");
const old_db_config=require("./config/olddb");
const { INTEGER } = require("sequelize");

/*
var db = mysql.createConnection(db_config);
*/
var db=mysql.createConnection(old_db_config)

const port = 3022;
app.use(cors());
app.use(bodyParser.json());
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

router.use(cors(corsOptions));
app.listen(process.env.PORT, () => console.log("Server running ", process.env.PORT));



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
    index:true
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
  firbaseId:{
    type:String,
    required:false
  }
})
var problemItem=mongoose.model("Problem",problemsSchema)
app.post("/sqltomongo",(req,res)=>{
  db.query("select * from leetcode.problems",(err,results)=>{
    if(err){
      console.log(err)
    }else{
      results.map(async(r)=>{
        const problem=new problemItem({
          title:r.title,
          problemId:r.problemId,
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

app.get("/problems",async(req,res)=>{
  
 problemItem=mongoose.model("Problem",problemsSchema)

  const problems= await problemItem.find({"prompt":{$exists:true},"difficulty":{$exists:true}})
  res.json({success:true,problems:problems})
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
          // console.log(info)
          if (info != null) {
            const p = info.problemsetQuestionList;
            try {
             // console.log(p)
              const problems = p.questions;
              var count=0
              if (problems != null) {
                console.log("\n\n"+problems.length)
                problems.map(async(q) => {
                  console.log(q.difficulty + " " + q.title);
                  if (q.title != null) {
                    console.log("herer")
                   allproblems.push({title:q.title,difficulty:q.difficult})
                   i++
                   console.log("i:"+i);
                   console.log(allproblems)
                  var  problem=new promblemItem({
                    title:q.title,
                    difficulty:q.difficulty
                   })
                   problem.save()

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

app.get("/get",(req,res)=>{
  db.query("select * from heroku_29594a13b7b8a31.problems",(err,results)=>{
    if(err){
      res.json(err)
    }else{
      res.json(results)
    }
  })
})
app.get("/create-links", (req, res) => {
  const base = "https://heroku_29594a13b7b8a31.com/problems/";

  db.query("select * from problems", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      results.map((q) => {
        const title = q.title;
        if (title.substring(0, 1) == " ") {
          var end = title.substring(1, title.length);
          end = end.toLowerCase();
          end = end.replace(/\s/g, "-");
          end = end.replace(/{([])}/g, "");
          var link = base + end;

          db.query(
            "update heroku_29594a13b7b8a31.problems set link=? where (title=?) && (link is null)",
            [link, q.title],
            (err, results1) => {
              if (err) {
                console.log(err);
              } else {
                console.log(results1);
              }
            }
          );
        }
        if (title.substring(0, 1) != " ") {
          var end = title;
          end = end.toLowerCase();
          end = end.replace(/\s/g, "-");
          end = end.replace(/{([])}/g, "");
          var link = base + end;
          console.log(link);
          db.query(
            "update heroku_29594a13b7b8a31.problems set link=? where (title=?) && (link is null)",
            [link, q.title],
            (err, results1) => {
              if (err) {
                console.log(err);
              } else {
                console.log(results1);
              }
            }
          );
        }
      });
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
  db.query("select * from heroku_29594a13b7b8a31.problems",(err,results)=>{
    if(err){
      console.log(err)
    }else{
      results.map((r)=>{
        db.query("select count(*) as ourCount from heroku_29594a13b7b8a31.problems where title=? ",r.title,(err1,results1)=>{
          if(err){
            console.log(err)
          }else{
            const c=Object.values(JSON.parse(JSON.stringify(results1)))
            const count=c[0].ourCount
            console.log(c)
            if(count>1){
              console.log("DUPLICATE")
              db.query("select * from heroku_29594a13b7b8a31.problems where title=?",r.title,(err2,results2)=>{
                if(err2){
                  console.log(err2)
                }else{
                  if(results2[1]!=null){
                    const dup=results2[1]
                    db.query("delete from heroku_29594a13b7b8a31.problems where id=?",dup.id,(err3,results3)=>{
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

app.get("/problem", (req, res) => {
  db.query(
    "select * from heroku_29594a13b7b8a31.problems where (prompt is not null) &&(problemId is not null) && (link is not null)",
    (err, results) => {
      if (err) {
        res.json(err);
      } else {
        res.json({ success: true, count: results.length, problems: results });
      }
    }
  );
});

