const cities = require("./cities");
const { default: mongoose } = require("mongoose");
const {descriptors,places} = require('./seedHelpers')
const Campground = require('../models/Campground')

mongoose.connect('mongodb://localhost:27017/casual-camp')
.then(()=>{
    console.log("CONNECTION STARTED")
}).catch(err =>{
    console.log("OOPS ERROR!!")
    console.log(err)
})

const getTitle = array => array[Math.floor(Math.random() * array.length)];

const seed = async ()=>{
    await Campground.deleteMany({});
    for(let i=0; i<50;i++){
        const r = Math.floor(Math.random()*1000);
        const camp = new Campground({
            
            title:`${getTitle(descriptors)} ${getTitle(places)} `,
            location:`${cities[r].city} , ${cities[r].state} `
        })
        await camp.save();
    }
    
}
seed().then(()=>{
    mongoose.connection.close();
});