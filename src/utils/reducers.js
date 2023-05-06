import { ADD_RECIPE } from './actions';

const initialState = {
  recipes: [],
};


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_RECIPE: {
      const newRecipeId = Date.now();
      const newRecipe = { ...action.payload, id: newRecipeId };

      return {
        ...state,
        recipes: [...state.recipes, newRecipe],
      };
    }
    default: {
      return state;
    }
  }
}