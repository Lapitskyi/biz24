
import {getProductId, getProducts, getSearchProducts} from "@/service/products";

export default {
    namespaced: true,
    state: {
        categories:[],
        products: [],
        productId: undefined,
        total:0,
        limit:30
    },
    mutations: {
        setProducts(state, products) {
            state.categories = [...new Set(products
                .map(item => item.category))]
            state.products = products;
        },
        setProductId(state, card) {
            state.productId = card;
        }
    },
    actions: {
        async fetchProducts({ commit }) {
            const response = await getProducts()
            commit('setProducts', response.products);
        },
        async fetchProductById({ commit }, id) {
            const response = await getProductId(id)
            commit('setProductId', response);
        },
        async fetchSearchProducts({commit}, search ) {
            const response = await getSearchProducts(search)
            commit('setProducts', response.products);
        },
        async fetchFilterProducts({ commit }) {}
    },
    getters: {
        allProducts(state) {
            return state.products;
        },
        allCategory(state) {
            return state.categories;
        },
        getProductId(state) {
            return state.productId
        }
    },

};
