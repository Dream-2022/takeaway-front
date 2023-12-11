import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login/login.vue'
import Layout from '../views/layOut.vue'
import MainPage from '../views/Main/mainPage.vue'
import MainView from '../views/Main/mainView.vue'
import PersonPage from '../views/Main/personPage.vue'
import SearchPage from '../views/Search/searchPage.vue'
import ShopDetailPage from '../views/Shop/shopDetailPage.vue'
import ShopDishPage from '../views/Shop/shopDishPage.vue'

import ShopDishBox from '../views/Shop/Components/shopDishBox.vue'
import ShopRemarkBox from '../views/Shop/Components/shopRemarkBox.vue'
import ShopInformationBox from '../views/Shop/Components/shopInformationBox.vue'

import ProductDetailPage from '../views/Shop/productDetailPage.vue' 
import ShopSearchPage from '../views/Shop/shopSearchPage.vue' 

import ManagePage from '../views/Manage/managePage.vue'
import OrderHandlePage from '../views/Manage/Pages/orderHandlePage.vue'
import DealPage from '../views/Manage/Pages/dealPage.vue'
import SetMealPage from '../views/Manage/Pages/setMealPage.vue'
import CategoryManagePage from '../views/Manage/Pages/categoryManagePage.vue'

import BusinessPage from '../views/Business/businessPage.vue'

import OrderPage from '../views/Order/orderPage.vue'

const routes = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component:Layout
    },
    {
      path:'/login',
      name:'login',
      component: Login
    },
    {
      path:'/mainPage',
      name:'mainPage',
      component: MainPage,
      redirect: "/mainPage/mainView",
      children:[
        {path:'mainView',component:MainView},
        {path:'personPage',component:PersonPage},
        {
          path:'searchPage/:shopName',
          name:'searchPage',
          component:SearchPage
        },
        {  
          path: '/shopDetailPage/:id',  
          name: 'shopDetailPage',  
          component: ShopDetailPage,  
          redirect: "/shopDetailPage/:id/shopDishPage",
          children: [  
            { path: 'productDetailPage/:dishId', component: ProductDetailPage },
            { path: 'shopSearchPage/:searchValue', component: ShopSearchPage },
            { 
              path: 'shopDishPage', 
              component: ShopDishPage ,
              name:'shopDishPage',
              redirect: "/shopDetailPage/:id/shopDishPage/ShopDishBox",
              children:[
                {path:'shopDishBox',component:ShopDishBox},
                {path:'shopRemarkBox',component:ShopRemarkBox},
                {path:'shopInformationBox',component:ShopInformationBox}
              ]
            }
            
          ]  
        },
      ]
    },
    
    {
      path:'/managePage',
      name:'managePage',
      component: ManagePage,
      redirect: "/managePage/orderHandlePage",
      children:[
        {path:'orderHandlePage',component:OrderHandlePage},
        {path:'dealPage',component:DealPage},
        {path:'setMealPage',component:SetMealPage},
        {path:'categoryManagePage',component:CategoryManagePage}
      ]
    },
    {
      path:'/orderPage',
      name:'orderPage',
      component: OrderPage
    },
    {
      path:'/businessPage',
      name:'businessPage',
      component: BusinessPage
    }

  ]
})


export default routes
