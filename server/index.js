const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose=require('mongoose');
const Recipe = require('./models/Recipe');


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/recipebook', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {console.log("Connected to MongoDB")
})
.catch((err) => {
    console.error("Could not connect to MongoDB", err);
});

let recipes = [
  // You can add some sample recipes here, or leave it as an empty array
];

app.get('/recipes', (req, res) => {
  res.json(recipes);
});

app.post('/recipes', async (req, res) => {
    const recipe = new Recipe({
      name: req.body.name,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
    });
  
    try {
      const result = await recipe.save();
      res.send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  });

const port = 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
