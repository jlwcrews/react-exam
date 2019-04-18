const express = require('express')
const app = express()
const repo = require('./repo.js')
const path = require('path');
const bodyParser = require('body-parser');
const ews = require('express-ws')(app);
const WebSocket = require('ws');
const Users = require('./users');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');
const session = require("express-session");


let messageCounter = 0;
const chatMessages = []

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

//this section handles requests involving dishes
app.get("/dishes", (req, res) => {
    const dishes = repo.getDishes()
    res.send(dishes)
})

app.get("/dish/:id", (req, res) => {
    const id = req.params["id"]
    const dish = repo.getDish(id)
    res.json(dish)
})

app.delete("/dish/:id", (req, res) => {
    const id = req.params["id"]
    console.log("Id in app.js: " + id)
    res.json(repo.deleteDish(id))
})

app.post("/dish", (req, res) => {
    const body = req.body
    res.json("/dish/" + repo.addDish(body.name, body.type))
})

app.put("/dish/:id", (req, res) => {
    const id = req.params["id"]
    const body = req.body
    const dish = {
        id: body.id,
        name: body.name,
        type: body.type
    }
    res.json(repo.updateDish(id, dish))
})


//section handling websockets for the chat
app.ws('/', function(ws, req) {
    ws.send(JSON.stringify(chatMessages));
    ws.on('message', fromClient => {
        const dto = JSON.parse(fromClient);
        const id = messageCounter++;
        const msg = {id: id, author: dto.author, text: dto.text};
        chatMessages.push(msg);
        ews.getWss().clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify([msg]));
            }
        });
    })
});

//authentication
app.use(session({
    secret: '19283745691827364',
    resave: false,
    saveUninitialized: false
}));

passport.use(new LocalStrategy(
    {
        usernameField: 'userId',
        passwordField: 'password'
    },
    function (userId, password, done) {

        const ok = Users.verifyUser(userId, password);

        if (!ok) {
            return done(null, false, {message: 'Invalid username/password'});
        }

        const user = Users.getUser(userId);
        return done(null, user);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {

    const user = Users.getUser(id);

    if (user !== undefined) {
        done(null, user);
    } else {
        done(null, false);
    }
});

app.get('/user', (req, res) => {
    if(req.user){
        res.json({
            userId: req.user.id
        });
        res.status(200).send()
    }

    res.status(401).send();
});

app.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(204).send();
});

app.post('/logout', function(req, res){
    req.logout();
    res.status(204).send();
});

//section handling serving static files and 404
app.use(express.static('public'))
app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});

module.exports = app;