import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_RECIPE } from '../utils/actions';

export default function RecipeBookComponent() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [newRecipeName, setNewRecipeName] = useState('');
  const [newRecipeIngredients, setNewRecipeIngredients] = useState('');
  const [newRecipeInstructions, setNewRecipeInstructions] = useState('');

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
            <textarea
              value={newRecipeIngredients}
              onChange={(event) => setNewRecipeIngredients(event.target.value)}
              placeholder="Ingredients (separated by commas)..."
            />
            <textarea
              value={newRecipeInstructions}
              onChange={(event) => setNewRecipeInstructions(event.target.value)}
              placeholder="Instructions..."
            />
            <button
  onClick={() => {
    dispatch({
      type: ADD_RECIPE,
      payload: {
        name: newRecipeName,
        ingredients: newRecipeIngredients.split(',').map(ingredient => ingredient.trim()),
        instructions: newRecipeInstructions,
      },
    });
    setNewRecipeName('');
    setNewRecipeIngredients('');
    setNewRecipeInstructions('');
  }}
>
  Add Recipe
</button>
          </div>
        </div>
      </section>
      <section className="recipe-list">
        {console.log(state)}
        {state.recipes.map((recipe) => (
          <div key={recipe.id} id={recipe.id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {recipe.name}
            </h4>
            <div className="card-body bg-light p-2">
              <p>Ingredients: {recipe.ingredients.join(', ')}</p>
              <p>Instructions: {recipe.instructions}</p>
              <code>
                Recipe ID:
                {recipe.id}
              </code>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}