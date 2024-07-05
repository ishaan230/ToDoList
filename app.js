const express = require('express')
const bodyParser = require('body-parser')
const datee = require(__dirname+'/date.js')
const mongoose = require('mongoose')
require('dotenv').config();

const app = express()

mongoose.connect(process.env.API_URL)

//schema
const items = {
    name: String
}

//model
const Item = mongoose.model('Item',items)


app.use(bodyParser.urlencoded({extended: true}))


app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "public"));

app.get("/",function(req,res){
    let day = datee()
    Item.find({}).then((data) => {
        // console.log(data);
        res.render("index",{listTitle : day,newlistitem:data})
       })
})

app.post("/delete", function(req, res) {
    const itemId = req.body.checkboxx;
    console.log(itemId);

    Item.findByIdAndDelete(itemId)
        .then(() => {
            console.log('Item deleted successfully');
            res.redirect('/');
        })
        .catch(err => {
            console.error('Error deleting item:', err);
            res.redirect('/');
        });
});


app.post("/",function(req,res){

    var newItem = req.body.newitem
    const item1 = new Item({
        name: newItem
    })
    
    item1.save()
    console.log(newItem)
    res.redirect('/')
})

app.get("/about",function(req,res){
    res.render("about")
})

app.listen(process.env.PORT,function(){
    console.log('Server Started!')
})