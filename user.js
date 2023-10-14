

const dotenv = require("dotenv").config({path:"./config/.env"})
const axios=require("axios")
const stripe_live=require('stripe')(dotenv.parsed.STRIP_LIVE_KEY)
const stripe_test=require('stripe')(
dotenv.parsed.STRIP_TEST_KEY)
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

router.use(cors(corsOptions));
 router.post("/delete-subscription",async(req,res)=>{

  const user=req.body.user
  const subscription=req.body.subscription
axios.get("https://leetcodetracker.onrender.com/user/customers").then((response)=>{
  const customers=response.data.customers.data

  customers.map(async(d)=>{
    console.log("\n\n\n")
    if(d.email==req.body.email || d.email==user.email){
      const customer=d

      axios.get("https://leetcodetracker.onrender.com/user/subscriptions").then((response)=>{
        console.log(response.data.subscription)
       const subscriptions=response.data.subscriptions.data
       //console.log(sub)
       console.log(subscriptions.length)
       Object.keys(subscriptions).map((r)=>{
        const sub=subscriptions[r]
        const items=sub.items.data
        items.map(async(i)=>{
          const plan=i.plan
          //console.log(plan.id)
          if(plan.id==subscription){
            console.log("MATCH")
            console.log("customer:",sub.customer)
            console.log("plan",plan.id,"      || subscription",subscription)
            console.log("price:",plan.amount)
            console.log("other subscription id:",sub.id)
            const deleted = await stripe_test.subscriptions.cancel(sub.id);

            console.log(deleted)


          }
        })
        console.log("\n\n")
       })
      /* subscriptions.items((s)=>{
        console.log(customer)
        console.log(s)
       })
       */
       
      })
    }
    
    //  console.log(subscriptionCancel)

  })
})
 })


router.post("/update-subscription/:subscription",(req,res)=>{
  const user=req.body.user
  const subscription=req.body.subscription
axios.get("https://leetcodetracker.onrender.com/user/customers").then((response)=>{
  const customers=response.data.customers.data
 var data={}
  customers.map(async(d)=>{
    console.log("\n\n\n")
    if(d.email==req.body.email || d.email==user.email){
      const customer=d

      axios.get("https://leetcodetracker.onrender.com/user/subscriptions").then((response)=>{

      
        console.log(response.data.subscription)
       const subscriptions=response.data.subscriptions.data
       //console.log(sub)
       console.log(subscriptions.length)
       Object.keys(subscriptions).map((r)=>{
        const sub=subscriptions[r]
        const items=sub.items.data
        items.map(async(i)=>{
          const plan=i.plan
          //console.log(plan.id)
          if(plan.id!=subscription){
            console.log("MATCH")
            console.log("customer:",sub.customer)
            console.log("plan",plan.id,"      || subscription",subscription)
            console.log("price:",plan.amount)
            console.log("other subscription id:",sub.id)
            const hasId= user.customer_Id!=null ? true:false
            customers.map(async(c)=>{
              if(c.email==customer.email && hasId && c.id!=user.customer_Id ){
                             try{ const deleted = await stripe_test.customers.del(user.customer_Id);
                             }catch(err){
                              console.log(err)
                             }

              }
            })
            try{
            const deleted = await stripe_test.subscriptions.cancel(sub.id);
            }catch(err){
              console.log(err)
            }

           // console.log(deleted)


          }
          else{
            data.customer_id=sub.customer
            data.subscription_id=sub.id

          }
        })
        console.log("\n\n")
       })
      /* subscriptions.items((s)=>{
        console.log(customer)
        console.log(s)
       })
       */
       
      })
    }
    
    //  console.log(subscriptionCancel)

  })

  setTimeout(async()=>{
    console.log(data)
      var ourUser=await User({$and:[{"userId":user.userId}]})
      const updateSubId=await User.updateOne({$and:[{"userId":user.userId}]},{
        $set:{"customer_Id":data.customer_id,"subscription_Id":data.subscription_id,subscription:req.params.subscription,subscription_updated:new Date()}
      })
      const newUser=await User.find({$and:[{"userId":user.userId}]})
      res.json({updated:updateSubId,user:newUser[0],success:true})
  },500)
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
    axios.post("https://leetcodetracker.onrender.com/user/get-stripe-customer",{user:req.body.user})
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

  

  const subscriptions=await stripe_test.subscriptions.list({})
  res.json({subscriptions:subscriptions})
})


router.get("/customers",async(req,res)=>{

  

  const customers=await stripe_test.customers.list({})
  res.json({customers:customers})
})


router.post("/create-user",async(req,res)=>{
  const newUser=req.body.user
  var user=await User.find({$and:[{"userId":req.body.user.userId}]})
  user=user[0]
  if(user!=null){
    //onsole.log(user)
    res.json({user:user,success:true})
  }else{
    const model=new User({
      userId:newUser.userId,
      firstname:newUser.lastname,
      lastname:newUser.lastname,
      email:newUser.email,
      password:newUser.password,
      challenges:newUser.challenges,
      currentChallenge:newUser.currentChallenge,
      online:newUser.online,
      healthyIndex:newUser.healthyIndex,
      decliningIndex:newUser.decliningIndex,
      criticalIndex:newUser.criticalIndex,
      subscription:newUser.subscription,
      subscription_Id:newUser.subscription_Id,
      customer_Id:newUser.customer_Id,
      emailVerfied:newUser.emailVerified,
  })
  console.log(model)
  const save=await model.save()
  const use=await User.find({$and:[{"userId":newUser.userId}]})
  res.json({user:use,success:true})

  }

})



router.post("/cancel-subscription",async(req,res)=>{
  console.log(req.body)

  axios.get("https://leetcodetracker.onrender.com/user/customers").then((c)=>{
    const customers=response.data.customers
  })

 /* const subscription = await stripe_test.subscriptions.update(
    //'sub_49ty4767H20z6a',
    {
      cancel_at_period_end: true,
    })
    */

})


module.exports={router}