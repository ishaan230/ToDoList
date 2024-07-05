const express = require('express')
const bodyParser = require('body-parser')

const app = express()


var Items = ["Buy Food","Cook Food"] 


app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/",function(req,res){
    var options = {weekday: 'long',year: 'numeric',month:'long',day:'numeric'}
    var today = new Date()

    var day = today.toLocaleString("en-US",options)

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