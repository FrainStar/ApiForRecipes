import { makeAutoObservable } from 'mobx';
import {
    fetchRecipes,
    addRecipe as apiAddRecipe,
    updateRecipe as apiUpdateRecipe,
    deleteRecipe as apiDeleteRecipe,
    Recipe,
} from '../api/recipeApi';

class RecipeStore {
    recipes: Recipe[] = [];
    filteredRecipes: Recipe[] = [];
    categories: string[] = ['Завтраки', 'Обеды', 'Десерты'];
    selectedCategory: string = '';
    searchQuery: string = '';

    constructor() {
        makeAutoObservable(this);
        this.loadRecipes();
    }

    async loadRecipes() {
        this.recipes = await fetchRecipes();
        this.filterRecipes();
    }

    async addRecipe(recipe: Omit<Recipe, 'id'>) {
        const newRecipe = await apiAddRecipe(recipe);
        this.recipes.push(newRecipe);
        this.filterRecipes();
    }

    async updateRecipe(recipe: Recipe) {
        await apiUpdateRecipe(recipe.id, recipe);
        const index = this.recipes.findIndex((r) => r.id === recipe.id);
        if (index !== -1) {
            this.recipes[index] = recipe;
        }
        this.filterRecipes();
    }

    async deleteRecipe(id: number) {
        await apiDeleteRecipe(id);
        this.recipes = this.recipes.filter((r) => r.id !== id);
        this.filterRecipes();
    }

    filterRecipes() {
        this.filteredRecipes = this.recipes.filter((recipe) => {
            const matchesCategory = this.selectedCategory
                ? recipe.category === this.selectedCategory
                : true;
            const matchesSearch = this.searchQuery
                ? recipe.title.toLowerCase().includes(this.searchQuery.toLowerCase())
                : true;
            return matchesCategory && matchesSearch;
        });
    }

    setSelectedCategory(category: string) {
        this.selectedCategory = category;
        this.filterRecipes();
    }

    setSearchQuery(query: string) {
        this.searchQuery = query;
        this.filterRecipes();
    }
}

export const recipeStore = new RecipeStore();