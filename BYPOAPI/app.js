const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose()
const http = require("http");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;
const multer = require("multer");
var request = require("request").defaults({ encoding: null });
const fileUpload = require('express-fileupload');
const db = new sqlite3.Database('./ProductClients.db')



// Where we will keep books
let books = [];

app.use(cors());
app.use(fileUpload());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    console.log('yeah !')
    res.render('index')

});

app.post('/addProduct',(req,res)=> {
    console.log('yeahouh !')
    console.log(req.body)
    let product_name = req.body.product_name;
    let image_link = req.body.image_link;
    db.run('INSERT INTO Products (product_name,image_link) VALUES (?,?);', [product_name,image_link])
    console.log('so far so good')
})

app.get('/productList',(req,res)=> {
    let sqlreq = 'SELECT * FROM Products';
    db.all(sqlreq,(err,data)=> {
        if (err) throw err
       
        res.json({
            "message":"success",
            "data":data
        })
    })
})

app.get('/aftersale/:id',(req,res)=> {
    let sqlreq = 'SELECT * FROM AfterSale WHERE product_id = ?';

    db.all(sqlreq,[req.params.id],(err,data)=> {
        if (err) throw err

        res.json({
            "message":"success",
            "data":data
        })
    })
})

app.get('/seller', (req,res)=> {
    res.render('index.ejs')
})

app.post('/SAVVendeur',(req,res)=> {

    picture = req.body.image1;

    console.log(picture);
    let description = req.body.description;
    let product_id = req.body.product_id;
    // Move the uploaded image to our upload folder

    fs.writeFile("./image.png", picture, function(err) {
        if (err) throw err;
    });

    let sqlreqvendor = 'INSERT INTO AfterSale (product_id,description,image_link) VALUES (?,?,?)'
    db.run(sqlreqvendor,[product_id,description,""])
    res.redirect('/seller')
})

app.post('/SAVVendeursave',(req,res)=> {
    const { picture } = req.files;

    console.log(req.body);
    // If no image submitted, exit
    if (!picture) return res.sendStatus(400);
    let description = req.body.description;
    let product_id = req.body.product_id;
    // Move the uploaded image to our upload folder
    picture.mv(__dirname + '/image/' + picture.name);

    let sqlreqvendor = 'INSERT INTO AfterSale (product_id,description,image_link) VALUES (?,?,?)'
    db.run(sqlreqvendor,[product_id,description,picture.name])
    res.redirect('/seller')
})

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))

