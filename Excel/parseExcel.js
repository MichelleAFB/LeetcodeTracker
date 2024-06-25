

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
const dir_name="C:/Users/michelle.badu/Documents/Pepsico"
const directoryPath = path.join(dir_name);
//passsing directoryPath and callback function
const forms=[]
fs.readdir(directoryPath, function (err, files) {
    i=0
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
       // showDataExcel(dir_name+"/"+file)
       if(i!=0){
       var id=file.split(" ")[0].split(".")[2]
       var name=file.substring(17,file.length)
       name=name.substring(1,name.length-5)
        console.log(name)
       forms.push(id)
       forms.push(name)
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
app.get("/parse",async(req,res)=>{
    console.log(forms)
    res.json(forms)
})

