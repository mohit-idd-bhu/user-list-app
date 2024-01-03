const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT||5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mohit:mohit@cluster0.lm5qs.mongodb.net/?retryWrites=true&w=majority";

app.use(cors());
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function insert(data) {
  try{
    await client.connect();
    const db=client.db('UserList');
    const collection=db.collection('users');
    const response= await collection.insertOne(data);
    return response;
  }finally {
    await client.close();
  }
}

async function login(data){
    try{
        await client.connect();
        const db=client.db('UserList');
        const collection=db.collection('users');
        const response= await collection.findOne(data);
        return response;
    }finally {
        await client.close();
    }
}

app.post('/adduser',async (req,res)=>{
  const response = await insert(req.body);
  if(response)
      res.status(200).json({message:"User Added"});
  else
      res.status(500).json({error:"User Not Added, Server Error!!!"});
});

app.get('/login',async (req,res)=>{
  const {user,password}=req.query;
  const data={name:user,password:password};
  console.log(data);
  const response=await login(data);
  if(response) 
      res.status(200).json({message:"Found"});
  else 
      res.status(404).json({error:"Invalid"});
})

app.listen(port,()=>{
    console.log(`Server started on ${port} ...`)
});