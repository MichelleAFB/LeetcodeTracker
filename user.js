
const dotenv = require("dotenv");

dotenv.config({path:"./config/.env"});
const axios=require("axios")
const stripe_live=require('stripe')(process.env.STRIP_LIVE_KEY)
const strip_test=require('stripe')(
process.env.STRIP_TEST_KEY)
const User=require("./models/User")
const express = require("express");
const cors=require('cors')
const bodyParser=require('body-parser');
const { rsort } = require('semver');
const { Console } = require('winston/lib/winston/transports');
const router = express.Router();
router.use(bodyParser.json());
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
console.log(process.env.STRIPE_KEY)

router.use(cors(corsOptions));
 const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);

router.post("/update-subscription/:subscription",(req,res)=>{

axios.get("http://localhost:3022/user/subscriptions").then((response)=>{
  const sub=response.data.subscriptions
console.log(response.data) 
const stripe=require("stripe")(process.env.STRIPE_KEY)
  sub.data.map(async(d)=>{

    const subscriptionCancel = await stripe.subscriptionItems.del(
      d.id,
      {
       // cancel_at_period_end: true,
      })
      console.log(subscriptionCancel)

  })
})

 /* console.log(req.body)
  console.log(req.params)
  const user=req.body.user
  const subscription=req.body.subscription
  var ourUser=await User.find({$and:[{"userId":user.userId},{"email":user.email}]})
  ourUser=ourUser[0]
  console.log(ourUser)
 // const stripe = require('stripe')(process.env.STRIP_TEST_KEY);

  /*
  const customers = await stripe.customers.list({});
const subscriptions = await stripe.subscriptions.list({});

  if(ourUser!=null){
    if(ourUser.customer_id!=null || ourUser.subscription_id!=null || ourUser.subscription!=null){
        //delete old subscription
        console.log(ourUser.customer_id)
        console.log(ourUser.subscription_id)
        console.log(ourUser.subscription)
        
    }
    else{
      console.log("no")
      //no need to change subscription
    }
  
  }else{
    res.json({success:false,err:"no user"})
  }
  */
  /*  console.log(req.body)
    console.log(req.params)
    const user=req.body.user
   // console.log(typeof(user.userId.toString()))
    var found_user=await User.find({$and:[{"userId":user.userId.toString()}]})
   // console.log(found_user)
   found_user=found_user[0]
    const subscription=req.params.subscription
   // console.log(found_user)
    if(found_user!=null){
      const update=await User.updateOne({$and:[{"userId":found_user.userId}]},{
        $set:{"subscription":subscription,"subscription_updated":new Date()},
      })
     // console.log(update)
      const newUser=await User.find({$and:[{"userId":user.userId}]})
      res.json({user:newUser[0],success:true,updated:update})


    }else{
     // res.json({success:false,err:"user doesn't exist"})

     const newUser=new User({
      userId:user.userId.toString(),
      firstname:user.firstname,
      lastname:user.lastname,
      email:user.email,
      emailVerified:user.emailVerified,
      online:user.online,
      challenges:user.challenges,
      currentChallenge:user.currentChallenge,
      criticalIndex:user.criticalIndex,
      decliningIndex: user.decliningIndex,
      healthyIndex:user.healthyIndex,
      subscription:subscription,
      subscription_updated:new Date()
     })

     const save=await newUser.save()
    // res.json({user:user,success:true})
    axios.post("http://localhost:3022/user/get-stripe-customer",{user:req.body.user})
    // console.log(newUser)
     
    }
    */
})

router.post("/get-stripe-customer",async(req,res)=>{
  var customer

 
  const user=req.body.user
  
  var price
const customers = await stripe.customers.list({
  
});
const subscriptions = await stripe.subscriptions.list({
  
});
  customers.data.map((c)=>{
    if(req.body.email!=null){
      if(c.email==req.body.email || user.email==c.email){
        customer=c
        console.log("MATCH")
        subscriptions.data.filter((s)=>{
          if(s.customer==c.id && s.id.includes("sub")){
            price=s.id
          }
        })
      }
    }else{
      if(user.email==c.email){
        
        customer=c
        subscriptions.data.filter((s)=>{
          if(s.customer==c.id && s.id.includes("sub")){
              price=s.id
          }
        })
        console.log("MATCH")
      }
    }
  })
  console.log(subscriptions)
 res.json({customer_id:customer.id,success:true,subscription_id:price,subscriptions:subscriptions})
})

router.get("/subscriptions",async(req,res)=>{

  const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);


  const subscriptions=await stripe.subscriptions.list({})
  res.json({subscriptions:subscriptions})
})

router.post("/cancel-subscription",async(req,res)=>{
  

  const subscription = await stripe_test.subscriptions.update(
    //'sub_49ty4767H20z6a',
    {
      cancel_at_period_end: true,
    })

})


module.exports={router}