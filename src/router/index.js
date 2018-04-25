import Vue from 'vue'
import Router from 'vue-router'
import CanvasPage from '@/pages/CanvasPage'
import AllCardsPage from '@/pages/AllCardsPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CanvasPage',
      component: CanvasPage
    },
    {
      path: '/allcards',
      name: 'allcards',
      component: AllCardsPage
    }
  ]
})
