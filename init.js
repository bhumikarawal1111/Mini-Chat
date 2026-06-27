const mongoose = require('mongoose');
const Chat = require("./models/chat.js");

main()
.then(() => {
    console.log("connected!");
})
.catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let chat1 = new Chat({
    from :"adi",
    to:"bhumi",
    msg:"i like you <3",
    created_at : new Date()
});
 
let allChats =[
    {
        from:"Adi",
        to:"bhumi",
        msg:"i like u",
        created_at:new Date()
    },
    {
        from:"diya",
        to:"isha",
        msg:"bye bye",
        created_at:new Date()
    },
    {
        from:"Adarsh",
        to:"bulbbul",
        msg:"see u soon",
        created_at:new Date()
    },
    {
        from:"Aman",
        to:"bhawan",
        msg:"meet me at gym",
        created_at:new Date()
    },
    {
        from:"ishan",
        to:"huma",
        msg:"i will be at the party",
        created_at:new Date()
    },
    {
        from:"daman",
        to:"sharvari",
        msg:"what a joke",
        created_at:new Date()
    },
    {
        from:"samay",
        to:"balraj",
        msg:"what a gentleman",
        created_at:new Date()
    }
];

Chat.insertMany(allChats);