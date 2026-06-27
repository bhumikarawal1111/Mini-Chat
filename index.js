const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views",path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


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

//index route-show all chats
app.get("/chats",async(req, res) => {
    let chats = await Chat.find();
    res.render("index.ejs", {chats});
});

//new chat route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

//post route for showing new chat on All chats page
app.post("/chats", (req, res) => {
    let {from, msg , to} = req.body;
    //it will send encoded data

    let newChat = new Chat({
        from : from,
        msg: msg,
        to:to,
        created_at: new Date()
    });
    //how to save to db?
    newChat.save()
    .then((res) =>{
        console.log("chat was saved");
    }).catch((err) => {
        console.log(err);
    });

    res.redirect("/chats");
});

//edit route
app.get("/chats/:id/edit", async(req, res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);

    res.render("edit.ejs" , {chat});
});

//update route
app.put("/chats/:id", async(req, res) => {
        let {id} = req.params;
        let {msg : editedmsg} = req.body;

        // console.log(editedmsg);
        
        let updatedChat = await Chat.findByIdAndUpdate(id, {msg:editedmsg}, {runValidators: true, new : true});
        res.redirect("/chats");
});

//destroy route
app.delete("/chats/:id", async(req, res) => {
        let {id} = req.params;
        let deletedChat = await Chat.findByIdAndDelete(id) ;
        console.log(deletedChat);
        res.redirect("/chats");
})

app.get("/", (req, res) => {
    res.send("home page");
});

app.listen(8080,()=>{
    console.log("app is listening!");
});