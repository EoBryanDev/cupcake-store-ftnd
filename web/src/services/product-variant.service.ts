import { IProductResponse, IProductVariantBySlugCategoryResponse, IProductVariantBySlugResponse } from "../interface/IProductVariant";

const API_INTERNAL_URL = process.env.NEXT_PUBLIC_API_URL;

const getProductVariant = async (view: string | null): Promise<IProductResponse> => {
    const response = await fetch(`${API_INTERNAL_URL}/products/variants?view=${view}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.json();
        // throw new Error(error.message || 'Something was wrong with the request');
        return error
    }

    const data: IProductResponse = await response.json();

    // Validação básica (opcional mas recomendado)
    if (!data || !data.data) {
        throw new Error('Invalid response format');
    }

    return data;
}

const getProductVariantBySlug = async (slug: string): Promise<IProductVariantBySlugResponse> => {

    const response = await fetch(`${API_INTERNAL_URL}/products/${slug}/variants`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.json();
        // throw new Error(error.message || 'Something was wrong with the request');
        return error
    }

    const data: IProductVariantBySlugResponse = await response.json();

    // Validação básica (opcional mas recomendado)
    if (!data || !data.data) {
        throw new Error('Invalid response format');
    }

    return data;
}

const getProductVariantBySlugCategory = async (slug: string): Promise<IProductVariantBySlugCategoryResponse> => {

    const response = await fetch(`${API_INTERNAL_URL}/products/${slug}/variants/categories`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.json();
        // throw new Error(error.message || 'Something was wrong with the request');
        return error
    }

    const data: IProductVariantBySlugCategoryResponse = await response.json();

    // Validação básica (opcional mas recomendado)
    if (!data || !data.data) {
        throw new Error('Invalid response format');
    }

    return data;
}

export { getProductVariant, getProductVariantBySlug, getProductVariantBySlugCategory }