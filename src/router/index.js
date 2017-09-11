import Vue from 'vue'
import Router from 'vue-router'
import chooseType from '@/components/monthRent/chooseType'
import monthRent from '@/components/monthRent/monthRent'
import lock from '@/components/monthRent/lock'
import addCar from '@/components/monthRent/addCar'
import chooseCar from '@/components/monthRent/chooseCar'

import chooseDate from '@/components/monthRent/chooseDate'
import pay from '@/components/monthRent/pay'
import checkCount from '@/components/monthRent/checkCount'
import countDetail from '@/components/monthRent/countDetail'
import carInfo from '@/components/momentRent/carInfo'
import ddss from '@/components/momentRent/ddss'
import leaseInfo from '@/components/momentRent/leaseInfo'
import lockCar from '@/components/momentRent/lockCar'
import orderList from '@/components/momentRent/orderList'
import parkInfo from '@/components/momentRent/parkInfo'

import selectCar from '@/components/momentRent/selectCar'
import ponList from '@/components/momentRent/ponList'
import accInfo from '@/components/momentRent/accInfo'
import addCarMoment from '@/components/momentRent/addCarMoment'

//优惠卷开始
//import sendCpo from '@/components/momentRent/sendCpo'
//import makeCpo from '@/components/momentRent/makeCpo'
//import addShop from '@/components/momentRent/addShop'
//import addMarket from '@/components/momentRent/addMarket'
//优惠卷结束
import bindPhone from '@/components/monthRent/bindPhone'
import rentDetail from '@/components/monthRent/rentDetail'
import NotFoundComponent from '@/components/monthRent/NotFoundComponent'
import firstPage from '@/components/monthRent/firstPage'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
  	{ path: '*',
  		component: NotFoundComponent
  	},
    {
      path: '/',
      name: 'bindPhone',
      component: bindPhone
    },

    {
      path: '/chooseType',
      name: 'chooseType',
      component: chooseType
    },
    {
      path:'/monthRent',
      name:'monthRent',
      component:monthRent
    },{
      path:'/firstPage',
      name:'firstPage',
      component:firstPage
    },
    {
      path:'/lock',
      name:'lock',
      component:lock
    },
    {
      path:'/addCar',
      name:'addCar',
      component:addCar
    },
    {
      path:'/chooseCar',
      name:'chooseCar',
      component:chooseCar
    },
     {
      path:'/rentDetail',
      name:'rentDetail',
      component:rentDetail
    },
    {
      path:'/chooseDate',
      name:'chooseDate',
      component:chooseDate
    },
    {
      path:'/pay',
      name:'pay',
      component:pay
    },
    {
      path:'/checkCount',
      name:'checkCount',
      component:checkCount
    },
    {
      path:'/countDetail',
      name:'countDetail',
      component:countDetail
    },
    {
      path:'/carInfo',
      name:'carInfo',
      component:carInfo
    },
    {
      path:'/ddss',
      name:'ddss',
      component:ddss
    },
    {
      path:'/ponList',
      name:'ponList',
      component:ponList
    },
    {
      path:'/accInfo',
      name:'accInfo',
      component:accInfo
    },
    {
      path:'/leaseInfo',
      name:'leaseInfo',
      component:leaseInfo
    },
    {
      path:'/lockCar',
      name:'lockCar',
      component:lockCar
    },
    {
      path:'/orderList',
      name:'orderList',
      component:orderList
    },
    {
      path:'/addCarMoment',
      name:'addCarMoment',
      component:addCarMoment
    },
//  {
//    path:'/addMarket',
//    name:'addMarket',
//    component:addMarket
//  },
//  {
//    path:'/makeCpo',
//    name:'makeCpo',
//    component:makeCpo
//  },
//  {
//    path:'/addShop',
//    name:'addShop',
//    component:addShop
//  },
//  {
//    path:'/sendCpo',
//    name:'sendCpo',
//    component:sendCpo
//  },
    {
      path:'/parkInfo',
      name:'parkInfo',
      component:parkInfo
    },

    {
      path:'/selectCar',
      name:'selectCar',
      component:selectCar
    }
  ]
})


