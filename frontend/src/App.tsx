import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { recipeStore } from './stores/RecipeStore';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import { Recipe } from './api/recipeApi';

const App: React.FC = observer(() => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 text-center">Список рецептов</h1>

            {/* Поиск и фильтрация */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Поиск по названию"
                    value={recipeStore.searchQuery}
                    onChange={(e) => recipeStore.setSearchQuery(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <select
                    value={recipeStore.selectedCategory}
                    onChange={(e) => recipeStore.setSelectedCategory(e.target.value)}
                    className="w-full p-2 border rounded"
                >
                    <option value="">Все категории</option>
                    {recipeStore.categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            {/* Кнопка "Добавить рецепт" */}
            <button
                onClick={() => {
                    setSelectedRecipe(null);
                    setIsFormVisible(true);
                }}
                className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-green-600 transition-colors"
            >
                Добавить рецепт
            </button>

            {/* Модальное окно для добавления/редактирования рецепта */}
            {isFormVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <RecipeForm
                            recipe={selectedRecipe || undefined}
                            onCancel={() => {
                                setIsFormVisible(false);
                                setSelectedRecipe(null);
                            }}
                            onSave={(recipe : Recipe) => {
                                recipeStore.addRecipe(recipe);
                                setIsFormVisible(false);
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Список рецептов */}
            <RecipeList
                onRecipeClick={(recipe) => setSelectedRecipe(recipe)}
            />

            {/* Модальное окно для подробной информации о рецепте */}
            {selectedRecipe && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">{selectedRecipe.title}</h2>
                        <img
                            src={selectedRecipe.imageUrl}
                            alt={selectedRecipe.title}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <p className="text-gray-600 mb-2">Категория: {selectedRecipe.category}</p>
                        <p className="mb-4">{selectedRecipe.ingredients}</p>
                        <p>{selectedRecipe.instructions}</p>
                        <button
                            onClick={() => setSelectedRecipe(null)}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
});

export default App;