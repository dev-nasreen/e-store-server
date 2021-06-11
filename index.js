//to run : node index.js
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
//const { connect, ObjectID } = require('mongodb')
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ihq8y.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
//console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

client.connect(err => {
    const productCollection = client.db("E-store").collection("products");
   
  app.post('/addProduct', (req, res) => {
      console.log(req.body);
      const allProduct = req.body;
      productCollection.insertMany(allProduct)
      .then(result =>{
        res.send(result.insertedCount)
      })
     
  })

  app.get('/products', (req, res) =>{
    const category = req.query.product;
    productCollection.find({category:category})
    .toArray((err, results) => {
        res.send(results)
    })
  })

  app.get('/allProducts', (req, res) =>{
    productCollection.find()
    .toArray((err, products) =>{
      res.send(products)
    })
  })
  app.get('/clothDetails/:id', (req, res) =>{
    console.log(req.params.id);
    productCollection.find({_id: ObjectId(req.params.id)})
    .toArray((err, result) =>{
      res.send(result)
      
    })
  })
   
  

  });





app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port)

