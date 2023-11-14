
const dotenv = require("dotenv").config({path:"./config/.env"})
const stripe_live=require('stripe')("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")
const stripe_test=require('stripe')(
dotenv.parsed.STRIP_TEST_KEY)

const express = require("express");
const cors=require('cors')
const bodyParser=require('body-parser')
const User=require("./models/User")
const router = express.Router();
router.use(bodyParser.json());
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

router.use(cors(corsOptions));
const stripe = require('stripe');
const STRIPE_SECRET_KEY = 'sk_test_xxx';

const Stripe = stripe(STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27'
});

const addNewCustomer = async (email) => {
	const customer = await Stripe.customers.create({
		email,
		description: 'New Customer'
	}) 
  return customer
}

const getCustomerByID = async (id) => {
	const customer = await Stripe.customers.retrieve(id) 
  return customer
}


router.use(express.static("public"));
router.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

router.get("/saved-card/:userId",async(req,res)=>{

  var user=await User.find({$and:[{"userId":req.params.userId}]})
  user=user[0]
   var card={}
  if(user.customer_Id!=null){
  const paymentMethods = await stripe_test.paymentMethods.list({
    customer: user.customer_Id,
    type: 'card',
  });
  const card=paymentMethods.data[0]
  res.json({success:true,card:card})
  
  }
  
  })
router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  
  console.log(req.body)
  //console.log(strip_test)
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await strip_test.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


router.post("/checkout/:id/:subscription",async(req,res)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
console.log("\n\n\n"+req.params.id+"\n\n\n")
console.log(req.body)
  const id=req.params.userId
  const fees=req.body.items
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

    
try{
    const prom1=new Promise((resolve1,reject1)=>{

      const checkout=async()=>{

        const session=await stripe_test.checkout.sessions.create({
          line_items:items,
          mode:"subscription",
          success_url:"https://leetcodetrackerclient.onrender.com/payment/success/"+req.params.subscription,
          cancel_url:"https://leetcodetrackerclient.onrender.com/payment/cancel"
        })
       try{ 
        console.log(session.url)
        return session
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
      if(response.url.toString()!=null){
        
      /*
      const currDate=cDate.toString().substring(0,15)
      const updated=await Application.updateOne(
        {"id":req.params.id},
        {
          $set:{
           
            "paymentSessionUrl":response,

          }
        }
      )
      */
     // console.log(updated)
      
        res.json({success:true,url:response.url.toString()})
      
    }else{
        res.json({success:false,message:"error"})
      }
      
  
    })
  }catch(err){
    res.json({success:false,err:err})
  }
  })
})

async  function createSubscription(createSubscriptionRequest) {
  
  // create a stripe customer
  const customer = await this.stripe.customers.create({
    name: createSubscriptionRequest.name,
    email: createSubscriptionRequest.email,
    payment_method: createSubscriptionRequest.paymentMethod,
    invoice_settings: {
      default_payment_method: createSubscriptionRequest.paymentMethod,
    },
  });


  // get the price id from the front-end
  const priceId = createSubscriptionRequest.priceId;

  // create a stripe subscription
  const subscription = await this.stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: priceId }],
    payment_settings: {
      payment_method_options: {
        card: {
          request_three_d_secure: 'any',
        },
      },
      payment_method_types: ['card'],
      save_default_payment_method: 'on_subscription',
    },
    expand: ['latest_invoice.payment_intent'],
  });

  // return the client secret and subscription id
  return {
    clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    subscriptionId: subscription.id,
  };
}

router.post('/create-subscription', ( req  ,res ) => {
  const user=req.body.user
  
  createSubscription(req);

})

router.get("/list-subscriptions",async(req,res)=>{
  const stripe = require('stripe')('sk_test_51MrXkxLxMJskpKlAqyll3YtK4rnwOsslfy4HkGHeDrvChbt3Yk9f8ZJuEzv28Qf2nAgz6kM2nVmzigtEYQ2wkj4H00Ma19A8HG');
  const user=req.body.user
const subscriptions = await stripe.subscriptions.list({
  limit: 3,
});
console.log(subscriptions)
res.json({success:true,subscriptions:subscriptions})
})
/*
router.post("/checkout/:userId",async(req,res)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
console.log("\n\n\n"+req.params.userId+"\n\n\n")
  const id=req.params.userId
  const price=req.body.subscription
  console.log(req.body)
  
  const items=[]
  const prom=new Promise((resolve,reject)=>{
    console.log(req.body)
    resolve()
  })
 
  prom.then(()=>{

    

    const prom1=new Promise((resolve1,reject1)=>{
      const sub= createSubscriptionRequest({})
      const checkout=async()=>{
        //const a=await strip_test.checkout
        //console.log(a)
       
        const session=await strip_test.checkout.session.create({
          mode:'subscription',
          line_items:[{
            price:price,
            quantity:1
        }],
          mode:"payment",
          success_url:"https://leetcodetrackerclient.onrender.com/payment/success/"+id,
          cancel_url:"https://leetcodetrackerclient.onrender.com/payment/cancel/"+id
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
      var foundUser=await User.find({$and:[{"userId":req.params.id}]} )
      console.log(foundUser)
      foundUser=foundUser[0]
      if(user==null){

      }else{

      }


      
        res.json({success:true,url:response})
      
    }else{
        res.json({success:false,message:"error"})
      }
      
    })
  }).catch((err)=>{
    res.json({success:false,error:err})
  })
})
*/

module.exports={router}