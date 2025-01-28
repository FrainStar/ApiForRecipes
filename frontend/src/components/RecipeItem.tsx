import React from 'react';
import { Recipe } from '../api/recipeApi';

interface RecipeItemProps {
    recipe: Recipe;
    onDelete: (id: number) => void;
    onClick: () => void;
}

const RecipeItem: React.FC<RecipeItemProps> = ({ recipe, onDelete, onClick }) => {
    return (
        <div
            className="border p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
            onClick={onClick}
        >
            <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-48 object-cover rounded-t-lg"
            />
            <h2 className="text-xl font-bold mt-2">{recipe.title}</h2>
            <p className="text-gray-600">{recipe.category}</p>
            <p className="mt-2">{recipe.ingredients}</p>
            <button
                onClick={(e) => {
                    e.stopPropagation(); // Предотвращаем всплытие события
                    onDelete(recipe.id);
                }}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
                Удалить рецепт
            </button>
        </div>
    );
};

export default RecipeItem;