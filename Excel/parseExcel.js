

const express=require("express")
const fs = require('fs');
var parse = require('csv-parse')
const app=express()
const axios=require("axios")
const db_config=require("./db")
const bodyParser=require("body-parser")
app.use(express.json())
app.use(bodyParser.urlencoded({limit: '50mb', extended: true,parameterLimit:50000}));
const mysql=require("mysql")
const sql=require('mssql')
const csv = require('csv-parser');
const XLSX = require('xlsx');

/*
To parse sections, all section headers must have the same checkoff options"
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
'use strict';

const ADODB = require('node-adodb');
const connection = ADODB.open("ADODB.Connection") ;

var connectionstring=' DRIVER=ODBC Driver 17 for SQL server;Data Source=192.168.4.20\PEPSICOSQL;Database=master;Integrated Security=false;User ID=sa;Password=Engineer@3;';


connection
  .execute('INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Newton", "Male", 25)')
  .then(data => {
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(error => {
    console.error(error);
  });
  /*
var rs = new ActiveXObject("ADODB.Recordset");

rs.Open("SELECT * FROM table", connection);
rs.MoveFirst
while(!rs.eof)
{
   document.write(rs.fields(1));
   rs.movenext;
}

rs.close;
connection.close; 
  const sqll = require('mssql/msnodesqlv8')
  const pool = new sqll.ConnectionPool({
    user: 'sa',
    password: 'Engineer@3',
    server: 'PEPSICOSQL', 
    database: 'pepsico'
  })
  const config = {
    user: 'sa',
    password: 'Engineer@3',
    server: '192.168.4.20', 
    database: 'pepsico'
  }
  sql.connect(config, function (err) {

    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();
    console.log(request)

    // query to the database and get the records
    request.query('select * from questions', function (err, recordset) {
        console.log(recordset)
        if (err) console.log(err)

        // send records as a response
        console.log(recordset)

    });
});
/*
  const config = {
    database: 'PEPSICOSQL',
    user:"sa",
    password:"Engineer@3",
    server: '192.168.4.20',
    driver: 'msnodesqlv8',
 
 
    options: {
        instanceName:'sql',
        IntegratedSecurity:true
    }
  }
    */

      
/*
(async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect('Server=localhost;Database=pepsico;User Id=sa;Password=Engineer@3;Encrypt=true;trustServerCertificate: true')
        const result = await sql.query`select * from sections`
        console.dir(result)
    } catch (err) {
        console.log(err)
        // ... error checks
    }
})()*/
const pathh = require('path');
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
var ourFiles
const path = require('path');
const { createSecretKey } = require("crypto");
var ourFile









var allTypes=`ONLINE SOLID
    GENERAL CHECK POINTS
    DEFECT READER
    ONLINE SOLIDS
     SEASONING TUMBLER / ACRISON SEASONER/ SALTER/ OIL SPRAY UNIT/ SLURRY APPLICATOR
    SHEETER OVEN
    MIX AREA
    WHEAT AUGER THROUGH TO EXTRUDER
    INCLINE SCREW CONVEYOR #1
    GUILLOTINE CUTTER
    FINISHED PRODUCT TRANSFER CONVEYOR / BAKED PACKAGING INCLINE CONVEYOR / BAKED CROSSOVER/ ALLEN CONVEYOR  
    EXTRUDER/CUTTERS
    EXTRUDER/CUTTER
    FLOOR LEVEL-CHECK POINTS
    CONTINUOUS WET MIXING
    CONVERYORS TO PACKAGING
    INCLINE CONVEYOR 
    BLANCHER / CONVEYORS
    PACKAGING 90? CONVEYOR 
    GUILLOTINE CUTTER 
    INCLINE TO WENGER
    INCLINE CONVEYOR /  WENGER DRYER
    EXTRUDER / BRAID HEAD /DIE PLATE / BAND CUTTER
    KILN INFEED CONVEYOR / KILN OVEN / KILN EXIT CONVEYOR
    FRITO PRESS
    BUCKET ELEVATOR TO PACKAGING PC
    BUCKET CONVEYOR-CHECK POINTS
    FRYER 
    SEASONING TUMBLER`


allTypes=allTypes.split("\n")

const START_UP=[]
const CHANGE_OVER=[]
const SHIFT_CHANGE=[]
const MISSC=[]
var dir_name="C:/Users/michelle.badu/Documents/Pepsico"
const directoryPath = path.join(dir_name);

fs.readdir(directoryPath, function (err, files) {
    i=0
    //handling error
    if (err) {
        console.log("ERR",dir_name)
        return console.log('Unable to scan directory: ' + err);
    } 
    ourFiles=files
 
    const dbFiles=files.map((f)=>{
        return `('${f}')`
    })
   
    var str=""
    files.forEach(function (file) {
        // Do whatever you want to do with the file
       // showDataExcel(dir_name+"/"+file)
       if(i!=-1){
       var id=file.split(".")[3]
      
      
    
   
    if(dir_name=="C:/Users/michelle.badu/Documents/PepsicoRND"){
        var name=file.substring(25,file.length-5).trim(" ")
        var rev=file.substring(23,25)
       
        var type=file.substring(14,18).toUpperCase()
        type=file.replaceAll( "[^0-9a-zA-Z]+", "")
      
        type=type.replace(/-/g, " ")
        type=type.toUpperCase()
   
       
       if(type.includes("START UP")){
        str=str+"('"+id+"','START_UP','"+name.toUpperCase()+"','P-LAB','"+rev+"'),"
        START_UP.push(name)
       }else if(type.includes("CHANGE OVER")){
        str=str+"('"+id+"','CHANGE_OVER','"+name.toUpperCase()+"','P-LAB','"+rev+"'),"
        CHANGE_OVER.push(name)
       }else if(type.includes("SHIFT CHANGE")){
        str=str+"('"+id+"','SHIFT_CHANGE','"+name.toUpperCase()+"','P-LAB','"+rev+"'),"
        SHIFT_CHANGE.push(name)
      
       }else{
        MISSC.push(name)
        str=str+"('"+id+"','MISCELLANEOUS','"+name+"','P-LAB','"+rev+"'),"
       }
    }else if(dir_name=="C:/Users/michelle.badu/Documents/Pepsico"){
        id=file.split(".")[2].split(" ")[0]
      
        var name=file.split(".")[2].substring(5,file.length)
        var type=name.toUpperCase()
        type=type.replaceAll( "[^0-9a-zA-Z]+", "")
        type=type.replace(/-/g, " ")
       
        if(type.includes("START UP")){
            str=str+"('"+id+"','START_UP','"+name.toUpperCase()+"','PSM'),"
            START_UP.push(name)
           }else if(type.includes("CHANGE OVER")){
            str=str+"('"+id+"','CHANGE_OVER','"+name.toUpperCase()+"','PSM'),"
            CHANGE_OVER.push(name)
           }else if(type.includes("SHIFT CHANGE")){
            str=str+"('"+id+"','SHIFT_CHANGE','"+name.toUpperCase()+"','PSM'),"
            SHIFT_CHANGE.push(name)
          
           }else{
            MISSC.push(name)
            str=str+"('"+id+"','MISCELLANEOUS','"+name.toUpperCase()+"','PSM'),"
           }
    }
       
       
       }
   
       i++
       if(i<=files.length){
    
        try{
        //res.json({files:files,path:path=="C:/Users/michelle.badu/Documents/Pepsico"?"C:/Users/michelle.badu/Documents/PepsicoRND":"C:/Users/michelle.badu/Documents/Pepsico"})
        }catch(err){
            console.log(err)
        }
    }
        //id=id.split(" ")[0]
        
    });
});













app.post("/sort-forms-into-form-types",(req,res)=>{
    console.log(req.body)
    var dir_name=req.body.path
    dir_name=dir_name.replace(/"\"/g, "/")
    
const directoryPath = path.join(dir_name);

const forms=[]
const form_types=["START_UP","CHANGE_OVER","SHIFT_CHANGE"]
const SHIFT_CHANGE=[]
const CHANGE_OVER=[]
const START_UP=[]
const MISSC=[] //PRETZEL LINE ALLERGEN CHANGE OVER PSM
var str=""

fs.readdir(directoryPath, function (err, files) {
    i=0
    //handling error
    if (err) {
        console.log("ERR",dir_name)
        return console.log('Unable to scan directory: ' + err);
    } 
    ourFiles=files
    console.log(files)
    files.forEach(function (file) {
        // Do whatever you want to do with the file
       // showDataExcel(dir_name+"/"+file)
       if(dir_name=="C:/Users/michelle.badu/Documents/Pepsico"?i!=0:i!=-1){
       var id=file.split(".")[3]
    if(dir_name=="C:/Users/michelle.badu/Documents/PepsicoRND"){
        var name=file.substring(25,file.length-5).trim(" ")
        var rev=file.substring(23,25)
       
        var type=file.substring(14,18).toUpperCase()
        type=file.replaceAll( "[^0-9a-zA-Z]+", "")
      
        type=type.replace(/-/g, " ")
        type=type.toUpperCase()
   console.log(type)
       
       if(type.includes("START UP")){
        str=str+"('"+id+"','START_UP','"+name.toUpperCase()+"','P-LAB','"+rev+"'),"
        START_UP.push(name)
       }else if(type.includes("CHANGE OVER")){
        str=str+"('"+id+"','CHANGE_OVER','"+name.toUpperCase()+"','P-LAB','"+rev+"'),"
        CHANGE_OVER.push(name)
       }else if(type.includes("SHIFT CHANGE")){
        str=str+"('"+id+"','SHIFT_CHANGE','"+name.toUpperCase()+"','P-LAB','"+rev+"'),"
        SHIFT_CHANGE.push(name)
      
       }else{
        MISSC.push(name)
        str=str+"('"+id+"','MISCELLANEOUS','"+name+"','P-LAB','"+rev+"'),"
       }
       i++
    }else if(dir_name=="C:/Users/michelle.badu/Documents/Pepsico"){
        id=file.split(".")[2].split(" ")[0]
      
        var name=file.split(".")[2].substring(5,file.length)
        var type=name.toUpperCase()
        type=type.replaceAll( "[^0-9a-zA-Z]+", "")
        type=type.replace(/-/g, " ")
       
        if(type.includes("START UP")){
            str=str+"('"+id+"','START_UP','"+name.toUpperCase()+"','PSM'),"
            START_UP.push(name)
           }else if(type.includes("CHANGE OVER")){
            str=str+"('"+id+"','CHANGE_OVER','"+name.toUpperCase()+"','PSM'),"
            CHANGE_OVER.push(name)
           }else if(type.includes("SHIFT CHANGE")){
            str=str+"('"+id+"','SHIFT_CHANGE','"+name.toUpperCase()+"','PSM'),"
            SHIFT_CHANGE.push(name)
          
           }else{
            MISSC.push(name)
            str=str+"('"+id+"','MISCELLANEOUS','"+name.toUpperCase()+"','PSM'),"
           }
           i++
           
    }
       
       
       }else{
        var id=file.split(".")[3]
        if(dir_name=="C:/Users/michelle.badu/Documents/PepsicoRND"){
            var name=file.substring(25,file.length-5).trim(" ")
            var rev=file.substring(23,25)
           
            var type=file.substring(14,18).toUpperCase()
            type=file.replaceAll( "[^0-9a-zA-Z]+", "")
          
            type=type.replace(/-/g, " ")
            type=type.toUpperCase()
       console.log(type)
           
           if(type.includes("START UP")){
            str=str+"('"+id+"','START_UP','"+name.toUpperCase()+"','P-LAB','"+rev+"'),"
            START_UP.push(name)
           }else if(type.includes("CHANGE OVER")){
            str=str+"('"+id+"','CHANGE_OVER','"+name.toUpperCase()+"','P-LAB','"+rev+"'),"
            CHANGE_OVER.push(name)
           }else if(type.includes("SHIFT CHANGE")){
            str=str+"('"+id+"','SHIFT_CHANGE','"+name.toUpperCase()+"','P-LAB','"+rev+"'),"
            SHIFT_CHANGE.push(name)
          
           }else{
            MISSC.push(name)
            str=str+"('"+id+"','MISCELLANEOUS','"+name+"','P-LAB','"+rev+"'),"
           }
           i++
        }else if(dir_name=="C:/Users/michelle.badu/Documents/Pepsico"){
            id=file.split(".")[2].split(" ")[0]
          
            var name=file.split(".")[2].substring(5,file.length)
            var type=name.toUpperCase()
            type=type.replaceAll( "[^0-9a-zA-Z]+", "")
            type=type.replace(/-/g, " ")
           
            if(type.includes("START UP")){
                str=str+"('"+id+"','START_UP','"+name.toUpperCase()+"','PSM'),"
                START_UP.push(name)
               }else if(type.includes("CHANGE OVER")){
                str=str+"('"+id+"','CHANGE_OVER','"+name.toUpperCase()+"','PSM'),"
                CHANGE_OVER.push(name)
               }else if(type.includes("SHIFT CHANGE")){
                str=str+"('"+id+"','SHIFT_CHANGE','"+name.toUpperCase()+"','PSM'),"
                SHIFT_CHANGE.push(name)
              
               }else{
                MISSC.push(name)
                str=str+"('"+id+"','MISCELLANEOUS','"+name.toUpperCase()+"','PSM'),"
               }
               i++
        }
       }
   
     
       if(i>=files.length){
    
        try{
        res.json({files:files,form_types:{START_UP:START_UP,SHIFT_CHANGE:SHIFT_CHANGE,START_UP:START_UP,MISSCELLANEOUS:MISSC},db_form_types:str,path:path=="C:/Users/michelle.badu/Documents/Pepsico"?"C:/Users/michelle.badu/Documents/PepsicoRND":"C:/Users/michelle.badu/Documents/Pepsico"})
        }catch(err){
          //  console.log(err)
        }
    }
        //id=id.split(" ")[0]
        
    });
});


})
//joining path of directory 


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
const sectionTypes=[]
/*
const sectionTypes=[
    "GENERAL CHECK POINTS",
    "ONLINE SOLID",
    "DEFECT READER",
    "ONLINE SOLIDS",
    " SEASONING TUMBLER / ACRISON SEASONER/ SALTER/ OIL SPRAY UNIT/ SLURRY APPLICATOR",
    "SHEETER OVEN",
    "MIX AREA",
    "WHEAT AUGER THROUGH TO EXTRUDER",
    "INCLINE SCREW CONVEYOR #1",
    "GUILLOTINE CUTTER",
    "FINISHED PRODUCT TRANSFER CONVEYOR / BAKED PACKAGING INCLINE CONVEYOR / BAKED CROSSOVER/ ALLEN CONVEYOR  ",
    "EXTRUDER/CUTTERS",
    "EXTRUDER/CUTTER",
    "FLOOR LEVEL-CHECK POINTS",
    "CONTINUOUS WET MIXING",
    "CONVERYORS TO PACKAGING",
    "INCLINE CONVEYOR ",
    "BLANCHER / CONVEYORS",
    "PACKAGING 90◦ CONVEYOR ",
    "GUILLOTINE CUTTER ",
    "INCLINE TO WENGER",
    "INCLINE CONVEYOR /  WENGER DRYER",
    "EXTRUDER / BRAID HEAD /DIE PLATE / BAND CUTTER",
    "KILN INFEED CONVEYOR / KILN OVEN / KILN EXIT CONVEYOR",
    "FRITO PRESS",
    "BUCKET ELEVATOR TO PACKAGING PC",
    "BUCKET CONVEYOR-CHECK POINTS",
    "FRYER ",
    "SEASONING TUMBLER"
]*/
//const sectionTypes=[]

const distinctSectionsTypes=[
    "GENERAL CHECK POINTS",
        "PEF",
        "CROSS- OVER PC CONVEYOR/VERTICAL LIFT ",
        "ONLINE SOLID",
        "SLICER/ BLANCHER",
        "PEELER",
        "ODENBERG",
        "SURGE HOPPER",
        "WEIGH BELT/ FAST LANE LANING CONVEYOR",
        "SLICER",
        "FRYER INFEED CONVEYOR",
        "FRYER ",
        "DEFECT READER",
        "SEASONING UNIT SKID",
        "BUCKET ELEVATOR TO PACKAGING",
        "DESTONER/ VERTICAL LIFT",
        "ONLINE SOLIDS",
        "CUTTING",
        "PEELING",
        "SORTING",
        "BATCH HOPPER",
        "SLICING",
        "FRYER",
        " SEASONING TUMBLER / ACRISON SEASONER/ SALTER/ OIL SPRAY UNIT/ SLURRY APPLICATOR",
        "ALL CONVEYOR ON LINE",
        "COOK KETTLE AREA-CHECK POINTS",
        "CORN WASH/MILL AREA-CHECK POINTS",
        "FRITO PRESS",
        "SHEETER OVEN",
        "PROOFER ",
        "CONVEYOR",
        "TUMBLER / SEASONER-SALTER ",
        "INCLINE TO PACKAGING",
        "WHEAT COOK AREA",
        "HAMMERMILL AREA",
        "MIX AREA",
        "WHEAT AUGER THROUGH TO EXTRUDER",
        "ENTECON",
        "KTRON",
        "EXTRUDER CHECK POINTS",
        "FRYER-CHECK POINTS ",
        "CONVEYORS/THAYERS-CHECK POINTS",
        "TUMBLERS / SEASONER / SALTER",
        "BUCKET CONVEYOR-CHECK POINTS",
        "SACK LIFT TIP",
        "SACK TIP HOPPER",
        "INCLINE SCREW CONVEYOR #1",
        "INCLINE SCREW CONVEYOR #2",
        "WEIGHT HOPPER",
        "HORIZONTAL MIXER",
        "INCLINE CONVEYOR AFTER MIXER",
        "BUFFER HOPPER",
        "MIXER",
        "EXTRUDER / BRAID HEAD /DIE PLATE / BAND CUTTER",
        "GUILLOTINE CUTTER",
        "PROOFER",
        "CAUSTIC COOKER / SALTER",
        "OVENS / OVEN EXIT CONVEYOR",
        "KILN INFEED CONVEYOR / KILN OVEN / KILN EXIT CONVEYOR",
        "SEASONING TUMBLER / ACRISON SEASONER / OIL SPRAY UNIT / SLURRY APPLICATOR",
        "FINISHED PRODUCT TRANSFER CONVEYOR / BAKED PACKAGING INCLINE CONVEYOR / BAKED CROSSOVER/ ALLEN CONVEYOR  ",
        "INCLINE CONVEYOR AFTER BUFFER HOPPER",
        "KTRON FEEDER",
        "EXTRUDER/CUTTERS",
        "INCLINE CONVEYOR /  WENGER DRYER",
        "INCLINE TO TUMBLER INFEED",
        "SEASONING AREA",
        "DOSING #1/DOSING #2 FEEDERS",
        "EXTRUDER/CUTTER",
        "INCLINE TO WENGER",
        "BUCKET CONVEYOR",
        "ALLENS CHECK POINTS",
        "SECOND LEVEL CHECK POINTS",
        "FLOOR LEVEL-CHECK POINTS",
        "  DRY MIXER",
        "HAPMAN DUMP STATION",
        "CONTINUOUS WET MIXING",
        "SHEETING",
        "DUAL ROTARY CUTTER",
        "FIRST OVEN (BAKING) ",
        "CURLING TRANSFER CONVEYOR",
        "SECOND OVEN (DRYING)",
        "SEASONING EQUIPMENT FROM DRYER TO TUMBLER",
        "SEASONING EQUIPMENT TUMBLER TO BUCKET CONVEYORS",
        "CONVERYORS TO PACKAGING",
        "ACCURATE",
        "CRETORS POPPER FP 80",
        "INCLINE CONVEYOR ",
        "DRY MIXER",
        "SEASONING TUMBLER",
        "SLICER PORTABLE / FEED CONVEYOR-ADD",
        "BLANCHER / CONVEYORS",
        " SURGE HOPPER CONVEYOR ",
        "FRYER INFEED BELT",
        " SLICER",
        "EXIT CONVEYORS (1-4)",
        "EXIT CONVEYORS (5-7)",
        " SEASONING TUMBLER / ACRISON SEASONER/ SALTER/ OIL SPRAY UNIT/ SLURRY APPLICATOR ",
        "BUCKET ELEVATOR TO PACKAGING PC",
        "PACKAGING 90◦ CONVEYOR ",
        "TUMBLER/ SEASONER SALTER",
        "EXTRUDER/ BRAID HEAD/DIE PLATE/BAND CUTTER ",
        "GUILLOTINE CUTTER ",
        "CAUSTIC COOKER/SALTER",
        "OVENS/OVEN EXIT CONVEYOR ",
        "SILO/KTRON FEEDER",
        "HAPMAN/KTRON FEEDER",
        "FINISHED PRODUCT TRANSFER CONVEYOR / BAKED PACKAGING INCLINE CONVEYOR BAKED CROSSOVER/ ALLEN CONVEYOR  ",
        "SLICER PORTABLE / FEED CONVEYOR",
        " SURGE HOPPER CONVEYOR",
        "DOSIN #1 /DOSING #2 FEEDERS",
        "CLAMSHELL"
]
var distinctSectionTypesStr=""
var allSectionsStr=""
var allSections=[]
const s=["GENERAL CHECK POINTS",
    " POTATO CRATE DUMPSTER / PRIMARY HOPPER",
    "PEF",
    "CROSS- OVER PC CONVEYOR/VERTICAL LIFT ",
    "ONLINE SOLID",
    "SLICER/ BLANCHER",
    "PEELER",
    "ODENBERG",
    "SURGE HOPPER",
    "WEIGH BELT/ FAST LANE LANING CONVEYOR",
    "SLICER",
    "FRYER INFEED CONVEYOR",
    "FRYER ",
    "DEFECT READER",
    "SEASONING UNIT SKID",
    "BUCKET ELEVATOR TO PACKAGING",
    "DESTONER/ VERTICAL LIFT",
    "ONLINE SOLIDS",
    "CUTTING",
    "PEELING",
    "SORTING",
    "BATCH HOPPER",
    "SLICING",
    "FRYER",
    " SEASONING TUMBLER / ACRISON SEASONER/ SALTER/ OIL SPRAY UNIT/ SLURRY APPLICATOR",
    "ALL CONVEYOR ON LINE",
    "COOK KETTLE AREA-CHECK POINTS",
    "CORN WASH/MILL AREA-CHECK POINTS",
    "FRITO PRESS",
    "SHEETER OVEN",
    "PROOFER ",
    "CONVEYOR",
    "TUMBLER / SEASONER-SALTER ",
    "INCLINE TO PACKAGING",
    "WHEAT COOK AREA",
    "HAMMERMILL AREA",
    "MIX AREA",
    "WHEAT AUGER THROUGH TO EXTRUDER",
    "ENTECON",
    "KTRON",
    "EXTRUDER CHECK POINTS",
    "FRYER-CHECK POINTS ",
    "CONVEYORS/THAYERS-CHECK POINTS",
    "TUMBLERS / SEASONER / SALTER",
    "BUCKET CONVEYOR-CHECK POINTS",
    "SACK LIFT TIP",
    "SACK TIP HOPPER",
    "INCLINE SCREW CONVEYOR #1",
    "INCLINE SCREW CONVEYOR #2",
    "WEIGHT HOPPER",
    "HORIZONTAL MIXER",
    "INCLINE CONVEYOR AFTER MIXER",
    "BUFFER HOPPER",
    "MIXER",
    "EXTRUDER / BRAID HEAD /DIE PLATE / BAND CUTTER",
    "GUILLOTINE CUTTER",
    "PROOFER",
    "CAUSTIC COOKER / SALTER",
    "OVENS / OVEN EXIT CONVEYOR",
    "KILN INFEED CONVEYOR / KILN OVEN / KILN EXIT CONVEYOR",
    "SEASONING TUMBLER / ACRISON SEASONER / OIL SPRAY UNIT / SLURRY APPLICATOR",
    "FINISHED PRODUCT TRANSFER CONVEYOR / BAKED PACKAGING INCLINE CONVEYOR / BAKED CROSSOVER/ ALLEN CONVEYOR  ",
    "INCLINE CONVEYOR AFTER BUFFER HOPPER",
    "KTRON FEEDER",
    "EXTRUDER/CUTTERS",
    "INCLINE CONVEYOR /  WENGER DRYER",
    "INCLINE TO TUMBLER INFEED",
    "SEASONING AREA",
    "DOSING #1/DOSING #2 FEEDERS",
    "EXTRUDER/CUTTER",
    "INCLINE TO WENGER",
    "BUCKET CONVEYOR",
    "ALLENS CHECK POINTS",
    "SECOND LEVEL CHECK POINTS",
    "FLOOR LEVEL-CHECK POINTS",
    "  DRY MIXER",
    "HAPMAN DUMP STATION",
    "CONTINUOUS WET MIXING",
    "SHEETING",
    "DUAL ROTARY CUTTER",
    "FIRST OVEN (BAKING) ",
    "CURLING TRANSFER CONVEYOR",
    "SECOND OVEN (DRYING)",
    "SEASONING EQUIPMENT FROM DRYER TO TUMBLER",
    "SEASONING EQUIPMENT TUMBLER TO BUCKET CONVEYORS",
    "CONVERYORS TO PACKAGING",
    "ACCURATE",
    "CRETORS POPPER FP 80",
    "INCLINE CONVEYOR ",
    "DRY MIXER",
    "SEASONING TUMBLER",
    "SLICER PORTABLE / FEED CONVEYOR-ADD",
    "BLANCHER / CONVEYORS",
    " SURGE HOPPER CONVEYOR ",
    "FRYER INFEED BELT",
    " SLICER",
    "EXIT CONVEYORS (1-4)",
    "EXIT CONVEYORS (5-7)",
    " SEASONING TUMBLER / ACRISON SEASONER/ SALTER/ OIL SPRAY UNIT/ SLURRY APPLICATOR ",
    "BUCKET ELEVATOR TO PACKAGING PC",
    "PACKAGING 90◦ CONVEYOR ",
    "TUMBLER/ SEASONER SALTER",
    "EXTRUDER/ BRAID HEAD/DIE PLATE/BAND CUTTER ",
    "GUILLOTINE CUTTER ",
    "CAUSTIC COOKER/SALTER",
    "OVENS/OVEN EXIT CONVEYOR ",
    "SILO/KTRON FEEDER",
    "HAPMAN/KTRON FEEDER",
    "FINISHED PRODUCT TRANSFER CONVEYOR / BAKED PACKAGING INCLINE CONVEYOR BAKED CROSSOVER/ ALLEN CONVEYOR  ",
    "SLICER PORTABLE / FEED CONVEYOR",
    " SURGE HOPPER CONVEYOR",
    "DOSIN #1 /DOSING #2 FEEDERS",
    "CLAMSHELL", "GENERAL  CHECK POINTS"  , "COOK KETTLES/SOAK TANKS"  , "CORN WASH"  , "MAGNET CHECK"  , "CORN MILLER"  , "DIFFERENTIAL SHEETER CHECK POINTS"  , "TOASTER OVEN"  , "CONVEYOR BELTS"  , "FRYER 50LBS, 30LBS OR 20LBS"  , "HOBART LARGE MIXER"  , "HOBART SMALL MIXER"  , " POPPER FP 80"  , "POPCORN FT 200"  , "SWIFTER TUMBLER"  , "ERICK RIBBON MIXER "  , "Hopper"  , "EXTRUDER A.E. I."  , "CUTTER"  , "ERICK RIBBON MIXING AREA"  , "RANDOM EXTRUDER "  , "HAPMAN"  , "EIRICH RIBBON MIXING AREA"  , " HAPMAN #1,2,3/ACCURATE FEEDER #1,2,3,4"  , "K-TRON"  , "EXTRUDER "  , "TRIPLEX PUMP"  , " CUTTERS"  , "CONVEYORS"  , "FRYER/ OVEN"  , "EXTRUDER"  , "POPPER # 1,"  , "SLICER HEAD"  , "SS WEIGH DRUMS"  , " ERICK RIBBON MIXING AREA"  , " HAPMAN "  , "HAMMER MILL"  , "SIFTER"  , "LEAD KETTLE"  , "ENERSYST DRYER"  , "STEPHEN MIXER"  , "EMRICH LARGE MIXER"  , "EMRICH SMALL MIXER"  , "PERTECH POPPER # 2,"  , " HAPMAN  /ACCURATE FEEDER "  , "TFT"  , "Forming/Extruding/ Molding EYT1F BO1"  , "Forming/Extruding/ Molding EYT1F BO2"  , "Forming/Extruding/ Molding EYT1F BO3"  , "FMD"  , "Packaging"  , "Hot Kettle"  , "TB Conveyor "  , "Equalizer"  , "Cooling Conveyor"  , "Cutter #1,2"  , "Enrobing"  , "PRECONDITIONER"  , "HORIZONTAL CUTTER"  , "VERTICAL CUTTER"  , "COLD FORMER CUTTER"  , "FORCED AIR COOLER"  , " BIG LEAD KETTLE"  , "DEDY ENROBER"  , "RONDO SHEETER"  , "DECK OVEN"  , "RACK OVEN"  , "MIDDLEBY OVEN"  , "Retort"  , "Can Seamer"  , "Tray Sealer"  , "Steam Capper"  , "Multivac T200"  
]
const ss=s.map((s)=>{
    return s.toUpperCase()
})
const already=[]
console.log(s.length)
ss.map((s)=>{
    s=s.replace(" ","")
  
    if(!already.includes(s)){
       // console.log("GOOD")
        already.push(s)
    }else{
        console.log("DOUBLE",s)
    }
})
function getFormType(p){
    if(p.toUpperCase().includes("START UP") || p.toUpperCase().includes("START-UP") ||  p.toUpperCase().includes("START- UP") ||  p.toUpperCase().includes("START - UP")){
        return {name:"'Start-Up'",type:1}
    }else  if(p.toUpperCase().includes("SHIFT CHANGE") || p.toUpperCase().includes("SHIFT-CHANGE")){
          return {name:"'Shift Change'",type:2}
    }else  if(p.toUpperCase().includes("ALLERGEN CHANGE OVER") ){
        return {name:"'Allergen Change Over'",type:3}
  }else {
    return {name:"'Miscellaneous'",type:4}
  }

}
const formIds=[218,219,220]
app.post("/get-files",(req,res)=>{
    const processedXLXS=[]
    const newSections=[]
    const sectionsInForm=[]
    const sectionsInFormDBString=[]// stored in array
    var questionsString=""
    
    var dir_name=req.body.path
  
    dir_name=dir_name.replace(/"\"/g, "/")
    
const directoryPath = path.join(dir_name);
var formDB=""
const allDBQ=[]
fs.readdir(directoryPath, function (err, files) {
    i=0
    //handling error
    if (err) {
        console.log("ERR",dirname) 
        return console.log('Unable to scan directory: ' + err);
    } 
    ourFiles=files
    const alreadyProcessedForms=[]
    var newSectionsStr=""
    var questionString=""
    var newSectionStrDB=""
  console.log("go")
    while(i<ourFiles.length){
        const p=dir_name+"/"+ourFiles[i]
        const parsedSections=[]
        const workbook = XLSX.readFile(p);
        var formHandler=""
       
            var processID
            var formType
        var fileName=ourFiles[i]
        var formName=fileName.split(".")
        var findFirst=ourFiles[i].split(" ")
        var formString=""
        var sectionString=""
      
        //console.log(ourFiles[i])
        if(findFirst[0].includes(".")){
            
            var remove=1
            while(remove<findFirst.length-1){
                formString=formString+" "+findFirst[remove]
                remove++
                if(remove==findFirst.length-1){
                    if(findFirst[findFirst.length-1].includes(".")){
                        formString=formString+" "+ findFirst[findFirst.length-1].split(".")[0].trim()
                    }
                }
            }
        }
        
        formName=formString.trim()
        if(formName.length<1){
            formName=formName+"PC"
        }
console.log(formName)
        var currForms={form:formName,sections:[]}
        if(p.toUpperCase().includes("POPCORN")){
            formDB=formDB+"("+2+","+0+","+getFormType(formName).type+",'"+formName+"','michelle badu'),"
            formHandler=formHandler+"("+2+","+0+"),"
            processID=2
          }else if(p.toUpperCase().includes("PRETZEL")){
             formDB=formDB+"("+1+","+0+","+getFormType(formName).type+",'"+formName+"','michelle badu'),"
              formHandler=formHandler+"("+1+","+0+","+getFormType(formName).name+","
             processID=1

          }else if(p.toUpperCase().includes("SUNCHIP") || p.toUpperCase().includes("SUN CHIP")){
             formDB=formDB+"("+3+","+0+","+getFormType(formName).type+",'"+formName+"','michelle badu'),"
                  formHandler=formHandler+"("+3+","+0+","+getFormType(formName).name+","
             processID=3

          }else if(p.toUpperCase().includes("TPC KETTLE LINE")){
             formDB=formDB+"("+5+","+0+","+getFormType(formName).type+",'"+formName+"','michelle badu'),"
              formHandler=formHandler+"("+5+","+0+","+getFormType(formName).name+","
             processID=5

          }else if(p.toUpperCase().includes("BC-72")){
            formDB=formDB+"("+4+","+0+","+getFormType(formName).type+",'"+formName+"','michelle badu'),"
              formHandler=formHandler+"("+4+",'"+formName+"',"+0+","+getFormType(formName).name+","
            processID=4

         }else if(p.toUpperCase().includes(" PC ")){
            formDB=formDB+"("+7+","+0+","+getFormType(formName).type+",'"+formName+"','michelle badu'),"
              formHandler=formHandler+"("+7+",'"+formName+"',"+0+","+getFormType(formName).name+","
            processID=4

         }else{
              formDB=formDB+"("+8+","+0+","+getFormType(formName).type+",'"+formName+"','michelle badu'),"
              formHandler=formHandler+"("+8+",'"+formName+"',"+0+","+getFormType(formName).name+","
              processID=8
          }
        var formId=fileName.split(".")[3]
     /* if(formHandler.length>2){
       if(formName.toUpperCase().includes("START UP") || formName.toUpperCase().includes("START-UP")){
         formDB=formDB+1+")"
         formHandler=formHandler+1+")"
         formType=1
       }else  if(formName.toUpperCase().includes("SHIFT CHANGE") ){
            formDB=formDB+2+")"
            formHandler=formHandler+2+")"
            formType=2
       }else  if(formName.toUpperCase().includes("ALLERGEN CHANGE OVER") ){
            formDB=formDB+3+")"
            formHandler=formHandler+3+")"
            formType=3
       }else{
         formDB=formDB+4+")"
          formHandler=formHandler+4+")"
         formType=4
       }
    }
    */
  
        //console.log("formId",formId)
        //console.log("formName:",formName) 
        
      
        
        // Convert each sheet to JSON and then to a string
        let sheets = {};
        var lastSheetIndex=workbook.SheetNames.length
        var sheetIndex=1

        workbook.SheetNames.forEach(sheetName => {
          const sheet = workbook.Sheets[sheetName];
          
          sheets[sheetName] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          
        
          if(!processedXLXS.includes(ourFiles[i])){
            
            processedXLXS.push(ourFiles[i])
            if(sheets["Sheet"+sheetIndex][0].length>0 && sheets["Sheet"+sheetIndex][1].length>0){
              
              // console.log("\nSheet"+sheetIndex)
             // console.log("\nSTARTING FILE-----------------------"+ourFiles[i]+"\n\n") 
              //console.log("sheet:",sheetIndex,"last:",lastSheetIndex)
              if(sheets["Sheet"+sheetIndex]!=null){
          if(sheetIndex<lastSheetIndex ){
            //console.log(sheets["Sheet"+sheetIndex])
           
               const sections=[]
              var rowIndex=0
              var jump
              var j
              var switchFlag=false
              var sectionIndex=1
            
          var formSections={form:formName,sections:[]}
                
                        while(rowIndex<sheets["Sheet"+sheetIndex].length ){
                            const currSheet=sheets["Sheet"+sheetIndex]
                 
                            var row=sheets["Sheet"+sheetIndex][rowIndex] 
                       var last
                           
                            if(row!=null ){ 
                           
                            // console.log(row)
                                if(row.length>0 /* processID!=null && formType!=null*/ ){
                                   // console.log(row)
                                    if( (row.includes("DISCREPANCY/ACTION TAKEN")) || ( row.includes('WORK REQUEST NUMBER')) || ( row.includes('WORK ORDER NUMBER'))||  (  row.includes('Work Request Number')) || (  row.includes('Work Order Number'))|| (  row.includes("GO") &&   row.includes('NO-GO')) || (  row.includes("Go") &&   row.includes("No-Go") )){
                                        //console.log(row)
                                    var  sectionString=""
                                        var section=row[0].trim(" ")
                                      var sec={form:formName,section:section,questions:null}
                                        sectionString=sectionString+"'"+section.trim()+"',"
                                        var currSection={section:section,questions:[]}
                                        formSections.sections.push(section)
                                     
                                        var nextIndex=rowIndex+1
                                        var nextRow=sheets["Sheet"+sheetIndex][nextIndex] 
                                      
                                        while(nextRow[0]>0 && typeof(nextRow[0])==='number'){
                                           
                                            nextRow=sheets["Sheet"+sheetIndex][nextIndex]
                                            questionString=questionString+"('"+formName+"','"+nextRow[1]+"',"+nextRow[0]+",processID:"+processID+",formType:"+formType+")" 
                                            if(nextRow[1]!=null){
                                            currSection.questions.push(nextRow[1].trim(" "))
                                            sectionString=sectionString+"('"+nextRow[1]+"',"+nextRow[0]+"),"
                                            sec=questions=sectionString
                                            }

                                           
                                            nextIndex++
                                            console.log(nextRow)
                                            if( ( nextRow.length!=2|| (nextRow.includes("DISCREPANCY/ACTION TAKEN")) || ( nextRow.includes('WORK REQUEST NUMBER')) || ( nextRow.includes('WORK ORDER NUMBER'))||  (  nextRow.includes('Work Request Number')) || (  nextRow.includes('Work Order Number'))|| (  nextRow.includes("GO") &&   nextRow.includes('NO-GO')) || (  nextRow.includes("Go") &&   nextRow.includes("No-Go") )) ){
                                             /*  console.log(currSection)
                                                console.log("\n\n\nEND")
                                                console.log(nextRow)
                                              */
                                                console.log(currSection)
                                                currForms.sections.push(currSection)
                                                allDBQ.push(sec)
                                                switchFlag=true
                                                j=nextIndex-rowIndex
                                               //console.log("BREAK",nextIndex-rowIndex,"--------------\n\n")
                                                nextRow=sheets["Sheet"+sheetIndex][nextIndex]
                                              
                                                break
                                                
                                            }
                                            if(!sheets["Sheet"+sheetIndex][nextIndex][0]>0 ){
                                              
                                               /*     currForms.sections.push(currSection)
                                                switchFlag=true
                                                j=nextIndex-rowIndex
                                                console.log("BREAK",nextIndex-rowIndex,"--------------\n\n")
                                             
                                                break*/
                                                
                                            }
                                        }
                                       
                                    // newSectionStrDB=newSectionStrDB+`('${section.toUpperCase().trim()}',${sectionIndex},'${section}','${formName}),`
              
                                         
                                     
                                        const indexes=[]
                                        const sectionsSoFar=[]
                                        //console.log(row)
                                        var oldRowIndex=rowIndex
                                        rowIndex++
                                        var nextRow=sheets["Sheet"+sheetIndex][rowIndex] 
                                    var lastSectionIndex=[]
                                    /*
                                        if(nextRow.length==2){
                                        while(nextRow.length==2){
                                           // console.log("rowIndex",rowIndex)
                                            nextRow=sheets["Sheet"+sheetIndex][rowIndex] 
                                            //console.log(nextRow)
                                          //  console.log("here:",sheets["Sheet"+sheetIndex][rowIndex+1] )
                                            //console.log(sheets["Sheet"+sheetIndex][rowIndex])
                                            //console.log(nextRow)
                                            if(nextRow.length>0){
                                            lastSectionIndex.push(nextRow[0])
                                            last=lastSectionIndex
                                           // console.log("last",lastSectionIndex)
                                            }
                                            newSectionStrDB=newSectionStrDB+`('${section.toUpperCase().trim()}','${formName}',${last[last.length-1]}),`
                                            
                                            rowIndex++; 
                                            nextR=sheets["Sheet"+sheetIndex][rowIndex] 
                                           // console.log(typeof nextR[0])
                                            if(typeof nextR[0]!="number"){
                                                console.log("last",lastSectionIndex[lastSectionIndex.length-1])
                                                switchFlag=true
                                              j=  rowIndex-oldRowIndex-1
                                              //  console.log(nextRow[0])
                                            }
                                            if(typeof nextR[0]!="number" && sheets["Sheet"+sheetIndex][rowIndex-1].length!=2 ){
                                               // console.log(`('${section.toUpperCase().trim()}','${formName}',${last[last.length-1]}),`)
                                                // newSectionStrDB=newSectionStrDB+`('${section.toUpperCase().trim()}','${formName}',${last[last.length-1]}),`
                                            }
                                           
                                            
                                         
                                            
                                           
                                        }
                                    
                                    
                                    }else{
                                      
                                       
                                    }
                                    */
                                    }
                                }
                            }
                            if(switchFlag==true){
                           
                                rowIndex+=j-2
                                switchFlag=!switchFlag
                            }else{
                                rowIndex++
                            }
                           
                        }
                 
                        sheetIndex++
                        if(sheetIndex>1){
                            sectionsInForm.push(currForms)
                            newSections.push(formSections)
                        }
                    }
                }else{
                    sheetIndex++
                }
            }
            }
                })
                
                i++
                if(i==ourFiles.length-1){
                  // console.log("\n\nEND")
                    try{
                    res.json({allDBQ:allDBQ,currForms:sectionsInForm,formSections:newSections,questions:questionString,formDB:formDB,sections:newSections,sectionString:sectionString/*str:newSectionsStr,newSectionStr: newSectionStrDB,formDB:formDB,questionString:questionString*/})
                    }catch(err){

                    }
                   // console.log(sheets["Sheet1"])
                    const p=dir_name+"/"+ourFiles[i]
                    const parsedSections=[]
                    const workbook = XLSX.readFile(p);
            
                    var fileName=ourFiles[i]
                    var formName=fileName.split(".")
                    var findFirst=ourFiles[i].split(" ")
                    var formString=""
                   
                    if(findFirst[0].includes(".")){
                        
                        var remove=1
                        while(remove<findFirst.length-1){
                            formString=formString+" "+findFirst[remove]
                            remove++
                            if(remove==findFirst.length-1){
                                if(findFirst[findFirst.length-1].includes(".")){
                                    formString=formString+" "+ findFirst[findFirst.length-1].split(".")[0].trim()
                                }
                            }
                        }
                    }
                    
                    formName=formString.trim()
                    var formId=fileName.split(".")[3]
                   
                    //console.log("formId",formId)
                    //console.log("formName:",formName) 
                    
                  
                    
                    // Convert each sheet to JSON and then to a string
               
                    workbook.SheetNames.forEach(sheetName => {
                        console.log("\n\nhi")
                      const sheet = workbook.Sheets[sheetName];
                      let sheets = {};
                      sheets[sheetName] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                      var sheetIndex=1
                      const lastSheetIndex=Object.keys(sheets).length
                        if(!processedXLXS.includes(ourFiles[i])){
            processedXLXS.push(ourFiles[i])
            if(sheets["Sheet"+sheetIndex][0].length>0 && sheets["Sheet"+sheetIndex][1].length>0){
              // console.log("\nSheet"+sheetIndex)
              console.log("index:"+i +"\nSTARTING FILE-----------------------"+ourFiles[i]+"\n\n") 
              //console.log("sheet:",sheetIndex,"last:",lastSheetIndex)
              if(sheets["Sheet"+sheetIndex]!=null){
          if(sheetIndex<lastSheetIndex ){
            //console.log(sheets["Sheet"+sheetIndex])
           
               const sections=[]
              var rowIndex=0
              var jump
              var j
              var switchFlag=false
              var sectionIndex=1
            
          
                
                        while(rowIndex<sheets["Sheet"+sheetIndex].length ){
                            const currSheet=sheets["Sheet"+sheetIndex]
                        // console.log(row)
                            var row=sheets["Sheet"+sheetIndex][rowIndex] 
                       var last
                            
                            if(row!=null ){ 
                             
                                if(row.length>0 ){
                                 
                                    if( (row.includes("DISCREPANCY/ACTION TAKEN")) || ( row.includes('WORK REQUEST NUMBER')) || ( row.includes('WORK ORDER NUMBER'))||  (  row.includes('Work Request Number')) || (  row.includes('Work Order Number'))|| (  row.includes("GO") &&   row.includes("NO-GO")) || (  row.includes("Go") &&   row.includes("No-Go") )){
                                        //console.log(row)
                                        var section=row[0]
                                       if(formName=="TPC Kettle Line Start-up PSM" && i==3){
                                        console.log(currSheet)
                                       console.log(formName+"=====================SECTION:"+section.toUpperCase().trim())
                                       }// newSectionStrDB=newSectionStrDB+`('${section.toUpperCase().trim()}',${sectionIndex},'${section}','${formName}),`
              
                                         
                                     
                                        const indexes=[]
                                        const sectionsSoFar=[]
                                        //console.log(row)
                                        var oldRowIndex=rowIndex
                                        rowIndex++
                                        var nextRow=sheets["Sheet"+sheetIndex][rowIndex] 
                                    var lastSectionIndex=[]
                                    /*
                                        if(nextRow.length==2){
                                        while(nextRow.length==2){
                                           // console.log("rowIndex",rowIndex)
                                            nextRow=sheets["Sheet"+sheetIndex][rowIndex] 
                                            //console.log(nextRow)
                                          //  console.log("here:",sheets["Sheet"+sheetIndex][rowIndex+1] )
                                            //console.log(sheets["Sheet"+sheetIndex][rowIndex])
                                            //console.log(nextRow)
                                            if(nextRow.length>0){
                                            lastSectionIndex.push(nextRow[0])
                                            last=lastSectionIndex
                                           // console.log("last",lastSectionIndex)
                                            }
                                            newSectionStrDB=newSectionStrDB+`('${section.toUpperCase().trim()}','${formName}',${last[last.length-1]}),`
                                            
                                            rowIndex++; 
                                            nextR=sheets["Sheet"+sheetIndex][rowIndex] 
                                           // console.log(typeof nextR[0])
                                            if(typeof nextR[0]!="number"){
                                                console.log("last",lastSectionIndex[lastSectionIndex.length-1])
                                                switchFlag=true
                                              j=  rowIndex-oldRowIndex-1
                                              //  console.log(nextRow[0])
                                            }
                                            if(typeof nextR[0]!="number" && sheets["Sheet"+sheetIndex][rowIndex-1].length!=2 ){
                                               // console.log(`('${section.toUpperCase().trim()}','${formName}',${last[last.length-1]}),`)
                                                // newSectionStrDB=newSectionStrDB+`('${section.toUpperCase().trim()}','${formName}',${last[last.length-1]}),`
                                            }
                                           
                                            
                                         
                                            
                                           
                                        }
                                    
                                    
                                    }else{
                                      
                                       
                                    }
                                    */
                                    }
                                }
                            }
                            if(switchFlag==true){
                                rowIndex+=j
                                switchFlag=!switchFlag
                            }else{
                                rowIndex++
                            }
                           
                        }
                 
                        sheetIndex++
                    }
                }else{
                    sheetIndex++
                }
            }
            }
                        })
                  }
                 
            }
        })
            
})
app.post("/parse-file",(req,res)=>{
    var dir_name=req.body.path
    const processedXLXS=[]
    const newSections=[]
    const sectionsInForm=[]
    const sectionsInFormDBString=[]// stored in array
    var questionsString=""
        const p=dir_name
        const parsedSections=[]
        const workbook = XLSX.readFile(p);
        var formDB=""
        var questionsDB=""
        var sectionString=""
        var fileName=p
        var formName=fileName.split(".")
        var findFirst=p.split(" ")
        var formString=""
        console.log(formName)
        var sectionIndex=1
        if(findFirst[0].includes(".")){
            
            var remove=1
            while(remove<findFirst.length-1){
                formString=formString+" "+findFirst[remove]
                remove++
                if(remove==findFirst.length-1){
                    if(findFirst[findFirst.length-1].includes(".")){
                        formString=formString+" "+ findFirst[findFirst.length-1].split(".")[0].trim()
                    }
                }
            }
        }
        
        formName=formString.trim()
        var formId=fileName.split(".")[3]
       
        //console.log("formId",formId)
        //console.log("formName:",formName) 
        
      console.log(formName)
        
        // Convert each sheet to JSON and then to a string
        let sheets = {};
        var lastSheetIndex=workbook.SheetNames.length
        var sheetIndex=1

        workbook.SheetNames.forEach(sheetName => {
          const sheet = workbook.Sheets[sheetName];
   
          sheets[sheetName] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          
        
          if(!processedXLXS.includes(formName)){
            processedXLXS.push(formName)
            if(sheets["Sheet"+sheetIndex][0].length>0 && sheets["Sheet"+sheetIndex][1].length>0){
              // console.log("\nSheet"+sheetIndex)
              console.log("index:"+i +"\nSTARTING FILE-----------------------"+p+"\n\n") 
              if(p.toUpperCase().includes("POPCORN")){
                formDB=formDB+"("+2+","+formName+"')"
              }else if(p.toUpperCase().includes("PRETZEL")){
                 formDB=formDB+"("+1+","+formName+"')"

              }else if(p.toUpperCase().includes("SUNCHIP")){
                 formDB=formDB+"("+3+","+formName+"')"

              }else if(p.toUpperCase().includes("TPC KETTLE LINE")){
                 formDB=formDB+"("+5+","+formName+"')"

              }
              console.log(sheetIndex," lastSheetIndex:",lastSheetIndex)
              //console.log("sheet:",sheetIndex,"last:",lastSheetIndex)
              if(sheets["Sheet"+sheetIndex]!=null){
                console.log("NOT NULL")
          if(sheetIndex<lastSheetIndex && sheets["Sheet"+sheetIndex]!=null &&  sheets["Sheet"+sheetIndex].length>0 ){
            //console.log(sheets["Sheet"+sheetIndex])
          
               const sections=[]
              var rowIndex=0
              var jump
              var j
              var switchFlag=false
              var sectionIndex=1
           
          console.log("rowIndex:",rowIndex,"total rows",sheets["Sheet"+sheetIndex].length )
          var rowLength=sheets["Sheet"+(sheetIndex)].length
            while(rowIndex<rowLength ){
                
                
                var row=sheets["Sheet"+sheetIndex][rowIndex] 
                       var last
                       var jump=0
                
                if(row!=null ){ 
                    
                    if(row.length>0 ){
                        if( (row.includes("DISCREPANCY/ACTION TAKEN")) || ( row.includes('WORK REQUEST NUMBER')) || ( row.includes('WORK ORDER NUMBER'))||  (  row.includes('Work Request Number')) || (  row.includes('Work Order Number'))|| (  row.includes("GO") &&   row.includes("NO-GO")) || (  row.includes("Go") &&   row.includes("No-Go") )){
                           
                            var section=row[0]
                            console.log(formName+"=====================SECTION:"+section.toUpperCase().trim()+ " section order:"+sectionIndex)
                            sectionString=sectionString+",('"+section.toUpperCase()+"',"+sectionIndex+",'"+formName.toUpperCase()+"')"
                            console.log("section order:"+sectionIndex)
                            sectionIndex++

                            // newSectionStrDB=newSectionStrDB+`('${section.toUpperCase().trim()}',${sectionIndex},'${section}','${formName}),`
                            var currQIndex=rowIndex+1
                               
                                     
                                        const indexes=[]
                                        const sectionsSoFar=[]
                                        //console.log(row)
                                        var oldRowIndex=rowIndex
                                   
                                
                                    var currQ=sheets["Sheet"+sheetIndex][currQIndex] 
                                   console.log(currQ)
                                    while(currQ[0]>0){
                                        currQ=sheets["Sheet"+sheetIndex][currQIndex] 
                                        console.log(currQ)
                                        var lastRow= sheets["Sheet"+sheetIndex][currQIndex-1]
                                       
                                        currQIndex++
                                        console.log(currQIndex)
                                        if(!currQ[0]>0){
                                            console.log("\n\n",lastRow)
                                            console.log("section order:"+sectionIndex+"total questions:"+ lastRow[0]+" questions\n\n")
                                            sectionIndex++
                                            if(currQIndex>=rowLength){
                                                console.log("ROW DONE")
                                            if(sheets["Sheet"+(sheetIndex+1)]==null){
                                            res.json({sectionString:sectionString,formDB:formDB})
                                        }
                                    }
                                            break
                                        }
                                    }
                                    /*
                                        if(nextRow.length==2){
                                        while(nextRow.length==2){
                                           // console.log("rowIndex",rowIndex)
                                            nextRow=sheets["Sheet"+sheetIndex][rowIndex] 
                                            //console.log(nextRow)
                                          //  console.log("here:",sheets["Sheet"+sheetIndex][rowIndex+1] )
                                            //console.log(sheets["Sheet"+sheetIndex][rowIndex])
                                            //console.log(nextRow)
                                            if(nextRow.length>0){
                                            lastSectionIndex.push(nextRow[0])
                                            last=lastSectionIndex
                                           // console.log("last",lastSectionIndex)
                                            }
                                            newSectionStrDB=newSectionStrDB+`('${section.toUpperCase().trim()}','${formName}',${last[last.length-1]}),`
                                            
                                            rowIndex++; 
                                            nextR=sheets["Sheet"+sheetIndex][rowIndex] 
                                           // console.log(typeof nextR[0])
                                            if(typeof nextR[0]!="number"){
                                                console.log("last",lastSectionIndex[lastSectionIndex.length-1])
                                                switchFlag=true
                                              j=  rowIndex-oldRowIndex-1
                                              //  console.log(nextRow[0])
                                            }
                                            if(typeof nextR[0]!="number" && sheets["Sheet"+sheetIndex][rowIndex-1].length!=2 ){
                                               // console.log(`('${section.toUpperCase().trim()}','${formName}',${last[last.length-1]}),`)
                                                // newSectionStrDB=newSectionStrDB+`('${section.toUpperCase().trim()}','${formName}',${last[last.length-1]}),`
                                            }
                                           
                                            
                                         
                                            
                                           
                                        }
                                    
                                    
                                    }else{
                                      
                                       
                                    }
                                    */
                                    }
                                }
                            }
                            if(switchFlag==true){
                                rowIndex+=j
                                console.log("\n\n\n"+rowIndex +" ---NEW")
                                switchFlag=!switchFlag
                            }else{
                                rowIndex++
                                console.log("here")
                            }
                            console.log("row:",rowIndex," lastRow Index:",rowLength)
                            console.log(sheets["Sheet"+sheetIndex].length)
                            if(rowIndex>=rowLength){
                                res.json({sectionString:sectionString,formDB:formDB})
                            }
                            //sheetIndex++
                            console.log("FINAL SWITCH INDEX",sheetIndex)
                          /*  if(sheetIndex>1){
                                console.log(sheetIndex +" sheet")
                           if(sheets["Sheet"+(sheetIndex)]==null){
                            console.log("nULLnot",rowIndex," length",rowLength)
                            if(sheetIndex-1!=0 && rowIndex>=rowLength){
                                console.log("ROW DONE")
                            if(sheets["Sheet"+sheetIndex]==null){
                            res.json({sectionString:sectionString})
                        }
                    }
                }
                }*/
                           
              }
                     
                    }
                }else{
                    sheetIndex++
                }
            }
            }
                })
                i++
                if(i==ourFiles.length-1){
                  // console.log("\n\nEND")
                    try{
                    res.json({sections:newSections,str:newSectionsStr,newSectionStr: newSectionStrDB})
                    }catch(err){

                    }
                   // console.log(sheets["Sheet1"])
                    const p=dir_name+"/"+ourFiles[i]
                    const parsedSections=[]
                    const workbook = XLSX.readFile(p);
            
                    var fileName=ourFiles[i]
                    var formName=fileName.split(".")
                    var findFirst=ourFiles[i].split(" ")
                    var formString=""
                   
                    if(findFirst[0].includes(".")){
                        
                        var remove=1
                        while(remove<findFirst.length-1){
                            formString=formString+" "+findFirst[remove]
                            remove++
                            if(remove==findFirst.length-1){
                                if(findFirst[findFirst.length-1].includes(".")){
                                    formString=formString+" "+ findFirst[findFirst.length-1].split(".")[0].trim()
                                }
                            }
                        }
                    }
                    
                    formName=formString.trim()
                    var formId=fileName.split(".")[3]
                   
                    //console.log("formId",formId)
                    //console.log("formName:",formName) 
                    
                  
                    
                    // Convert each sheet to JSON and then to a string
               
                    workbook.SheetNames.forEach(sheetName => {
                        console.log("\n\nhi")
                      const sheet = workbook.Sheets[sheetName];
                      let sheets = {};
                      sheets[sheetName] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                      var sheetIndex=1
                      const lastSheetIndex=Object.keys(sheets).length
                        if(sheets["Sheet"+sheetIndex][0].length>0 && sheets["Sheet"+sheetIndex][1].length>0){
                            while(sheetIndex<lastSheetIndex ){
                                //console.log(sheets["Sheet"+sheetIndex])
                                console.log("\nSTARTING LAST FILE-----------------------"+ourFiles[i]+"\n\n") 
                                   const sections=[]
                                  var rowIndex=0
                                  var jump
                                  var switchFlag=false
                                 
                                 
                                            while(rowIndex<sheets["Sheet"+sheetIndex].length ){
                                            // console.log(row)
                                                var row=sheets["Sheet"+sheetIndex][rowIndex] 
                                                console.log("\nEND ROW:",row)
                                                rowIndex++
                                            }
                                            sheetIndex++
                                        }
                        }
                        })
                  }
                 
            
})
app.post("/generate-questions-and-section-types-1",(req,res)=>{
    const sectionsInForm=[]
    const sectionsInFormDBString=[]// stored in array
    var questionsString=""
    var dir_name=req.body.path
  
    dir_name=dir_name.replace(/"\"/g, "/")
    
const directoryPath = path.join(dir_name);


fs.readdir(directoryPath, function (err, files) {
    i=0
    //handling error
    if (err) {
        console.log("ERR",dirname) 
        return console.log('Unable to scan directory: ' + err);
    } 
    ourFiles=files
    const alreadyProcessedForms=[]
    console.log(files)
    while(i<ourFiles.length/*<ourFiles.length*/){
        const p=dir_name+"/"+ourFiles[i]
        const parsedSections=[]
        const workbook = XLSX.readFile(p);

        var fileName=ourFiles[i]
        var formName=fileName.split(".")
        var findFirst=ourFiles[i].split(" ")
        var formString=""
       
        if(findFirst[0].includes(".")){
            
            var remove=1
            while(remove<findFirst.length-1){
                formString=formString+" "+findFirst[remove]
                remove++
                if(remove==findFirst.length-1){
                    if(findFirst[findFirst.length-1].includes(".")){
                        formString=formString+" "+ findFirst[findFirst.length-1].split(".")[0].trim()
                    }
                }
            }
        }
        
        formName=formString.trim()
        var formId=fileName.split(".")[3]
       
        //console.log("formId",formId)
        //console.log("formName:",formName) 
        console.log("\nSTARTING FILE-----------------------"+ourFiles[i]+"\n\n") 
      
        
        // Convert each sheet to JSON and then to a string
        let sheets = {};
        workbook.SheetNames.forEach(sheetName => {
          const sheet = workbook.Sheets[sheetName];
          
          sheets[sheetName] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          var sheetIndex=1
          const lastSheetIndex=Object.keys(sheets).length
          //  console.log(sheetIndex,lastSheetIndex+1)
          while(sheetIndex<lastSheetIndex){
               const sections=[]
              var rowIndex=0
              var jump
              var switchFlag=false
            
                        while(rowIndex<sheets["Sheet"+sheetIndex].length ){
                         
                            var row=sheets["Sheet"+sheetIndex][rowIndex] 
                        
                            
                            if(row!=null ){ 
                             //  console.log(row)
                                if(row.length>0 ){
                                  
                                    if(ourFiles[i]=="TPC22000.821.F001 TPC Potato Bin Room PSM.xlsx"&& ( row.includes('WORK REQUEST NUMBER')) ||  (  row.includes('Work Request Number')) || (  row.includes("GO") &&   row.includes("NO-GO")) || (  row.includes("Go") &&   row.includes("No-Go") )){
                                        const indexes=[]
                                        const sectionsSoFar=[]
                                        //console.log(row)
                                        var nextRow=sheets["Sheet"+sheetIndex][rowIndex+1] 
                                        //console.log(row)
                                       // console.log(nextRow)
                                        
                                     
                                          //console.log(ss)
                                        //  console.log(ss)
                                        // console.log("\n\nSECTION",row)
                                      var insertQuestions=""
                                      const sectionTitle=row[0]
                                      console.log("---------------------section:"+sectionTitle)
                                     

                                      var section={section:sectionTitle,questions:[]}
                                        var rIndex=rowIndex+1
                                         var r=sheets["Sheet"+sheetIndex][rIndex] 
                                    if(sectionTitle!=null ){  
                                        sectionsSoFar.push(section.section)
                                        if(sectionTitle.length>2){  
                                    while(r.length>0 && r.length==2){ 
                                        //console.log(r)
                                        if(!indexes.includes(r[0])){
                                            indexes.push(r[0])
                                         section.questions.push({order:r[0],question:r[1]})
                                         r[1].replace("'","`")
                                         var s=`('${formName}','${sectionTitle}',${r[0]},'${r[1]}'),`
                                         
                                         insertQuestions=insertQuestions+s
                                         
                                        
                                        }
                                        r=sheets["Sheet"+sheetIndex][rIndex]
                                         rIndex++  
                                         jump=rIndex-rowIndex
                                         switchFlag=true
                                      
                                    }
                                }
                                }
                               // console.log(section.section)
                                  
                                    
                                    sections.push(section)
                                    questionsString=questionsString+insertQuestions
                                    sectionsInFormDBString.push(insertQuestions)
                                    var rDifference=rIndex-rowIndex
                                   
                                    
                                   
                                   // console.log("difference:",rDifference)
                                    }
                                 
                                }
                            }else{
                        
                            }
                   // rowIndex++
                    if(switchFlag){
                        if(!alreadyProcessedForms.includes(formName)){
                            alreadyProcessedForms.push(formName)
                        sectionsInForm.push({formName:formName,sections:sections})
                        }
                        rowIndex=rowIndex+jump
                        switchFlag=false
                    }else{
                        rowIndex++
                    }
                        }
                        sheetIndex++
        }
       
         i++
         if(i>=files.length){
            res.json({forms:sectionsInForm,questionsStringDB:questionsString,questionAndSections:sectionsInFormDBString})
         }
          //console.log(sheets)
          
        });
      
    }
})
})





const sectionTypes1=["GUILLOTINE CUTTER",
    "FINISHED PRODUCT TRANSFER CONVEYOR / BAKED PACKAGING INCLINE CONVEYOR / BAKED CROSSOVER/ ALLEN CONVEYOR" , 
    "EXTRUDER/CUTTERS",
    "EXTRUDER/CUTTER",
    "FLOOR LEVEL-CHECK POINTS",
    "CONTINUOUS WET MIXING",
    "CONVERYORS TO PACKAGING",
    "INCLINE CONVEYOR",
    "BLANCHER / CONVEYORS",
    "PACKAGING 90? CONVEYOR", 
    "GUILLOTINE CUTTER",
    "INCLINE TO WENGER",
    "INCLINE CONVEYOR /  WENGER DRYER",
    "EXTRUDER / BRAID HEAD /DIE PLATE / BAND CUTTER",
   "KILN INFEED CONVEYOR / KILN OVEN / KILN EXIT CONVEYOR",
    "FRITO PRESS",
    "BUCKET ELEVATOR TO PACKAGING PC",
    "BUCKET CONVEYOR-CHECK POINTS",
    "FRYER ",
    "SEASONING TUMBLER"]








app.post("/generate-sections-and-section-types",(req,res)=>{
    const forms=[]
    var dir_name=req.body.path
   /* if(dir_name=="C:/Users/michelle.badu/Documents/Pepsico"){
        allSection=["GENERAL CHECK POINTS",
        " POTATO CRATE DUMPSTER / PRIMARY HOPPER",
        "PEF",
        "CROSS- OVER PC CONVEYOR/VERTICAL LIFT ",
        "ONLINE SOLID",
        "SLICER/ BLANCHER",
        "PEELER",
        "ODENBERG",
        "SURGE HOPPER",
        "WEIGH BELT/ FAST LANE LANING CONVEYOR",
        "SLICER",
        "FRYER INFEED CONVEYOR",
        "FRYER ",
        "DEFECT READER",
        "SEASONING UNIT SKID",
        "BUCKET ELEVATOR TO PACKAGING",
        "DESTONER/ VERTICAL LIFT",
        "ONLINE SOLIDS",
        "CUTTING",
        "PEELING",
        "SORTING",
        "BATCH HOPPER",
        "SLICING",
        "FRYER",
        " SEASONING TUMBLER / ACRISON SEASONER/ SALTER/ OIL SPRAY UNIT/ SLURRY APPLICATOR",
        "ALL CONVEYOR ON LINE",
        "COOK KETTLE AREA-CHECK POINTS",
        "CORN WASH/MILL AREA-CHECK POINTS",
        "FRITO PRESS",
        "SHEETER OVEN",
        "PROOFER ",
        "CONVEYOR",
        "TUMBLER / SEASONER-SALTER ",
        "INCLINE TO PACKAGING",
        "WHEAT COOK AREA",
        "HAMMERMILL AREA",
        "MIX AREA",
        "WHEAT AUGER THROUGH TO EXTRUDER",
        "ENTECON",
        "KTRON",
        "EXTRUDER CHECK POINTS",
        "FRYER-CHECK POINTS ",
        "CONVEYORS/THAYERS-CHECK POINTS",
        "TUMBLERS / SEASONER / SALTER",
        "BUCKET CONVEYOR-CHECK POINTS",
        "SACK LIFT TIP",
        "SACK TIP HOPPER",
        "INCLINE SCREW CONVEYOR #1",
        "INCLINE SCREW CONVEYOR #2",
        "WEIGHT HOPPER",
        "HORIZONTAL MIXER",
        "INCLINE CONVEYOR AFTER MIXER",
        "BUFFER HOPPER",
        "MIXER",
        "EXTRUDER / BRAID HEAD /DIE PLATE / BAND CUTTER",
        "GUILLOTINE CUTTER",
        "PROOFER",
        "CAUSTIC COOKER / SALTER",
        "OVENS / OVEN EXIT CONVEYOR",
        "KILN INFEED CONVEYOR / KILN OVEN / KILN EXIT CONVEYOR",
        "SEASONING TUMBLER / ACRISON SEASONER / OIL SPRAY UNIT / SLURRY APPLICATOR",
        "FINISHED PRODUCT TRANSFER CONVEYOR / BAKED PACKAGING INCLINE CONVEYOR / BAKED CROSSOVER/ ALLEN CONVEYOR  ",
        "INCLINE CONVEYOR AFTER BUFFER HOPPER",
        "KTRON FEEDER",
        "EXTRUDER/CUTTERS",
        "INCLINE CONVEYOR /  WENGER DRYER",
        "INCLINE TO TUMBLER INFEED",
        "SEASONING AREA",
        "DOSING #1/DOSING #2 FEEDERS",
        "EXTRUDER/CUTTER",
        "INCLINE TO WENGER",
        "BUCKET CONVEYOR",
        "ALLENS CHECK POINTS",
        "SECOND LEVEL CHECK POINTS",
        "FLOOR LEVEL-CHECK POINTS",
        "  DRY MIXER",
        "HAPMAN DUMP STATION",
        "CONTINUOUS WET MIXING",
        "SHEETING",
        "DUAL ROTARY CUTTER",
        "FIRST OVEN (BAKING) ",
        "CURLING TRANSFER CONVEYOR",
        "SECOND OVEN (DRYING)",
        "SEASONING EQUIPMENT FROM DRYER TO TUMBLER",
        "SEASONING EQUIPMENT TUMBLER TO BUCKET CONVEYORS",
        "CONVERYORS TO PACKAGING",
        "ACCURATE",
        "CRETORS POPPER FP 80",
        "INCLINE CONVEYOR ",
        "DRY MIXER",
        "SEASONING TUMBLER",
        "SLICER PORTABLE / FEED CONVEYOR-ADD",
        "BLANCHER / CONVEYORS",
        " SURGE HOPPER CONVEYOR ",
        "FRYER INFEED BELT",
        " SLICER",
        "EXIT CONVEYORS (1-4)",
        "EXIT CONVEYORS (5-7)",
        " SEASONING TUMBLER / ACRISON SEASONER/ SALTER/ OIL SPRAY UNIT/ SLURRY APPLICATOR ",
        "BUCKET ELEVATOR TO PACKAGING PC",
        "PACKAGING 90◦ CONVEYOR ",
        "TUMBLER/ SEASONER SALTER",
        "EXTRUDER/ BRAID HEAD/DIE PLATE/BAND CUTTER ",
        "GUILLOTINE CUTTER ",
        "CAUSTIC COOKER/SALTER",
        "OVENS/OVEN EXIT CONVEYOR ",
        "SILO/KTRON FEEDER",
        "HAPMAN/KTRON FEEDER",
        "FINISHED PRODUCT TRANSFER CONVEYOR / BAKED PACKAGING INCLINE CONVEYOR BAKED CROSSOVER/ ALLEN CONVEYOR  ",
        "SLICER PORTABLE / FEED CONVEYOR",
        " SURGE HOPPER CONVEYOR",
        "DOSIN #1 /DOSING #2 FEEDERS",
        "CLAMSHELL",            'GENERAL  CHECK POINTS'  , 'COOK KETTLES/SOAK TANKS'  , 'CORN WASH'  , 'MAGNET CHECK'  , 'CORN MILLER'  , 'DIFFERENTIAL SHEETER CHECK POINTS'  , 'TOASTER OVEN'  , 'CONVEYOR BELTS'  , 'FRYER 50LBS, 30LBS OR 20LBS'  , 'HOBART LARGE MIXER'  , 'HOBART SMALL MIXER'  , ' POPPER FP 80'  , 'POPCORN FT 200'  , 'SWIFTER TUMBLER'  , 'ERICK RIBBON MIXER '  , 'Hopper'  , 'EXTRUDER A.E. I.'  , 'CUTTER'  , 'ERICK RIBBON MIXING AREA'  , 'RANDOM EXTRUDER '  , 'HAPMAN'  , 'EIRICH RIBBON MIXING AREA'  , ' HAPMAN #1,2,3/ACCURATE FEEDER #1,2,3,4'  , 'K-TRON'  , 'EXTRUDER '  , 'TRIPLEX PUMP'  , ' CUTTERS'  , 'CONVEYORS'  , 'FRYER/ OVEN'  , 'EXTRUDER'  , 'POPPER # 1,'  , 'SLICER HEAD'  , 'SS WEIGH DRUMS'  , ' ERICK RIBBON MIXING AREA'  , ' HAPMAN '  , 'HAMMER MILL'  , 'SIFTER'  , 'LEAD KETTLE'  , 'ENERSYST DRYER'  , 'STEPHEN MIXER'  , 'EMRICH LARGE MIXER'  , 'EMRICH SMALL MIXER'  , 'PERTECH POPPER # 2,'  , ' HAPMAN  /ACCURATE FEEDER '  , 'TFT'  , 'Forming/Extruding/ Molding EYT1F BO1'  , 'Forming/Extruding/ Molding EYT1F BO2'  , 'Forming/Extruding/ Molding EYT1F BO3'  , 'FMD'  , 'Packaging'  , 'Hot Kettle'  , 'TB Conveyor '  , 'Equalizer'  , 'Cooling Conveyor'  , 'Cutter #1,2'  , 'Enrobing'  , 'PRECONDITIONER'  , 'HORIZONTAL CUTTER'  , 'VERTICAL CUTTER'  , 'COLD FORMER CUTTER'  , 'FORCED AIR COOLER'  , ' BIG LEAD KETTLE'  , 'DEDY ENROBER'  , 'RONDO SHEETER'  , 'DECK OVEN'  , 'RACK OVEN'  , 'MIDDLEBY OVEN'  , 'Retort'  , 'Can Seamer'  , 'Tray Sealer'  , 'Steam Capper'  , 'Multivac T200'  
    ]
    }else{
        allSections=[
            'GENERAL  CHECK POINTS'  , 'COOK KETTLES/SOAK TANKS'  , 'CORN WASH'  , 'MAGNET CHECK'  , 'CORN MILLER'  , 'DIFFERENTIAL SHEETER CHECK POINTS'  , 'TOASTER OVEN'  , 'CONVEYOR BELTS'  , 'FRYER 50LBS, 30LBS OR 20LBS'  , 'HOBART LARGE MIXER'  , 'HOBART SMALL MIXER'  , ' POPPER FP 80'  , 'POPCORN FT 200'  , 'SWIFTER TUMBLER'  , 'ERICK RIBBON MIXER '  , 'Hopper'  , 'EXTRUDER A.E. I.'  , 'CUTTER'  , 'ERICK RIBBON MIXING AREA'  , 'RANDOM EXTRUDER '  , 'HAPMAN'  , 'EIRICH RIBBON MIXING AREA'  , ' HAPMAN #1,2,3/ACCURATE FEEDER #1,2,3,4'  , 'K-TRON'  , 'EXTRUDER '  , 'TRIPLEX PUMP'  , ' CUTTERS'  , 'CONVEYORS'  , 'FRYER/ OVEN'  , 'EXTRUDER'  , 'POPPER # 1,'  , 'SLICER HEAD'  , 'SS WEIGH DRUMS'  , ' ERICK RIBBON MIXING AREA'  , ' HAPMAN '  , 'HAMMER MILL'  , 'SIFTER'  , 'LEAD KETTLE'  , 'ENERSYST DRYER'  , 'STEPHEN MIXER'  , 'EMRICH LARGE MIXER'  , 'EMRICH SMALL MIXER'  , 'PERTECH POPPER # 2,'  , ' HAPMAN  /ACCURATE FEEDER '  , 'TFT'  , 'Forming/Extruding/ Molding EYT1F BO1'  , 'Forming/Extruding/ Molding EYT1F BO2'  , 'Forming/Extruding/ Molding EYT1F BO3'  , 'FMD'  , 'Packaging'  , 'Hot Kettle'  , 'TB Conveyor '  , 'Equalizer'  , 'Cooling Conveyor'  , 'Cutter #1,2'  , 'Enrobing'  , 'PRECONDITIONER'  , 'HORIZONTAL CUTTER'  , 'VERTICAL CUTTER'  , 'COLD FORMER CUTTER'  , 'FORCED AIR COOLER'  , ' BIG LEAD KETTLE'  , 'DEDY ENROBER'  , 'RONDO SHEETER'  , 'DECK OVEN'  , 'RACK OVEN'  , 'MIDDLEBY OVEN'  , 'Retort'  , 'Can Seamer'  , 'Tray Sealer'  , 'Steam Capper'  , 'Multivac T200'  

        ]
    }*/
    dir_name=dir_name.replace(/"\"/g, "/")
    
const directoryPath = path.join(dir_name);


fs.readdir(directoryPath, function (err, files) {
    i=0
    //handling error
    if (err) {
        console.log("ERR",dirname)
        return console.log('Unable to scan directory: ' + err);
    } 
    ourFiles=files
    console.log(files)
    while(i<ourFiles.length/*<ourFiles.length*/){
    
        const p=dir_name+"/"+ourFiles[i]
        const parsedSections=[]
        const workbook = XLSX.readFile(p);
        var fileName=ourFiles[i]
        var formName=fileName.split(".")
        formName=formName[formName.length-2]
        formName=formName.substring(3,formName.length)
        var formId=fileName.split(".")[3]
        //console.log("formId",formId)
        //console.log("formName:",formName)
        console.log("\n\nSTARTING FILE-----------------------"+ourFiles[i]+"\n\n")
      
        
        // Convert each sheet to JSON and then to a string
        let sheets = {};
        workbook.SheetNames.forEach(sheetName => {
          const sheet = workbook.Sheets[sheetName];
          
          sheets[sheetName] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          //console.log(sheets)
        
        });
      
        if(path=="C:/Users/michelle.badu/Documents/Pepsico"){
            console.log(path)
        //console.log("HERE")
        // Convert the entire workbook to a JSON string
        const workbookString = sheets
       
        
        
        const questions=[]
        var lastSheetIndex=Object.keys(sheets)[Object.keys(sheets).length-1]
        
        var sIndex=[Object.keys(sheets).length-1]
        lastSheetIndex=parseInt(lastSheetIndex.substring(lastSheetIndex.length-1,lastSheetIndex.length))
        //substring([Object.keys(sheets).length-1].length-2,[Object.keys(sheets).length-1].length)
        const sheet=workbookString
        
        
        var sheetIndex=1
        var index=0
        var start
        var title
        var questionIndex=1
        var qswitch=false
        
        while(sheetIndex<lastSheetIndex+1){
           
           
        while(index<sheet['Sheet'+sheetIndex].length){
            const sections=[]
            const r=sheet['Sheet'+sheetIndex][index]
        
            row=sheet["Sheet"+sheetIndex][index]
            if(index==0){
                title=sheet['Sheet1'][index][0]
               
           
                totalForm["name"]=title
            }
            //const   title=sheet['Sheet1'][index][0]
        
          //console.log(row)
           
            if(row.length>0){
            if(row.includes("GO")&& row.includes("NO-GO") ){
              
                    console.log("----SECTION STARTING:",row[0].toUpperCase())
                  
                  
                    if(!sectionTypes.includes(row[0].toUpperCase())){
                        sectionTypes.push(row[0].toUpperCase())
                        sectionStr=sectionStr+",('"+section+"')"
                    }
                  
                     var section={formName:title,section:row[0],questions:[]}
                     var qIndex=index+1
                  
                     console.log("here:",sheets["Sheet"+sheetIndex][qIndex][0],sheets["Sheet"+sheetIndex][qIndex][1] )
                    
                     while(typeof(sheets["Sheet1"][qIndex][0])==Number || sheets["Sheet1"][qIndex][0]>0){
                        console.log("here:",sheets["Sheet"+sheetIndex][qIndex][0],sheets["Sheet"+sheetIndex][qIndex][1] )
                        section.questions.push(sheets["Sheet"+sheetIndex][qIndex][1])
                        qIndex++
                        
                        if(!distinctSectionsTypes.includes(row[0].toUpperCase())){
                            if(row[0]!=" "&&row[0]!=""){
                            distinctSectionsTypes.push(row[0].toUpperCase())
                            distinctSectionTypesStr=distinctSectionTypesStr+`,('`+row[0]+`')`
                            }
                        }
                        
                    
                         section={section:row[0],questions:[]}
                         if(row[0]!=" " && row[0]!=""){
                            allSections.push(row[0].toUpperCase())
                         allSectionsStr= allSectionsStr+"('"+formName.toUpperCase()+"',"+order+",'"+row[0].toUpperCase()+"'),"
                         }
                         order++
        
                        if(typeof(sheets["Sheet1"][qIndex][0])!="number"){
                            sections.push(section)
                            index+=qIndex
                            qswitch=true
                        }
                        //if()
                     }
        
            }
            
           /* if(Object.keys(section).length>0){
                console.log("QUESTION",row)
            }*/
        }
         //console.log(row)
            //console.log("row:",row,"\n")
            if(qswitch==false){
                index++
            }else{
                qswitch=false
            }
            
        }
        sheetIndex++
        if(sheetIndex==lastSheetIndex+1){
            forms.push({form:title,sections:sections})
        }
        }
        
        
        i++
        if(i==ourFiles.length){
            res.json({length:distinctSectionsTypes.length,db_distinct_section_types:distinctSectionsTypes,db_distinct_section_types_STR:distinctSectionTypesStr,length_all:allSections.length,db_all_sections:allSections,db_all_section_types_STR:allSectionsStr})
        }
        }else{
        
            let sheets = {};
        workbook.SheetNames.forEach(sheetName => {
            console.log(sheetName)
          const sheet = workbook.Sheets[sheetName];
          
          sheets[sheetName] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          //console.log(sheets)
        
        });
        const workbookString = sheets
        const allforms=[]
        const totalForm={form:ourFiles[i]}
       
        
        
        const questions=[]
        var lastSheetIndex=Object.keys(sheets)[Object.keys(sheets).length-1]
        
        var sIndex=[Object.keys(sheets).length-1]
        lastSheetIndex=parseInt(lastSheetIndex.substring(lastSheetIndex.length-1,lastSheetIndex.length))
        //substring([Object.keys(sheets).length-1].length-2,[Object.keys(sheets).length-1].length)
        const sheet=workbookString
        
        
        var sheetIndex=1
        var index=0
        var start
        var title
        var questionIndex=1
        var qswitch=false
        console.log("indexes",sheetIndex,lastSheetIndex)
        var order=0
       const allSectionsInForm=[]
       
        while(/*lastSheetIndex==sheetIndex? index<lastSheetIndex+1:*/index<lastSheetIndex){
            const sections=[]
            console.log("\n\n-----'Sheet:"+sheetIndex)
            while(index<sheet['Sheet'+sheetIndex].length+1){
                const r=sheet['Sheet'+sheetIndex][index]
            
                const row=sheet["Sheet"+sheetIndex][index]
                if(index==0){
                    title=sheet['Sheet1'][index]
                   
               
                    totalForm["name"]=title
                }
                //const   title=sheet['Sheet1'][index][0]
          
            const data=row
          
        //console.log()
               var section={}
               //console.log(row)
               if(row!=null ){
                if(row.length>4){
              
               if( (row.includes('WORK REQUEST NUMBER')) ||  (row.includes('Work Request Number')) || (row.includes("GO")&& row.includes("NO-GO")) || (row.includes("Go")&& row.includes("No-Go") )){
               // console.log("!!!!")
                //console.log("----SECTION STARTING:",row[0].toUpperCase())
                //console.log("index",index,"  --row:",row)
                if(row.length>0){
                   // console.log("index",index,"  --row:",row)
              
                        
                    
                        if(!distinctSectionsTypes.includes(row[0].toUpperCase())){
                            if(row[0]!=" "&&row[0]!=""){
                            distinctSectionsTypes.push(row[0].toUpperCase())
                            distinctSectionTypesStr=distinctSectionTypesStr+`,('`+row[0]+`')`
                            }
                        }
                      
                    
                         section={section:row[0],questions:[]}
                         if(row[0]!=" " && row[0]!=""){
                            qIndex=index+1
                            var q=sheet["Sheet"+sheetIndex][qIndex]
                          
                            console.log("-----------------"+row[0])
                           while(q.length==2 ){
                            console.log(q[0],q[1])
                                q=sheet["Sheet"+sheetIndex][qIndex]
                                section.questions.push({order:q[0],question:q[1]})
                                qIndex++
                            }
                            
                                sections.push(section)
                                console.log("sections",sections)
                            
                          /*
                            const already=fs.readFile('previous_section_types.txt', 'utf8', (err, data) => {
                                
                                if (err) {
                                  console.error(err); 
                                  return;
                                }else{
                                 // console.log("data:",data.length)
                                  if(data.length==0){
                                    fs.appendFile("previous_section_types.txt","'"+row[0].toUpperCase().replace(/\s/g, '')+"',",(err)=>{
                                        if(err){
                                            console.log(err)
                                        }
                                    })
                                    fs.appendFile("section_types.txt","'"+row[0].toUpperCase()+"',",(err)=>{
                                        if(err){
                                            console.log(err)
                                        }
                                    })
                                  }else{
                                    if(!data.includes(row[0].toUpperCase().replace(/\s/g, ''))){
                                        fs.appendFile("previous_section_types.txt",",'"+row[0].toUpperCase().replace(/\s/g, '')+"',",(err)=>{
                                            console.log(err)
                                        })
                                        fs.appendFile("section_types.txt",",'"+row[0].toUpperCase()+"'",(err)=>{
                                            if(err){
                                                console.log(err)
                                            }
                                        })
                                    }else{
                                      //  console.log("ALREADY")
                                    }
                                  }
                                }
                                //console.log(data);
                              });
                              */
                            allSections.push(row[0].toUpperCase())
                            allSectionsInForm.push({form:formName,sections:sections})
                         allSectionsStr= allSectionsStr+"('"+formName.toUpperCase()+"',"+order+",'"+row[0].toUpperCase()+"'),"
                         }
                         order++
                        
                         var qIndex=index+1
                      
                         //console.log("here:",sheets["Sheet"+sheetIndex][qIndex][0],sheets["Sheet"+sheetIndex][qIndex][1] )
                        
                         while(typeof(sheets["Sheet1"][qIndex][0])==Number || sheets["Sheet1"][qIndex][0]>0){
                         //   console.log("here:",sheets["Sheet"+sheetIndex][qIndex][0],sheets["Sheet"+sheetIndex][qIndex][1] )
                         if(row[0]!=" "){
                            section.questions.push(sheets["Sheet"+sheetIndex][qIndex][1])
                         }
                            qIndex++
            
                            if(typeof(sheets["Sheet1"][qIndex][0])!="number"){
                                if(row[0]!=" "){
                                sections.push(section)
                              forms.push({formName:formName.toUpperCase(),formId:formId,sections:sections})
                                }
                                //console.log(" \n\n\nNEW JUMP",index," row",sheets["Sheet"+sheetIndex][index])
                                qswitch=true
                            }
                            //if()
                         }
            
                }
            }
        }
            }
             index++
                
            }
        
            sheetIndex++
        }
        i++
        if(i>=ourFiles.length){
           const allTypesLength=allSections.length
           setTimeout(()=>{
            res.json({sections:allSectionsInForm,sectionForms:allforms,length:distinctSectionsTypes.length,db_distinct_section_types:distinctSectionsTypes,db_distinct_section_types_STR:distinctSectionTypesStr,length_all:allSections.length,db_all_sections:allSections,db_all_section_types_STR:allSectionsStr})

           },400)
            //res.json({sections:allSectionsInForm,sectionForms:allforms,length:distinctSectionsTypes.length,db_distinct_section_types:distinctSectionsTypes,db_distinct_section_types_STR:distinctSectionTypesStr,length_all:allSections.length,db_all_sections:allSections,db_all_section_types_STR:allSectionsStr})
            //res.json({distinct_sections_lengthdistinct_sections_length:sectionTypes.length,db_distinct_sections:sectionStrForm})
        
        }
        }
        }
})
})

const forms=[]


app.post("/get-strings",async(req,res)=>{
    var dir_name=req.body.path
    dir_name=dir_name.replace(/"\"/g, "/")
    console.log(dir_name)
const directoryPath = path.join(dir_name);

console.log(directoryPath)
fs.readdir(directoryPath, function (err, files) {
    i=0
    //handling error
    if (err) {
        console.log("ERR",dirname)
        return console.log('Unable to scan directory: ' + err);
    } 
    ourFiles=files
    console.log(files)
})
   const names=[]
  
setTimeout(()=>{



var i=dir_name=="C:/Users/michelle.badu/Documents/Pepsico"? 1:0
while(i<ourFiles.length/*<ourFiles.length*/){
    
const p=dir_name.toString()+"/"+ourFiles[i]

const workbook = XLSX.readFile(p);
var fileName=ourFiles[i]
var formName=fileName.split(".")
formName=formName[formName.length-2]
formName=formName.substring(3,formName.length)
var formId=fileName.split(".")[3]
//console.log("formId",formId)
//console.log("formName:",formName)
console.log("\n\nSTARTING FILE-----------------------"+ourFiles[i]+"\n\n")

// Convert each sheet to JSON and then to a string
let sheets = {};
workbook.SheetNames.forEach(sheetName => {
  const sheet = workbook.Sheets[sheetName];
  
  sheets[sheetName] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  //console.log(sheets)

});
console.log(dir_name)
if(path=="C:/Users/michelle.badu/Documents/Pepsico"){
    console.log(path)
console.log("HERE")
// Convert the entire workbook to a JSON string
const workbookString = sheets
const allforms=[]
const totalForm={form:ourFiles[i]}



const questions=[]
var lastSheetIndex=Object.keys(sheets)[Object.keys(sheets).length-1]

var sIndex=[Object.keys(sheets).length-1]
lastSheetIndex=parseInt(lastSheetIndex.substring(lastSheetIndex.length-1,lastSheetIndex.length))
//substring([Object.keys(sheets).length-1].length-2,[Object.keys(sheets).length-1].length)
const sheet=workbookString


var sheetIndex=1
var index=0
var start
var title
var questionIndex=1
var qswitch=false

while(sheetIndex<lastSheetIndex+1){
   const sections=[]
   
while(index<sheet['Sheet'+sheetIndex].length){
    const r=sheet['Sheet'+sheetIndex][index]

    row=sheet["Sheet"+sheetIndex][index]
    if(index==0){
        title=sheet['Sheet1'][index][0]
       
   
        totalForm["name"]=title
    }
    //const   title=sheet['Sheet1'][index][0]

  //console.log(row)
  
    if(row.length>0){
    if(row.includes("GO")&& row.includes("NO-GO") ){
            console.log("----SECTION STARTING:",row[0].toUpperCase())
            var section={section:row[0].toUpperCase(),questions:[]}
           
            if(!sectionTypes.includes(row[0].toUpperCase())){
                sectionTypes.push(row[0].toUpperCase())
                sectionStr=sectionStr+",('"+section+"')"
            }
          
            // section={formName:title,section:row[0],questions:[]}
             var qIndex=index+1
             while(["Sheet1"][qIndex][0].length>4){
                var q=sheets["Sheet"+sheetIndex][qIndex][1]
                console.log(q)
                section.questions.push({order:q[0],question:q[1]})
                qIndex++
             }
             
          
             //console.log("here:",sheets["Sheet"+sheetIndex][qIndex][0],sheets["Sheet"+sheetIndex][qIndex][1] )
            /*
             while(typeof(sheets["Sheet1"][qIndex][0])==Number || sheets["Sheet1"][qIndex][0]>0){
                console.log("here:",sheets["Sheet"+sheetIndex][qIndex][0],sheets["Sheet"+sheetIndex][qIndex][1] )
                section.questions.push(sheets["Sheet"+sheetIndex][qIndex][1])
                qIndex++
                
                if(!distinctSectionsTypes.includes(row[0].toUpperCase())){
                    if(row[0]!=" "&&row[0]!=""){
                    distinctSectionsTypes.push(row[0].toUpperCase())
                    distinctSectionTypesStr=distinctSectionTypesStr+`,('`+row[0]+`')`
                    }
                }
                
            
                 section={section:row[0],questions:[]}
                 if(row[0]!=" " && row[0]!=""){
                    allSections.push(row[0].toUpperCase())
                 allSectionsStr= allSectionsStr+"('"+formName.toUpperCase()+"',"+order+",'"+row[0].toUpperCase()+"'),"
                 }
                 order++

                if(typeof(sheets["Sheet1"][qIndex][0])!="number"){
                    sections.push(section)
                    index+=qIndex
                    qswitch=true
                }
                //if()
             }*/

    }
    
   /* if(Object.keys(section).length>0){
        console.log("QUESTION",row)
    }*/
}
 //console.log(row)
    //console.log("row:",row,"\n")
    if(qswitch==false){
        index++
    }else{
        qswitch=false
    }
    
}
sheetIndex++
if(sheetIndex==lastSheetIndex+1){
    forms.push({form:title,sections:sections})
}
}


i++
if(i==ourFiles.length){
    res.json({length:distinctSectionsTypes.length,db_distinct_section_types:distinctSectionsTypes,db_distinct_section_types_STR:distinctSectionTypesStr,length_all:allSections.length,db_all_sections:allSections,db_all_section_types_STR:allSectionsStr})
}
}else{

    let sheets = {};
workbook.SheetNames.forEach(sheetName => {
    console.log(sheetName)
  const sheet = workbook.Sheets[sheetName];
  
  sheets[sheetName] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  //console.log(sheets)

});
const workbookString = sheets
const allforms=[]
const totalForm={form:ourFiles[i]}
const sections=[]


const questions=[]
var lastSheetIndex=Object.keys(sheets)[Object.keys(sheets).length-1]

var sIndex=[Object.keys(sheets).length-1]
lastSheetIndex=parseInt(lastSheetIndex.substring(lastSheetIndex.length-1,lastSheetIndex.length))
//substring([Object.keys(sheets).length-1].length-2,[Object.keys(sheets).length-1].length)
const sheet=workbookString


var sheetIndex=1
var index=0
var start
var title
var questionIndex=1
var qswitch=false
console.log("indexes",sheetIndex,lastSheetIndex)
var order=0
while(/*lastSheetIndex==sheetIndex? index<lastSheetIndex+1:*/index<lastSheetIndex){
    console.log("\n\n-----'Sheet:"+sheetIndex)
    while(index<sheet['Sheet'+sheetIndex].length+1){
        const r=sheet['Sheet'+sheetIndex][index]
    
        const row=sheet["Sheet"+sheetIndex][index]
        if(index==0){
            title=sheet['Sheet1'][index]
           
       
            totalForm["name"]=title
        }
        //const   title=sheet['Sheet1'][index][0]
  
    const data=row
  
//console.log()
       var section={}
       //console.log(row)
       if(row!=null ){
        if(row.length>4){
      
       if( (row.includes('WORK REQUEST NUMBER')) ||  (row.includes('Work Request Number')) || (row.includes("GO")&& row.includes("NO-GO")) || (row.includes("Go")&& row.includes("No-Go") )){
       // console.log("!!!!")
        //console.log("----SECTION STARTING:",row[0].toUpperCase())
        //console.log("index",index,"  --row:",row)
        if(row.length>0){
           // console.log("index",index,"  --row:",row)
      
                
            
                if(!distinctSectionsTypes.includes(row[0].toUpperCase())){
                    if(row[0]!=" "&&row[0]!=""){
                    distinctSectionsTypes.push(row[0].toUpperCase())
                    distinctSectionTypesStr=distinctSectionTypesStr+`,('`+row[0]+`')`
                    }
                }
                
            
                 section={section:row[0],questions:[]}
                 if(row[0]!=" " && row[0]!=""){
                    allSections.push(row[0].toUpperCase())
                 allSectionsStr= allSectionsStr+"('"+formName.toUpperCase()+"',"+order+",'"+row[0].toUpperCase()+"'),"
                 }
                 order++
                
                 var qIndex=index+1
              
                 //console.log("here:",sheets["Sheet"+sheetIndex][qIndex][0],sheets["Sheet"+sheetIndex][qIndex][1] )
                
                 while(typeof(sheets["Sheet1"][qIndex][0])==Number || sheets["Sheet1"][qIndex][0]>0){
                 //   console.log("here:",sheets["Sheet"+sheetIndex][qIndex][0],sheets["Sheet"+sheetIndex][qIndex][1] )
                 if(row[0]!=" "){
                    section.questions.push(sheets["Sheet"+sheetIndex][qIndex][1])
                 }
                    qIndex++
    
                    if(typeof(sheets["Sheet1"][qIndex][0])!="number"){
                        if(row[0]!=" "){
                        sections.push(section)
                      forms.push({formName:formName.toUpperCase(),formId:formId,sections:sections})
                        }
                        //console.log(" \n\n\nNEW JUMP",index," row",sheets["Sheet"+sheetIndex][index])
                        qswitch=true
                    }
                    //if()
                 }
    
        }
    }
}
    }
     index++
        
    }

    sheetIndex++
}
i++
if(i>=ourFiles.length){
   const allTypesLength=allSections.length
    res.json({length:distinctSectionsTypes.length,db_distinct_section_types:distinctSectionsTypes,db_distinct_section_types_STR:distinctSectionTypesStr,length_all:allSections.length,db_all_sections:allSections,db_all_section_types_STR:allSectionsStr})
    //res.json({distinct_sections_lengthdistinct_sections_length:sectionTypes.length,db_distinct_sections:sectionStrForm})

}
}
}
},300)
})
app.get("/parse",async(req,res)=>{
    console.log("changeover",CHANGE_OVER.length)
    console.log("shiftchange",SHIFT_CHANGE.length)
    console.log("startup",START_UP.length)
    console.log("misscellaneous",MISSC.length)
    console.log(str)
    res.json({str:str,forms:forms})
})

/*

    const already=fs.readFile('previous_section_types.txt', 'utf8', (err, data) => {
                        if (err) {
                          console.error(err);
                          return;
                        }else{
                          console.log("data:",data)
                        }
                        //console.log(data);
                      });
*/