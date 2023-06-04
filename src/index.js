const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

//  Importing routes
const comicRoutes = require("./routes/comics")



// MYSQL
const mysql = require('mysql2');
const myConnection = require('express-myconnection');


//  Settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set(express.static(path.join(__dirname, 'public')));
app.set('json spaces', 2);


//  Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'Cristian_solis18',
    port: 3306,
    database: 'comic_box',

}, 'single'));



//  Routes
app.use('/', comicRoutes);




//  Statics files
app.use(express.static(path.join(__dirname, 'public')));







//  Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})










