const express = require('express')
const bodyParser = require('body-parser')
const datee = require(__dirname+'/date.js')

const app = express()


var Items = [] 


app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/",function(req,res){
let day = datee()

    res.render("index",{listTitle : day,newlistitem:Items})
})

app.post("/",function(req,res){
    var newItem = req.body.newitem
    console.log(newItem)
    Items.push(newItem)
    res.redirect('/')
})

app.get("/about",function(req,res){
    res.render("about")
})

app.listen(3000,function(){
    console.log('Server Started!')
})