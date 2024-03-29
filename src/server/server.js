const express = require('express');
const db = require('./db')
const cors = require('cors')

const app = express();
const PORT = 3300;
app.use(cors());
app.use(express.json())

// Route to get all posts
app.get("/api/get", (req,res)=>{
db.query("SELECT * FROM item", (err,result)=>{
    if(err) {
    console.log(err)
    } 
    console.log(result);
res.send(result)
});   });

// Route to get one post
app.get("/api/getFromId/:id", (req,res)=>{

const id = req.params.id;
 db.query("SELECT * FROM item WHERE iId = ?", id, 
 (err,result)=>{
    if(err) {
    console.log(err)
    } 
    res.send(result)
    });   });

// Route for creating the post
app.post('/api/create', (req,res)=> {

const email = req.body.email;
const firstname = req.body.firstname;
const lastname = req.body.lastname;
const password = req.body.password;
const isFarmer = req.body.isFarmer;

db.query("INSERT INTO user (Email, FirstName, LastName, Password, isFarmer) VALUES (?,?,?,?,?)",[email,firstname,lastname,password,isFarmer], (err,result)=>{
   if(err) {
   console.log(err)
   } 
   console.log(result)
});   })

// Route to like a post
app.post('/api/like/:id',(req,res)=>{

const id = req.params.id;
db.query("UPDATE posts SET likes = likes + 1 WHERE id = ?",id, (err,result)=>{
    if(err) {
   console.log(err)   } 
   console.log(result)
    });    
});

// Route to delete a post

app.delete('/api/delete/:id',(req,res)=>{
const id = req.params.id;

db.query("DELETE FROM item WHERE iId= ?", id, (err,result)=>{
if(err) {
console.log(err)
        } }) })

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})