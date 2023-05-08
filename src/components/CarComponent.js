import React, { useState, useEffect } from 'react';

export default function RecipeBookComponent() {
  const [newRecipeName, setNewRecipeName] = useState('');
  const [newRecipeIngredients, setNewRecipeIngredients] = useState('');
  const [newRecipeInstructions, setNewRecipeInstructions] = useState('');
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/recipes')
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  }, []);

  return (
    <>
      <h1>Recipe Book</h1>
      <section className="recipe-input">
        <div>
          <div className="add-recipe">
            Add a recipe:
            <input
              value={newRecipeName}
              onChange={(event) => setNewRecipeName(event.target.value)}
              placeholder="Recipe name..."
              type="text"
            />
            <input
              value={newRecipeIngredients}
              onChange={(event) => setNewRecipeIngredients(event.target.value)}
              placeholder="Ingredients (comma-separated)..."
              type="text"
            />
            <input
              value={newRecipeInstructions}
              onChange={(event) => setNewRecipeInstructions(event.target.value)}
              placeholder="Instructions..."
              type="text"
            />
            <button
              onClick={() => {
                const newRecipe = {
                  name: newRecipeName,
                  ingredients: newRecipeIngredients.split(',').map((ingredient) => ingredient.trim()),
                  instructions: newRecipeInstructions,
                };

                fetch('/recipes', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(newRecipe),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    setRecipes([...recipes, data]);
                    setNewRecipeName('');
                    setNewRecipeIngredients('');
                    setNewRecipeInstructions('');
                  });
              }}
            >
              Add Recipe
            </button>
          </div>
        </div>
      </section>
      <section className="recipe-list">
        {recipes.map((recipe) => (
          <div key={recipe.id} id={recipe.id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {recipe.name}
            </h4>
            <div className="card-body bg-light p-2">
              <p>Ingredients: {recipe.ingredients.join(', ')}</p>
              <p>Instructions: {recipe.instructions}</p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}