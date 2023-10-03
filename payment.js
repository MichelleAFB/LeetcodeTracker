const strip=require('stripe')("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")
const express = require("express");
const cors=require('cors')
const bodyParser=require('bodyParser')
const router = express.Router();
router.use(bodyParser.json());
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

router.use(cors(corsOptions));



router.post("/checkout/:id",async(req,res)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
console.log("\n\n\n"+req.params.id+"\n\n\n")
  const id=req.params.id
  const fees=req.body.fees
  console.log(fees)
  console.log("hi")
  const items=[]
  const prom=new Promise((resolve,reject)=>{
    fees.map((item)=>{
      if(item.quantity!=null){
      items.push({
        price:item.id,
        quantity:item.quantity
      })
    }else{
      try{
        reject()
      }catch(error){
        console.log(error)
      }
    }
    })
    resolve()
  })
 
  prom.then(()=>{

    

    const prom1=new Promise((resolve1,reject1)=>{

      const checkout=async()=>{

        const session=await strip.checkout.sessions.create({
          line_items:items,
          mode:"payment",
          success_url:"https://ghanahomerental.onrender.com/payment/success/"+id,
          cancel_url:"https://ghanahomerental.onrender.com/payment/cancel"
        })
       try{ 
        console.log(session.url)
        return session.url.toString()
       }catch(error){
          console.log(error)
          reject(error)
       }
      }
      checkout().then((response)=>{
        console.log(response)
        resolve1(response)
      })  

    })

    prom1.then(async(response)=>{
      console.log(response)
      const cDate=new Date()
      if(response!=null){
        
      
      const currDate=cDate.toString().substring(0,15)
      const updated=await Application.updateOne(
        {"id":req.params.id},
        {
          $set:{
           
            "paymentSessionUrl":response,

          }
        }
      )
      console.log(updated)
      if(updated.acknowledged==true){
        res.json({success:true,url:response,updated:updated})
      }
    }else{
        res.json({success:false,message:"error",updated:updated})
      }
  
    })
  }).catch((err)=>{
    res.json({success:false,error:err})
  })
})

module.exports={router}