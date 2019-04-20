const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser');
const ews = require('express-ws')(app);
const WebSocket = require('ws');
const UserRepo = require('./userrepo');
const DishRepo = require('./dishrepo');
const MenuRepo = require('./menurepo');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');
const session = require("express-session");


let messageCounter = 0;
const chatMessages = []

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: '19283745691827364',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


//this section handles requests involving dishes
app.get("/dishes", (req, res) => {
    const dishes = DishRepo.getDishes()
    res.send(dishes)
})

app.get("/dish/:id", (req, res) => {
    const id = req.params["id"]
    const dish = DishRepo.getDish(id)
    res.json(dish)
})

app.delete("/dish/:id", (req, res) => {
    const id = req.params["id"]
    console.log("Id in app.js: " + id)
    res.json(DishRepo.deleteDish(id))
})

app.post("/dish", (req, res) => {
    const body = req.body
    res.json("/dish/" + DishRepo.addDish(body.name, body.type))
})

app.put("/dish/:id", (req, res) => {
    const id = req.params["id"]
    const body = req.body
    console.log(body)
    const dish = {
        id: body.id,
        name: body.name,
        type: body.type
    }
    res.json(DishRepo.updateDish(id, dish))
})

//this section handles requests involving menus
app.get("/menus", (req, res) => {
    const menus = MenuRepo.getMenus()
    res.send(menus)
})

app.get("/menu/:id", (req, res) => {
    const id = req.params["id"]
    const menu = MenuRepo.getMenu(id)
    res.json(menu)
})

app.delete("/menu/:id", (req, res) => {
    const id = req.params["id"]
    res.json(MenuRepo.deleteMenu(id))
})

app.post("/menu", (req, res) => {
    const body = req.body
    res.json("/menu/" + MenuRepo.addMenu(body.day))
})

app.put("/menu/:id", (req, res) => {
    const id = req.params["id"]
    const body = req.body
    const menu = {
        id: body.id,
        day: body.day
    }
    res.json(MenuRepo.updateMenu(id, menu))
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

passport.use(new LocalStrategy(
    {
        usernameField: 'userId',
        passwordField: 'password'
    },
    function (userId, password, done) {

        const ok = UserRepo.verifyUser(userId, password);

        if (!ok) {
            return done(null, false, {message: 'Invalid username/password'});
        }

        const user = UserRepo.getUser(userId);
        return done(null, user);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {

    const user = UserRepo.getUser(id);

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
        return;
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

app.use(express.static('public'))
app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});


module.exports = app;