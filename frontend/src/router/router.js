import Vue from 'vue';
import Router from 'vue-router';

import LoginPage from '@/views/LoginPage.vue';
import ProfilePage from "@/views/ProfilePage.vue";
import ProductPage from "@/views/ProductPage.vue";

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'products',
            component: () => import('@/views/HomePage'),
            meta: { layout: 'public' }
        },
        {
            path: '/product/:id',
            name: 'productDetail',
            component: ProductPage,
            meta: { layout: 'public' }
        },
        {
            path: '/login',
            name: 'login',
            component: LoginPage,
            meta: { layout: 'empty' }
        },
        {
            path: '/admin',
            name: 'admin',
            component: LoginPage,
            meta: { layout: 'empty' }
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfilePage,
            meta: { layout: 'private', requiresAuth: true }
        }
    ]
});

export default router;