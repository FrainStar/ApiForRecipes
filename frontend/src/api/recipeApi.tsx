import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export interface Recipe {
    id: number;
    title: string;
    ingredients: string;
    instructions: string;
    imageUrl: string;
    category: string;
}

export const fetchRecipes = async (): Promise<Recipe[]> => {
    const response = await axios.get<Recipe[]>(`${API_BASE_URL}/Recipes`);
    return response.data;
};

export const addRecipe = async (recipe: Omit<Recipe, 'id'>): Promise<Recipe> => {
    const response = await axios.post<Recipe>(`${API_BASE_URL}/Recipes`, recipe);
    return response.data;
};

export const fetchRecipeById = async (id: number): Promise<Recipe> => {
    const response = await axios.get<Recipe>(`${API_BASE_URL}/Recipes/${id}`);
    return response.data;
};

export const updateRecipe = async (id: number, recipe: Recipe): Promise<void> => {
    await axios.put(`${API_BASE_URL}/Recipes/${id}`, recipe);
};

export const deleteRecipe = async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/Recipes/${id}`);
};