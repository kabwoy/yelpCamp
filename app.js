const express = require("express")
const mongoose = require("mongoose")
const Campground = require("./models/campground")

mongoose.connect("mongodb://localhost/yelp-camp").then(()=>{
    console.log("Database Connect")
}).catch((e)=>{
    console.log(e)
})

const app = express()

app.use(express.urlencoded({extended:true}))
app.set("view engine" , "ejs")

app.get("/" , (req,res)=>{
    res.render("home")
})

app.get('/makecampground' , async(req,res)=>{
    const newdata = new Campground({
        title:"My Backyard"
    })

    await newdata.save()

    res.send(newdata)

})

app.get("/campgrounds/new" , (req , res)=>{

    res.render("campgrounds/new")
})

app.get("/campgrounds" , async (req, res)=>{
    const campgrounds = await Campground.find({})
    res.render("campgrounds/index" , {campgrounds})
})

app.get("/campgrounds/:id", async (req, res)=>{
    const {id} = req.params
    const foundData = await Campground.findById(id)
    res.render("campgrounds/show" , {foundData})
})

app.post("/campgrounds" , async (req, res)=>{
    var title = req.body.title
    var location = req.body.location
    const newData = new Campground({title:title , location:location})
    await newData.save()
    res.redirect(`/campgrounds/${newData._id}`)
})



app.listen(3000 , ()=>{

    console.log("Serving At Port 3000")
})