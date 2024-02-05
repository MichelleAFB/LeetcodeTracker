const fs=require("fs")
const readline = require('readline');
const sys=require("process")


var str=""
const routineNames=[]
const Programs=[]
const programName=sys.argv[2]

const lines=fs.readFile(sys.argv[2]+'.xml', (err, inputD) => {
    var currLength=0
      
        inputD.toString()
      const lines= inputD.toString().split("\n")
      const letters=inputD.toString()
      var xmldoc = require('xmldoc');
      var document = new xmldoc.XmlDocument(inputD);
      
        var controller=document.children //THIS IS WHERE THE CONTROLLER OBJECT LIVES
       
       /*console.log("\n\nCONTROLLER:")
       console.log(controller)*/
      
       var programs=controller[1].children
       /*console.log("\n\nPROGRAMS:")
       console.log(programs)*/

       const allPrograms=programs[1].children
       var exist=allPrograms.filter((p)=>{
        if(p.name!=null){
          console.log(p.name)
          if(p.name==sys.argv[2]){
            return true
          }
        }
       })

       console.log("\n\nALL PROPGRAM EXISTS:"+exist)
       var textIndex=0
       var index=0
    allPrograms.map((p)=>{
     
      if(textIndex==0 && index<allPrograms.length && allPrograms[index+1]!=null){
        console.log("\n\PROGRAM:")
        const program={name:allPrograms[index+1].name,text:allPrograms[index],routines:allPrograms[index+1]}
        Programs.push(program)
        index=index+2
        textIndex=1
        console.log(program)
      }else{
        textIndex=0
        
      }
    })
})

setTimeout(()=>{
  console.log("\n\n\n")
    console.log(Programs)
},8000)