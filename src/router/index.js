import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login/login.vue'
import Layout from '../views/layOut.vue'
import MainPage from '../views/Main/mainPage.vue'
import MainView from '../views/Main/mainView.vue'
import PersonPage from '../views/Main/personPage.vue'
import SearchPage from '../views/Main/searchPage.vue'
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
        {path:'searchPage',component:SearchPage}
      ]
    },
    {
      path:'/personPage',
      name:'personPage',
      component: PersonPage
    },
  ]
})


export default routes
