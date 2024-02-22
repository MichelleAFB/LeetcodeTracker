app.get("/monthCharts/:id/:year",async(req,res)=>{
    // dbmongo.streak.createIndex( { "$**": "text" } )
    const date=new Date()
    date.setFullYear(req.body.year)
    console.log(date.getFullYear())
     const janDates=[]
    const jan=await Streak.find({
     $and:[{"userId":req.params.id},{"day":{$regex:"Jan"}},{"day":{$regex:date.getFullYear().toString()}}]
   })
   var janCount=0;
     jan.map((a)=>{
     janCount+=a.problems.length
     janDates.push(a.day)
     })
     /*********** */
     const febDates=[]
     const feb=await Streak.find({
       $and:[{"userId":req.params.id},{"day":{$regex:"Feb"}},{"day":{$regex:date.getFullYear().toString()}}]
     })
     var febCount=0;
     feb.map((a)=>{
       febCount+=a.problems.length
       febDates.push(a.day)
     })
   
     /*********** */
     marDates=[]
     const mar=await Streak.find({
       $and:[{"userId":req.params.id},{"day":{$regex:"Mar"}},{"day":{$regex:date.getFullYear().toString()}}]
     })
     var marCount=0;
     mar.map((a)=>{
       marCount+=a.problems.length
       marDates.push(a.day)
     })
   
     /*********** */
     const aprDates=[]
     const apr=await Streak.find({
       $and:[{"userId":req.params.id},{"day":{$regex:"Mar"}},{"day":{$regex:date.getFullYear().toString()}}]
     })
     var aprCount=0;
     apr.map((a)=>{
       aprCount+=a.problems.length
       aprDates.push(a.day)
     })
   
     /*********** */
      /*********** */
      const mayDates=[]
      const may=await Streak.find({
       $and:[{"userId":req.params.id},{"day":{$regex:"May"}},{"day":{$regex:date.getFullYear().toString()}}]
     })
     var mayCount=0;
     may.map((a)=>{
       mayCount+=a.problems.length
       a.push(a.day)
     })
   
      /*********** */
      const junDates=[]
      const jun=await Streak.find({
       $and:[{"userId":req.params.id},{"day":{$regex:"Jun"}},{"day":{$regex:date.getFullYear().toString()}}]
     })
     var junCount=0;
     jun.map((a)=>{
       junCount+=a.problems.length
       junDates.push(a.day)
     })
      /*********** */
      const julDates=[]
      const jul=await Streak.find({
       $and:[{"userId":req.params.id},{"day":{$regex:"Jul"}},{"day":{$regex:date.getFullYear().toString()}}]
     })
     var julCount=0;
     jul.map((a)=>{
       julCount+=a.problems.length
       julDates.push(a.day)
     })
   
        /*********** */
     const augDates=[]
     const aug=await Streak.find({
       $and:[{"userId":req.params.id},{"day":{$regex:"Aug"}},{"day":{$regex:date.getFullYear().toString()}}]
     })
     var augCount=0;
     aug.map((a)=>{
       augCount+=a.problems.length
       augDates.push(a.day)
     })
   
      /*********** */
     const sepDates=[]
      const sep=await Streak.find({
       $and:[{"userId":req.params.id},{"day":{$regex:"Sep"}},{"day":{$regex:date.getFullYear().toString()}}]
     })
     var sepCount=0;
     sep.map((a)=>{
       sepCount+=a.problems.length
       sepDates.push(a.day)
     })
   
      /*********** */
     octDates=[]
      const oct=await Streak.find({
       $and:[{"userId":req.params.id},{"day":{$regex:"Oct"}},{"day":{$regex:date.getFullYear().toString()}}]
     })
     var octCount=0;
     oct.map((a)=>{
       octCount+=a.problems.length
       octDates.push(a.day)
     })
   
      /*********** */
     const novDates=[]
      const nov=await Streak.find({
       $and:[{"userId":req.params.id},{"day":{$regex:"Nov"}},{"day":{$regex:date.getFullYear().toString()}}]
     })
     var novCount=0;
     nov.map((a)=>{
       novCount+=a.problems.length
       novDates.push(a.day)
     })
     
      /*********** */
     const decDates=[]
      const dec=await Streak.find({
       $and:[{"userId":req.params.id},{"day":{$regex:"Dec"}},{"day":{$regex:date.getFullYear().toString()}}]
     })
     var decCount=0;
     dec.map((a)=>{
       decCount+=a.problems.length
       console.log("dec:"+decCount)
       decDates.push(a.day)
     })
   
     
     console.log(julCount,augCount,sepCount,octCount,novCount)
     setTimeout(()=>{
       res.json({success:true,months:[{month:"January",problems:janCount,days:janDates},{month:"February",problems:febCount,days:febDates},{month:"March",problems:marCount,days:marDates},{month:"April",problems:aprCount,days:aprDates},{month:"May",problems:mayCount,problems:mayDates},{month:"June",problem:junCount,days:junDates},{month:"July",problems:julCount,days:julDates},{month:"August",problems:augCount,days:augDates},{month:"September",problems:sepCount,days:sepDates},{month:"October",problems:octCount,days:octDates},{month:"November",problems:novCount,days:novDates},{month:"December",problems:decCount,days:decDates}]})
   
     },2000)
   
   
   
   })
   