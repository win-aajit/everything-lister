const fs = require('fs');
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path');

const USERS_FILE = 'users.json'

const users = JSON.parse(fs.readFileSync(USERS_FILE));
console.log(USERS_FILE);
console.log(users);

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}))

app.use((req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user;
    }
    next();
});


app.post('/list', (req,res) => {
    if(req.session.user){
        const user = users.find(user => user.name === req.session.user.name);
        if(req.body.movietv) user.movietv.push(req.body.movietv);
        if(req.body.books) user.books.push(req.body.books);
        if(req.body.anime) user.anime.push(req.body.anime);
        if(req.body.manga) user.manga.push(req.body.manga);
        fs.writeFileSync(USERS_FILE, JSON.stringify(users));

        res.json({alertMessage: 'Added title'});
    }
    else {
        res.json({alertMessage: 'You need to be logged in'});
    }

});

app.post('/removelist', (req,res) => {
    const user = users.find(user => user.name === req.session.user.name);
    if(req.body.movietv) 
        {for(let i = 0; i < user.movietv.length; i++){
            if(user.movietv[i] === req.body.movietv){
                user.movietv.splice(i,1);
                res.send('Removed');
            }
        }}
    if(req.body.books)         
        {for(let i = 0; i < user.books.length; i++){
            if(user.books[i] === req.body.books){
                user.books.splice(i,1);
                res.send('Removed');
            }
        }}
    if(req.body.anime) 
        {for(let i = 0; i < user.anime.length; i++){
            if(user.anime[i] === req.body.anime){
                user.anime.splice(i,1);
                res.send('Removed');
            }
        }}
    if(req.body.manga)
        {for(let i = 0; i < user.manga.length; i++){
            if(user.manga[i] === req.body.manga){
                user.manga.splice(i,1);
                res.send('Removed');
            }
        }}
})



//Route to get users
app.get('/users', (req,res) => {
    res.json(users);
});
//Route to register users
app.post('/register', async (req, res) => {
    const user = users.find(user => user.name === req.body.name)
    console.log(user);
    if( user != null){
        res.send({registered: false});
    }
    else {
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.password, salt); // rounds of salt
            console.log(salt);
            console.log(hashedPassword);
            const user = {name: req.body.name, password: hashedPassword, movietv: [],
                books: [], anime: [], manga: []};
            users.push(user);
            console.log(users);
            fs.writeFileSync(USERS_FILE, JSON.stringify(users));
            
            res.send({registered: true});
        } catch {
            console.log('error');
            res.send({registered: false});
        }
    }
});


//Route to handle login
app.post('/login', async (req,res) => {
    const user = users.find(user => user.name === req.body.name);
    if(user == null){
        return res.status(400).send('Cannot find user');
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)){
            console.log(req.body.password);
            console.log(user.password);
            //res.send('Success');
            req.session.user = user;
            const data = {loggedIn: true, user: req.body.name};
            res.json(data);
            console.log('Success');
        }
        else{
            //res.send('Failure');
            res.json({loggedIn: false});
            console.log('Failure');
        }
    } catch {
        res.status(500).send();
    }
});

//Routing the different pages
//Route serving index.file

app.get('/', (req, res) => {res.sendFile(path.join(__dirname, 'public', 'search.html'));});

app.get('/login', (req, res) => {res.sendFile(path.join(__dirname, 'public', 'login.html'));});

app.get('/list', (req, res) => {
    if (req.session.user) {
        const user = users.find(user => user.name === req.session.user.name);
        console.log(user);
        const listdata = [user.movietv, user.books, user.anime, user.manga];
        console.log(listdata);
        res.sendFile(path.join(__dirname, 'public', 'list.html'));
        //res.send(listdata);

    } else {
        res.redirect('/login');
    }
});

app.get('/register', (req, res) => {res.sendFile(path.join(__dirname, 'public', 'register.html'));});

app.get('/listdata', (req, res) => {
    if (req.session.user) {
        const user = users.find(user => user.name === req.session.user.name);
        console.log(user);
        const listdata = [user.movietv, user.books, user.anime, user.manga];
        console.log(listdata);
        res.send(listdata);

    } else {
        res.redirect('/login');
    }
});




app.listen(3002, () => console.log(`App available on http://localhost:3002`));

