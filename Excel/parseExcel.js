

const express=require("express")
const fs = require('fs');
var parse = require('csv-parse')
const app=express()
const db_config=require("./db")

const mysql=require("mysql")
/*
var db=mysql.createConnection(db_config)
console.log("HERE")
db.connect(function(err){
    if(err){
        console.log("err",err)
    }else{
        console.log("CONNECT")
    }
})
*/
app.listen(3400,()=>{
    console.log("listening ",3400)
})
async function showDataExcel(path)
{

 console.log(path)
 fs.readFile(path, 'utf8', function (err, data) {
    var dataArray = data.split(/\r?\n/);  //Be careful if you are in a \r\n world...
    // Your array contains ['ID', 'D11', ... ]
    var i=0
   
    while(i<dataArray.length){
       try{
        console.log(String.fromCharCode(dataArray[i]))
       }catch(err){
        console.log(err
            )
       }
        i++

    }
  })
  

}

const path = require('path');

//joining path of directory 
var dir_name="C:/Users/michelle.badu/Documents/Pepsico"
dir_name=dir_name.replace(/"\"/g, "/")
const directoryPath = path.join(dir_name);

const forms=[]
const form_types=["START_UP","CHANGE_OVER","SHIFT_CHANGE"]
const SHIFT_CHANGE=[]
const CHANGE_OVER=[]
const START_UP=[]
const MISSC=[]
var str=""
var ourFiles
fs.readdir(directoryPath, function (err, files) {
    i=0
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    ourFiles=files
    files.forEach(function (file) {
        // Do whatever you want to do with the file
       // showDataExcel(dir_name+"/"+file)
       if(i!=0){
       var id=file.split(".")[3]
      
      
    
   
    if(dir_name=="C:/Users/michelle.badu/Documents/PepsicoRND"){
        var name=file.substring(25,file.length-5).trim(" ")
        var rev=file.substring(23,25)
       
        var type=file.substring(14,18).toUpperCase()
        type=file.replaceAll( "[^0-9a-zA-Z]+", "")
      
        type=type.replace(/-/g, " ")
        type=type.toUpperCase()
        
       
       if(type.includes("START UP")){
        str=str+"('"+id+"','START_UP','"+name+"','P-LAB','"+rev+"'),\n"
        START_UP.push(name)
       }else if(type.includes("CHANGE OVER")){
        str=str+"('"+id+"','CHANGE_OVER','"+name+"','P-LAB','"+rev+"'),\n"
        CHANGE_OVER.push(name)
       }else if(type.includes("SHIFT CHANGE")){
        str=str+"('"+id+"','SHIFT_CHANGE','"+name+"','P-LAB','"+rev+"'),\n"
        SHIFT_CHANGE.push(name)
      
       }else{
        MISSC.push(name)
        str=str+"('"+id+"','MISCELLANEOUS','"+name+"','P-LAB','"+rev+"'),\n"
       }
    }else if(dir_name=="C:/Users/michelle.badu/Documents/Pepsico"){
        id=file.split(".")[2].split(" ")[0]
      
        var name=file.split(".")[2].substring(5,file.length)
        var type=name.toUpperCase()
        type=type.replaceAll( "[^0-9a-zA-Z]+", "")
        type=type.replace(/-/g, " ")
       
        if(type.includes("START UP")){
            str=str+"('"+id+"','START_UP','"+name+"','PSM'),\n"
            START_UP.push(name)
           }else if(type.includes("CHANGE OVER")){
            str=str+"('"+id+"','CHANGE_OVER','"+name+"','PSM'),\n"
            CHANGE_OVER.push(name)
           }else if(type.includes("SHIFT CHANGE")){
            str=str+"('"+id+"','SHIFT_CHANGE','"+name+"','PSM'),\n"
            SHIFT_CHANGE.push(name)
          
           }else{
            MISSC.push(name)
            str=str+"('"+id+"','MISCELLANEOUS','"+name+"','PSM'),\n"
           }
    }
       
       
       }
   
       i++
        //id=id.split(" ")[0]
        
    });
});

/*Ceiling tiles in place-not cracked or fraying
No flaking paint,string, or tape in product zone
Lighting shields (not missing, cracked,warped,burnt through)
All sprinklers have facets attached and in place
No evidence of insects, rodents, or birds
Floors and stairs clean and free of debris
No lingering smell of previously run product
No visable previous product residue
Cleaning tools/supplies in place and (in good condition) 
Foreign matter (5 or more) loose items not in designated area
No frayed wires in product zone
 Bearings over product zones not over lubricated
 No rust  in product area/zone
 No sticker/labels in product area
Equipment leaks (steam,oil,grease, etc.) in product zone/area
 cGMP's being followed by employees and contractors.
Check all electrical components and connections (plugs) for water, damaged pieces, and/or corrosion

*/

app.get("/get-strings",async(req,res)=>{
    const path="C:/Users/michelle.badu/Documents/Pepsico"
    const fs = require('fs');
const csv = require('csv-parser');
const XLSX = require('xlsx');
var i=1
while(i<2){
const p=path+"/"+ourFiles[i]
const workbook = XLSX.readFile(p);

// Convert each sheet to JSON and then to a string
let sheets = {};
workbook.SheetNames.forEach(sheetName => {
  const sheet = workbook.Sheets[sheetName];
  
  sheets[sheetName] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  //console.log(sheets)

});

// Convert the entire workbook to a JSON string
const workbookString = sheets

//console.log(workbookString);
const sheet=workbookString
console.log(Object.keys(sheet))
console.log("sheet 1:::",sheet['Sheet1'][0])
const title=sheet['Sheet1'][0][0]
console.log("title:"+title)
i++
}

})
app.get("/parse",async(req,res)=>{
    console.log("changeover",CHANGE_OVER.length)
    console.log("shiftchange",SHIFT_CHANGE.length)
    console.log("startup",START_UP.length)
    console.log("misscellaneous",MISSC.length)
    console.log(str)
    res.json({str:str,forms:forms})
})

