const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose()


const db = new sqlite3.Database('./ProductClients.db')

db.serialize(() => {
  db.run("CREATE TABLE Users (user_id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER NOT NULL, date datetime default current_timestamp );")

  //db.run('ALTER TABLE AfterSale ADD image_link VARCHAR(255)')
  //db.run('INSERT INTO Products (product_name,image_link) VALUES (?,?);', ['shoes number 1','bag'])
})


db.close()