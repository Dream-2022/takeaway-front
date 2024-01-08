import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login/login.vue'
import Layout from '../views/layOut.vue'

import MainPage from '../views/Main/mainPage.vue'
import MainView from '../views/Main/mainView.vue'
import MyCartPage from '../views/Main/myCartPage.vue'
import MyOrderPage from '../views/Main/myOrderPage.vue'
import MyMessagePage from '../views/Main/myMessagePage.vue'
import PersonPage from '../views/Main/personPage.vue'
import PersonView from '../views/Main/Components/personView.vue'
import ShopCollectView from '../views/Main/Components/shopCollectView.vue'
import DishCollectView from '../views/Main/Components/dishCollectView.vue'
import MyRemarkView from '../views/Main/Components/myRemarkView.vue'

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
import InformationPage from '../views/Manage/Pages/informationPage.vue'
import CategoryManagePage from '../views/Manage/Pages/categoryManagePage.vue'
import RemarkPage from '../views/Manage/Pages/remarkPage.vue'
import MessagePage from '../views/Manage/Pages/messagePage.vue'

import BusinessPage from '../views/Business/businessPage.vue'

import OrderPage from '../views/Order/orderPage.vue'
import PaymentPage from '../views/Order/paymentPage.vue'

import BackendPage from '../views/Backend/backendPage.vue'
import UserManagePage from '../views/Backend/Pages/userManagePage.vue'
import ShopManagePage from '../views/Backend/Pages/shopManagePage.vue'
import DishManagePage from '../views/Backend/Pages/dishManagePage.vue'
import OrderManagePage from '../views/Backend/Pages/orderManagePage.vue'
import ReportManagePage from '../views/Backend/Pages/reportManagePage.vue'

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
        {
          path:'personPage',
          name:'personPage',
          component:PersonPage,
          redirect: "/mainPage/personPage/personView",
          children: [  
            { path: 'personView', component: PersonView },
            { path: 'shopCollectView', component: ShopCollectView },
            { path: 'dishCollectView', component: DishCollectView },
            { path: 'myRemarkView', component: MyRemarkView },
          ]
        },
        {path:'myCartPage',component:MyCartPage},
        {path:'myOrderPage',component:MyOrderPage},
        {path:'myMessagePage',component:MyMessagePage},
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
        {path:'informationPage',component:InformationPage},
        {path:'remarkPage',component:RemarkPage},
        {path:'messagePage',component:MessagePage},
        {path:'categoryManagePage',component:CategoryManagePage}
      ]
    },
    {
      path:'/orderPage',
      name:'orderPage',
      component: OrderPage
    },
    {
      path:'/paymentPage',
      name:'paymentPage',
      component: PaymentPage
    },
    {
      path:'/businessPage',
      name:'businessPage',
      component: BusinessPage
    },
    {
      path:'/backendPage',
      name:'backendPage',
      component: BackendPage,
      redirect: "/backendPage/userManagePage",
      children:[
        {path:'userManagePage',component:UserManagePage},
        {path:'shopManagePage',component:ShopManagePage},
        {path:'dishManagePage',component:DishManagePage},
        {path:'orderManagePage',component:OrderManagePage},
        {path:'reportManagePage',component:ReportManagePage},
      ]
    }

  ]
})


export default routes
