const express = require('express');
const cors=require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port= process.env.PORT || 5000;

// !middleware
app.use(cors())
app.use(express.json());



const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u5hejig.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // !all collections
    const createTaskCollection = client.db('taskDb').collection('createTask')
    //?Create new task related Api//
    // post data
    app.post('/tasks',async(req, res) => {
      const createNewTask = req.body;
      console.log(createNewTask);
      const result = await createTaskCollection.insertOne(createNewTask);
      res.send(result);
    })
    // Send a ping to confirm a successful connection
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error

  }
}
run().catch(console.dir);

















// !run the basic server
app.get('/',(req, res) =>{
    res.send('task management server is running')
})
app.listen(port,() =>{
    console.log(`task management server is running on port ${port}`);
});