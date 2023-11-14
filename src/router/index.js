import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login/login.vue'
import Layout from '../views/layOut.vue'
import MainPage from '../views/Main/mainPage.vue'
import MainView from '../views/Main/mainView.vue'
import PersonPage from '../views/Main/personPage.vue'
import SearchPage from '../views/Search/searchPage.vue'
import ShopDetailPage from '../views/Shop/ShopDetailPage.vue'
import ShopDishPage from '../views/Shop/ShopDishPage.vue'

import ManagePage from '../views/Manage/managePage.vue'
import OrderHandlePage from '../views/Manage/Components/orderHandlePage.vue'
import SetMealPage from '../views/Manage/Components/setMealPage.vue'
import BusinessPage from '../views/Business/businessPage.vue'

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
          path:'shopDetailPage/:id',
          name:'shopDetailPage',
          component:ShopDetailPage
        }
      ]
    },
    {
      path:'/managePage',
      name:'managePage',
      component: ManagePage,
      redirect: "/managePage/orderHandlePage",
      children:[
        {path:'orderHandlePage',component:OrderHandlePage},
        {path:'setMealPage',component:SetMealPage}
      ]
    },
    {
      path:'/businessPage',
      name:'businessPage',
      component: BusinessPage
    }

  ]
})


export default routes
