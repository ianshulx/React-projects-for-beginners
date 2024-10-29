// src/components/RecipeFinder.jsx
import React, { useState } from 'react';

const RecipeFinder = () => {
  const [ingredient, setIngredient] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');

  const fetchRecipe = async () => {
    setError('');
    setRecipe(null);

    if (!ingredient.trim()) {
      setError('Please enter an ingredient');
      return;
    }

    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const data = await response.json();
      
      if (data.meals) {
        const randomRecipe = data.meals[Math.floor(Math.random() * data.meals.length)];
        setRecipe(randomRecipe);
      } else {
        setError('No recipes found for that ingredient.');
      }
    } catch (error) {
      setError('Failed to fetch recipe. Try again.');
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Recipe Finder</h1>
      <input
        type="text"
        placeholder="Enter an ingredient (e.g., chicken)"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={fetchRecipe}
        className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Find Recipe
      </button>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {recipe && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">{recipe.strMeal}</h2>
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-64 object-cover rounded mt-2"
          />
          <a
            href={`https://www.themealdb.com/meal.php?c=${recipe.idMeal}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 text-blue-600 hover:underline"
          >
            View Full Recipe
          </a>
        </div>
      )}
    </div>
  );
};

export default RecipeFinder;
