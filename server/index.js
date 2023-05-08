const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let recipes = [
  // You can add some sample recipes here, or leave it as an empty array
];

app.get('/recipes', (req, res) => {
  res.json(recipes);
});

app.post('/recipes', (req, res) => {
  const newRecipe = req.body;
  newRecipe.id = Date.now();
  recipes.push(newRecipe);
  res.json(newRecipe);
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
