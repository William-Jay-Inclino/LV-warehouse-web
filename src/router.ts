import { createRouter, createWebHistory } from 'vue-router'
import { routeNames } from './common/constants'

const routes = [

    {
        path: '/',
        name: routeNames.login,
        component: () => import('./__temp__/Login.vue'),
    },

    {
        path: '/home',
        name: routeNames.home,
        component: () => import('./__temp__/Home.vue'),
    },

    {
        path: '/dashboard',
        name: routeNames.dashboard,
        component: () => import('./dashboard/Dashboard.vue'),
    },

    {
        path: '/purchasing/canvass',
        name: routeNames.purchasing_canvass,
        component: () => import('./purchasing/Canvass.vue'),
    },

    {
        path: '/purchasing/canvass/form',
        name: routeNames.purchasing_canvass_form,
        component: () => import('./purchasing/CanvassForm.vue'),
    },

    {
        path: '/purchasing/rv',
        name: routeNames.purchasing_rv,
        component: () => import('./purchasing/RV.vue'),
    },

    {
        path: '/purchasing/rv/form',
        name: routeNames.purchasing_rv_form,
        component: () => import('./purchasing/RVForm.vue'),
    },

    {
        path: '/purchasing/meqs',
        name: routeNames.purchasing_meqs,
        component: () => import('./purchasing/MEQS.vue'),
    },

    {
        path: '/purchasing/meqs/form',
        name: routeNames.purchasing_meqs_form,
        component: () => import('./purchasing/MEQSFORM.vue'),
    },

    {
        path: '/data-management/brand',
        name: routeNames.data_management_brand,
        component: () => import('./data-management/brand/Brand.vue'),
    },

    {
        path: '/data-management/brand/form',
        name: routeNames.data_management_brand_form,
        component: () => import('./data-management/brand/BrandForm.vue'),
    },

]


const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes
})

export default router