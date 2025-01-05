const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


const path = require("path");
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

//function for DB
const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

main()
    .then(()=>{
        console.log("Connected to DB Rockstar");
    }).catch((err) =>{
        console.log("Error connecting to DB Rockstar");
    })
async function main() {
    await mongoose.connect(MONGO_URL);
}
//creating API's

//1.Home
app.get("/",(req,res) =>{
    res.redirect("/listings");
});


//2.Lists  -> Index route
app.get("/listings",async (req,res) =>{
   const allListings = await Listing.find({});
   res.render("listings/index.ejs",{ allListings });
});

//4. take the form from user to create a new place
app.get("/listings/new",(req,res) =>{
    res.render("listings/new.ejs");
})


//3. Show route
app.get("/listings/:id",async (req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{ listing })
})


//5.create Route
app.post("/listings",async (req,res) =>{
    // const {title,description,price,location,country} = req.body;  --> 1st method
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

//6. Edit Route
app.get("/listings/:id/edit",async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{ listing });
});

//7. update route
app.put("/listings/:id",async (req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
});

//8.delete route
app.delete("/listings/:id",async (req,res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");

});


//2. lists
// app.get("/testListing",async (req,res) =>{
//     let sampleListing = new Listing({
//         title: "My new Villa",
//         description: "This is a beautiful villa with a pool",
//         price: 1000000,
//         location: "Paris",
//         country: "France",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("Successful entry");

// });



app.listen(8080,()=>{
    console.log("server is running on port 8080");
});