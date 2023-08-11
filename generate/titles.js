const pdfParse = require("pdf-parse");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const generateRouter = express.Router();

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
const db_config = require("../config/db");
const http = require("http");
const bodyParser = require("body-parser");
const jimp = require("jimp");


generateRouter.use(cors());
generateRouter.use(bodyParser.json());
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

generateRouter.use(cors(corsOptions))
console.log("GENERATE")

generateRouter.get("/",(req,res)=>{
  res.json("GENERATE")
})

generateRouter.get("/titles/:page",(req,res)=>{
  (async () => {
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    console.log("grabbing all httprequest from browser");
    const page = await browser.newPage();
    await page.goto("https://leetcode.com/problemset/all/?page="+req.params.page);
    page.on("response",async(response)=>{
     // console.log(response.url())
      if(response.url()=="https://leetcode.com/graphql/"){

        const data=await response.json()
        console.log(data)
        console.log("\n\n")
      }
    })
  })()
})



module.exports={generateRouter}