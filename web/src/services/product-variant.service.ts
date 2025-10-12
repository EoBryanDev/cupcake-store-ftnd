import { IProductResponse } from "../interface/IProductVariant";

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
        throw new Error(error.message || 'Something was wrong with the request');
    }

    const data: IProductResponse = await response.json();

    // Validação básica (opcional mas recomendado)
    if (!data || !data.data) {
        throw new Error('Invalid response format');
    }

    return data;
}

export { getProductVariant }