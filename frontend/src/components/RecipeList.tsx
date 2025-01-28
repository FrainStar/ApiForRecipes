import React from 'react';
import { observer } from 'mobx-react-lite';
import { recipeStore } from '../stores/RecipeStore';
import RecipeItem from './RecipeItem';
import { Recipe } from '../api/recipeApi';

interface RecipeListProps {
    onRecipeClick: (recipe: Recipe) => void;
}

const RecipeList: React.FC<RecipeListProps> = observer(({ onRecipeClick }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipeStore.filteredRecipes.map((recipe) => (
                <RecipeItem
                    key={recipe.id}
                    recipe={recipe}
                    onDelete={(id) => recipeStore.deleteRecipe(id)}
                    onClick={() => onRecipeClick(recipe)}
                />
            ))}
        </div>
    );
});

export default RecipeList;