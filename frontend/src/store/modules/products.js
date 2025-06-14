import {getProductId, getProducts, getProductsFilter, getSearchProducts} from "@/service/products";
import {objectToQueryString} from "@/utils/helpers/objectToQueryString";

const defaultFilters = {
    category: [],
    brand: [],
    price: {
        min: 0,
        max: 10000,
    },
}

export default {
    namespaced: true,
    state: {
        loading: false,
        error: '',
        categories: [],
        brand: [],
        products: [],
        productId: undefined,
        total: 0,
        limit: 30,
        filterProduct: {
            category: [],
            brand: [],
            price: {
                min: 0,
                max: 10000,
            },
        },
    },
    mutations: {
        setProducts(state, products) {
            state.products = products;
        },
        setProductId(state, card) {
            state.productId = card;
        },
        setLoading(state, isLoading) {
            state.loading = isLoading;
        },
        setFiltersProducts(state, filters) {
            state.filterProduct = {...state.filterProduct, ...filters};
        },
        resetFiltersProducts(state) {
            state.filterProduct = { ...defaultFilters };
        },
        setSearchProduct(state, products) {
            state.products = products;
        },
        setParamsFilter(state, products) {
            state.categories = [...new Set(products
                .map(item => item.category))]
            state.brand = [...new Set(products
                .map(item => item.brand))]
        }
    },
    actions: {
        async fetchProducts({commit}) {
            commit('setLoading', true);
            try {
                const response = await getProducts()
                commit('setProducts', response.products);
                commit('setParamsFilter', response.products);
            } finally {
                commit('setLoading', false);
            }
        },
        async fetchProductById({commit}, id) {
            commit('setLoading', true);
            try {
                const response = await getProductId(id)
                commit('setProductId', response);
            } finally {
                commit('setLoading', false);
            }
        },
        async fetchSearchProducts({commit}, search) {
            commit('setLoading', true);
            try {
                const response = await getSearchProducts(search)
                commit('setSearchProduct', response.products);
            } finally {
                commit('setLoading', false);
            }
        },
        async fetchFilterProducts({commit}, val) {
            commit("setFiltersProducts", val)
            const params = objectToQueryString(val)
            commit('setLoading', true);
            try {
                const response = await getProductsFilter(params)
                commit('setSearchProduct', response.products);
            } finally {
                commit('setLoading', false);
            }
        }
    },
    getters: {
        allProducts(state) {
            return state.products;
        },
        allCategory(state) {
            return state.categories;
        },
        allBrand(state) {
            return state.brand;
        },
        getFilterProduct(state) {
          return state.filterProduct;
        },
        getProductId(state) {
            return state.productId
        }
    },

};
