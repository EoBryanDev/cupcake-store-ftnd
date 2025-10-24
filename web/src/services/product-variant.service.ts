import { IPaginationDefault } from "../interface/IPaginationDefault";
import { IProductPreviewPagination } from "../interface/IPaginationPreview";
import { IProductResponse, IProductVariantBySlugCategoryResponse, IProductVariantBySlugResponse } from "../interface/IProductVariant";

const API_INTERNAL_URL = process.env.NEXT_PUBLIC_API_URL;


const getProductVariantPreview = async (paginationPreview: IProductPreviewPagination): Promise<IProductResponse> => {
    const { searchType, orderBy, order } = paginationPreview
    const response = await fetch(`${API_INTERNAL_URL}/products/variants?searchType=${searchType}&offset=1&limit=5&order=${order}&orderBy=${orderBy}&currentPage=1`, {
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

const getProductVariant = async (params: IPaginationDefault): Promise<IProductResponse> => {
    const query = new URLSearchParams();

    if (params.offset) query.set("offset", String(params.offset));
    if (params.limit) query.set("limit", String(params.limit));
    if (params.order) query.set("order", params.order);
    if (params.orderBy) query.set("orderBy", params.orderBy);
    if (params.currentPage) query.set("currentPage", String(params.currentPage));
    if (params.searchType) query.set("searchType", params.searchType);

    const response = await fetch(`${API_INTERNAL_URL}/products/variants?${query.toString()}`, {
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

export { getProductVariantPreview, getProductVariant, getProductVariantBySlug, getProductVariantBySlugCategory }