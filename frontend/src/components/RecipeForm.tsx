import React, { useState } from 'react';
import { Recipe } from '../api/recipeApi';

interface RecipeFormProps {
    recipe: Recipe | undefined;
    onCancel: () => void;
    onSave: (recipe: Recipe) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ recipe, onCancel, onSave }) => {
    const [title, setTitle] = useState(recipe?.title || '');
    const [ingredients, setIngredients] = useState(recipe?.ingredients || '');
    const [instructions, setInstructions] = useState(recipe?.instructions || '');
    const [imageUrl, setImageUrl] = useState(recipe?.imageUrl || '');
    const [category, setCategory] = useState(recipe?.category || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newRecipe = {
            id: 0,
            title,
            ingredients,
            instructions,
            imageUrl,
            category,
        };
        onSave(newRecipe);
        console.log(newRecipe);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="Название"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded"
                required
            />
            <input
                type="text"
                placeholder="Ингредиенты"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="w-full p-2 border rounded"
                required
            />
            <textarea
                placeholder="Инструкции"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full p-2 border rounded"
                required
            />
            <input
                type="text"
                placeholder="URL изображения"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full p-2 border rounded"
                required
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded"
                required
            >
                <option value="">Выберите категорию</option>
                <option value="Завтраки">Завтраки</option>
                <option value="Обеды">Обеды</option>
                <option value="Десерты">Десерты</option>
            </select>
            <div className="flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                    Отмена
                </button>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    {recipe ? 'Обновить' : 'Добавить'}
                </button>
            </div>
        </form>
    );
};

export default RecipeForm;