const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Event = require('./models/events');
const Blog = require('./models/blogs');
const User = require('./models/users');
const port = 8000;
const app = express();

var holdId = 0;
var isAdmin = false;
var isUser = false;
var userId;

const dbURI = 'mongodb+srv://jlaprade:today2428M@nodetuts.3rfiajp.mongodb.net/events?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(port)
        console.log('listening')
    })
    .catch((err) => console.log(err))


app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.json())

app.get('/getEvents', (req, res) => {
    Event.find()
    .then(result => res.send(result))
})

app.get('/getBlogs', (req, res) => {
    Blog.find()
    .then(result => res.send(result))
})

app.get('/getBlogs/:id', (req, res) => {
    const id = req.params.id;
    holdId = id;
    res.sendFile('/home/viveahos/public_html/blogs/singleBlog.html')

})

app.get('/getBlog', (req, res) => {
    Blog.findById(holdId)
    .then(result => {
        holdId = 0;
        res.send(result)
    })
})

app.post('/postEvent', async (req, res) => {  
    console.log("e")
    if(await authenticate(req.body.authentication, 'admin'))
        new Event(req.body.parcel).save();
})

app.post('/postBlog', async (req, res) => {
    console.log('still authoignwefigf')
    if(await authenticate(req.body.authentication, 'user'))
        console.log('autnenticated')
        new Blog(req.body.parcel).save()
})


app.post('/registerUser', async (req, res) => {
    var reqBody = req.body;
    const hashedPassword = await bcrypt.hash(reqBody.password, 10)
    reqBody.password = hashedPassword;
    reqBody.isUser = false;
    reqBody.isAdmin = false;

    
    const user = new User(reqBody)
    user.save();
})

app.put('/putEvent/:id', async (req, res) => {
    const id = req.params.id;
    var updatedInfo = req.body.parcel;
    if(await authenticate(req.body.authentication, 'admin'))
        await Event.findByIdAndUpdate(id, { 
            nombreEvento: updatedInfo.nombreEvento,
            fecha: updatedInfo.fecha,
            linkEvento: updatedInfo.linkEvento
        })
})

async function authenticate(data, level){
    var mail = data.mail;
    var password = data.password
    var authorized = false;
    var isCorrectPassword = false;
    const users = await User.find()
    for(var i = 0; i < users.length; i++){
        if(users[i].mail == mail){
            isCorrectPassword = await bcrypt.compare(password, users[i].password)
            if(level == 'admin' && users[i].isAdmin && isCorrectPassword){
                authorized = true;
            }else if(level == 'user' && users[i].isUser && isCorrectPassword){
                authorized = true;  
            } 
        }
    }
    return authorized;
}