const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT||5000;
const uri = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

/* 
body { name : '' , password: ''}
*/

app.post('/adduser',async (req,res)=>{
  try{
    const {name,password}=req.body;
    await client.connect();
    const db=client.db('UserList');
    const collection=db.collection('users');
    
    const existResponse = await collection.findOne({name:name});
    if(existResponse){
      res.status(200).json({error:"Username Exists"});
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const response= await collection.insertOne({name:name, password:hashedPassword});
    if(response)
        res.status(200).json({message:"User Added"});
    else
        res.status(500).json({error:"User Not Added, Server Error!!!"});
  }
  finally{
    await client.close();
  }
});

app.post('/login',async (req,res)=>{
  try{
    const {name,password} = req.body;
    await client.connect();
    const db=client.db('UserList');
    const collection=db.collection('users');
    const response= await collection.findOne({name:name});
    if(response){
      const isMatch = await bcrypt.compare(password, response.password);
      if(isMatch){
        res.status(200).json({message:"User Found"});
      }
      else{
        res.status(404).json({error:"User Not Found"});
      }
    }
    else{
      res.status(404).json({error:"User Not Found"});
    }
  }
  finally{
      await client.close();
  }
})

app.listen(port,()=>{
    console.log(`Server started on ${port} ...`)
});