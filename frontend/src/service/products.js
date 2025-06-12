import {api} from "@/service/api";

export const getProducts = async () => {
    try {
        return await api.get('/products');
    } catch (error) {
        console.error('API error:', error);
        return null;
    }
}

export const getProductId= async (id) => {
    try {
        return await api.get(`/products/${id}`);
    } catch (error) {
        console.error('API error:', error);
        return null;
    }
}

export const getSearchProducts= async (search) => {
    try {
        return await api.get(`/products/search?q=${encodeURIComponent(search)}`);
    } catch (error) {
        console.error('API error:', error);
        return null;
    }
}
///products/filter?category=electronics&price=100
export const getProductsFilter=async (param) => {
    try {

        return await api.get(`/products/filter?${param}`);
    } catch (error) {
        console.error('API error:', error);
        return null;
    }
}